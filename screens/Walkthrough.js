import React, { useState,useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet,Image } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import TextAtom from '../components/Atoms/TextAtom';
import {  Divider, Icon } from 'react-native-elements';
import ViewAtom from '../components/Atoms/ViewAtom';
import { useSelector } from 'react-redux';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { Button } from '../components/Atoms/Button';
import { ActivityIndicator } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { Checkbox } from 'react-native-paper';
import CardAtom from '../components/Atoms/CardAtom';
import { BackHandler } from 'react-native';

const Walkthrough = ({navigation}) => {
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
   const [checking,setchecking]=useState(true)
   useEffect(() => {
  setTimeout(() => {
    setchecking(false)
  }, 1000);
  }, []);
  const [checked, setChecked] = useState(false);

  const handleCheckboxToggle = () => {
    setChecked(!checked);
  };

  const settings=[
    {icon:"hardware-chip",name:"360ai",active:"360 Student offers a cutting-edge AI system, 360ai, which analyzes your strengths and unique qualities, helping you discover your true potential and guiding you towards the right career path. Say goodbye to uncertainty and embrace a future filled with purpose and clarity. Select & Customize your 360ai assistant to your preferences",number:"",screen:"AiModels"},      
    {icon:"calendar",name:"Smart timetable",active:"With our smart timetable and course management feature, 360 Student ensures you stay organized and in control of your academic journey. Seamlessly plan your schedule, access course resources, and stay up-to-date with essential information to excel in your studies. ",number:"",screen:"Themes"},
      {icon:"earth-outline",name:"Network",active:"360 Student bridges the gap by providing a platform where students can discover upcoming networking opportunities tailored to their courses and explore exciting projects initiated by their peers. Unleash your creativity and build a network of collaborators to enhance your academic and career growth",number:"",screen:"Navigate"},
      {icon:"clipboard",name:"Create",active:"Say hello to a vibrant academic community within 360 Student, where you can easily find peers willing to offer academic help and share valuable resources like past papers. Enhance your learning experience by collaborating with others and strengthening your academic skills. Create and view projects, group assignments, announcements and more ",number:"",screen:"Themes"},
  ]
  return (
    <View style={styles.container}>
        
  <ViewAtom fw="wrap" fd="row" jc="center" ai="center" w="100%" bg="transparent" pv={5} br={0} mv={0} mh={0}>
     
</ViewAtom>
  {/* <TextAtom text={"360 student "} f="Poppins"s={SIZES.h1} w={"500"} ta="center" ls={-2}c={COLORS.white} /> */}
  <Image source={require('../assets/360png.png')}  style={styles.Icon} />

  <TextAtom text={"Welcome"} f="Poppins"s={SIZES.h2} w={"500"} ta="center" ls={-2}c={COLORS.white} />
  <ScrollView style={{paddingHorizontal:10,width:"100%"}} >


  <ViewAtom  fd="column" w="90%"   bg="transparent" ph={10} br={0} mv={0} mh={0}>
          
          <TextAtom text={` `} c={COLORS.gray4} f="Roboto" s={SIZES.h5} w="500"  ls={-1}/>
          
                                      
          
                 
                     { settings.map(i=>{
                      return(
                        <TouchableOpacity onPress={()=>{}}>
                          <ViewAtom fd="row" jc="space-between" ai="center" w="100%" bg="transparent" pv={5} br={0} ph={5}mv={0} mh={0}>
                          <ViewAtom fd="row" jc="center" ai="center"  bg="transparent" pv={5} ph={0} br={0} mv={0} mh={0}>
                          <CardAtom fd="row"  jc="space-between" ai="flex-start" pv={15} ph={15} bg={COLORS.primary} br={15} mv={0} mh={5}   el={3} sh='#525252' >
                    
                          <Icon name={i.icon} type="ionicon" color={COLORS.white} size={SIZES.h2}  />
                    
                            </CardAtom>
                       
                         <ViewAtom fd="column" jc="flex-start" ai="flex-start" w="80%"  bg="transparent" pv={5} br={0} mv={0} mh={5}>
                       
                                     <TextAtom text={i.name} c={COLORS.white} f="Roboto" s={SIZES.h5} w="500" />
                                     <TextAtom text={i.active} c={COLORS.gray4} f="Roboto" s={SIZES.base} w="500" />
                                     {/* <TextAtom text={` Two Rivers`} c={COLORS.gray2} f="Roboto" s={SIZES.base} w="500" /> */}
                    
                                     {/* <ViewAtom  ai="center" ph={3}pv={2}  bg={COLORS.black}  br={5} mv={2} mh={0}>
                                    </ViewAtom> */}
                                    <TextAtom text={i.number} c={COLORS.gray2} f="Roboto" s={SIZES.base} w="500" />
                            </ViewAtom>         
                             </ViewAtom>
                         
                             </ViewAtom>           
                          
                        </TouchableOpacity>
                              )
                      })}
  </ViewAtom>




 
  </ScrollView>
  <Button text={"Continue"}width={"90%"}bg={COLORS.primary}  screen={ "" } onMethodSelected={()=>{navigation.replace( "PinScreen")}}borderRadius={10}s={SIZES.h5}pv={0}ph={0} tc={COLORS.white} />
      
      
  {/* {checking?             
  <ViewAtom  fd="column" jc="center" ai="center" w="100%" bg="transparent" pv={50} br={0} mv={5} mh={0}>
     
      <ActivityIndicator size="small" color={COLORS.amber} style={{marginBottom:20}} />
      <TextAtom text={"Checking your program timetable"} f="Poppins"s={SIZES.base} w={"500"} ta="left" ls={0}c={COLORS.gray2} />

  </ViewAtom>
  
  :
    <>
  <ViewAtom  fd="column" jc="center" ai="center" w="100%" bg="transparent" pv={5} br={0} mv={40} mh={0}>
     
  <TextAtom text={"Oops!"} f="Poppins"s={SIZES.h2} w={"500"} ta="left" ls={-2}c={COLORS.gray3} />
     
  <TextAtom text={"Looks like your program timetable is not updated yet "} f="Poppins"s={SIZES.h5} w={"500"} ta="center" ls={0}c={COLORS.gray2} />
</ViewAtom>
               
        <Button text={"Update now"}width={"90%"}bg={COLORS.amber} navigation={navigation} screen={"Timetable"} onMethodSelected={()=>{}}borderRadius={10}s={SIZES.h5}pv={0}ph={0} tc={COLORS.white} />
  <ViewAtom fw="wrap" fd="row" jc="center" ai="center" w="100%" bg="transparent" pv={5} br={0} mv={5} mh={0}>
     
     </ViewAtom>
        <Button text={"Update later"}width={"90%"}bg={COLORS.gray2} navigation={navigation} screen={"Home"} onMethodSelected={()=>{}}borderRadius={10}s={SIZES.h5}pv={0}ph={0} tc={COLORS.white} />
      
      </> }  */}
    </View>
  );
};

const styles = StyleSheet.create({
    Icon:{
        width:"15%",
        height: "15%",
        marginBottom:"-8%"
    },
  container: {
    flex:1,
    backgroundColor:COLORS.dark,
    height:SIZES.height,
    paddingVertical:30,
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

export default Walkthrough;

