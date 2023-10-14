import { BASE_URL } from "./index"
import * as Location from 'expo-location'
import { GOOGLE_MAP_KEY } from './index';
import { ProgramsArray } from "../constants/content/programs";


export const getUserLocation= async()=>{


  let { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted'){
      alert('Permission to access location is not granted')
  }
  
  let location = await Location.getCurrentPositionAsync({});
  
  const { coords } = location

  if(coords){

      const { latitude, longitude} = coords;
      let addressResponse = await Location.reverseGeocodeAsync({ latitude, longitude})
      
      for(let item of addressResponse){
          let currentAddress = `${item.name}, ${item.city}, ${item.country}`
          const currentAddressName= `${item.name}, ${item.city}`
          console.log(coords)
  
   
          
          return {currentAddress,coords,item }
  }    
  }else{                                
    console.log({currentAddress,coords,item });

      //notify user something went wrong with location
  }



}

export const greet=() =>{
  const time = new Date().getHours();
  if (time < 12) {
    return 'Good morning';
  } else if (time < 18) {
    return 'Good afternoon';
  } else {
    return 'Good evening';
  }
}


export const getDatesAndDays= () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const numDays = new Date(year, month + 1, 0).getDate();
  const datesAndDays = [];

  for (let i = 1; i <= numDays; i++) {
    const date = new Date(year, month, i);
    const day = date.toLocaleString('en-us', { weekday: 'short' });
    const dayName = day.slice(0, 3);
    console.log(day); 
    // const MonthName = day.slice(0, 3); 
    const dateStr = `${i}${getOrdinalSuffix(i)}`;

    datesAndDays.push({ date: dateStr,day:dayName });
  }

  return datesAndDays;
}

export const getProgramByCode=(programCode)=> {
  for (let i = 0; i < ProgramsArray.length; i++) {
    if (ProgramsArray[i].programCode === programCode) {
        return (ProgramsArray[i]) 
    }
  }
  return(null)
}


const downloadFromUrl = async () => {
  console.log(resource);
const filename = "small.m4a";
const result = await FileSystem.downloadAsync(
  `${resource.docUrl}`,FileSystem.documentDirectory + filename
);
console.log(result);

save(result.uri, filename,"audio/m4a");
};



const save = async (uri, filename, mimetype) => {
setLoading(true)
console.log(mimetype);
if (Platform.OS === "android") {
  const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
  if (permissions.granted) {
    const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
    await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, filename, mimetype)
      .then(async (uri) => {
        await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });
        setLoading(false)
        
      })
      .catch(e => console.log(e));
      setLoading(false)
  } else {
    shareAsync(uri);
    setLoading(false)
  }
} else {
  shareAsync(uri);
  setLoading(false)
}
};