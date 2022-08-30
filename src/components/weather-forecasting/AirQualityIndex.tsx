import React from "react";

//mui
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AirIcon from "@mui/icons-material/Air";

//services
import { getAirPollutionInfo } from './Services';

const classesSx = {
  box: {
    display: "inline-block",
    backgroundColor: "#FFFFFF",
    borderRadius: "12px",
    '@media only screen and (max-width: 600px)': {
      margin: '20px'
    },
    padding: "20px",
    boxShadow: 'rgb(99 99 99 / 20%) 0px 2px 8px 0px'
  },
  singleBox: {
    display: "inline-block",
    padding: "16px",
    backgroundColor: "#edfcf5",
    borderRadius: "8px",
    textAlign: "center",
    marginRight: "8px",
    marginTop: '8px',
  },
  number: {
    color: "#3dcc93",
    fontWeight: "bold",
    fontSize: "16px",
  },
  measure: {
    marginTop: "3px",
    color: "#3dcc93",
    fontWeight: 500,
    fontSize: "13px",
  },
  messageDiv: {
    marginTop: "16px",
    marginBottom: "16px",
    display: "flex",
    "& svg": {
      width: "42px",
      height: "42px",
      fill: "#3dcc93",
      marginRight: "10px",
    },
  },
  walkQuality: {
    fontWeight: 700,
    color: "#3dcc93",
  },
  walkText: {
    fontSize: "14px",
    color: "#cbcfdf",
    marginTop: "-5px",
  },
};

const AirQualityIndex = (props: any) => {
  const [airIndex, setAirIndex] = React.useState({
    quality: 0,
    pm2: 0,
    pm10: 0,
    so2: 0,
    no2: 0,
    o3: 0,
    co: 0,
  });

  React.useEffect(() => {
    getAirPollutionInfo(props.lat, props.lon)
    .then(function(response){
        setAirIndex({
            quality: response.main.aqi,
            pm2: response.components.pm2_5,
            pm10: response.components.pm10,
            so2: response.components.so2,
            no2: response.components.no2,
            o3: response.components.o3,
            co: response.components.co,
        }); 
    })
  }, [props.lat, props.lon]);

  return (
    <Box component="div" sx={classesSx.box}>
      <Typography variant="h6">Air Quality Index</Typography>
      <Box component="div" sx={classesSx.messageDiv}>
        <AirIcon />
        <Box component="div">
          <Typography sx={classesSx.walkQuality}>
            {airIndex.quality === 1 && "Good"}
            {airIndex.quality === 2 && "Fair"}
            {airIndex.quality === 3 && "Moderate"}
            {airIndex.quality === 4 && "Poor"}
            {airIndex.quality === 5 && "Very Poor"}
          </Typography>
          <Typography sx={classesSx.walkText}>
            {airIndex.quality === 1 && "A perfect day for a walk!"}
            {airIndex.quality === 2 && "A good day for a walk!"}
            {airIndex.quality === 3 && "Okay for a short walk!"}
            {airIndex.quality === 4 && "Not so good"}
            {airIndex.quality === 5 && "Better to stay inside"}
          </Typography>
        </Box>
      </Box>
      <Box component="div" sx={classesSx.singleBox}>
        <Box component="div" sx={classesSx.number}>
          {airIndex.pm2}
        </Box>
        <Box component="div" sx={classesSx.measure}>
          PM2
        </Box>
      </Box>

      <Box component="div" sx={classesSx.singleBox}>
        <Box component="div" sx={classesSx.number}>
          {airIndex.pm10}
        </Box>
        <Box component="div" sx={classesSx.measure}>
          PM10
        </Box>
      </Box>

      <Box component="div" sx={classesSx.singleBox}>
        <Box component="div" sx={classesSx.number}>
          {airIndex.so2}
        </Box>
        <Box component="div" sx={classesSx.measure}>
          SO2
        </Box>
      </Box>

      <Box component="div" sx={classesSx.singleBox}>
        <Box component="div" sx={classesSx.number}>
          {airIndex.no2}
        </Box>
        <Box component="div" sx={classesSx.measure}>
          NO2
        </Box>
      </Box>

      <Box component="div" sx={classesSx.singleBox}>
        <Box component="div" sx={classesSx.number}>
          {airIndex.o3}
        </Box>
        <Box component="div" sx={classesSx.measure}>
          O3
        </Box>
      </Box>

      <Box
        component="div"
        sx={classesSx.singleBox}
        style={{ marginRight: "0px" }}
      >
        <Box component="div" sx={classesSx.number}>
          {airIndex.co}
        </Box>
        <Box component="div" sx={classesSx.measure}>
          CO
        </Box>
      </Box>
    </Box>
  );
};

export default AirQualityIndex;
