import React, { useState,useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView ,TextInput,Image} from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import TextAtom from '../components/Atoms/TextAtom';
import { CheckBox, Divider, Icon } from 'react-native-elements';
import ViewAtom from '../components/Atoms/ViewAtom';
import { useSelector } from 'react-redux';
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
const Chat = ({navigation}) => {
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
   const [checking,setchecking]=useState(true)
   const [isPlaying, setIsPlaying] = useState(false);

   useEffect(() => {
  setTimeout(() => {
    setchecking(false)
  }, 5000);
  }, []);
  const handleSend = () => {
    if (inputText.trim() !== '') {
      const newMessage = {
        userId: 'user1',
        name: 'John',
        message: inputText,
        imageUrl: 'https://example.com/user1.jpg',
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' }),
      };

      setChatMessages([...chatMessages, newMessage]);
      setInputText('');
    }
  };

  const [inputText, setInputText] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      userId: 'user2',
      name: 'John',
      message: `Hi ${user.firstName}, ${text}`,
      imageUrl: 'https://example.com/user1.jpg',
      time: '12:01 PM',
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
      borderRadius: 8,
      maxWidth: '80%',
      
    },
    sentMessageContainer: {
      alignSelf: 'flex-end',
      backgroundColor: COLORS.gray4,
    },
    receivedMessageContainer: {
      alignSelf: 'flex-start',
      backgroundColor: '#F3F3F3',
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
                <LinearAtom    pv={5}  ph={10} bg={COLORS.white} br={0} mv={0} mh={0}   el={0} sh='#000' colors={[COLORS.black,COLORS.dark]} >
  <ViewAtom fw="wrap" fd="row" jc="center" ai="center" w="100%" bg="transparent" pv={5} br={0} mv={10} mh={0}>
     
</ViewAtom>
  <ViewAtom fd="column" jc="center" ai="center" w="100%" bg="transparent" ph={10} br={0} mh={0}>
     
  <TextAtom text={"Chat 360"} f="Poppins"s={SIZES.h1} w={"500"} ta="center" ls={-2}c={COLORS.white} />
  <TextAtom text={"360 assistant"} f="Poppins"s={SIZES.base} w={"500"} ta="center" ls={-2}c={COLORS.white} />
</ViewAtom>
  <ScrollView contentContainerStyle={styles.container}>

{chatMessages.map((message, index) => (
  <>
  <ViewAtom fd="row" jc={message.userId === 'user1' ? "flex-end":"flex-start"} ai="center" w="100%" bg="transparent" pv={0} br={0} mh={0}>
  <View style={{position:"relative"}}>
  <Image source={message.userId === 'user2' ?require('../assets/bella.jpg'):require('../assets/user.jpg')} style={[styles.Icon]} />
  <View style={{position:"absolute",right:13,bottom:15}}>
  <ViewAtom jc="center" ai="center"  bg={COLORS.rose} pv={3} ph={3} br={50} mh={0}></ViewAtom>
  </View>
  </View>
  <ViewAtom jc="flex-start" ai="flex-start" mh={10}> 
     <TextAtom text={message.userId === 'user2' ?"Bella   ":"You  "} f="Poppins"s={SIZES.h5} w={"500"} ta="left" ls={-1}c={COLORS.white} />
     <TextAtom text={moment(new Date()).format('h:mm a, DD-MM-YYYY ')} f="Poppins"s={SIZES.base} w={"500"} ta="left" ls={0}c={COLORS.white} />
  
   </ViewAtom>
   </ViewAtom>
  <View
    key={index}
    style={[
      styles.messageContainer,
      message.userId === 'user1' ? styles.sentMessageContainer : styles.receivedMessageContainer,
    ]}
  >
      <TextAtom text={message.message}f="Poppins"s={SIZES.h6+1} w={"500"} ta={message.userId === 'user1' ?"right":"left"} c={COLORS.black} />

      <View style={styles.slider_view}>
      {message.userId === 'user1' ?<></> :  <TouchableOpacity onPress={handlePlayPause}>
        <Icon
          name={isPlaying ? 'pause' : 'play'}
          type="ionicon"
          color={theme.color}
          size={SIZES.h2}
        />
      </TouchableOpacity>}
      {message.userId === 'user1' ?<></> :  
                <Slider
                style={styles.slider_style}
                minimumValue={0}
                maximumValue={7}
                minimumTrackTintColor={theme.color}
                maximumTrackTintColor={theme.color}
                thumbTintColor={theme.color}
                value={sliderValue}
                onValueChange={{}}
                onSlidingComplete={{}}
              />}
      

           
      <TextAtom text={moment(new Date()).format('h:mm a')} f="Poppins"s={SIZES.base} w={"500"} ta="right" ls={0}c={theme.color} />
        </View>
  </View>
  </>
))}

</ScrollView>
<View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your prompt/response..."
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
        <Modal isVisible={true}>
        <ViewAtom fd="row" w='100%' jc="center" ai="center"  bg="transparent" pv={0} ph={10} br={0} mv={0} mh={0}>
           <V2Modal navigation={navigation} screen={"Home"} feature={'360 assistant'} date={'28th September 2023.'} text='360 assistant feature is scheduled for release on '/>
   
              
         </ViewAtom>
      </Modal>
</LinearAtom>  
            
  <BottomTabs navigation={navigation} theme={COLORS.primary} />

    </View>
  );
};



export default Chat;

