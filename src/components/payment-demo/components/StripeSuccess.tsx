import React from "react";

import Invoice from "./Invoice";
import axios from "axios";

const StripeSuccess = () => {
  const SECRET_KEY = process.env.REACT_APP_STRIPE_SECRET ?? "";

  const stripeSessionInfo = JSON.parse(sessionStorage["stripe-session"]);
  let userData = JSON.parse(sessionStorage["react-demo-session-user"]);

  const [paymentInfo, setPaymentInfo] = React.useState(Object);

  React.useEffect(() => {
    axios
      .get(
        `https://api.stripe.com/v1/checkout/sessions/${stripeSessionInfo.session.id}`,
        {
          headers: { Authorization: `Bearer ${SECRET_KEY}` },
        }
      )
      .then((response: any) => {
        setPaymentInfo(response.data);
      });
  });

  const timeStampToDate = (timeStamp: any) => {
    const date = new Date(timeStamp * 1000)
    return date.toLocaleDateString("en-US")
  }

  return (
    <>
      {paymentInfo.id && (
        <Invoice
          plan={userData.membership}
          userDetails={{
            name: userData.name,
            email: userData.email,
          }}
          billingDetails={{
            name: paymentInfo.customer_details.name,
            email: paymentInfo.customer_details.email,
            paymentMode: "Stripe",
            isYearly: paymentInfo.mode === "subscription" ? "Yes" : "No",
            amount: (paymentInfo.amount_total / 100).toString() + '$',
            nextBillingDate: timeStampToDate(paymentInfo.expires_at)
          }}
        />
      )}
    </>
  );
};

export default StripeSuccess;
