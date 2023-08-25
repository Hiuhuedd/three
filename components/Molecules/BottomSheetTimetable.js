import React ,{useState,useEffect}from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, Platform,TextInput, } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Axios from 'axios';
import { Button } from '../Atoms/Button';
import Feather from 'react-native-vector-icons/Feather';
import appTheme from '../../constants/theme';
import ViewAtom from '../Atoms/ViewAtom';
import TextAtom from '../Atoms/TextAtom';
import CardAtom from '../Atoms/CardAtom';
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
const {COLORS, SIZES, FONTS}=appTheme
const BottomSheetTimetable = React.forwardRef(({onMethodSelected,navigation,tData}, ref) => {
  const user=useSelector(state => state.userReducer.user);


  return (
    <RBSheet
      ref={ref}
      height={400}
      openDuration={250}
      dragFromTopOnly  
      closeOnDragDown
      customStyles={{
        container: {
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          alignItems:"center",
          backgroundColor:COLORS.white
         
        },
      }}
      >
          <View style={styles.bottomCardm}>
           
     <ScrollView contentContainerStyle={styles.scrollViewContent}>
       <View style={{position:"relative"}} >
      <CardAtom  ai="center" w="100%" pv={10} ph={10} bg={COLORS.white} br={5} mv={0} mh={0}
         el={3} sh='#525252' >
      {/* <View style={{position:"absolute",top:0,right:5}} >
      <Icon name={"close-outline"} type="ionicon" color={COLORS.rose} size={SIZES.h1} onPress={() => 
    setVisible(false)} />
      </View> */}
         <ViewAtom fd="column" jc="center" ai="center" w="100%" pv={0} ph={5} bg="transparent" br={0} mv={10} mh={0}>
         <TextAtom text={"Smart timetable "} f="Poppins"s={SIZES.h3} w={"500"} ta="left" ls={-1}c={COLORS.black} />

         <ViewAtom fd="row" jc="space-between" ai="center" w="100%" pv={0} ph={5} bg="transparent" br={0} mv={5} mh={0}>
         {/* <TextAtom text="" c={COLORS.black} f="Poppins" s={SIZES.h5} w="500"/> */}
         <TextAtom text={user.StudentProgram} c={COLORS.black} f="Poppins" ta="center" s={SIZES.h5} w="500"/>
   
        </ViewAtom>    
         <ViewAtom fd="row" jc="space-between" ai="center" w="100%" pv={0} ph={5} bg="transparent" br={0} mv={5} mh={0}>
         <TextAtom text="Year" c={COLORS.gray2} f="Poppins" s={SIZES.h5} w="500"/>
         <TextAtom text={user.Year} c={COLORS.black} f="Poppins" s={SIZES.h5} w="500"/>
   
        </ViewAtom>    
         <ViewAtom fd="row" jc="space-between" ai="center" w="100%" pv={0} ph={5} bg="transparent" br={0} mv={5} mh={0}>
         <TextAtom text="Semester" c={COLORS.gray2} f="Poppins" s={SIZES.h5} w="500"/>
         <TextAtom text={user.Sem} c={COLORS.black} f="Poppins" s={SIZES.h5} w="500"/>
   
        </ViewAtom>    
         <ViewAtom fd="row" jc="space-between" ai="center" w="100%" pv={0} ph={5} bg="transparent" br={0} mv={5} mh={0}>
         <TextAtom text="Last updated" c={COLORS.gray2} f="Poppins" s={SIZES.h5} w="500"/>
         <TextAtom text={tData?.currentTime} c={COLORS.black} f="Poppins" s={SIZES.h5} w="500"/>
   
        </ViewAtom>    
         <ViewAtom fd="row" jc="space-between" ai="center" w="100%" pv={0} ph={5} bg="transparent" br={0} mv={5} mh={0}>
         <TextAtom text="Last updated by" c={COLORS.gray2} f="Poppins" s={SIZES.h5} w="500"/>
         <TextAtom text={tData?.firstname} c={COLORS.black} f="Poppins" s={SIZES.h5} w="500"/>
   
        </ViewAtom>    
         
        

  <TextAtom text={"About"} f="Poppins"s={SIZES.h3} w={"500"} ta="center" ls={-2}c={COLORS.black} />
  <TextAtom text={"360 student smart timetable  "} f="Poppins"s={SIZES.base} w={"500"} ta="center" ls={0}c={COLORS.black} />
  <TextAtom text={"360 offer you a platform to schedule your day,week and semester while harmonizing with your program timetable so that you can focus on what matters  "} f="Poppins"s={SIZES.base} w={"500"} ta="center"  ls={0}c={COLORS.black}  />
  <TextAtom text={"Receive notifications on due classes/schedules on your timetable so that you never miss out.  "} f="Poppins"s={SIZES.base} w={"500"} ta="center" ls={0}c={COLORS.black} />
  <TextAtom text={"Swipe left< or right> to switch between week-days "} f="Poppins1"s={SIZES.base} w={"500"} ta="center"  ls={0}c={COLORS.black} />
  <TextAtom text={"Tap on empty slots to add a class/schedule "} f="Poppins1"s={SIZES.base} w={"500"} ta="center" ls={0}c={COLORS.black} />
  <TextAtom text={"Tap on scheduled slots to learn more "} f="Poppins1"s={SIZES.base} w={"500"} ta="center" ls={0}c={COLORS.black} />
  <ViewAtom  fd="row" jc="space-between" ai="center" w="100%" bg="transparent" pv={5} br={0} mv={10} mh={0}>
  <TextAtom text={'v-1.1.02'} f="Poppins"s={SIZES.base} w={"500"} ta="center" ls={0}c={COLORS.gray2} />


        </ViewAtom> 
        </ViewAtom> 
         </CardAtom>
      </View>
      </ScrollView>         
    
              
            </View>
    </RBSheet>
  );
});
const styles =StyleSheet.create({
    pickerOption: {
      alignItems: 'center',
      alignContent:"center",
      display:"flex",
      width:'100%',
      flexDirection:"row",
      justifyContent: 'space-evenly',  
      borderRadius:5,
      alignSelf: 'center',
      textAlign:"center",
      paddingHorizontal:15,
      paddingVertical:10
    },
Option: {
      alignItems: 'center',
      alignContent:"center",
      display:"flex",
      flexDirection:"column",
      justifyContent: 'center',  
    },
    bottomCard: {
        width:" 100%",
        paddingHorizontal: 30,
        // alignItems:"center"
       
    },
    circleBg: {
      alignItems: 'center',
      alignContent:"center",
      display:"flex",
      justifyContent: 'center',  
      backgroundColor:COLORS.white,
      borderRadius:50,
      padding:15
     
    },
  
    scrollViewContent: {
      flexGrow: 1, // Allow the content to grow to fill the ScrollView
      // alignItems: 'center', // Center items vertically
      justifyContent: 'center', // Center items horizontally
    },
    text: {
      fontSize: SIZES.h2,
      fontWeight:"600",
      color:COLORS.primary,
    },
    text_: {
    fontSize: SIZES.body5,
      color:COLORS.primary,
      marginBottom:10,
    
    },
    text__: {
      fontSize: SIZES.body5,
      color:COLORS.gray2,
      marginBottom:10,
      textTransform:"capitalize"
    },
   
     
     userImg: {
      height: 50,
      width: 50,
      borderRadius: 50,
      backgroundColor:COLORS.white
    },
  });
export default BottomSheetTimetable;