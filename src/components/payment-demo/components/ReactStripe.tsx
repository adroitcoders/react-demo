import React from 'react';
import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios';

import { storePlanDetails, storeStripeSession } from "./Reducer";

export default function ReactStripe() {

  let userData = JSON.parse(sessionStorage["react-demo-session-user"]);

  //Required Keys
  const API_KEY = process.env.REACT_APP_STRIPE_KEY ?? "";

  const product_starter = process.env.REACT_APP_STRIPE_PRODUCT_STARTER ?? "";
  const product_premium = process.env.REACT_APP_STRIPE_PRODUCT_PREMIUM ?? "";
  const product_pplus = process.env.REACT_APP_STRIPE_PRODUCT_PREMIUM_PLUS ?? "";

  const plan_starter = process.env.REACT_APP_STRIPE_PLAN_STARTER ?? "";
  const plan_premium = process.env.REACT_APP_STRIPE_PLAN_PREMIUM ?? "";
  const plan_pplus = process.env.REACT_APP_STRIPE_PLAN_PREMIUM_PLUS ?? "";

  //Variables
  const planDetails = storePlanDetails.getState();
  let price: string;

  //Price id logic part according to user membership
  if (!planDetails.yearly) {
    if (planDetails.membership === "Starter") {
      price = product_starter;
    }
    if (planDetails.membership === "Premium") {
      price = product_premium;
    }
    if (planDetails.membership === "Premium Plus") {
      price = product_pplus;
    }
  } else {
    if (planDetails.membership === "Starter") {
      price = plan_starter;
    }
    if (planDetails.membership === "Premium") {
      price = plan_premium;
    }
    if (planDetails.membership === "Premium Plus") {
      price = plan_pplus;
    }
  }


  //Stripe Loading Code
  const stripePromise = loadStripe(API_KEY);

  const handlePayment = async () => {
    
    const stripe = await stripePromise;

    const sessionResponse = await axios.post(`${process.env.REACT_APP_DOMAIN_URL}create-checkout-session`,{
      lineItems: [
        {
          price: price,
          quantity: 1,
          yearly: planDetails.yearly,
        }
      ]
    })
    storeStripeSession.dispatch({
      type: "updateSessionInfo",
      sessionInfo: sessionResponse.data
    })
    sessionStorage.setItem('stripe-session', JSON.stringify(sessionResponse.data))
    const sessionInfo = sessionResponse;
    userData.membership = planDetails.membership;
    sessionStorage.setItem("react-demo-session-user", JSON.stringify(userData));

    const result = await stripe?.redirectToCheckout({
      sessionId: sessionInfo.data.session.id,
    });

    if(result && result.error){
      console.log('err occured while redirecting')
    }
  };

  React.useEffect(() => {
    handlePayment();
  },[]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
    </>
  );
}
