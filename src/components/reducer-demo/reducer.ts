import { createStore } from 'redux';

const classState = {
  classNumber: 0  
}

const classReducer = (state = classState, action: any) => {
  switch(action.type) {
    case 'updateClassNumber':
      return {...classState, classNumber: action.classNumber};    
    default: 
      return state;    
  }  
}

export const storeClass = createStore(classReducer)
