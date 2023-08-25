import React, { useState,useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import TextAtom from '../components/Atoms/TextAtom';
import { CheckBox, Divider, Icon } from 'react-native-elements';
import ViewAtom from '../components/Atoms/ViewAtom';
import { useSelector,useDispatch } from 'react-redux';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { Button } from '../components/Atoms/Button';
import { ActivityIndicator } from 'react-native-paper';
import { BackHandler } from 'react-native';
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardAtom from '../components/Atoms/CardAtom';

const THook = ({navigation}) => {
  const dispatch = useDispatch();

      //=================backpress====================
const handleBackPress = () => {
 BackHandler.exitApp()
    return true;
  };
  
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);
  //=================backpress====================
    const user=useSelector(state => state.userReducer.user);
    const theme=useSelector(state => state.userReducer.theme);
    const tUpdate=useSelector(state => state.userReducer.timetableUpdate);

   const [checking,setchecking]=useState(true)
   const [isAvailable,setisAvailable]=useState(false)
   useEffect(() => {
   setTimeout(() => {
    setchecking(false)
   }, 1000);
setisAvailable(tUpdate)
  }, []);
 
  return (
    <View style={styles.container}>
        
  <ViewAtom fw="wrap" fd="row" jc="center" ai="center" w="100%" bg="transparent" pv={5} br={0} mv={20} mh={0}>
     
</ViewAtom>
  <TextAtom text={"Smart Timetable"} f="Poppins"s={SIZES.h1} w={"500"} ta="center" ls={-2}c={COLORS.white} />
  <TextAtom text={"Lets you keep track of your classes, academics, attendance and much more.."} f="Poppins"s={SIZES.h5} w={"500"} ta="center" ls={0}c={COLORS.gray2} />
  {checking?             
  <ViewAtom  fd="column" jc="center" ai="center" w="100%" bg="transparent" pv={50} br={0} mv={5} mh={0}>
     
      <ActivityIndicator size="small" color={COLORS.amber} style={{marginBottom:20}} />
      <TextAtom text={"Checking your program timetable"} f="Poppins"s={SIZES.base} w={"500"} ta="center" ls={0}c={COLORS.gray2} />

  </ViewAtom>
  
  :

<>
{ isAvailable?<>

  <CardAtom fd="column" jc="flex-start" w={"100%"}   ai="center" pv={10} ph={10} mh={0}  br={5} mv={-3}  el={30} sh={COLORS.black}>
                {/* <TextAtom text={` ${}`} c={COLORS.white} f="Poppins" s={SIZES.base} w="500" /> */}

 <ViewAtom  fd="column" jc="center" ai="center" w="100%" bg="transparent" pv={5} br={0} mv={40} mh={0}>
    
 <TextAtom text={"Great!"} f="Poppins"s={SIZES.h2} w={"500"} ta="center" ls={-2}c={COLORS.gray3} />
    
 <TextAtom text={"Found your program timetable "} f="Poppins"s={SIZES.h5} w={"500"} ta="center" ls={0}c={COLORS.gray2} />
</ViewAtom>
              
       <Button text={"Sync now"}width={"90%"}bg={COLORS.green} navigation={navigation} screen={"Home"} onMethodSelected={()=>{}}borderRadius={10}s={SIZES.h5}pv={0}ph={0} tc={COLORS.white} />
           </CardAtom>

</>:  <>
 <ViewAtom  fd="column" jc="center" ai="center" w="100%" bg="transparent" pv={5} br={0} mv={40} mh={0}>
    
 <TextAtom text={"Oops!"} f="Poppins"s={SIZES.h2} w={"500"} ta="center" ls={-2}c={COLORS.gray3} />
    
 <TextAtom text={"Looks like your program timetable is not updated yet "} f="Poppins"s={SIZES.h5} w={"500"} ta="center" ls={0}c={COLORS.gray2} />
</ViewAtom>
              
       <Button text={"Update now"}width={"90%"}bg={COLORS.amber} navigation={navigation} screen={"Timetable"} onMethodSelected={()=>{}}borderRadius={10}s={SIZES.h5}pv={0}ph={0} tc={COLORS.white} />
 <ViewAtom fw="wrap" fd="row" jc="center" ai="center" w="100%" bg="transparent" pv={5} br={0} mv={5} mh={0}>
    
    </ViewAtom>
       <Button text={"Update later"}width={"90%"}bg={COLORS.gray2}  screen={""} onMethodSelected={()=>{navigation.replace("Home")}}borderRadius={10}s={SIZES.h5}pv={0}ph={0} tc={COLORS.white} />
     
     </>
   }
</>
       } 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:COLORS.dark,
    height:SIZES.height,
    paddingTop:50,
    alignItems:"center"
  },
 
  pinDot: {
    width: SIZES.h3,
    height: SIZES.h3,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.gray2,
    marginHorizontal: 5,
  },
  pinDotFilled: {
    backgroundColor:COLORS.gray2,
  },
  keypadContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems:"center",
    justifyContent:"center",
  },
  keypadButton: {
    width: '30%',
   aspectRatio:1.5,
    alignItems: 'center',
    justifyContent: 'center',

  },
 
});

export default THook;

