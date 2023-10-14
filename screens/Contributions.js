import React, { useState,useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import TextAtom from '../components/Atoms/TextAtom';
import { CheckBox, Divider, Icon } from 'react-native-elements';
import ViewAtom from '../components/Atoms/ViewAtom';
import { useSelector } from 'react-redux';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { Button } from '../components/Atoms/Button';
import { ActivityIndicator } from 'react-native-paper';
import LinearAtom from '../components/Atoms/LinearAtom';
import BottomTabs from '../components/Molecules/BottomTabs';
import { BackHandler } from 'react-native';
import { ScrollView } from 'react-native';

import V2Modal from '../components/Molecules/V2Modal';
import Modal from "react-native-modal";
import Contribute from '../components/Molecules/ContributeR';  
const Contributions = ({navigation}) => {
           //=================backpress====================
const handleBackPress = () => {
  navigation.navigate("Program")
    return true;
  };
  
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);
  //=================backpress====================
  const [program,setProgramName]=useState("")

    const theme=useSelector(state => state.userReducer.theme);
    const user=useSelector(state => state.userReducer.user);
   const [checking,setchecking]=useState(true)
   useEffect(() => {
    setProgramName(user.StudentProgram)
    setTimeout(() => {
    setchecking(false)
  }, 5000);
  }, []);
 
 
  return (
    <View style={styles.container}>
                 <LinearAtom   pv={5}  ph={5} bg={COLORS.white} br={0} mv={0} mh={0}   el={0} sh='#000' colors={[theme.color,COLORS.dark]} >
            
                 <ViewAtom fd="row" width="100%" ph={10} pv={10} mv={20} jc="space-between" >
        <Icon name={"arrow-back-outline"} type="ionicon" color={COLORS.white} size={SIZES.h2} onPress={() => navigation.goBack()} />
      <ViewAtom fd="row"  ph={7} pv={5} bg={theme.color} br={15} >
        <TouchableOpacity onPress={()=>{}}>
          <TextAtom text={" LETS' REBUILD CAMPUS TOGETHER  "} f="Poppins"s={SIZES.h5} w={"500"} ls={0}c={COLORS.white} />
        </TouchableOpacity>
      </ViewAtom>
      </ViewAtom>



          <ScrollView contentContainerStyle={styles.scrollViewContent}>
  <Contribute navigation={navigation}/>   

        <ViewAtom fd="row" w='100%' jc="center" ai="center"  bg="transparent" pv={20} ph={10} br={0} mv={40} mh={0}>
         
         </ViewAtom>
  </ScrollView>
  <Modal isVisible={false}>
        <ViewAtom fd="row" w='100%' jc="center" ai="center"  bg="transparent" pv={0} ph={10} br={0} mv={0} mh={0}>
           <V2Modal navigation={navigation} screen={"Home"} feature={'360 Program resources'} date={'9th September 2023.'} text='360 Program resources feature is scheduled for release on '/>
   
              
         </ViewAtom>
      </Modal>
        </LinearAtom>  
            
  <BottomTabs navigation={navigation} theme={COLORS.primary} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:COLORS.dark,
    height:SIZES.height,
    paddingTop:0,
  },
  scrollViewContent: {
    flexGrow: 1,
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

export default Contributions;


