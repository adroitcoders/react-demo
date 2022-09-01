import React from "react";

//mui
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AirIcon from "@mui/icons-material/Air";

//services
import { getAirPollutionInfo } from './Services';

//utils
import { colorCodeAirQuality, pollutantColorGenerator } from './utils';

import Colors from './Colors';

const classesSx = {
  box: {
    backgroundColor: Colors.colorPrimary,
    borderRadius: "12px",
    padding: "20px",
    boxShadow: 'rgb(99 99 99 / 20%) 0px 2px 8px 0px'
  },
  singleBox: {
    padding: "12px",
    borderRadius: "8px",
    textAlign: "center",
  },
  number: {
    fontWeight: "bold",
    fontSize: "16px",
  },
  measure: {
    marginTop: "3px",
    fontWeight: 500,
    fontSize: "13px",
  },
  messageDiv: {
    marginTop: "16px",
    marginBottom: "16px",
    display: "flex",
  },
  airIcon: {
    width: '42px',
    height: '42px',
    marginRight: '10px'
  },
  walkQuality: {
    fontWeight: 700,
  },
  walkText: {
    fontSize: "14px",
    color: Colors.colorGreyish,
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
        {Object.entries(airIndex).map(([key, value]) => console.log('key', key, 'vlue', value))}
    })
  }, [props.lat, props.lon]);

  return (
    <Box component="div" sx={classesSx.box}>
      <Typography variant="h6">Air Quality Index</Typography>
      <Box component="div" sx={classesSx.messageDiv}>
        <AirIcon sx={[classesSx.airIcon, {fill: colorCodeAirQuality(airIndex.quality)}]} />
        <Box component="div">
          <Typography sx={[classesSx.walkQuality, {color: colorCodeAirQuality(airIndex.quality)}]}>
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

      <Grid container spacing={1}>
      {Object.entries(airIndex).map(([key, value], idx: number) =>
        idx !== 0 &&
        <Grid item xs={4} md={3} lg={2}>
          <Box component='div' sx={[
            classesSx.singleBox,
            {color: pollutantColorGenerator(key, value).text},
            {backgroundColor: pollutantColorGenerator(key, value).bg}
          ]}>
            <Box component="div" sx={classesSx.number}>
              {value}
            </Box>
            <Box component="div" sx={classesSx.measure}>
              {key.toUpperCase()}
            </Box>
          </Box>
        </Grid>  
      )}        
      </Grid>
    </Box>
  );
};

export default AirQualityIndex;
