import React from "react";
import { useNavigate } from "react-router-dom";
import useRazorpay from "react-razorpay";
import axios from "axios";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

import { storePlanDetails } from "./Reducer";
import Invoice from "./Invoice";

const useStyles = makeStyles({
  buttonParent: {
    textAlign: "center",
  },
});

const StyledButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: "1.25rem",
  color: "#FFF",
  lineHeight: 1.5,
  backgroundColor: "#313552",
  "&:hover": {
    backgroundColor: "#0069d9",
    borderColor: "#0062cc",
    boxShadow: "none",
  },
  padding: "16px",
  marginTop: "20px",
});

const ReactRazorpay = () => {

  const classes = useStyles();
  const navigate = useNavigate();

  //Required Keys
  const KEY_ID = process.env.REACT_APP_RAZORPAY_KEY_ID ?? "";
  const KEY_SECRET = process.env.REACT_APP_RAZORPAY_KEY_SECRET ?? "";

  //Variables
  const planDetails = storePlanDetails.getState();
  let userData = JSON.parse(sessionStorage["react-demo-session-user"]);
  let orderId: any

  let currency: any;
  let amount: any;

  //States
  const [paymentInfo, setPaymentInfo] = React.useState(Object);
  const [subscription, setSubscription] = React.useState({
    subscriptionLink: '',
    subscriptionID: '',
    fetchSubscriptionBtn: false,
  });

  //Code to load RazorPay
  const Razorpay = useRazorpay();

  const instance = axios.create({
    auth: {
      username: KEY_ID,
      password: KEY_SECRET,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });

  const onPaymentHandler = async () => {

    await axios.post(`${process.env.REACT_APP_DOMAIN_URL}razorpay`, {
      plan: planDetails.membership
    })
    .then(response => {
      orderId = response.data.id
      currency = response.data.currency
      amount = response.data.amount
    })

    const options = {
      key: KEY_ID,
      amount: (amount).toString(),
      currency: currency,
      name: userData.name,
      description: "Test Transaction",
      order_id: orderId,
      handler: function (response: any) {
        console.log('options response ', response)
        instance
          .get(
            `https://api.razorpay.com/v1/payments/${response.razorpay_payment_id}`
          )
          .then((response) => setPaymentInfo(response.data));
        userData.membership = planDetails.membership;
        sessionStorage.setItem(
          "react-demo-session-user",
          JSON.stringify(userData)
        );
      },
      prefill: {
        name: userData.name,
        email: userData.email ?? '',
        contact: userData.contact ?? '',
      },
      notes: {
        address: userData.address ?? '',
      },
      theme: {
        color: "#6A67CE",
      },
    };

    var rzPay = new Razorpay(options);
    rzPay.open();

    rzPay.on("payment.failed", function (response: any) {
      console.log(response);
      navigate(`/payment`);
    });
  };

  const onSubscriptionsHandler = () => {
    axios.post(`${process.env.REACT_APP_DOMAIN_URL}razorpay/subscriptions`, {
      plan: planDetails.membership
    })
    .then(response => {
      setSubscription({
        subscriptionLink: response.data.response.short_url,
        subscriptionID: response.data.response.id,
        fetchSubscriptionBtn: false
      })
    })
  }

  React.useEffect(() => {
    if(!paymentInfo.id && !planDetails.yearly){
      onPaymentHandler();
    };
    if(!paymentInfo.id && planDetails.yearly) {
      onSubscriptionsHandler();
    };
  },[]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchSubscription = () => {
    instance.get(`https://api.razorpay.com/v1/subscriptions/${subscription.subscriptionID}`)
    .then(response => setPaymentInfo(response.data))
    setSubscription({...subscription, fetchSubscriptionBtn: false})
  };

  const fetchButtonVisibility = () => {
    setSubscription({...subscription, fetchSubscriptionBtn: true})
  };

  return (
    <>
      {(paymentInfo.id && !planDetails.yearly) && (
        <Invoice
          plan={planDetails.membership}
          userDetails={{
            name: userData.name,
            email: userData.email,
          }}
          billingDetails={{
            name: paymentInfo.name ?? userData.name,
            email: paymentInfo.email ?? userData.email,
            paymentMode: "RazorPay",
            isYearly: planDetails.yearly ? "Yes" : "No",
            amount: paymentInfo.amount / 100 + "$",
          }}
        />
      )}
      {(paymentInfo.id && planDetails.yearly) && (
        <Invoice
          plan={planDetails.membership}
          userDetails={{
            name: userData.name,
            email: userData.email,
          }}
          billingDetails={{
            name: userData.name,
            email: userData.email,
            paymentMode: "RazorPay",
            isYearly: planDetails.yearly ? "Yes" : "No",
            amount: planDetails.price + "$",
            billingStartDate: new Date(paymentInfo.start_at * 1000).toDateString(),
            nextBillingDate: new Date(paymentInfo.end_at * 1000).toDateString(),
          }}
        />
      )}

      {(!paymentInfo.id && planDetails.yearly) && (
        <div className={classes.buttonParent}>
          {(subscription.subscriptionLink && !subscription.fetchSubscriptionBtn) &&
            <a 
              target='_blank' 
              href={subscription.subscriptionLink}
              onClick={fetchButtonVisibility}
            >
              Please visit the below link to complete subscription
            </a>
          }
        </div>
      )}
      {(subscription.fetchSubscriptionBtn && planDetails.yearly) &&
        <div style={{textAlign: 'center'}}>
          <StyledButton onClick={fetchSubscription}>
            Fetch subscription info
          </StyledButton>
        </div>
      }
    </>
  );
};

export default ReactRazorpay;
