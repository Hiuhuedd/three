import React, { useState,useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList,ScrollView,BackHandler} from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import TextAtom from '../components/Atoms/TextAtom';
import { CheckBox, Divider, Icon } from 'react-native-elements';
import ViewAtom from '../components/Atoms/ViewAtom';
import { useDispatch, useSelector } from 'react-redux';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { Button } from '../components/Atoms/Button';
import { ActivityIndicator } from 'react-native-paper';
import LinearAtom from '../components/Atoms/LinearAtom';
import BottomTabs from '../components/Molecules/BottomTabs';
import { ProgramsArray } from '../constants/content/programs';
import { ImageBackground } from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import { getShade } from '../utils/colorShade';
import CardAtom from '../components/Atoms/CardAtom';

import V2Modal from '../components/Molecules/V2Modal';
import Modal from "react-native-modal";
import moment from 'moment';

import { getFirestore, collection, setDoc, doc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Events = ({navigation,route}) => {
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
    const { event } = route.params;

    const theme=useSelector(state => state.userReducer.theme);
    const user=useSelector(state => state.userReducer.user);
    const [Loading, setLoading] = React.useState(false);
    const [att, setatt] = React.useState(false);

// Function to check event attendance
const checkEventAttendance = async () => {
  try {
    // Retrieve attendance data from AsyncStorage
    const attendanceData = await AsyncStorage.getItem('attendanceData');

    if (attendanceData) {
      // Parse the attendance data into an array
      const parsedData = JSON.parse(attendanceData);

      // Check if the event is in the attendance data
      const eventExistsInAttendance = parsedData.some(
        (item) => item.event === event.id
      );

      // Update the 'att' state based on the result
      setatt(eventExistsInAttendance);
    }
  } catch (error) {
    console.error('Error checking event attendance:', error);
  }
};

useEffect(() => {
  // Call the function when the component mounts
  checkEventAttendance();

  // ... other useEffect code

}, []);

// ...

   useEffect(() => {
  console.log(event);
  }, []);
  const companies = [
    'kenyatta university .',
    '360 events .',
   
  ];
  const handleUpdateEvent=  async()=>{

    setLoading(true)
  
   // Update Firestore document
   try {
    const db = getFirestore();
    const collectionRef = collection(db, 'eAttendance'); // Collection reference
    const documentRef = doc(collectionRef, event.id); // Document reference

    const attendee={
      user:user.id,
      name:user.firstName,
      course:user.StudentProgram,
      phone:user.phone,
      event:event.id
    }

    // const usersCollection = collection(db, 'users'); // Replace 'users' with the name of your Firestore collection

    // Add the user data to Firestore using the set() function to ensure the data is stored with the predetermined user ID
    setDoc(documentRef, attendee)
    .then(() => {
      setatt(true);
      setLoading(false);
  
      // Retrieve existing attendance data from AsyncStorage
      AsyncStorage.getItem('attendanceData')
        .then((existingData) => {
          let parsedData = [];
          if (existingData) {
            parsedData = JSON.parse(existingData);
          }
  
          // Add the new attendance record to the array
          parsedData.push({
            user: user.id,
            name: user.firstName,
            course: user.StudentProgram,
            phone: user.phone,
            event: event.id,
          });
  
          // Store the updated attendance data back in AsyncStorage
          AsyncStorage.setItem('attendanceData', JSON.stringify(parsedData))
            .then(() => {
              console.log('Attendance data stored in AsyncStorage:', parsedData);
            })
            .catch((error) => {
              console.error('Error storing attendance data:', error);
            });
        })
        .catch((error) => {
          console.error('Error retrieving existing attendance data:', error);
        });
    })
  
   
  } catch (error) {
    setLoading(false)

    // Handle any errors that occur during the upload process
    console.error('Error uploading user data:', error);
  }
};

  return (
    <View style={styles.container}>
                
                 <LinearAtom    w="100%"  pv={0}  ph={0} bg={COLORS.white} br={0} mv={0} mh={0}   el={0} sh='#000' colors={[theme.color,COLORS.dark]} >
              
     <ImageBackground source={{ uri: event.img }} style={{width:SIZES.width,}}resizeMode='cover' >
     <ViewAtom  fd="column" jc="center"  w="100%" bg={getShade(theme.color,0.8)} pv={25} ph={20} br={0} mv={0} mh={0}>
     <ViewAtom fd="row" width="100%" ph={0} pv={10} jc="space-between" ai="center" >
        <Icon name={"arrow-back-outline"} type="ionicon" color={COLORS.white} size={SIZES.h2} onPress={() => {navigation.navigate('Home')}} />
      <ViewAtom fd="row"  ph={7} pv={5}  bg={att?theme.color:COLORS.white} br={15} >
       {att?          <TextAtom text={"Attending"} f="Poppins"s={SIZES.h5} w={"500"} ls={0}c={COLORS.white} />: <TouchableOpacity onPress={()=>{handleUpdateEvent()}}>
          <TextAtom text={"Attend"} f="Poppins"s={SIZES.h5} w={"500"} ls={0}c={theme.color} />
        </TouchableOpacity>}
      </ViewAtom>
</ViewAtom>
<TextAtom text={event.title} f="Poppins"s={SIZES.h1} w={"700"} ta="left" ls={-1}c={COLORS.white} />
     

     </ViewAtom>
     </ImageBackground>
     <ScrollView
        showsVerticalScrollIndicator={false}
       
      >
     <ViewAtom  fd="column" jc="center"  w="100%"  pv={20} ph={15} br={0} mv={0} mh={0}>
     <TextAtom text={'Event details'} f="Poppins"s={SIZES.h3} w={"500"} ta="left" ls={-1}c={COLORS.white} />
     <ViewAtom fd="column" jc="flex-start" ai="flex-start" bg="transparent" pv={0} ph={0} br={0} >
    
     <CardAtom  fd="row" jc="space-between" ai="center" bg={COLORS.black}  el={30} sh={COLORS.black}  br={15} pv={20} ph={20} mv={5} mh={0}>
     <Icon name={"calendar"} type="ionicon" color={COLORS.white} size={SIZES.h3} onPress={() => {navigation.navigate('Home')}} />
       
 
   <ViewAtom fd="column"  jc="center"  w="80%"   bg="transparent"  ph={0} br={0} mv={0} mh={20}>
   <ViewAtom fd="row" jc="space-between"  ai="center"  bg="transparent" pv={0} br={0} mv={0} mh={0}>

               <TextAtom text={moment( event.date,"DD MMMM YYYY").format("MMMM YYYY")} c={COLORS.white} f="Roboto" s={SIZES.h3} w="700" />
               <TextAtom text={moment( event.date,"DD MMMM YYYY").format("dddd")} c={COLORS.gray} f="Roboto" s={SIZES.h3} w="700" />
              
      </ViewAtom>         
   <ViewAtom fd="row" jc="space-between"  ai="center"  pv={0} br={0} mv={10} mh={0}>
               <TextAtom text={moment(event.date, "DD MMMM YYYY").format("Do")} c={COLORS.white} f="Roboto" s={SIZES.h3} w="700" />

               <TextAtom text={`Start 7:00am - End 6pm`} c={COLORS.gray4} f="Roboto" s={SIZES.h5} w="500" />
              
      </ViewAtom>         
      </ViewAtom>   
       
      {/* <ViewAtom fd="row"  ph={8} pv={8} bg={theme.color} br={3} mh={10} >
      </ViewAtom>       */}
       </CardAtom >
<ViewAtom fd="row"  w="100%"  jc="space-between" ph={15} pv={10}  ai="center" >
        <Icon name={"location"} type="ionicon" color={COLORS.white} size={SIZES.h3} onPress={() => {navigation.navigate('Home')}} />

        <TouchableOpacity onPress={()=>{}} style={{paddingHorizontal:20}}>
        <TextAtom text={`${event?.venue}, ${event?.location}`} f="Poppins"s={SIZES.h5} w={"500"} ta="left" ls={-.5}c={COLORS.white} />
        </TouchableOpacity>
        <Icon name={"chevron-forward-circle"} type="ionicon" color={COLORS.white} size={SIZES.h3} onPress={() => {navigation.navigate('navigation')}} />
</ViewAtom>
<ViewAtom fd="row"  w="100%"  jc="space-between"  ai="center" bg="transparent" pv={0} ph={15} br={0} mv={20} mh={0}>
   
       

<Icon name={"navigate"} type="ionicon" color={COLORS.white} size={SIZES.h3} onPress={() => {navigation.navigate('Home')}} />
   <ViewAtom fd="column" jc="flex-start" ai="flex-start"  bg="transparent" ph={20} br={0} mv={0} mh={0}>
 
               <TextAtom text={event?.location} c={COLORS.white} f="Roboto" s={SIZES.h5} w="500" />
               <TextAtom text={event?.inquiry?.email} c={COLORS.gray} f="Roboto" s={SIZES.base} w="500" />
              
      </ViewAtom>   
      <Icon name={"chevron-forward-circle"} type="ionicon" color={COLORS.white} size={SIZES.h3} onPress={() => {navigation.navigate('navigation')}} />      
       </ViewAtom>
       </ViewAtom>

<TextAtom text={"About this event"} f="Poppins"s={SIZES.h3} w={"500"} ta="left" ls={-1}c={COLORS.white} />
<ViewAtom fd="column"   ai="flex-start"jc="flex-start"  pv={0} br={0} mv={10} mh={15}>

<TextAtom text={'Theme  '} c={COLORS.gray} f="Roboto" s={SIZES.h5} w="500" />
<TextAtom text={`${event?.theme} `} c={COLORS.gray2} f="Roboto" s={SIZES.h5} w="500" />

</ViewAtom>  
<ViewAtom fd="column"   ai="flex-start"jc="flex-start"  pv={0} br={0} mv={10} mh={15}>

<TextAtom text={'Description '} c={COLORS.gray} f="Roboto" s={SIZES.h5} w="500" />
<TextAtom text={`${event?.description} `} c={COLORS.gray2} f="Roboto" s={SIZES.h5} w="500" />

</ViewAtom>  
<TextAtom text={"Sponsored by"} f="Poppins"s={SIZES.h3} w={"500"} ta="left" ls={-1}c={COLORS.white} />
<ViewAtom fd="column"   ai="flex-start"jc="flex-start"  pv={0} br={0} mv={10} mh={10}>
{companies?.length>1&&
<FlatList
      data={companies}
      keyExtractor={(item, index) => index.toString()}
      numColumns={3}
      renderItem={({ item }) => (
        <View style={styles.companyContainer}>
          <TextAtom text={item} f="Poppins"s={SIZES.h5} w={"500"} ta="left" ls={0}c={COLORS.white} />

        </View>
      )}
    />}
</ViewAtom>  
<TextAtom text={"Peers attending"} f="Poppins"s={SIZES.h3} w={"500"} ta="left" ls={-1}c={COLORS.white} />
<ViewAtom fd="row"   ai="flex-start"  pv={0} br={0} mv={10} mh={10}>
<Icon name={"people"} type="ionicon" color={COLORS.white} size={SIZES.h3} onPress={() => {navigation.navigate('Home')}} />{Loading?<ActivityIndicator size={10} color={COLORS.amber} />:

<TextAtom text={att?`   you and ${Math.floor(Math.random()*100)} others`:`   ${Math.floor(Math.random()*100)} students`} f="Poppins"s={SIZES.h4} w={"500"} ta="left" ls={-1}c={COLORS.white} />}

     </ViewAtom>
     </ViewAtom>
     </ScrollView>
     <Modal isVisible={false}>
        <ViewAtom fd="row" w='100%' jc="center" ai="center"  bg="transparent" pv={0} ph={10} br={0} mv={0} mh={0}>
           <V2Modal navigation={navigation} screen={"Home"} feature={'360 Events'} date={'9th September 2023.'} text='360 Events feature is scheduled for release on '/>
   
              
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
    width:SIZES.width
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
  companyContainer: {
    margin: 5,

  },
  companyName: {
    fontSize: 16,
    fontWeight: 'bold',
    color:COLORS.white
  },
 
});

export default Events;

