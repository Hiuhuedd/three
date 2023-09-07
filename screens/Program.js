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
import { ProgramsArray } from '../constants/content/programs';
import Carousel from 'react-native-reanimated-carousel';
import { useRef } from 'react';
import { BackHandler } from 'react-native';
import Discord from './Discord';
import Resources from '../components/Molecules/Resources';
import { ScrollView } from 'react-native';

import V2Modal from '../components/Molecules/V2Modal';
import Modal from "react-native-modal";
const Program = ({navigation}) => {
           //=================backpress====================
const handleBackPress = () => {
  navigation.navigate("Home")
    return true;
  };
  
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);
  //=================backpress====================
  const programItems=[ <Resources navigation={navigation}/>  , <Discord navigation={navigation} />]
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
    // const ProgramView=({item, navigation})=>{
    //   return(
    //     <View style={{ flex: 1,}}>

    //     {/* <TextAtom text={item} f="Poppins"s={SIZES.h1} w={"500"} ta="left" ls={-2}c={COLORS.white} /> */}
    //     {/* <TextAtom text={program.programName} f="Poppins"s={SIZES.h3} w={"500"} ta="left" ls={-2}c={COLORS.white} /> */}
    //     </View>

    //   )
    // }
    const ref = useRef(null);
    const [activeIndex,setActiveIndex]=useState(0)
    useEffect(() => {
      ref.current?.scrollTo({ index: activeIndex });
    }, [activeIndex]);
  return (
    <View style={styles.container}>
                 <LinearAtom   pv={5}  ph={0} bg={COLORS.white} br={0} mv={0} mh={0}   el={0} sh='#000' colors={[theme.color,COLORS.dark]} >
            
             



          <ScrollView contentContainerStyle={styles.scrollViewContent}>
  
      <Resources navigation={navigation}/> 
  </ScrollView>
  <Modal isVisible={true}>
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

export default Program;


