import axios from 'axios';

// API to get coordinates according to city name
export const getCoordinates = (cityName: string)  => {
    return axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${process.env.REACT_APP_OPENWEATHER_KEY}`
    )
    .then(function (response) {
        return response.data[0];
      })
      .catch(function (error) {
        console.log(error);
        return false;
    });
}


// API to get current weather according to coordinates provided
export const getCurrentWeather = (latitude: number, longitude: number) => {
    return axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_KEY}`
    )
    .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
        return false;
    });
}

// API to get air pollution data according to coordinates provided
export const getAirPollutionInfo = (latitude: number, longitude: number) => {
    return axios.get(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_OPENWEATHER_KEY}`
    )
    .then(function (response) {
        return response.data.list[0];
      })
      .catch(function (error) {
        console.log(error);
        return false;
    });
}


// API to get next five day forecast
export const getFiveDayForecast = (latitude: number, longitude: number) => {
    return axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_KEY}`
    )
    .then(function (response) {
        return response.data.list;
      })
      .catch(function (error) {
        console.log(error);
        return false;
    });
}