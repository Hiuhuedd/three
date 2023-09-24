import React, { useEffect, useRef, useState } from 'react';
<<<<<<< HEAD
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View,Animated } from 'react-native';
=======
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
>>>>>>> 609b2e1e1d7abf10666e93cdddd011cef40cd2f4
import Carousel from 'react-native-reanimated-carousel';

import { COLORS, SIZES } from '../constants/theme';
import TextAtom from '../components/Atoms/TextAtom';
import ViewAtom from '../components/Atoms/ViewAtom';
import { timetable, updateTimetableSlot } from '../utils/timetable';
import CardAtom from '../components/Atoms/CardAtom';
import { ScrollView } from 'react-native-gesture-handler';
import AddClass from '../components/Molecules/AddClass';
import { useDispatch, useSelector } from 'react-redux';
import BottomTabs from '../components/Molecules/BottomTabs';
import { getProgramByCode } from '../utils/helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearAtom from '../components/Atoms/LinearAtom';
import { BackHandler } from 'react-native';
<<<<<<< HEAD
import { getFirestore, collection, setDoc, doc,getDoc } from 'firebase/firestore';
import moment from 'moment';
import { Icon } from 'react-native-elements';
import BottomSheetTimetable from '../components/Molecules/BottomSheetTimetable';
import { UnitsArray } from '../constants/content/programs';

// import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';
=======

>>>>>>> 609b2e1e1d7abf10666e93cdddd011cef40cd2f4

const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  
  
  
  
<<<<<<< HEAD
  const DayView = React.memo(({ dayObj,updatedTimetable,handleUpdateTimetable,navigation,setAdding,seth,openSheetD}) => {
    const theme=useSelector(state => state.userReducer.theme);
    const user=useSelector(state => state.userReducer.user);

    const dispatch = useDispatch();

=======
  const DayView = React.memo(({ dayObj,updatedTimetable,handleUpdateTimetable,navigation,setAdding}) => {
    const theme=useSelector(state => state.userReducer.theme);
    const user=useSelector(state => state.userReducer.user);

>>>>>>> 609b2e1e1d7abf10666e93cdddd011cef40cd2f4
  //==============================BOTTOM SHEET============================
  const [TappedSlot,setTappedSlot]=useState({})
  const closeSheet = (t) => {
   if (sheetRef.current) {
       sheetRef.current.close();
     }
  
   };
<<<<<<< HEAD
   const openSheet = async() => {
     if (sheetRef.current) {
       sheetRef.current.open();
     }
     const units = await UnitsArray();
     if (units) {
       dispatch({ type: 'UNITS', payload: units });
     }
=======
   const openSheet = () => {
     if (sheetRef.current) {
       sheetRef.current.open();
     }
    
>>>>>>> 609b2e1e1d7abf10666e93cdddd011cef40cd2f4
   };
 
 const sheetRef = useRef(null);  
 
 const handleAddClass = () => {
  setAdding(false)

  setTimeout(() => {
    closeSheet()
  }, 1000);
}


 const handleTap = (slot,day) => {
  setAdding(true)
   if(slot.unitCode&&slot.unitName&&slot.professor){
<<<<<<< HEAD
navigation.navigate("UnitDetails",{slot:{...slot,day:updatedTimetable.indexOf(dayObj)},day:day,del:handleUpdateTimetable ,})
=======
navigation.navigate("UnitDetails",{slot:slot,day:day})
>>>>>>> 609b2e1e1d7abf10666e93cdddd011cef40cd2f4
    }else{
     setTappedSlot({...slot,day:updatedTimetable.indexOf(dayObj)})
     openSheet()
    }
    
   }

<<<<<<< HEAD
     
=======
>>>>>>> 609b2e1e1d7abf10666e93cdddd011cef40cd2f4

  return (
    <View style={{marginTop:0,}}>
    
<<<<<<< HEAD
                  <ViewAtom fd="row" jc="space-between" ai="center" w="100%" bg="transparent" pv={0} br={0} mv={0} mh={0}>
     <TextAtom text={`${dayObj.day}s`} c={COLORS.white} f="Poppins" s={SIZES.h1} w="500" ls={-2} />
     <TouchableOpacity onPress={()=>{  openSheetD()}} >
     <ViewAtom fd="row" jc="space-between" ai="center"  bg={theme.color} pv={3} ph={10} br={4} mv={0} mh={10}>
     <TextAtom text={`details`} c={COLORS.white} f="Poppins" s={SIZES.base} w="500" ls={0} />
     <Icon name={"caret-down-outline"} type="ionicon" color={COLORS.white} size={SIZES.h4} onPress={() => 
   openSheetD()} />

          </ViewAtom>
</TouchableOpacity>
          </ViewAtom>


     <TextAtom text={'Tap on empty slots to add classes.'} c={COLORS.gray2} f="Poppins" s={SIZES.base} w="500" ls={0} />

     <ScrollView style={{height:height-130,width:width-30}} showsVerticalScrollIndicator={false}  >
=======
                  {/* <ViewAtom fd="row" jc="space-between" ai="flex-start" w="100%" bg="transparent" pv={0} br={0} mv={0} mh={0}>
          </ViewAtom> */}


     <TextAtom text={`${dayObj.day}s`} c={COLORS.white} f="Poppins" s={SIZES.h1} w="500" ls={-2} />
     <TextAtom text={'Tap on empty slots to add classes.'} c={COLORS.gray2} f="Poppins" s={SIZES.base} w="500" ls={0} />

     <ScrollView style={{height:height-130}} showsVerticalScrollIndicator={false}  >
>>>>>>> 609b2e1e1d7abf10666e93cdddd011cef40cd2f4
      {dayObj.slots.map((slot) => (
<TouchableOpacity onPress={()=>{handleTap(slot,dayObj)}} >

        <React.Fragment key={slot.index}>
          <ViewAtom fd="row" jc="flex-start" ai="center"  bg="transparent" pv={5} br={0} mv={0} mh={0}>
          <ViewAtom  fd="column" jc="flex-start" ai="flex-start"  bg="transparent" pv={5} br={0} mv={0} mh={0}>
            <TextAtom text={`${slot.start}  `} c={COLORS.white} f="Roboto" s={SIZES.base} w="500" />
            <CardAtom fd="column" jc="center" ai="center" w={1}  pv={30} ph={0} bg={theme.name==="Dark"?COLORS.white:theme.color} br={3} mv={1} mh={1}   el={3} sh='#525252' >
          </CardAtom>
            <TextAtom text={`${slot.end}  `} c={COLORS.white} f="Roboto" s={SIZES.base} w="500" />
            
          </ViewAtom>
          <ViewAtom fd="row" jc="space-between" ai="center" w="90%" bg="transparent" pv={5} br={0} mv={0} mh={0}>

            <ViewAtom fd="column" jc="flex-start" ai="flex-start"  bg="transparent" pv={5} br={0} mv={0} mh={0}>
            <TextAtom text={slot.unitCode?slot.unitCode.toUpperCase():''} c={theme.color} f="Poppins" s={SIZES.h2} w="500" ls={-2}/>
            <TextAtom text={slot.unitName?slot.unitName:""} c={COLORS.gray2} f="Roboto" s={SIZES.base} w="500" />

          </ViewAtom>
            <ViewAtom fd="column" jc="center" ai="flex-end"  bg="transparent" pv={5} br={0} mv={0} mh={0}>

            <TextAtom text={slot.location?slot.location:""} c={COLORS.white} f="Roboto" s={SIZES.h5} w="500" />
            <TextAtom text={slot.professor?slot.professor:''} c={COLORS.gray2} f="Roboto" s={SIZES.base} w="500" />
            </ViewAtom>
          </ViewAtom>
          </ViewAtom>
       
        </React.Fragment>
</TouchableOpacity>
      ))}
     </ScrollView>
     <AddClass slot={TappedSlot} handleAddClass={handleAddClass} ref={sheetRef} handleUpdateTimetable={handleUpdateTimetable} />

    </View>
  );
});

function Timetable({ navigation }) {
<<<<<<< HEAD
  const user=useSelector(state => state.userReducer.user);
  const theme=useSelector(state => state.userReducer.theme);

=======
>>>>>>> 609b2e1e1d7abf10666e93cdddd011cef40cd2f4
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
  const dispatch = useDispatch();
<<<<<<< HEAD
  const handleUpdateTimetable=  async(sd,si,obj)=>{
  const timetableUpdate=  await updateTimetableSlot(sd,si,obj)

  if(timetableUpdate){
    const refNo=`${user.ProgramId}${user.Year}`
    try {
     const db = getFirestore();
     const collectionRef = collection(db, 'timetables'); // Collection reference
     const documentRef = doc(collectionRef, refNo); // Document reference
 
      const firstname=user.firstName
      const currentTime = moment().format('MMMM Do YYYY, h:mm A');
     await setDoc(documentRef, {timetableUpdate,firstname,currentTime,});
 
   
 
   } catch (error) {
 
     // Handle any errors that occur during the upload process
     console.error('Error uploading timetable', error);
   }
    //  if(obj.broadast){
    //     // Update Firestore document
    //  }
=======
  // const [Loaded, setLoaded] = React.useState(false);
  const handleUpdateTimetable=  async(sd,si,obj)=>{
  
   const timetableUpdate=  await updateTimetableSlot(sd,si,obj)
   if(timetableUpdate){
>>>>>>> 609b2e1e1d7abf10666e93cdddd011cef40cd2f4
     
     return  AsyncStorage.setItem('myTimetable', JSON.stringify(timetableUpdate)).then(()=>{
      setupdatedTimetable(timetableUpdate)
      dispatch({
        type: "MY_TIMETABLE",
        payload:timetableUpdate
      });
        return true
      })
     
 
    }else{
      return false
    }
    }
<<<<<<< HEAD
=======
    // const timetableUpdate=useSelector(state => state.userReducer.timetable);
>>>>>>> 609b2e1e1d7abf10666e93cdddd011cef40cd2f4

  const ref = useRef(null);
    const [activeIndex,setActiveIndex]=useState(0)
    const [updatedTimetable,setupdatedTimetable]=useState(timetable)
    const [Adding,setAdding]=useState(false)
<<<<<<< HEAD
    const [h,seth]=useState(0)
=======
>>>>>>> 609b2e1e1d7abf10666e93cdddd011cef40cd2f4


  useEffect(() => {
    ref.current?.scrollTo({ index: activeIndex });
  }, [activeIndex]);

  useEffect(() => {
  }, [updatedTimetable,Adding]);

<<<<<<< HEAD
  // useEffect(() => {
  //   openSheet()
  // }, []);

 


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
  const onMethodSelected = (method) => {
    closeSheet();
  };
  const sheetRef = useRef(null); 


  const tUpdate=useSelector(state => state.userReducer.timetableUpdate);

  console.log(updatedTimetable[0]);
  
=======
 
>>>>>>> 609b2e1e1d7abf10666e93cdddd011cef40cd2f4
  return (
    <View style={{backgroundColor:COLORS.dark2,flex:1, paddingTop: 0, padding: 0,height,}}>
           <LinearAtom  ai="center"  pv={35}  ph={0} bg={COLORS.white} br={0} mv={0} mh={0}   el={0} sh='#000' colors={[COLORS.dark,COLORS.dark]} >

<<<<<<< HEAD
           <ViewAtom  fd="row" jc="space-between" ai="flex-start"  bg="transparent" pv={5} br={0} mv={0} mh={0}>
           {updatedTimetable.map((day)=>{
            // console.log(day);
          if(updatedTimetable.indexOf(day)===activeIndex) { 
            return(

           <CardAtom fd="column" jc="center" ai="center" w={(width-30)/7}  pv={5} ph={5} bg={theme.name==="Dark"?COLORS.white:COLORS.white} br={3} mv={1} mh={1}   el={3} sh='#525252' >
            <TextAtom text={day.day.slice(0,3)} c={theme.color} f="Roboto" s={SIZES.base} w="500" />
          </CardAtom>
            )
          }else{
            return(
<TouchableOpacity onPress={()=>setActiveIndex(updatedTimetable.indexOf(day))}>

              <CardAtom fd="column" jc="center" ai="center"  w={(width-30)/7}  pv={5} ph={5} bg={theme.name==="Dark"?COLORS.white:theme.color} br={2} mv={1} mh={1}   el={3} sh='#525252' >
               <TextAtom text={day.day.slice(0,3)} c={COLORS.white} f="Roboto" s={SIZES.base} w="500" />
             </CardAtom>
</TouchableOpacity>
               )
            }
           }) 
          }
            
          </ViewAtom>
=======

>>>>>>> 609b2e1e1d7abf10666e93cdddd011cef40cd2f4
      <Carousel
        ref={ref}
        loop={true}
        width={width-10}
        height={height}
        autoPlay={false}
        data={updatedTimetable}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => {
          setActiveIndex(index);
        }}
<<<<<<< HEAD
        renderItem={({ item: dayObj }) => <DayView dayObj={dayObj} seth={seth} setAdding={setAdding} updatedTimetable={updatedTimetable} handleUpdateTimetable={handleUpdateTimetable} navigation={navigation} openSheetD={openSheet} />}
      />
      <BottomSheetTimetable onMethodSelected={onMethodSelected} navigation={navigation} ref={sheetRef} tData={tUpdate} />
           </LinearAtom>

<BottomTabs navigation={navigation}  />
=======
        renderItem={({ item: dayObj }) => <DayView dayObj={dayObj} setAdding={setAdding} updatedTimetable={updatedTimetable} handleUpdateTimetable={handleUpdateTimetable} navigation={navigation} />}
      />
           </LinearAtom>

<BottomTabs navigation={navigation} />
>>>>>>> 609b2e1e1d7abf10666e93cdddd011cef40cd2f4
    </View>
  );
}

export default Timetable;

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.gray2,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '90%',
    color: '#fff',
  },
});