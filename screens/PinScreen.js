import React, { useState ,useEffect} from 'react';
import { View, TouchableOpacity, Text, StyleSheet ,BackHandler} from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import TextAtom from '../components/Atoms/TextAtom';
import { CheckBox, Divider, Icon } from 'react-native-elements';
import ViewAtom from '../components/Atoms/ViewAtom';
import { useSelector } from 'react-redux';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
<<<<<<< HEAD
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';
import { ProgramsArray } from '../constants/content/programs';
=======
>>>>>>> 609b2e1e1d7abf10666e93cdddd011cef40cd2f4

const PinScreen = ({navigation}) => {
        //=================backpress====================
const handleBackPress = () => {
 BackHandler.exitApp()
   return true;
 };
<<<<<<< HEAD
 const [Tv, setTv] = useState(false);
=======
>>>>>>> 609b2e1e1d7abf10666e93cdddd011cef40cd2f4
 
 useEffect(() => {
   BackHandler.addEventListener('hardwareBackPress', handleBackPress);
   return () => {
     BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
   };
 }, []);
<<<<<<< HEAD
 useEffect(() => {
  ProgramsArray()
  AsyncStorage.getItem('myTimetable').then(value => {

    if (value !== null) {
      setTv(true)
    }else{
      setTv(false)

    }
  })
 }, []);
=======
>>>>>>> 609b2e1e1d7abf10666e93cdddd011cef40cd2f4
 //=================backpress====================
    const user=useSelector(state => state.userReducer.user);
    const showAlert = (type, title, msg) => {
        Toast.show({
          type: type,
          title: title,
          textBody: msg,
        });
      };
    const keyArray = [
        { digit: 1, label: '~' },
        { digit: 2, label: 'abc' },
        { digit: 3, label: 'def' },
        { digit: 4, label: 'ghi' },
        { digit: 5, label: 'jkl' },
        { digit: 6, label: 'mno' },
        { digit: 7, label: 'pqrs' },
        { digit: 8, label: 'tuv' },
        { digit: 9, label: 'wxyz' },
        { digit: '*', label: '' },
        { digit: 0, label: '+' },
     
      ]
  const [pin, setPin] = useState('');
<<<<<<< HEAD
  const [Loading, setLoading] = useState(false);
 
  const handleKeyPress = (digit) => {
    if (pin.length < 3) {
      setPin(pin + digit);
    } else if (pin.length === 3) {
      if (user.pin === pin + digit) {
        setLoading(true); // Show loader immediately
        setTimeout(() => {
          if (Tv) {
            navigation.navigate("Home");
          } else {
            navigation.navigate("THook");
          }
          setLoading(false); // Hide loader after navigation
        }, 100);
      } else {
        console.log(user, pin);
        showAlert(ALERT_TYPE.WARNING, "", 'Incorrect pin!');
      }
    }
  };
  
=======

  const handleKeyPress = (digit) => {
    if (pin.length < 3) {
      setPin(pin + digit);
    }else if(pin.length===3){
        if (user.pin===pin+ digit) {
          navigation.replace("THook")
          // navigation.navigate("AnimatedHeader")
        }else{
            showAlert(ALERT_TYPE.WARNING,"", 'Incorrect pin!');
        }
    }
  };

>>>>>>> 609b2e1e1d7abf10666e93cdddd011cef40cd2f4
  const handleDeletePress = () => {
    setPin(pin.slice(0, -1));
  };

  const renderKey = (digit, label) => (
    <TouchableOpacity
      key={digit}
      style={styles.keypadButton}
      onPress={() => handleKeyPress(digit)}
    >
          <TextAtom text={digit} f="Poppins"s={SIZES.h1} w={"500"} ta="center" ls={0}c={COLORS.white} />
          <TextAtom text={label} f="Poppins"s={SIZES.base} w={"500"} ta="center" ls={0}c={COLORS.white} />


    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
        
  <ViewAtom fw="wrap" fd="row" jc="center" ai="center" w="100%" bg="transparent" pv={5} br={0} mv={10} mh={0}>
     
</ViewAtom>
  <TextAtom text={"Enter your pin code"} f="Poppins"s={SIZES.h1} w={"500"} ta="center" ls={-2}c={COLORS.white} />
  <TextAtom text={"Lets you encrypt your account to ensure privacy of your academic data"} f="Poppins"s={SIZES.h5} w={"500"} ta="center" ls={0}c={COLORS.gray2} />
  <ViewAtom  fd="row" jc="center" ai="center" w="100%" bg="transparent" pv={5} br={0} mv={10} mh={0}>
<<<<<<< HEAD
  <Icon name={Loading?"lock-open":"lock"} type="ioniconv4" ios="ios-lock" md="ios-lock" color={Loading?COLORS.amber:COLORS.white} size={SIZES.largeTitle} />
  </ViewAtom>
 {Loading&& 
                     <ActivityIndicator size="small" color={COLORS.amber} />
                    }
=======
  <Icon name="lock" type="ioniconv4" ios="ios-lock" md="ios-lock" color={COLORS.white} size={SIZES.largeTitle} />
  </ViewAtom>
>>>>>>> 609b2e1e1d7abf10666e93cdddd011cef40cd2f4
  <ViewAtom  fd="row" jc="center" ai="center" w="100%" bg="transparent" pv={5} br={0} mv={10} mh={0}>
        {[...Array(4)].map((_, index) => (
          <View key={index} style={[styles.pinDot, index < pin.length && styles.pinDotFilled]} />
        ))}

  </ViewAtom>
  {/* <TextAtom text={"Forgot pin"} f="Poppins"s={SIZES.h5} w={"500"} ta="center" ls={0}c={COLORS.primary} /> */}


  <ViewAtom fw="wrap" fd="row" jc="center" ai="center" w="100%" bg="transparent" pv={5} br={0} mv={20} mh={0}>
        {keyArray.map(({ digit, label }) => renderKey(digit, label))}
        <TouchableOpacity style={styles.keypadButton} onPress={handleDeletePress}>
            
        <Icon name="backspace" type="ionicon" ios="ios-lock" md="ios-lock" color={COLORS.white} size={SIZES.h1} style={{marginBottom:20}} />

        </TouchableOpacity>
</ViewAtom>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:COLORS.dark,
    height:SIZES.height,
    paddingTop:50
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

export default PinScreen;

