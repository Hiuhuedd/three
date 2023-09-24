import React, { useState,useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView ,TextInput,Image} from 'react-native';
import { COLORS, SIZES } from '../constants/theme'
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
import AsyncStorage from '@react-native-async-storage/async-storage';

import V2Modal from '../components/Molecules/V2Modal';
import Modal from "react-native-modal";
const Discord = ({navigation}) => {
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
    const discord=useSelector(state => state.userReducer.discord);
   const [checking,setchecking]=useState(true)
   const [isPlaying, setIsPlaying] = useState(false);


 
   useEffect(() => {
    if(discord.length>3){
      setChatMessages(discord);
    }
    setchecking(false)

  }, []);
  const dispatch = useDispatch();

  const handleSend = () => {
    if (inputText.trim() !== '') {
      const newMessage = {
        userId: user.StudentId,
        name: user.firstName,
        message: inputText,
        imageUrl: require('../assets/usericon.jpg'),
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' }),
      };
      const msgArr=[...chatMessages, newMessage]
      dispatch({
        type: "DISCORD",
        payload: msgArr
      });

      AsyncStorage.setItem('Discord', JSON.stringify(msgArr)).then(res => {
alert("Your message was saved but not sent. Student discord feature is available starting September 9th 2023")      });

      setChatMessages([...chatMessages, newMessage]);

      setInputText('');
    }
  };

  const [inputText, setInputText] = useState('');
  const [chatMessages, setChatMessages] = useState([
   
    {
      userId: 'user2',
      name: '360',
      message: `Hi ${user.firstName}, the -360 student discord- allows you to share your experiences as a student while learning from others in the campus community  `,
      imageUrl: require('../assets/360.png'),
      time: '12:01 PM',
    },
    {
      userId: 'user2',
      name: 'Michael',
      message: `Hi everyone, how can i make passive income as a student? `,
      imageUrl: require('../assets/user.jpg'),
      time: '12:03 PM',
    },
    {
      userId: 'user2',
      name: 'Jane',
      message: 'Hi Michael, there are several ways you can earn money in school without compromising your studies, try peer-aid or the invites program from 360 or start online jobs like writing, copywriting or design. these are easy to learn skills that will pay you ',
      imageUrl: require('../assets/bella.jpg'),
      time: '12:04 PM',
    },
    // Add more messages as needed
  ])
  const styles = StyleSheet.create({
    container: {
      // flexGrow: 1,
      paddingVertical: 16,
      paddingHorizontal: 12,
    },
    messageContainer: {
      marginVertical: 4,
      padding: 5,
      borderRadius: 8,
      maxWidth: '80%',
      
    },
    sentMessageContainer: {
      alignSelf: 'flex-end',
      backgroundColor: COLORS.black,
    },
    receivedMessageContainer: {
      alignSelf: 'flex-start',
      backgroundColor: COLORS.black,
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
      marginBottom:5,
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
    // async function loadAudio() {
    //   try {
    //     const { sound } = await Audio.Sound.createAsync(
    //       require('../assets/audio.mp3')
    //     );
    //     setAudioObject(sound);
    //   } catch (error) {
    //     console.error('Error loading audio:', error);
    //   }
    // }
    // loadAudio();
  }, []);

  

// const handlePlayPause = async () => {
//     try {
//       if (!audioObject) return;

//       if (isPlaying) {
//         await audioObject.pauseAsync();
//       } else {
//         await audioObject.playAsync();
//       }
//       setIsPlaying(!isPlaying);
//     } catch (error) {
//       console.error('Error handling play/pause:', error);
//     }
//   };
//=======================================================end slider======================


  return (
    <View style={{marginBottom:10, flexGrow: 1, }}>
    <LinearAtom    pv={0}  ph={0} bg={COLORS.white} br={0} mv={0} mh={0}   el={0} sh='#000' colors={[COLORS.gray2,COLORS.dark]} >

  <ViewAtom fd="column" jc="flex-start" ai="center" w="100%" bg="transparent" ph={10} br={0} mh={0}>
  <ViewAtom fw="wrap" fd="row" jc="center" ai="center" w="100%" bg="transparent" pv={5} br={0} mv={10} mh={0}>
     
</ViewAtom>
  <TextAtom text={"Kenyatta University"} f="Poppins"s={SIZES.h4} w={"500"} ta="left" ls={-1}c={COLORS.white} />
  <TextAtom text={"Student Discord"} f="Poppins"s={SIZES.h1} w={"500"} ta="left" ls={-2}c={COLORS.white} />
  <TextAtom text={'v-1.1.02'} f="Poppins"s={SIZES.base} w={"500"} ta="left" ls={0}c={COLORS.white} />
     
</ViewAtom>
  <ScrollView contentContainerStyle={styles.container}>

{chatMessages.map((message, index) => (
  <>
  <ViewAtom fd="row" jc={message.userId === user.StudentId ? "flex-end":"flex-start"} ai="center" w="100%" bg="transparent" pv={0} br={0} mh={0}>
  <View style={{position:"relative"}}>
  <Image source={message.imageUrl} style={[styles.Icon]} />
  <View style={{position:"absolute",right:13,bottom:15}}>
  <ViewAtom jc="center" ai="center"  bg={COLORS.rose} pv={3} ph={3} br={50} mh={0}></ViewAtom>
  </View>
  </View>
  <ViewAtom jc="flex-start" ai="flex-start" mh={10}> 
     <TextAtom text={message.userId === user.StudentId ?message.name:message.name} f="Poppins"s={SIZES.h5} w={"500"} ta="left" ls={-1}c={COLORS.white} />
     <TextAtom text={moment(new Date()).format('h:mm a, DD-MM-YYYY ')} f="Poppins"s={SIZES.base} w={"500"} ta="left" ls={0}c={COLORS.white} />
  
   </ViewAtom>
   </ViewAtom>
  <View
    key={index}
    style={[
      styles.messageContainer,
      message.userId === user.StudentId ? styles.sentMessageContainer : styles.receivedMessageContainer,
    ]}
  >
      <TextAtom text={message.message}f="Poppins"s={SIZES.h6} w={"500"} ta={message.userId === 'user1' ?"right":"left"} c={COLORS.white} />

      <View style={styles.slider_view}>
    
     

           
      <TextAtom text={moment(new Date()).format('h:mm a')} f="Poppins"s={SIZES.base} w={"500"} ta="right" ls={0}c={theme.color} />
        </View>
  </View>
  </>
))}

<View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your question/response..."
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
</ScrollView>
<Modal isVisible={true}>
        <ViewAtom fd="row" w='100%' jc="center" ai="center"  bg="transparent" pv={0} ph={10} br={0} mv={0} mh={0}>
           <V2Modal navigation={navigation} date={'28th September 2023.'} screen={"Me"} feature={"Student Discord"} text='Student Discord feature is scheduled for release on '/>
   
              
         </ViewAtom>
      </Modal>
</LinearAtom>
            
<BottomTabs navigation={navigation} theme={COLORS.primary} />

    </View>
  );
};



export default Discord;

