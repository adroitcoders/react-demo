import React from "react";
import { useNavigate } from "react-router-dom";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { makeStyles } from "@mui/styles";

import Invoice from "./Invoice";
import { storePlanDetails } from "./Reducer";

const useStyles = makeStyles({
  optionHeader: {
    fontSize: "24px",
    textAlign: "center",
    marginBottom: "20px",
    marginTop: "50px",
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "center",
  },
  buttonsDiv: {
    minWidth: "400px",
  },
});

type ButtonWrapperProps = {
  paymentInfoCallBack: (paymentInfo: any) => void;
};

const ButtonWrapper = (props: ButtonWrapperProps) => {

  const classes = useStyles();
  
  const planDetails = storePlanDetails.getState();
  const [{ isResolved }] = usePayPalScriptReducer();
  const navigate = useNavigate();
  
  let userData = JSON.parse(sessionStorage["react-demo-session-user"]);

  const PPLUS_plan_id = process.env.REACT_APP_PPLUS_PLAN_ID ?? "";
  const Premium_plan_id = process.env.REACT_APP_PREMIUM_PLAN_ID ?? "";
  const Starter_plan_id = process.env.REACT_APP_STARTER_PLAN_ID ?? "";

  let planID: string;

  if (planDetails.membership === "Starter") {
    planID = Starter_plan_id;
  }
  if (planDetails.membership === "Premium") {
    planID = Premium_plan_id;
  }
  if (planDetails.membership === "Premium Plus") {
    planID = PPLUS_plan_id;
  }

  const infoSetterFunc = (details: any) => {
    props.paymentInfoCallBack && props.paymentInfoCallBack(details);
    userData.membership = planDetails.membership;
    sessionStorage.setItem("react-demo-session-user", JSON.stringify(userData));
  };

  const createOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: planDetails.price,
          },
        },
      ],
    });
  };

  const createSubscription = (data: any, actions: any) => {
    return actions.subscription.create({
      plan_id: planID,
    });
  };

  const onApprove = (data: any, actions: any) => {
    if (planDetails.yearly) {
      actions.subscription.get().then(function (details: any) {
        infoSetterFunc(details);
      });
    } else {
      return actions.order.capture().then(function (details: any) {
        infoSetterFunc(details);
      });
    }
  };

  const onInit = (data: any) => {
    console.log('on init data ' , data)
  }

  const onCancel = () => {
    navigate(`/payment`)
  }

  const onError = (err: any) => {
    console.log('error occured')
    navigate(`/payment`)
  }

  return (
    <>
    {(isResolved) && <>
      {planDetails.yearly && (
        <div className={classes.buttonsContainer}>
          <div className={classes.buttonsDiv}>
            <PayPalButtons
              style={{ layout: "vertical" }}
              createSubscription={createSubscription}
              onApprove={onApprove}
              onCancel={onCancel}
              onError={onError}
            />
          </div>
        </div>
      )}
      {!planDetails.yearly && (
        <div className={classes.buttonsContainer}>
          <div className={classes.buttonsDiv}>
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={createOrder}
              onApprove={onApprove}
              onCancel={onCancel}
              onInit={onInit}
              onError={onError}
            />
          </div>
        </div>
      )}
    </>}
    
    </>
  );
};

export default function ReactPayPal() {
  const classes = useStyles();

  const [paymentInfo, setPaymentInfo] = React.useState(Object);

  const planDetails = storePlanDetails.getState();

  let userData = JSON.parse(sessionStorage["react-demo-session-user"]);

  const vault = planDetails.yearly;

  const clientID = process.env.REACT_APP_PAYPAL_CLIENT_ID ?? "";

  const paymentInfoCallback = (paymentInfo: any) => {
    setPaymentInfo(paymentInfo);
  };

  return (
    <>
      {paymentInfo.status !== "COMPLETED" && paymentInfo.status !== "ACTIVE" && (
        <PayPalScriptProvider options={{ "client-id": clientID, vault: vault }}>
          <div className={classes.optionHeader}>
            Selected Payment Mode: <strong>Paypal</strong>
          </div>
          <ButtonWrapper paymentInfoCallBack={paymentInfoCallback} />
        </PayPalScriptProvider>
      )}

      {paymentInfo.status === "COMPLETED" && (
        <Invoice
          plan={planDetails.membership}
          userDetails={{
            name: userData.name,
            email: userData.email,
          }}
          billingDetails={{
            name: paymentInfo.payer.name.given_name,
            email: paymentInfo.payer.email_address,
            paymentMode: "Paypal",
            isYearly: planDetails.yearly ? "Yes" : "No",
            amount: paymentInfo.purchase_units[0].amount.value + "$",
          }}
        />
      )}
      {paymentInfo.status === "ACTIVE" && (
        <Invoice
          plan={planDetails.membership}
          userDetails={{
            name: userData.name,
            email: userData.email,
          }}
          billingDetails={{
            name: paymentInfo.subscriber.name.given_name,
            email: paymentInfo.subscriber.email_address,
            paymentMode: "Paypal",
            isYearly: planDetails.yearly ? "Yes" : "No",
            amount: paymentInfo.billing_info.last_payment.amount.value + "$",
            billingStartDate: paymentInfo.create_time,
            nextBillingDate: paymentInfo.billing_info.next_billing_time,
          }}
        />
      )}
    </>
  );
}
