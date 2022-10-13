import React from "react";

//mui
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightlightIcon from '@mui/icons-material/Nightlight';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';

//components
import MainBox from "./MainBox";
import SunriseAndSunset from "./SunriseAndSunset";
import AirQualityIndex from "./AirQualityIndex";
import DayComponent from "./DayComponent";
import WindCard from "./WindCard";
import Search from "./Search";

//services
import { getCoordinates, getCurrentWeather } from './Services';

//utils
import { addCitiesToSession, timeStampConverter } from './utils';

import Colors from './Colors';

const classesSx = {
  dayCard: {
    display: "inline-block",
    margin: "16px",
    backgroundColor: Colors.colorPrimary,
    padding: "16px",
    width: "60px",
    borderRadius: "8px",
    height: "80px",
    textAlign: "center",
  },
  h3Div: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    '@media only screen and (max-width: 600px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
      '& .MuiTypography-h3': {
        fontSize: '32px'
      },
      '& span': {
        marginTop: '24px'
      },
      '& span:not(:last-child)': {
        order: 2,
        marginTop: '24px'
      },
    },
  },
  inputBase: {
    backgroundColor: "#f5f8ff",
    padding: "6px 12px 6px 12px ",
    borderRadius: "12px",
    marginRight: "8px",
  },
  timeText: {
    color: Colors.colorContent,
    fontWeight: 900,
    fontSize: '36px',
    lineHeight: '44px',
  },
  timeZone: {
    fontWeight: 500,
    fontSize: '13px',
    lineHeight: '21px'
  },
  wishText: {
    color: Colors.colorContent,
    fontWeight: 900, 
    marginTop: "16px",
    '& svg': {
      width: '36px',
      height: '36px',
      verticalAlign: 'bottom',
      marginRight: '4px'
    }
  },
  dateString: {
    fontWeight: 700,
    fontSize: '24px',
    marginTop: '16px',
    color: Colors.colorSecondary,
    '@media only screen and (max-width: 600px)': {
      marginTop: '8px',
      fontSize: "28px",
      textAlign: 'center',
    },
  },
  footer: {
    width: '100%',
    marginLeft: '16px', 
    marginTop: '160px', 
    border: '2px solid grey',
    padding: '16px',
    backgroundColor: 'aliceblue',
    '& a': {
      textDecoration: 'none',
    },
  },
  timeBoxStyles: {
    border: `1px solid ${Colors.colorContent}`,
    padding: '8px 12px',
    borderRadius: '8px'
  },
  searchBox: {
    float: 'right',
    '@media only screen and (max-width: 600px)': {
      width: '100%'
    },
  },
};

const Weather = () => {

  //states
  const [weather, setWeather] = React.useState<any>();
  const [coordinates, setCoordinates] = React.useState({
    lat: 0,
    lon: 0,
    name: '',
  });

  //variables
  const defaultCity = "Nashik";
  const d = new Date();
  

  const getCoordinatesHandle = (cityName: string) => {
    getCoordinates(cityName)
    .then(function(response) {
      setCoordinates({
        lat: response.lat,
        lon: response.lon,
        name: response.name,
      })
    })
  };

  const searchCallback = (latitude: any, longitude: any, name: string) => {
    setCoordinates({
      lat: latitude,
      lon: longitude,
      name: name
    })
  }


  // use effects
  React.useEffect(() => {
    getCoordinatesHandle(defaultCity);
  }, []);

  React.useEffect(() => {
    if(coordinates.lat > 0 || coordinates.lon > 0){
      getCurrentWeather(coordinates.lat, coordinates.lon)
        .then(function(response){
          setWeather(response)
          addCitiesToSession(response)
      })
    }
  }, [coordinates]);

  const wishText = () => {
    let hr = d.getHours();
    let wishText = '';
    if (hr >= 0 && hr < 12) {
      wishText = 'Good Morning'
    } else if (hr === 12) {
      wishText = 'Good Noon'
    } else if (hr >= 12 && hr <= 17) {
      wishText = 'Good Afternoon'
    } else if (hr >= 17 && hr <= 18) {
      wishText = 'Good Evening'
    } else {
      wishText = 'Good Night'
    }

    return wishText;
  } 

  let sessionUser = sessionStorage.getItem('react-demo-session-user')
  let parsedSessionUser = sessionUser && JSON.parse(sessionUser)
  let weatherSession = sessionStorage.getItem('weather')
  let parsedWeatherSession = weatherSession && JSON.parse(weatherSession)

  const dateOptions :Intl.DateTimeFormatOptions = { 
    weekday: 'short',
    year: 'numeric', 
    month: 'short', 
    day: 'numeric', 
};

  return (
    <Box component='div' maxWidth='1488px' marginLeft='auto' marginRight='auto' padding='24px'>
    <Grid container spacing={2}>
      <Grid item md={8} xs={12}>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} lg={4}>
            <Box component='div' sx={classesSx.timeBoxStyles}>
              <Typography sx={classesSx.timeZone}>
                {new Date().toTimeString().slice(9)}
              </Typography>
              <Typography
                sx={classesSx.timeText}
              >
                {weather && timeStampConverter(weather.dt, true)}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <Box component='div' sx={classesSx.timeBoxStyles}>
              <Typography sx={classesSx.timeZone}>UTC Timezone</Typography>
              <Typography
                sx={classesSx.timeText}
              >
                {weather && timeStampConverter(weather.dt, true, true)}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Box component="span" sx={classesSx.searchBox}>
              <Search searchCallback={searchCallback} />
            </Box>
          </Grid>
        </Grid>
        <Typography sx={classesSx.dateString}>
          {d.toLocaleDateString('en-US', dateOptions)}
        </Typography>
        <Typography
          variant="h5"
          sx={classesSx.wishText}
        >
          {wishText() === 'Good Morning' && <WbSunnyIcon />}
          {wishText() === 'Good Evening' && <NightlightIcon />}
          {wishText() === 'Good Noon' && <WbTwilightIcon />}
          {wishText() === 'Good Afternoon' && <WbTwilightIcon />}
          {wishText()}, {parsedSessionUser.name.split(' ')[0]}!
        </Typography>
        {weather && (
          <Box component='div' textAlign='center'>
            <DayComponent lat={coordinates.lat} lon={coordinates.lon} />
          </Box>
        )}

        <Grid container spacing={2} marginTop='8px'>
          <Grid item sm={7} xs={12}>
            {weather && (
              <AirQualityIndex lat={coordinates.lat} lon={coordinates.lon} />
            )}
          </Grid>
          <Grid item sm={5} xs={12}>
            {parsedWeatherSession && (
              <SunriseAndSunset
                popularCitiesWeather={parsedWeatherSession && parsedWeatherSession}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={4} xs={12}>
        {weather && (
          <MainBox
            weather={weather}
            defaultCity={defaultCity}
            searchedCity={coordinates.name}
          />
        )}
        <Box mt={2}></Box>

        {parsedWeatherSession && parsedWeatherSession.map((it: any, idx: number) =>
          <Box component='div'>
            <WindCard
              key={idx}
              popularCities={it}
            />
          </Box>
        )}
      </Grid>

      {/* <Box component='div' sx={classesSx.footer} >
          <Typography>
            Design reference -
            <a href='https://dribbble.com/shots/16206037-Skyler-Weather-Dashboard-Day-Mode/attachments/8066465?mode=media' target='_blank' rel="noreferrer"> (Link) </a>
          </Typography>
          <Typography>
            API Used -
            <a href='https://openweathermap.org/api/' target='_blank' rel="noreferrer"> (Link) </a>
          </Typography>
      </Box> */}
    </Grid>
    </Box>
  );
};

export default Weather;
