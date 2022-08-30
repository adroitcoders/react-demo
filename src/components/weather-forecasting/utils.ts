import cities from './cities.json'

export const timeStampConverter = (timeStamp: any, secs? : boolean, utc?: boolean) => {
  var date = new Date(timeStamp * 1000);
  // Hours part from the timestamp
  var hours = date.getHours();
  var utcHours = date.getUTCHours();
  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
  var utcMinutes = date.getUTCMinutes();
  // Seconds
  var seconds = "0" + date.getSeconds();
  var utcSeconds = date.getUTCSeconds();
  // Will display time in 10:30:23 format
  var formattedTime = ''
  var ampm = '';

  if(utc){
    ampm = utcHours >= 12 ? 'PM' : 'AM'
    if(secs){
      formattedTime =  utcHours + ":" + utcMinutes.toString().substr(-2) + ':' + utcSeconds.toString().substr(-2) + ' ' + ampm;
    }else{
      formattedTime = utcHours + ":" + utcMinutes.toString().substr(-2) + ' ' + ampm;
    }
  }else{
    ampm = hours >= 12 ? 'PM' : 'AM'
    if(secs){
      formattedTime =  hours + ":" + minutes.substr(-2) + ':' + seconds.substr(-2) + ' ' + ampm;
    }else{
      formattedTime = hours + ":" + minutes.substr(-2);
    }
  }

  return formattedTime;
};

//Function to add cities to the session storage
export const addCitiesToSession = (entry: any) => {
  let existingCities = sessionStorage.getItem('weather');
  let existingCitiesArr = existingCities && JSON.parse(existingCities);

  if(existingCitiesArr){

    //to check if city already exists
    let isExists: boolean = false;
    
    existingCitiesArr.map((city: any) => { 
      if(city.name === entry.name){
        isExists = true
      }
    })

    if(existingCitiesArr.length > 3 && !isExists){
      //if entries more than 4 removed the last entry and added the latest entry at top 
      existingCitiesArr.pop();
      existingCitiesArr.unshift(entry)
    }
    else{
      !isExists && existingCitiesArr.unshift(entry)
    }
  }

  if(existingCities){
    sessionStorage.setItem('weather', JSON.stringify(existingCitiesArr))            
  }else{
    sessionStorage.setItem('weather', JSON.stringify([entry]))
  }  
} 


export const suggestions = (value: string) => {
  let word = value.charAt(0).toUpperCase() + value.slice(1);

  let filteredList =  cities.filter((city: any, idx: any) => city.startsWith(word))

  return filteredList.slice(0, 20);
}