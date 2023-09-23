<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { getUserLocation } from '../utils/helper';
import { UnitsArray, getTimetableFromFirestore } from '../constants/content/programs';
import { NetworksArray } from '../constants/content/networksArr';

function IntroScreen({ navigation }) {
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
        navigation.navigate('PinScreen');
        setLoading(false);

      })
     
        } else {
          const cachedTimetableValue = await AsyncStorage.getItem('myTimetable');
          if (cachedTimetableValue !== null) {
            dispatch({ type: 'MY_TIMETABLE', payload: JSON.parse(cachedTimetableValue) });
            navigation.navigate('PinScreen');
          }else{
            navigation.navigate('PinScreen');

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
=======
import { ActivityIndicator, Image, View ,StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { promptFunction } from '../utils/360ai';
import { getTimeSpans } from '../utils/timeFunction';
import { getUserLocation } from '../utils/helper';


function IntroScreen({navigation}) {
  const dispatch = useDispatch();

  const [loader, setloader] = useState(false)
  useEffect(() => {
    getUserLocation().then((res)=>{
        if(res){
         console.log(res);
          dispatch({
            type: "ON_UPDATE_LOCATION",
            payload: {
                location: res.item,
                coords:res.coords,
            },
          });
          }});
  }, []);
  useEffect(() => {
    getTimeSpans();
    setTimeout(() => {
      setloader(true)
     }, 2000);
    
    AsyncStorage.getItem('Student').then(value => {
            if (value !== null) {
              dispatch({
                type: "ON_USER",      
                payload:JSON.parse(value)
              });
              AsyncStorage.getItem('myTimetable').then(value => {

                if (value !== null) {
                  dispatch({
                    type: "MY_TIMETABLE",
                    payload:JSON.parse(value)
                  });
            
                }
                setTimeout(() =>{
                    navigation.navigate('PinScreen')
                    // navigation.navigate('AuthScreen')
                }, 3000)    
              })

            }else{
              setTimeout(() =>{
                  navigation.replace('AuthScreen')
              }, 6000)
              
            }
          });
    }, [])
  
      return (
        <View  style={styles.screen}>
             <Image source={require('../assets/360intro.gif')}  style={styles.Icon} />
            { loader? 
              <ActivityIndicator size="small" color="#fff" />
                    :<></>
                    }
        </View>
    
      );
    }
  
  export default IntroScreen;
  const styles = StyleSheet.create({
      Icon:{
        width:"35%",
        height: "18%",
        marginBottom:"5%"
    },
   
    screen:{
      backgroundColor:"#000",
      flex: 1,
      display:"flex",
      flexDirection:"column",
      alignItems: 'center',
      justifyContent:"center",
  
    }
  })
  
>>>>>>> 609b2e1e1d7abf10666e93cdddd011cef40cd2f4
