import { createStore } from "redux";

const planDetailsState = {
  membership: "",
  yearly: false,
  price: 0,
};

const planDetailsStateReducer = (state = planDetailsState, action: any) => {
  switch (action.type) {
    case "updatePlanDetails":
      return {
        ...planDetailsState,
        membership: action.membership,
        yearly: action.yearly,
        price: action.price,
      };
    default:
      return state;
  }
};

export const storePlanDetails = createStore(planDetailsStateReducer);

const stripeSessionState = {
  sessionInfo: []
};

const stripeSessionStateReducer = (state = stripeSessionState, action: any) => {
  switch(action.type){
    case "updateSessionInfo":
      return {
        ...stripeSessionState,
        sessionInfo: action.sessionInfo
      }
    default:
      return state;  
  }
}

export const storeStripeSession = createStore(stripeSessionStateReducer)