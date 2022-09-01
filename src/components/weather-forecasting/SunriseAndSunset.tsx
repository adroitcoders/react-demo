import React from "react";

//mui
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import FmdGoodIcon from "@mui/icons-material/FmdGood";

//utils
import { timeStampConverter } from "./utils";

import Colors from './Colors';

const classesSx = {
  box: {
    backgroundColor: Colors.colorPrimary,
    borderRadius: "12px",
    padding: "16px",
    marginBottom: "16px",
    boxShadow: 'rgb(99 99 99 / 20%) 0px 2px 8px 0px'
  },
  styleBox: {
    padding: "12px",
    backgroundColor: Colors.colorSunBg,
    borderRadius: "12px",
    marginBottom: "12px",
  },
  sunriseBox: {
    display: "inline-flex",
    alignItems: "center",
    marginRight: '40px',
    "& svg": {
      fill: Colors.colorSunIcon,
      height: "36px",
      width: "36px",
      "& path": {
        fill: Colors.colorSunIcon,
      },
    },
  },
  sunsetBox: {
    marginRight: '0px',
  },
  sunrise: {
    fontSize: "14px",
    fontWeight: 500,
    color: Colors.colorGreyish,
  },
  time: {
    fontWeight: 500,
    color: Colors.colorSunText,
  },
  cityName: {
    fontWeight: 500,
    fontSize: "15px",
    marginBottom: "5px",
  },
  locationIconCityName: {
    height: "20px",
    width: "20px",
    marginRight: "4px",
    fill: Colors.colorSunText,
    verticalAlign: "sub",
  },
  infoBox: {
    marginLeft: '10px',
  },
};

const SunriseAndSunset = (props: any) => {

  return (
    <Box component="div" sx={classesSx.box}>
      <Typography variant="h6">Sunrise and Sunset</Typography>
      <Box mt="8px"></Box>

      {props.popularCitiesWeather.length > 0 &&
        props.popularCitiesWeather.map((city: any, idx: number) => (
          <Box component="div" sx={classesSx.styleBox} key={idx}>
            <Typography sx={classesSx.cityName}>
              <FmdGoodIcon sx={classesSx.locationIconCityName} />
              {city.name}
            </Typography>
            <Box
              component="div"
              sx={classesSx.sunriseBox}
            >
              <WbSunnyIcon />
              <Box component='div' sx={classesSx.infoBox}>
                <Typography sx={classesSx.sunrise}>Sunrise</Typography>
                <Typography sx={classesSx.time}>
                  {timeStampConverter(city.sys.sunrise)} AM
                </Typography>
              </Box>
            </Box>
            <Box component="div" sx={[classesSx.sunriseBox, classesSx.sunsetBox]}>
              <DarkModeIcon />
              <Box component='div' sx={classesSx.infoBox}>
                <Typography sx={classesSx.sunrise}>Sunset</Typography>
                <Typography sx={classesSx.time}>
                  {timeStampConverter(city.sys.sunset)} PM
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
    </Box>
  );
};

export default React.memo(SunriseAndSunset);
