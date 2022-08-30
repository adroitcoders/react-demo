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

//services
import { getCoordinates, getCurrentWeather } from './Services';

//utils
import { addCitiesToSession, timeStampConverter } from './utils';
import Search from "./Search";

const classesSx = {
  dayCard: {
    display: "inline-block",
    margin: "16px",
    backgroundColor: "#FFFFFF",
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
    color: "#84abfe",
    fontWeight: 900,
    display: "inline-block",
  },
  timeZone: {
    fontWeight: 500
  },
  wishText: {
    color: "#84abfe",
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
    marginLeft: '16px',
    '@media only screen and (max-width: 600px)': {
      marginTop: '8px',
      fontSize: "28px",
      textAlign: 'center',
    },
  },
  footer: {
    width: '100%',
    textAlign: 'center', 
    marginLeft: '16px', 
    marginTop: '48px', 
    border: '2px solid grey',
    padding: '24px',
    backgroundColor: 'aliceblue',
  },
  windCardBox: {
    // '& div:nth-of-type(odd)': {
    //   backgroundColor: '#ffb560'
    // },
    // '& div:nth-of-type(even)': {
    //   backgroundColor: '#ff79aa'
    // }
  },
};

const Weather = () => {

  //states
  const [weather, setWeather] = React.useState<any>();
  const [coordinates, setCoordinates] = React.useState({
    lat: 0,
    lon: 0,
  });

  //variables
  const defaultCity = "London";
  const d = new Date();
  

  const getCoordinatesHandle = (cityName: string) => {
    getCoordinates(cityName)
    .then(function(response) {
      setCoordinates({
        lat: response.lat,
        lon: response.lon,
      })
    })
  };

  const searchCallback = (latitude: any, longitude: any) => {
    setCoordinates({
      lat: latitude,
      lon: longitude,
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
    } else if (hr == 12) {
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

  return (
    <Grid container spacing={2}>
      <Grid item md={8} xs={12}>
        <Box component="div" paddingLeft="16px" sx={classesSx.h3Div}>
          <Box component='span' marginTop="24px">
            <Typography sx={classesSx.timeZone}>Local Timezone</Typography>
            <Typography
              variant="h3"
              sx={classesSx.timeText}
            >
              {weather && timeStampConverter(weather.dt, true)}
            </Typography>
          </Box>

          <Box component='span' marginTop="24px">
            <Typography sx={classesSx.timeZone}>GMT Timezone</Typography>
            <Typography
              variant="h3"
              sx={classesSx.timeText}
            >
              {weather && timeStampConverter(weather.dt, true, true)}
            </Typography>
          </Box>

          <Box component="span">
            <Search searchCallback={searchCallback} />
          </Box>
        </Box>
        <Typography variant="h6" sx={classesSx.dateString}>
          {d.toDateString()}
        </Typography>
        <Typography
          marginLeft="16px"
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

        <Grid container spacing={1}>
          <Grid item marginLeft='auto' marginRight='auto'>
            {weather && (
              <AirQualityIndex lat={coordinates.lat} lon={coordinates.lon} />
            )}
          </Grid>
          <Grid item marginLeft='auto' marginRight='auto'>
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
            temp={weather.main.temp}
            wind={weather.wind.speed}
            humidity={weather.main.humidity}
            defaultCity={defaultCity}
          />
        )}
        <Box mt={2}></Box>

        {parsedWeatherSession && parsedWeatherSession.map((it: any, idx: number) =>
          <Box component='div' sx={classesSx.windCardBox}>
            <WindCard
              key={idx}
              popularCities={it}
            />
          </Box>
        )}
      </Grid>

      <Box component='div' sx={classesSx.footer} >
          <Typography variant='h6'>
            Design reference -
            <a href='https://dribbble.com/shots/16206037-Skyler-Weather-Dashboard-Day-Mode/attachments/8066465?mode=media' target='_blank'> Design Link </a>
          </Typography>
      </Box>
    </Grid>
  );
};

export default Weather;
