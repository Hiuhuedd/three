

import React, { useState,useEffect,useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet,Image , ScrollView,  SafeAreaView,  Animated,  TextInput, BackHandler,} from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import TextAtom from '../components/Atoms/TextAtom';
import { CheckBox, Divider, Icon } from 'react-native-elements';
import ViewAtom from '../components/Atoms/ViewAtom';
import { useDispatch, useSelector } from 'react-redux';
import BottomTabs from '../components/Molecules/BottomTabs';
import LinearAtom from '../components/Atoms/LinearAtom';
import Upcoming from '../components/Molecules/Upcoming';
import { getTimeSpans } from '../utils/timeFunction';
import moment from 'moment';
import ProgressMic from '../components/Molecules/ProgressMic';
import CardAtom from '../components/Atoms/CardAtom';
import { greet } from '../utils/helper';
import Settings from '../components/Molecules/settings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomSheetMe from '../components/Molecules/BottomSheetMe';


const AnimatedCard = Animated.createAnimatedComponent(View);
const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedTO = Animated.createAnimatedComponent(TouchableOpacity );


const Me = ({navigation}) => {
  const handleLogOut = () => {
    // alert("here")
    navigation.navigate("AuthScreen")
    useDispatch({
      type: "ON_USER",
      payload: null
    });

    AsyncStorage.setItem('Student', null).then(res => {
      
    });
   };
   
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
  const user=useSelector(state => state.userReducer.user);
  const theme=useSelector(state => state.userReducer.theme);
  //==============SCROLL ANIMATION===========
  const animatedValue = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const lastOffsetY = useRef(0);
  const scrollDirection = useRef('');

  const cardContainerAnimation = {
   marginTop: animatedValue.interpolate({
      inputRange: [0, 100],
      outputRange: [130, 130],
      extrapolate: 'clamp',
    }),
  };
  const featureNameAnimation = {

  //  opacity: animatedValue.interpolate({
  //     inputRange: [0, 100],
  //     outputRange: [1, 0],
  //     extrapolate: 'clamp',
  //   }),
   height: animatedValue.interpolate({
      inputRange: [0, 100],
      outputRange: [100, 120],
      extrapolate: 'clamp',
    }),
   borderRadius: animatedValue.interpolate({
      inputRange: [0, 100],
      outputRange: [5, 0],
      extrapolate: 'clamp',
    }),

    left: animatedValue.interpolate({
      inputRange: [0, 100],
      outputRange: [10, 0],
      extrapolate: 'clamp',
    }),
    right: animatedValue.interpolate({
      inputRange: [0, 100],
      outputRange: [10, 0],
      extrapolate: 'clamp',
    }),
    top: animatedValue.interpolate({
      inputRange: [0, 100],
      outputRange: [25, 0],
      extrapolate: 'clamp',
    }),
    // backgroundColor: animatedValue.interpolate({
    //   inputRange: [0, 100],
    //   outputRange: [COLORS.dark2, theme],
    //   extrapolate: 'clamp',
    // }),
  };
  const featureIconAnimation = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 15],
      outputRange: [1,1],
      extrapolate: 'clamp',
    }),
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 20],
          outputRange: [0, 0],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  const aiAnimation3 = {
    opacity: animatedValue.interpolate({
       inputRange: [0, 25],
       outputRange: [0,0],
       extrapolate: 'clamp',
     }),
     transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 20],
          outputRange: [10, 10],
          extrapolate: 'clamp',
        }),
      },
      {
        translateX: animatedValue.interpolate({
          inputRange: [0, 25],
          outputRange: [-SIZES.width+50, -SIZES.width+50],
          extrapolate: 'clamp',
        }),
      },
    ],
 
   };
  
  //==============SCROLL ANIMATION===========

  //==============================BOTTOM SHEET============================
  const closeSheet = (t) => {


    if (sheetRef.current) {
      sheetRef.current.close();
    }
  };
  const openSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.open();
    }
  
};
const onMethodSelected = (f) => {
  if(f===""){
    openSheet();
  }else{
    navigation.navigate(f)
  }
};
const sheetRef = useRef(null); 
  return (
    <View style={styles.container}>
<LinearAtom  ai="center"  pv={10}  ph={0} bg={COLORS.white} br={0} mv={0} mh={0}   el={0} sh='#000' colors={[theme.color,COLORS.dark]} >
      
                <AnimatedCard 
                    style={[{
                      position:"absolute", 
                                          
                    display:"flex",
                    flexDirection:"row",
                    justifyContent: "space-between",
                    paddingVertical:10,
                    paddingHorizontal:10,
                    paddingLeft:20,
                    zIndex:4,
                   backgroundColor:COLORS.black,
                     elevation:3,
                    shadowColor:'#525252'
                    },featureNameAnimation]}>
                <ViewAtom fd="column" jc="flex-start" ai="flex-start"  w={"100%"} pv={0} br={0} mv={0} mh={0}>
              
                <ViewAtom  fd="column" jc="flex-start" ai="flex-start" w="100%" bg="transparent" pv={5} br={0} mv={0} mh={0}>


                <AnimatedCard style={[{               
                    },featureIconAnimation]}> 
   <ViewAtom  fd="row" jc="space-between" w={"100%"} ai="flex-start"  bg="transparent" pv={5} br={0} mv={0} mh={0}>
             

     
         <ViewAtom  fd="column" jc="flex-start" ai="center"  bg="transparent" pv={5} br={0} mv={0} mh={0}>
         {user.profile?  
 <Image source={{uri:user.profile}} style={[styles.Icon]} />
:
 <Image source={require('../assets/usericon.jpg')} style={[styles.Icon]} />
 }           
             
          </ViewAtom>
         <ViewAtom  fd="column" jc="flex-start" ai="flex-end"  bg="transparent" pv={0} br={0} mv={0} mh={0}>
          <TextAtom text={greet()} f="Poppins"s={SIZES.h2} w={"500"}  ls={-2}c={COLORS.gray2} />
          <TextAtom text={`${user.firstName} `} f="Poppins"s={SIZES.h5} w={"500"}  c={COLORS.gray2} />

               <TextAtom text={`${user.StudentProgram} `} f="Poppins"s={SIZES.base} w={"500"}  c={COLORS.gray2} />
             
          </ViewAtom>
             </ViewAtom>
         
          </AnimatedCard>
     
        </ViewAtom>
     
            </ViewAtom>  
            <AnimatedCard style={[{               
            },aiAnimation3 ]}>
               <ViewAtom  fd="row" jc="space-between" ai="center"  bg="transparent" pv={5} br={0} mv={0} mh={0}>
{user.profile?  
 <Image source={{uri:user.profile}} style={[styles.Icon]} />
:
 <Image source={require('../assets/usericon.jpg')} style={[styles.Icon]} />
 }
              <ViewAtom  fd="column" jc="space-between" ai="flex-start" w="70%" bg="transparent" pv={1} br={0} mv={0} mh={0}>
              <TextAtom text={`${user.firstName} ${user.lastName}`} f="Poppins"s={SIZES.h3} w={"500"}  ls={-1}c={COLORS.gray2} />
              <ViewAtom  fd="row" jc="space-between" ai="center" w="100%" bg="transparent" pv={1} br={0} mv={0} mh={0}>
              <ViewAtom  fd="column" jc="center" ai="center" bg="transparent" pv={5} br={0} mv={0} mh={0}>
              <TextAtom text={`${user.Year}`} f="Poppins"s={SIZES.base} w={"500"}  c={COLORS.gray2} />
              <TextAtom text={`year`} f="Poppins"s={SIZES.h3} w={"500"}  ls={-1}c={COLORS.gray2} />
              </ViewAtom>
              <ViewAtom  fd="column" jc="center" ai="center" bg="transparent" pv={5} br={0} mv={0} mh={0}>
              <TextAtom text={`${user.Sem}`} f="Poppins"s={SIZES.base} w={"500"}  c={COLORS.gray2} />
              <TextAtom text={`Semester`} f="Poppins"s={SIZES.h3} w={"500"}  ls={-1}c={COLORS.gray2} />
              </ViewAtom>
              <ViewAtom  fd="column" jc="center" ai="center" bg="transparent" pv={5} br={0} mv={0} mh={0}>
              <TextAtom text={`${user.ProgramId}`} f="Poppins"s={SIZES.base} w={"500"}  c={COLORS.gray2} />
              <TextAtom text={`program`} f="Poppins"s={SIZES.h3} w={"500"}  ls={-1}c={COLORS.gray2} />
              </ViewAtom>
            
     
               </ViewAtom>
               </ViewAtom>
          </ViewAtom>

             </AnimatedCard>
         

            </AnimatedCard>
            <AnimatedCard style={[{display:"flex",zIndex:0
                    },cardContainerAnimation]}>
          </AnimatedCard >
  
    
<ScrollView
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}
        onScroll={(e) => {
          const offsetY = e.nativeEvent.contentOffset.y;
          scrollDirection.current =
            offsetY - lastOffsetY.current > 0 ? 'down' : 'up';
          lastOffsetY.current = offsetY;
          animatedValue.setValue(offsetY);
        }}
    
        scrollEventThrottle={0}
        style={{zIndex:1}}
      >
    
    <ViewAtom fd="column" jc="flex-start" ai="flex-start"  bg="transparent" pv={0} br={0}ph={15} mv={0} mh={0}>
    <TextAtom text={`Utilities &  Preferences`} c={COLORS.gray4} f="Roboto" s={SIZES.h3} w="500"  ls={-1}/>
  </ViewAtom>



<ViewAtom   bg="transparent" pv={0} br={0} mv={0} mh={5}>
   <Settings navigation={navigation} handleAction={onMethodSelected} />
   {/* <Settings navigation={navigation} /> */}



</ViewAtom>

 </ScrollView>
 <BottomSheetMe onMethodSelected={closeSheet} navigation={navigation} ref={sheetRef} tData={{}} />



</LinearAtom>
  <BottomTabs navigation={navigation} theme={theme} />
  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:COLORS.dark,
    height:SIZES.height,
    paddingTop:0,
    padding:0,
    // width:SIZES.width
    // alignItems:"center"
  },
  Icon: {
    width: 65,
    height:65,
    borderRadius: 50,
    marginTop:-5,
    marginBottom:5
  },

 
});

export default Me;


