import * as Updates from 'expo-updates'; 
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, View, StyleSheet,Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { getUserLocation } from '../utils/helper';
import { UnitsArray, getTimetableFromFirestore } from '../constants/content/programs';
import { NetworksArray } from '../constants/content/networksArr';
import Modal from 'react-native-modal';
import ViewAtom from '../components/Atoms/ViewAtom';
import V2Modal from '../components/Molecules/V2Modal';
import TextAtom from '../components/Atoms/TextAtom';
import { COLORS, SIZES } from '../constants/theme';

function IntroScreen({ navigation }) {

  
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    async function checkForUpdate() {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        setUpdateAvailable(true);
      }
    }

    checkForUpdate();
  }, []);

  const [isvisible, setisvisible] = useState(false);
  const [isfinished, setisfinished] = useState(false);
  const handleUpdate = async () => {
    setisvisible(true)
    try {
     const finished= await Updates.fetchUpdateAsync();
        if (finished) {
          setisfinished(true)
        }
      // After fetching the update, you can display a message and prompt the user to reload the app.
    } catch (error) {
      console.error('Error fetching update:', error);
    }
  };

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const userValue = await AsyncStorage.getItem('Student');
      if (userValue !== null) {
        const userData = JSON.parse(userValue);
        dispatch({ type: 'ON_USER', payload: userData });

        const discordValue = await AsyncStorage.getItem('Discord');
        if (discordValue !== null) {
          const discordData = JSON.parse(discordValue);
          dispatch({ type: 'DISCORD', payload: discordData });
        }
        const TValue = await AsyncStorage.getItem('theme');
        if (TValue !== null) {
          const discordData = JSON.parse(TValue);
          dispatch({ type: 'MY_THEME', payload: discordData });
        }

        const units = await UnitsArray();
        if (units) {
          dispatch({ type: 'UNITS', payload: units });
        }
        const net = await NetworksArray();
        if (net) {
        
          const str=JSON.stringify(net)
          dispatch({ type: 'NETWORKS', payload: net });
          await AsyncStorage.setItem('mynetworks',str)
        }

        const timetableValue = await getTimetableFromFirestore(userData);
        if (timetableValue) {
          const { timetableUpdate, ...fullTimetable } = timetableValue;
          dispatch({ type: 'MY_TIMETABLE', payload: timetableUpdate });
          dispatch({ type: 'MY_TIMETABLE_UPD', payload: timetableValue });
      await AsyncStorage.setItem('myTimetable',JSON.stringify(timetableUpdate)).then(()=>{
        // navigation.navigate('PinScreen');
        navigation.navigate('PinScreen');
        setLoading(false);
        
      })
      
    } else {
      const cachedTimetableValue = await AsyncStorage.getItem('myTimetable');
      if (cachedTimetableValue !== null) {
        dispatch({ type: 'MY_TIMETABLE', payload: JSON.parse(cachedTimetableValue) });
        // navigation.navigate('PinScreen');
        navigation.navigate('FeedBack');
      }else{
        navigation.navigate('PinScreen');
            // navigation.navigate('PinScreen');

          }
        }
      } else {
        navigation.replace('AuthScreen');
      }

    };

    getUserLocation().then((res) => {
      if (res) {
        dispatch({
          type: 'ON_UPDATE_LOCATION',
          payload: { location: res.item, coords: res.coords },
        });
      }
    });

    fetchUserData();
  }, [dispatch, navigation]);



  
  return (
    <View style={styles.screen}>
      <Image source={require('../assets/360intro.gif')} style={styles.icon} />
      {loading ? <ActivityIndicator size="small" color="#fff" /> : null}
            {updateAvailable&& Alert.alert(
          '360 student updates',
          "There's a new feature update" ,
          [
            { text: 'Cancel', onPress: () => {}, style: 'cancel' },
            { text: 'Update', onPress: () =>  handleUpdate()},
          ],
          { cancelable: false }
        )}
           <Modal isVisible={isvisible}>
        <ViewAtom fd="row" w='100%' jc="center" ai="center"  bg={isfinished ?COLORS.green:COLORS.chocolate} pv={20} ph={10} br={0} mv={0} mh={0}>
   
        {!isfinished ? 
        <ViewAtom fd="column" w='100%' jc="center" ai="center"  pv={0} ph={0} br={0} mv={0} mh={0}>
          <TextAtom text={"Fetching updates"} f="Poppins"s={SIZES.base} w={"500"}  ls={0}c={COLORS.white} />
          <ActivityIndicator size={SIZES.h5} color={COLORS.white} /> 
         </ViewAtom> 
        :  
        <ViewAtom fd="column" w='100%' jc="center" ai="center"  pv={0} ph={0} br={0} mv={0} mh={0}>

           <TextAtom text={"Update successful"} f="Poppins"s={SIZES.h6} w={"500"}  ls={0}c={COLORS.white} />
          <TextAtom text={"Please reload app to effect updates"} f="Poppins"s={SIZES.base} w={"500"}  ls={0}c={COLORS.white} />
         </ViewAtom> 
}

         </ViewAtom> 
      </Modal>
     
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: '35%',
    height: '18%',
    marginBottom: '5%',
  },
  screen: {
    backgroundColor: '#000',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default IntroScreen;





