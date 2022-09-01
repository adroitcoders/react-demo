import React from "react";

//mui
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

//services
import { getCoordinates } from "./Services";

import { suggestions } from './utils';

const classesSx = {
  inputBase: {
    backgroundColor: "#f5f8ff",
    padding: "6px 12px 6px 12px ",
    borderRadius: "12px",
    marginRight: "8px",
  },
  autoComplete: {
    width: '200px',
    '& .MuiOutlinedInput-root': {
        padding: '4px'
    },
    '@media only screen and (max-width: 600px)': {
      width: '100%'
    },
  },
};

const Search = (props: any) => {
  const [value, setValue] = React.useState("");
  const [results, setResults] = React.useState(Array);

  // handlers
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setResults(suggestions(event.target.value));
  };

  const getCoordinatesHandle = (cityName: string) => {
    getCoordinates(cityName).then(function (response) {
      props.searchCallback &&  props.searchCallback(response.lat, response.lon, response.name)
    });
  };

  return (
    <>
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={results}
      sx={classesSx.autoComplete}
      value={value}
      onChange={(event: any, newValue: any, reason: any) => {
        if(reason === 'selectOption' && newValue){
          getCoordinatesHandle(newValue);
        }
      }}
      onKeyDown={(event) => {
        if (event.keyCode === 13) {
          results.length === 0 && getCoordinatesHandle(value);
        }
      }}
      autoHighlight
      renderInput={(params) => 
        <TextField 
          {...params} 
          placeholder="enter city"   
          onChange={handleChange}
          value={value}
        />}
    />
    </>
  );
};

export default Search;
