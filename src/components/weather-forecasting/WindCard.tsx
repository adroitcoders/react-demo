//mui
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AirIcon from "@mui/icons-material/Air";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import FmdGoodIcon from "@mui/icons-material/FmdGood";

import Colors from './Colors';

const classesSx = {
  box: {
    backgroundColor: Colors.colorWindInfo,
    borderRadius: "12px",
    padding: "20px",
    marginBottom: '16px',
    "& span": {
      fontSize: "15px",
      fontWeight: 500,
      color: Colors.colorPrimary,
    },
    boxShadow: 'rgb(99 99 99 / 20%) 0px 2px 8px 0px'
  },
  boxBlue: {
    backgroundColor: Colors.colorContent,
    borderRadius: "12px",
    marginRight: "16px",
    padding: "20px",
    "& span": {
      fontSize: "15px",
      fontWeight: 500,
      color: "#FFFFFF",
    },
    boxShadow: 'rgb(99 99 99 / 20%) 0px 2px 8px 0px'
  },
  eachBox: {
    marginTop: "8px",
  },
  icons: {
    marginRight: "8px",
    fill: Colors.colorPrimary,
    verticalAlign: "middle",
  },
  cityBox: {
    float: "right",
    "& svg": {
      fill: Colors.colorPrimary,
      verticalAlign: "bottom",
    },
  },
  cityName: {
    fontWeight: 500,
    color: Colors.colorPrimary,
    fontSize: "16px",
  },
  cityTemp: {
    fontWeight: 500, 
    fontSize: "24px"
  },
};

const WindCard = (props: any) => {

  return (
    <>
      {props.popularCities && (
        <Box
          component="div"
          sx={props.background ? classesSx.boxBlue : classesSx.box}
        >
          <Box component="div" sx={classesSx.eachBox}>
            <AirIcon sx={classesSx.icons} />
            <Box component="span">Wind &nbsp; &nbsp; |</Box>
            <Box component="span">
              &nbsp; &nbsp; {props.popularCities.wind.speed} km/h
            </Box>
            <Box component="span" sx={classesSx.cityBox}>
              <FmdGoodIcon />
              <Box component="span" sx={classesSx.cityName}>
                {props.popularCities.name}
              </Box>
            </Box>
          </Box>
          <Box component="div" sx={classesSx.eachBox}>
            <ThermostatIcon sx={classesSx.icons} />
            <Box component="span">Hum &nbsp; &nbsp; |</Box>
            <Box component="span">
              &nbsp; &nbsp; {props.popularCities.main.humidity} %
            </Box>
            <Box component="span" sx={classesSx.cityBox}>
              <Typography sx={classesSx.cityTemp}>
                {props.popularCities.main.temp}°C
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default WindCard;
