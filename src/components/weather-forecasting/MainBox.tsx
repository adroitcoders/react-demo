import Box from "@mui/material/Box";
import AirIcon from "@mui/icons-material/Air";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import Typography from "@mui/material/Typography";
import FmdGoodIcon from "@mui/icons-material/FmdGood";

const classesSx = {
  mainBox: {
    backgroundColor: "#84abfe",
    borderRadius: "12px",
    textAlign: "center",
    padding: "24px",
    margin: "16px",
    marginTop: "24px",
    boxShadow: 'rgb(99 99 99 / 20%) 0px 2px 8px 0px'
  },
  icon: {
    "& svg": {
      height: "100px",
      width: "100px",
      "& path": {
        fill: "#FFF",
      },
    },
  },
  date: {
    fontSize: "18px",
    color: "#FFFFFF",
    fontWeight: 500,
  },
  temp: {
    fontSize: "60px",
    fontWeight: 700,
    color: "#FFFFFF",
  },
  type: {
    fontSize: "24px",
    color: "#FFFFFF",
    fontWeight: 700,
    marginTop: "16px",
    marginBottom: "10px",
  },
  wind: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "5px",
    color: "#fff",
    fontWeight: 500,
    "& svg": {
      fill: "#FFFFFF",
      marginRight: '5px',
    },
  },
  topCityName: {
    fontSize: "24px",
    fontWeight: 500,
    color: "#FFFFFF",
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
          {props.weather.name ? props.weather.name : props.defaultCity}
        </Typography>
        <img
          src={`/images/${props.weather.weather[0].icon}.png`}
          height='100px'
          width='100px'
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
