import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { COLORS, SIZES } from '../constants/theme';
import { BackHandler } from 'react-native';
import TextAtom from '../components/Atoms/TextAtom';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ViewAtom from '../components/Atoms/ViewAtom';
import { CheckBox, Divider, Icon } from 'react-native-elements';
import MyInput from '../components/Atoms/MyInput';
import { Button } from '../components/Atoms/Button';
import CardAtom from '../components/Atoms/CardAtom';
import { useDispatch } from 'react-redux';
import InputCarousel from '../components/Molecules/InputCarousel';
import { AUTH } from '../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';


const SignIn = ({navigation}) => {
   
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const [pin, setpin] = useState('');
  const [email, setemail] = useState("");
  const validateEmail = (email) => {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  };

  const showAlert = (type, title, msg) => {
    Toast.show({
      type: type,
      title: title,
      textBody: msg,
    });
  };
  const getUserDataFromFirestore = async (userId) => {
    try {
      const db = getFirestore();
      const usersCollection = collection(db, 'users');
      const userDocRef = doc(usersCollection, userId);
  
      // Get the user document using the userDocRef
      const userDocSnapshot = await getDoc(userDocRef);
  
      // Check if the user document exists
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
  
        // Now you have the user data as an object
<<<<<<< HEAD
        console.log('User Data:', userData.user);
        dispatch({
          type: "ON_USER",
          payload: userData.user
        });
  
        AsyncStorage.setItem('Student', JSON.stringify(userData.user)).then(res => {
=======
        console.log('User Data:', userData);
        dispatch({
          type: "ON_USER",
          payload: userData
        });
  
        AsyncStorage.setItem('Student', JSON.stringify(userData)).then(res => {
>>>>>>> 609b2e1e1d7abf10666e93cdddd011cef40cd2f4
          navigation.replace('Home');
          setLoading(false);
        });
  
        return userData;
      } else {
        setLoading(false)

        setError('User not found in 360.');
        return null;
      }
    } catch (error) {
      // Handle any errors that may occur during the retrieval process
      console.error('Error retrieving user data:', error);
      return null;
    }
  };
  
  
  const handleSignIn = async () => {
    setError('');
    if (!validateEmail(email)) {
      setError('Invalid email address');
      return;
    }

    try {
      setLoading(true)
      const response = await signInWithEmailAndPassword(AUTH, email, `${pin}_pin`);

      if(response){
        const userId = response.user.uid;
       getUserDataFromFirestore(userId);

 
    // console.log(response.user);

      }
    } catch (error) {
      setError(error.message);
      setLoading(false)
      console.log(error);
    }
  };

  useEffect(() => {
    if (error) {
      showAlert(ALERT_TYPE.WARNING, 'Oops!', error);
    }
  }, [error]);

  const handleBackPress = () => {
    navigation.navigate('AuthScreen');
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);


  return (
    <View style={{ backgroundColor:COLORS.dark,flex:1,paddingTop:30,width:SIZES.width}}>
      <ViewAtom fd="row" width="100%" ph={10} pv={10} jc="space-between" >
        <Icon name={"arrow-back-outline"} type="ionicon" color={COLORS.white} size={SIZES.h2} onPress={() => navigation.navigate("AuthScreen")} />
      <ViewAtom fd="row"  ph={7} pv={5} bg={COLORS.amber} br={15} >
        <TouchableOpacity onPress={()=>{}}>
          <TextAtom text={"Sign in"} f="Poppins"s={SIZES.h5} w={"500"} ls={0}c={COLORS.white} />
        </TouchableOpacity>
      </ViewAtom>
      </ViewAtom>
      <ViewAtom fd="column"  ph={10} pv={0} >
      <TextAtom text={"Sign in to your account"} f="Poppins"s={SIZES.h1} w={"500"} ta="center" ls={-2}c={COLORS.white} />
      <TextAtom text={"360 Auth"} f="Poppins"s={SIZES.h5} w={"500"} ta="center" ls={-1}c={COLORS.white} />
    
      <TextAtom text={"Enter email"} f="Poppins"s={SIZES.h4} w={"500"} ta="left" ls={0}c={COLORS.white} />

      <MyInput
                editable={true}
                keyboardType={"default"}
                secureTextEntry={false}
                style={styles.input}
                placeholder={"Email"}
                maxLength={40}
                value={email}
                setisUpdated={setemail}
                label={""}
               
              />
      <TextAtom text={"Enter pin"} f="Poppins"s={SIZES.h4} w={"500"} ta="left" ls={0}c={COLORS.white} />

      <MyInput
                editable={true}
                keyboardType={"numeric"}
                secureTextEntry={false}
                style={styles.input}
                placeholder={"Pin"}
                maxLength={4}
                value={pin}
                setisUpdated={setpin}
                label={""}
               
              />

      </ViewAtom>
      <ViewAtom fd="column"  ph={10} pv={0} >

      <ViewAtom fd="column" ai="center" pv={10} >
          <Text style={styles.policyText}>By signing up, you agree to our </Text>
          <TouchableOpacity style={styles.policyLinks}>
              <Text style={styles.policyLink}>Terms of Service</Text>
              <Text style={styles.policyText}> and </Text>
              <Text style={styles.policyLink}>Privacy</Text><Text style={styles.policyLink}>Policy</Text>
          </TouchableOpacity>
       
   
      
        </ViewAtom>
  
        <ViewAtom ai="center"  pv={10} ph={0} bg="transparent" br={0} mv={0} mh={0}>
                  {!Loading? <Button text={"Sign in"} width="100%" bg={COLORS.amber} borderRadius={10} screen="BookingTwo" onMethodSelected={ handleSignIn} />:
                   <CardAtom fd="column" jc="center" ai="center" w="100%" pv={15} ph={10} bg={COLORS.amber} br={10} mv={0} mh={0}   el={3} sh='#525252' >
                   <ActivityIndicator size="small" color="#fff" />

                    </CardAtom>
                   }
              </ViewAtom>
      </ViewAtom>
    </View>
  );
};
export default SignIn;
const styles = StyleSheet.create({
  policyContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    },
    policyLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop:5,
    },
    policyText: {
    fontSize: 12,
    color: COLORS.white,
    },
    policyLink: {
    fontSize: 12,
    color: COLORS.white,
    textDecorationLine: 'underline',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: COLORS.gray2,
        borderRadius: 5,
        paddingHorizontal: 5,
        marginBottom: 3,
        width: '100%',
        color: '#fff',
      },
})
