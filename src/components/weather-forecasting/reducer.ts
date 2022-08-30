import { createStore } from 'redux';

const weatherState = {
  classNumber: 0  
}

const weatherReducer = (state = weatherState, action: any) => {
  switch(action.type) {
    case 'updateClassNumber':
      return {...weatherState, classNumber: action.classNumber};    
    default: 
      return state;    
  }  
}

export const storeClass = createStore(weatherReducer)

const popularCityState = {
    weather: []
}

const popularCityWeatherReducer = (state = popularCityState, action: any) => {
    switch (action.type) {
        case 'updateCityWeather':
            return {...popularCityState, weather: action.weather};
        default:
            return state;    
    }
}
console.log('popular city state >>>> ', popularCityState)

export const popularCityWeather = createStore(popularCityWeatherReducer)