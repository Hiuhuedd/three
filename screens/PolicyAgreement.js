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
import { BackHandler } from 'react-native';

const PolicyAgreement = ({navigation}) => {
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
<<<<<<< HEAD
  const showAlert = (type, title, msg) => {
    Toast.show({
      type: type,
      title: title,
      textBody: msg,
    });
  };
=======
>>>>>>> 609b2e1e1d7abf10666e93cdddd011cef40cd2f4
  return (
    <View style={styles.container}>
        
  <ViewAtom fw="wrap" fd="row" jc="center" ai="center" w="100%" bg="transparent" pv={5} br={0} mv={0} mh={0}>
     
</ViewAtom>
  {/* <TextAtom text={"360 student "} f="Poppins"s={SIZES.h1} w={"500"} ta="center" ls={-2}c={COLORS.white} /> */}
  <Image source={require('../assets/360png.png')}  style={styles.Icon} />

  <TextAtom text={"Agreement Policy"} f="Poppins"s={SIZES.h2} w={"500"} ta="center" ls={-2}c={COLORS.white} />
  <ScrollView style={{paddingHorizontal:10}} >
  <TextAtom text={"Welcome to 360 Student! Before you begin your academic and career journey with us, please read and agree to the following Usage Policy Agreement. This agreement outlines the terms and conditions that govern your use of the 360 Student application (the 'App') and ensures a safe, productive, and supportive environment for all users. By signing up and accessing our services, you acknowledge that you have read, understood, and agree to comply with this Usage Policy Agreement."} f="Poppins"s={SIZES.h6} w={"500"} ta="center" ls={0}c={COLORS.gray2} />
  <TextAtom text={"Purpose and Scope:"} f="Poppins"s={SIZES.h4} w={"500"} ta="left" ls={-1}c={COLORS.white} />
  <TextAtom text={"The 360 Student App is designed to assist university students in managing their academic courses, connecting with peers, accessing career guidance, and fostering collaboration for projects and group work. It is intended solely for educational and career-related purposes."} f="Poppins"s={SIZES.h6} w={"500"} ta="left" ls={0}c={COLORS.gray2} />
  <TextAtom text={"Account Responsibility:"} f="Poppins"s={SIZES.h4} w={"500"} ta="left" ls={-1}c={COLORS.white} />
  <TextAtom text={"You are solely responsible for maintaining the confidentiality of your account credentials (username and password). Any activity or action performed under your account is your responsibility."} f="Poppins"s={SIZES.h6} w={"500"} ta="left" ls={0}c={COLORS.gray2} />
  <TextAtom text={"Appropriate Usage:"} f="Poppins"s={SIZES.h4} w={"500"} ta="left" ls={-1}c={COLORS.white} />
  <TextAtom text={"You agree to use the 360 Student App solely for lawful and ethical purposes. Any misuse, abuse, or unauthorized access to the App's features and resources is strictly prohibited."} f="Poppins"s={SIZES.h6} w={"500"} ta="left" ls={0}c={COLORS.gray2} />
  <TextAtom text={"Respectful Conduct:"} f="Poppins"s={SIZES.h4} w={"500"} ta="left" ls={-1}c={COLORS.white} />
  <TextAtom text={"Respect the rights and privacy of other users. Engage in constructive and respectful communication when interacting with peers, mentors, and other members of the 360 Student community."} f="Poppins"s={SIZES.h6} w={"500"} ta="left" ls={0}c={COLORS.gray2} />
  <TextAtom text={"Prohibited Activities:"} f="Poppins"s={SIZES.h4} w={"500"} ta="left" ls={-1}c={COLORS.white} />
  <TextAtom text={"You shall not engage in activities that may harm the integrity, functionality, or security of the App or its users"} f="Poppins"s={SIZES.h6} w={"500"} ta="left" ls={0}c={COLORS.gray2} />
  <TextAtom text={"Data Privacy and Security:"} f="Poppins"s={SIZES.h4} w={"500"} ta="left" ls={-1}c={COLORS.white} />
  <TextAtom text={"Your privacy is essential to us. We collect, process, and store your personal data in accordance with our Privacy Policy. By agreeing to this Usage Policy Agreement, you consent to the collection and processing of your personal information as outlined in the Privacy Policy."} f="Poppins"s={SIZES.h6} w={"500"} ta="left" ls={0}c={COLORS.gray2} />
  <TextAtom text={"Reporting Misconduct:"} f="Poppins"s={SIZES.h4} w={"500"} ta="left" ls={-1}c={COLORS.white} />
  <TextAtom text={"If you encounter any user violating this Usage Policy Agreement or engaging in inappropriate behavior on the App, please report it immediately to our support team. We take such matters seriously and will take appropriate action to address violations."} f="Poppins"s={SIZES.h6} w={"500"} ta="left" ls={0}c={COLORS.gray2} />
  <TextAtom text={"App Updates and Changes:"} f="Poppins"s={SIZES.h4} w={"500"} ta="left" ls={-1}c={COLORS.white} />
  <TextAtom text={"360 Student may update or modify the App's features, functionalities, or policies from time to time. By continuing to use the App, you agree to accept these updates and changes."} f="Poppins"s={SIZES.h6} w={"500"} ta="left" ls={0}c={COLORS.gray2} />
  <TextAtom text={"Termination of Account:"} f="Poppins"s={SIZES.h4} w={"500"} ta="left" ls={-1}c={COLORS.white} />
  <TextAtom text={"360 Student reserves the right to suspend or terminate any account that violates this Usage Policy Agreement or engages in activities harmful to the App's community."} f="Poppins"s={SIZES.h6} w={"500"} ta="left" ls={0}c={COLORS.gray2} />
  <TextAtom text={"Governing Law:"} f="Poppins"s={SIZES.h4} w={"500"} ta="left" ls={-1}c={COLORS.white} />
  <TextAtom text={"This Usage Policy Agreement shall be governed by and construed in accordance with the laws of Kenya, without regard to its conflicts of law principles.."} f="Poppins"s={SIZES.h6} w={"500"} ta="left" ls={0}c={COLORS.gray2} />
 
  <ViewAtom fw="wrap" fd="row" jc="center" ai="center" w="100%" bg="transparent" pv={5} br={0} mv={0} mh={0}>
     
   <Checkbox.Android
        status={checked ? 'checked' : 'unchecked'}
        onPress={handleCheckboxToggle}
        color={checked ? COLORS.green : COLORS.chocolate}
      />
  <TextAtom text={"I Agree to Terms"} f="Poppins"s={SIZES.h6} w={"500"} ta="left" ls={0}c={COLORS.gray2} />
     </ViewAtom>



 
  </ScrollView>
<<<<<<< HEAD
  <Button text={"Continue"}width={"90%"}bg={checked ? COLORS.green : COLORS.gray2}  screen={''} onMethodSelected={()=>{navigation.replace(checked ? "Walkthrough" : "PolicyAgreement");  showAlert(ALERT_TYPE.WARNING, "", 'Accept terms to proceed!');}}borderRadius={10}s={SIZES.h5}pv={0}ph={0} tc={COLORS.white} />
=======
  <Button text={"Continue"}width={"90%"}bg={checked ? COLORS.green : COLORS.gray2}  screen={''} onMethodSelected={()=>{navigation.replace(checked ? "Walkthrough" : "PolicyAgreement")}}borderRadius={10}s={SIZES.h5}pv={0}ph={0} tc={COLORS.white} />
>>>>>>> 609b2e1e1d7abf10666e93cdddd011cef40cd2f4
      
      
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

export default PolicyAgreement;

