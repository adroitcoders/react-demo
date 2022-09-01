import Box from "@mui/material/Box";
import AirIcon from "@mui/icons-material/Air";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import Typography from "@mui/material/Typography";
import FmdGoodIcon from "@mui/icons-material/FmdGood";

import Colors from './Colors'

const classesSx = {
  mainBox: {
    backgroundColor: Colors.colorContent,
    borderRadius: "12px",
    textAlign: "center",
    padding: "24px",
    boxShadow: 'rgb(99 99 99 / 20%) 0px 2px 8px 0px'
  },
  icon: {
    "& svg": {
      height: "100px",
      width: "100px",
      "& path": {
        fill: Colors.colorPrimary,
      },
    },
  },
  date: {
    fontSize: "18px",
    color: Colors.colorPrimary,
    fontWeight: 500,
  },
  temp: {
    fontSize: "60px",
    fontWeight: 700,
    color: Colors.colorPrimary,
  },
  type: {
    fontSize: "24px",
    color: Colors.colorPrimary,
    fontWeight: 700,
    marginTop: "16px",
    marginBottom: "10px",
  },
  wind: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "5px",
    color: Colors.colorPrimary,
    fontWeight: 500,
    "& svg": {
      fill: Colors.colorPrimary,
      marginRight: '5px',
    },
  },
  topCityName: {
    fontSize: "24px",
    fontWeight: 500,
    color: Colors.colorPrimary,
    textAlign: "left",
    display: "flex",
    alignItems: "center",
    '& svg': {
        marginRight: '5px'
    }
  },
};

const MainBox = (props: any) => {
  const d = new Date();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <>
      <Box component="div" sx={classesSx.mainBox}>
        <Typography sx={classesSx.topCityName}>
          <FmdGoodIcon />
          {props.searchedCity ? props.searchedCity : props.defaultCity}
        </Typography>
        <img
          src={`/images/${props.weather.weather[0].icon}.png`}
          height='100px'
          width='100px'
          alt=''
        />
        <Box component="div" sx={classesSx.date}>
          Today, {d.getDate()} {months[d.getMonth()]}
        </Box>
        <Box component="div" sx={classesSx.temp}>
          {props.weather.main.temp}°C
        </Box>
        <Box component="div" sx={classesSx.type}>
          {props.weather.weather[0].main}
        </Box>
        <Box component="div" sx={classesSx.wind}>
          <AirIcon /> Wind |{" "}
          {props.weather.wind.speed} km/h
        </Box>
        <Box component="div" sx={classesSx.wind}>
          <ThermostatIcon /> Hum |{" "}
          {props.weather.main.humidity}%
        </Box>
      </Box>
    </>
  );
};

export default MainBox;
