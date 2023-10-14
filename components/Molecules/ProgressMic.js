import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image ,Animated} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { COLORS, SIZES } from '../../constants/theme';
import CardAtom from '../Atoms/CardAtom';
import ViewAtom from '../Atoms/ViewAtom';
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import TextAtom from '../Atoms/TextAtom';
import { Audio } from 'expo-av';
import axios from "axios"

import {  ref,  uploadBytes,  getDownloadURL,  listAll,  list,} from "firebase/storage";
import { storage } from "../../firebase";
const ProgressMic = ({ theme,isMsg, setisMsg }) => {
  const user = useSelector(state => state.userReducer.user);
  const [isModalVisible, setModalVisible] = useState(false);
  const [progress, setProgress] = useState(0.4);
  const [opacityValue] = useState(new Animated.Value(1));
  const [colorValue] = useState(new Animated.Value(1));
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundObject, setSoundObject] = useState(null);
  const [playbackStatus, setPlaybackStatus] = useState(null);

  useEffect(() => {
    const colorAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(colorValue, {
          toValue: .9,
          duration: 1500, // 1 second
          useNativeDriver: true,
        }),
        Animated.timing(colorValue, {
          toValue: 1,
          duration: 1500, // 1 second
          useNativeDriver: true,
        }),
      ]),
      { iterations: -1 }, // Infinite loop
     
    );

    colorAnimation.start();

    // return () => colorAnimation.stop();
  }, [colorValue]);
  useEffect(() => {
   if(playbackStatus && playbackStatus?.didJustFinish){
    setIsPlaying(false)
   }
  }, [playbackStatus]);
  useEffect(() => {
    const opacityAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacityValue, {
          toValue: 0.2,
          duration: 1500, // 1 second
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 1500, // 1 second
          useNativeDriver: true,
        }),
      ]),
      { iterations: -1 }, // Infinite loop
     
    );

    opacityAnimation.start();

    return () => opacityAnimation.stop();
  }, [opacityValue]);

  const animatedStyles = {
    opacity: opacityValue,
  };
  const animatedStyles2 = {
    transform: [{ scaleX: colorValue },{scaleY:colorValue}],
  };
  const playAudio = async (uri) => {
    try {
      const { sound: audioSound } = await Audio.Sound.createAsync(
        { uri: uri },
        { shouldPlay: true }
      );
  
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };
  const pauseLocalAudio = async () => {
    try {
      if (soundObject) {
        // Pause the audio playback
        await soundObject.pauseAsync();
  
        // Update the playback state to false
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Error pausing audio:', error);
    }
  };
  const onPlaybackStatusUpdate = (status) => {
    // Update the playback status state
    setPlaybackStatus(status);
  
    // Check if the audio has finished playing
    if (status && status.isLoaded && !status.isPlaying && status.didJustFinish) {
      // Audio has finished playing, you can perform any necessary actions here
      console.log('Audio has finished playing');
      
      // Update the playback state to false
      setIsPlaying(false);
    }
  };
  
  const playLocalAudio = async () => {
    try {
      const newSoundObject = new Audio.Sound();
  
      await newSoundObject.loadAsync(require('../../assets/audio1.mp3'));
      await newSoundObject.playAsync();
  
      // Update the soundObject state
      setSoundObject(newSoundObject);
  
      // Set up the event listener for playback status updates
      newSoundObject.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
  
      // Update the playback state to true
      setIsPlaying(true);
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };
  
  
  const handlePlay = async () => {
    if(!isPlaying){
      playLocalAudio()
      setisMsg(false)
    }else{
      pauseLocalAudio()
      // setisMsg(false)
    }
      
    // const apiUrl = 'http://192.168.43.222:3000/text-to-speech'; // Replace with your server URL
  
    // const text = `Hi ${user.firstName}. welcome to three sixty ai... I combine the power of general artificial intelligence with my understanding of your unique academic and career long-term interests to recommend, solutions, decisions, and strategies you'll need on every part of this journey. My name is Bella, it's always a pleasure engaging with you! `;
  
   
    // const voiceSettings = {
    //   stability: 0.5,
    //   similarity_boost: 0.5
    // };
  
    // try {
    //   const response = await axios.post(apiUrl, {
    //     text: text,
    //     voiceSettings: voiceSettings,
    //     voiceId:"EXAVITQu4vr4xnSDxMaL"
    //   });
  
    //   if (response.data) {
    //     // playLocalAudio()
    //     // playAudio(response.data);
    //   }
    // } catch (error) {
    //   console.error('An error occurred while making the request:', error);
    // }
  };
  



  return (
    
    <Animated.View style={[{flexDirection:"row-reverse",}]}>
    { isMsg&&  <Animated.View style={animatedStyles}>
        <Icon
          name="chatbubble-ellipses-outline"
          type="ionicon"
          ios="ios-lock"
          md="ios-lock"
          color={theme.color}
          size={SIZES.h3}
        />
      </Animated.View>}
      <Animated.View style={isPlaying?animatedStyles:{}}>
      <AnimatedCircularProgress
        size={45}
        width={3}
        fill={progress}
        padding={0}
        tintColor={theme.name==="Dark"?COLORS.white:theme.color}
        backgroundColor={theme.name==="Dark"?COLORS.white:theme.color}
      >
        {(fill) => (
          <>
            <TouchableOpacity onPress={()=>{handlePlay()}}>

              <ViewAtom jc="center" ai="center" bg={theme.name==="Dark"?COLORS.white:theme.color} pv={2} ph={2} br={50} mv={0} mh={0}>
      
                
                <Animated.View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",padding:8,borderRadius:50,backgroundColor:COLORS.dark2}}>
       
                  <Icon name={ isPlaying?"pause":"mic"} type="ioniconv4" ios="ios-lock" md="ios-lock" color={COLORS.white} size={SIZES.h4} />
      </Animated.View>
               
              </ViewAtom>
            </TouchableOpacity>
        
          </>
        )}
      </AnimatedCircularProgress>

      </Animated.View>
      {/* <Modal isVisible={false}>
        <View style={{}}>
          <Image source={require('../../assets/360aimodel.gif')} style={styles.Icon} resizeMode="cover" />
        </View>
      </Modal> */}
    </Animated.View>
  );
};

export default ProgressMic;

const styles = StyleSheet.create({
  Icon: {
    width: SIZES.width - 40,
    height: SIZES.height - 500,
    borderRadius: 15,
  },
});
