import React, { useState,useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView ,TextInput,Image} from 'react-native';
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
import { text } from '../constants/content/textPrompts';
import Slider from '@react-native-community/slider';
import moment from 'moment';
import { Audio } from 'expo-av';
import { BackHandler } from 'react-native';
import V2Modal from '../components/Molecules/V2Modal';
import Modal from "react-native-modal";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, collection, setDoc,getDoc, doc } from 'firebase/firestore';

const FeedBack = ({navigation}) => {
  //=================backpress====================
const handleBackPress = () => {
navigation.navigate("Me")
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
   const [checking,setchecking]=useState(true)
   const [Loading,setLoading]=useState(true)
   const [isPlaying, setIsPlaying] = useState(false);
   const dispatch = useDispatch();

   const fetchMsg=async()=>{
    setLoading(true)
    try {
      const db = getFirestore();
      const usersCollection = collection(db, 'feedback');
      const userDocRef = doc(usersCollection, user.id);
  
      // Get the user document using the userDocRef
      const userDocSnapshot = await getDoc(userDocRef);
  
      // Check if the user document exists
      if (userDocSnapshot.exists()) {
        const userFeedback = userDocSnapshot.data();
  const fomat=Object.values(userFeedback)
        // Now you have the user data as an object
        console.log(fomat);
        setChatMessages(fomat)
        dispatch({
          type: "FEEDBACK",
          payload: fomat
        });
  
        AsyncStorage.setItem('Feedback', JSON.stringify(fomat)).then(res => {
          setLoading(false);
        });
  
        return fomat
      } else {
        setLoading(false)

        setError('User not found in 360.');
        return []
      }
    } catch (error) {
      // Handle any errors that may occur during the retrieval process
      console.error('Error retrieving user data:', error);
      return []
    }
   }

   useEffect(() => {
  setTimeout(() => {
    setchecking(false)
  }, 5000);
fetchMsg()
  }, []);
  const handleSend = async() => {
    if (inputText.trim() !== '') {
      const newMessage = {
        userId: user.id,
        name: user.firstName +" "+ user.lastName,
        message: inputText,
        imageUrl: user.profile,
        time: Date.now()
      };

      setChatMessages([...chatMessages, newMessage]);
      setInputText('');
      setTimeout(async() => {
        try {
          const db = getFirestore();
          const collectionRef = collection(db, 'feedback'); // Collection reference
          const documentRef = doc(collectionRef, user.id); // Document reference
           await setDoc(documentRef,  {...chatMessages,newMessage} );
            // alert("Message sent successfully")
    
           setLoading(false)
        } catch (error) {
          setLoading(false)
      console.error('Error uploading user data:', error);
        }
     
      }, 1000);
    }
  };

  const [inputText, setInputText] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      userId: '360',
      name: '360',
      message: `Hi ${user.firstName}, You deserve a whole-some student experience. The 360 team is dedicated to get you there. We continually improve our software and services to assist you achieve this. Speak to us. We value your feedback.  `,
      imageUrl: 'https://example.com/user1.jpg',
      time: Date.now(),
    },
    
    // Add more messages as needed
  ])
  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      paddingVertical: 16,
      paddingHorizontal: 12,
    },
    messageContainer: {
      marginVertical: 4,
      padding: 5,
      borderRadius: 10,
      maxWidth: '80%',
      
    },
    sentMessageContainer: {
      alignSelf: 'flex-end',
      backgroundColor: COLORS.black,
      borderTopRightRadius:0
    },
    receivedMessageContainer: {
      alignSelf: 'flex-start',
      backgroundColor: '#F3F3F3',
      borderTopLeftRadius:0
    },
    messageText: {
      fontSize: 16,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      // borderTopWidth: 1,
      // borderColor: '#DADADA',
      paddingHorizontal: 12,
      paddingVertical: 8,
      marginBottom:5
    },
    input: {
      flex: 1,
      height: 40,
      backgroundColor: '#F9F9F9',
      borderRadius: 8,
      paddingHorizontal: 10,
      marginRight: 8,
    },
    sendButton: {
      backgroundColor:theme.color,
      borderRadius: 8,
      padding: 7,
      paddingVertical: 8,
      marginHorizontal:3,
    },
    sendButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
    },
    slider_view:{
      // height:"10%",
      width:"100%",
      alignItems:"center",
      flexDirection:"row",
      // justifyContent:"flex-end"
    },
    slider_style:{
      height:"70%",
      width:"60%"
    },
    slider_time:{
      fontSize:12,
      marginLeft:"6%",
      color:"#808080",
      alignSelf:"flex-end"
    },
    Icon: {
      width: 20,
      height: 20,
      borderRadius: 50,
      // margin:-10
    },

  });
  //============================Slider==========================
  const [audioStatus, setAudioStatus] = useState(null);
  const [sliderValue, setSliderValue] = useState(0);
  const [audioObject, setAudioObject] = useState(null);

  useEffect(() => {
    // Load the audio file
    async function loadAudio() {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require('../assets/audio.mp3')
        );
        setAudioObject(sound);
      } catch (error) {
        console.error('Error loading audio:', error);
      }
    }
    loadAudio();
  }, []);

  

const handlePlayPause = async () => {
    try {
      if (!audioObject) return;

      if (isPlaying) {
        await audioObject.pauseAsync();
      } else {
        await audioObject.playAsync();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error('Error handling play/pause:', error);
    }
  };
//=======================================================end slider======================


  return (
    <View style={{ flexGrow: 1,}}>
                <LinearAtom    pv={5}  ph={10} bg={COLORS.white} br={0} mv={0} mh={0}   el={0} sh='#000' colors={[theme.color,COLORS.dark]} >
  <ViewAtom fw="wrap" fd="row" jc="center" ai="center" w="100%" bg="transparent" pv={5} br={0} mv={10} mh={0}>
     
</ViewAtom>
  <ViewAtom fd="column" jc="center" ai="center" w="100%" bg="transparent" ph={10} br={0} mh={0}>
     
  <TextAtom text={"Speak-To-Us"} f="Poppins"s={SIZES.h2} w={"500"} ta="center" ls={-2}c={COLORS.white} />
  <TextAtom text={"360 team"} f="Poppins"s={SIZES.base} w={"500"} ta="center" ls={0}c={COLORS.white} />
</ViewAtom>
  <ScrollView contentContainerStyle={styles.container}>

{chatMessages.map((message, index) => (
  <>
  <ViewAtom fd="row" jc={message.userId === '360' ? "flex-start":"flex-end"} ai="center" w="100%" bg="transparent" pv={0} br={0} mh={0}>
  <View style={{position:"relative"}}>
  {message.userId === '360' ?  <Image source={require('../assets/360.png')} style={[styles.Icon]} />
  :
  <>
  {user.profile?  
 <Image source={{uri:user.profile}} style={[styles.Icon]} />
:
 <Image source={require('../assets/usericon.jpg')} style={[styles.Icon]} />
 }        
  </>
  }
  

  <View style={{position:"absolute",left:-2,bottom:13}}>
  <ViewAtom jc="center" ai="center"  bg={COLORS.rose} pv={3} ph={3} br={50} mh={0}></ViewAtom>
  </View>
  </View>
  <ViewAtom jc="flex-start" ai="flex-start" mh={5}> 
     <TextAtom text={message.userId === '360' ?"360 team   ":"You  "} f="Poppins"s={SIZES.base} w={"500"} ta="left" ls={0}c={COLORS.white} />
     <TextAtom text={moment(message.time).format('h:mm A')} f="Poppins"s={SIZES.base} w={"500"} ta="left" ls={0}c={COLORS.white} />
  
   </ViewAtom>
   </ViewAtom>
  <View
    key={index}
    style={[
      styles.messageContainer,
      message.userId === '360' ? styles.receivedMessageContainer: styles.sentMessageContainer ,
    ]}
  >
      <TextAtom text={message.message}f="Poppins"s={SIZES.h6+1} w={"500"}  c={message.userId === '360' ?COLORS.black:COLORS.white} />

     
  </View>
  </>
))}
<ViewAtom fd="row" jc="center" ai="center" w="100%" bg="transparent" pv={5} br={0} mv={10} mh={0}>
{Loading&&<ActivityIndicator size={SIZES.h5} color="#fff" />}
     
     </ViewAtom>

</ScrollView>
<View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="message us..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
        <Icon name="send" type="ionicon" color={COLORS.white} size={SIZES.h2}  />
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
        <Icon name="mic" type="ionicon" color={COLORS.white} size={SIZES.h2}  />
        </TouchableOpacity> */}
      </View>
        <Modal isVisible={false}>
        <ViewAtom fd="row" w='100%' jc="center" ai="center"  bg="transparent" pv={0} ph={10} br={0} mv={0} mh={0}>
           <V2Modal navigation={navigation} screen={"Home"} feature={'360 assistant'} date={'28th September 2023.'} text='360 assistant feature is scheduled for release on '/>
   
              
         </ViewAtom>
      </Modal>
</LinearAtom>  
            
  <BottomTabs navigation={navigation} theme={COLORS.primary} />

    </View>
  );
};



export default FeedBack;

