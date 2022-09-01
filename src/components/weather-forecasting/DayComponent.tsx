import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

//services
import { getFiveDayForecast } from './Services';

import Colors from './Colors';


const classesSx = {
  dayCard: {
    backgroundColor: Colors.colorPrimary,
    padding: "16px",
    borderRadius: "24px",
    textAlign: "center",
    "& svg": {
      height: "56px",
      width: "56px",
      "& path": {
        fill: "#ffb560",
      },
    },
    fontWeight: 600,
    boxShadow: 'rgb(99 99 99 / 20%) 0px 2px 8px 0px'
  },
  dayCardCurrent: {
    backgroundColor: Colors.colorContent,
    padding: "16px",
    borderRadius: "24px",
    textAlign: "center",
    color: Colors.colorPrimary,
    "& svg": {
      height: "56px",
      width: "56px",
      "& path": {
        fill: "#ffb560",
      },
    },
    fontWeight: 600,
    boxShadow: 'rgb(99 99 99 / 20%) 0px 2px 8px 0px'
  },
};

const DayComponent = (props: any) => {
  const [dayData, setDayData] = React.useState<any>();

  React.useEffect(() => {
    getFiveDayForecast(props.lat, props.lon)
    .then(function(response){
        let filterWithSingleTimeStamp = response.filter((sl: any) =>
          sl.dt_txt.includes("12:00:00")
        );
        setDayData(filterWithSingleTimeStamp);
    })
  }, [props.lat, props.lon]);


  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const dayConversion = (dateString: any) => {
    var d = new Date(dateString);
    var dayName = days[d.getDay()];
    return dayName;
  };

  var date = new Date();

  return (
    <Box component='div' marginTop='16px'>
      <Grid container spacing={2}>
      {dayData &&
        dayData.map((day: any, idx: number) => (
          <Grid item width={{xs: '50%', sm: '20%'}}
            key={idx}
          >
            <Box component='div' sx={dayConversion(day.dt_txt.split(" ")[0]) === days[date.getDay()] ?  classesSx.dayCardCurrent  : classesSx.dayCard}> 
            <img
              src={`/images/${day.weather[0].icon}.png`}
              height='100px'
              width='100px'
              alt=''
            />
            <Box component="div">
              {" "}
              {dayConversion(day.dt_txt.split(" ")[0])}{" "}
            </Box>
            <Box component="div"> {day.main.temp}°C </Box>
            </Box> 
          </Grid>
        ))}
        </Grid>
    </Box>
  );
};

export default DayComponent;
