import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
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
const ProgressMic = ({ theme }) => {
  const user = useSelector(state => state.userReducer.user);
  const [isModalVisible, setModalVisible] = useState(false);
  const [progress, setProgress] = useState(0);


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
  const handlePlay = async () => {
    const apiUrl = 'https://three60server.onrender.com/text-to-speech'; // Replace with your server URL
  
    const text = `Hi ${user.firstName}. Experience the power of three sixty Student app! ... I am Bella, a personalized virtual assistant that revolutionizes your academic and career journey. Stay organized with the Smart Timetable feature, sync your program's schedule, and receive scheduled notifications. Connect with peers in the vibrant Peer Aid Community and earn while sharing knowledge. Explore networking opportunities with three sixty Events and gain insights through Performance Reports. Uncover your purpose with the captivating "Why" Feature and excel with Comprehensive Resume Building. Access student resources, customize themes, and chart your course with the Program Guide. three sixty student is built for you. Unleash your full potential now!  `;
    const voiceSettings = {
      stability: 0.5,
      similarity_boost: 0.5
    };
  
    try {
      const response = await axios.post(apiUrl, {
        text: text,
        voiceSettings: voiceSettings,
        voiceId:"EXAVITQu4vr4xnSDxMaL"
      });
  
      if (response.data) {
        playAudio(response.data);
      }
    } catch (error) {
      console.error('An error occurred while making the request:', error);
    }
  };
  



  return (
    <View>
      <AnimatedCircularProgress
        size={60}
        width={3}
        fill={progress}
        padding={5}
        tintColor={theme.name==="Dark"?COLORS.white:theme.color}
        backgroundColor={theme.name==="Dark"?COLORS.white:theme.color}
      >
        {(fill) => (
          <>
            <TouchableOpacity onPress={()=>{handlePlay()}}>
              <ViewAtom jc="center" ai="center" bg={theme.name==="Dark"?COLORS.white:theme.color} pv={2} ph={2} br={50} mv={0} mh={0}>
                <CardAtom fd="row" jc="center" ai="center" pv={8} ph={8} bg={COLORS.dark2} br={50} mv={0} mh={0} el={30} sh={COLORS.amber}>
                  <Icon name="mic" type="ioniconv4" ios="ios-lock" md="ios-lock" color={COLORS.white} size={SIZES.h3} />
                </CardAtom>
              </ViewAtom>
            </TouchableOpacity>
        
          </>
        )}
      </AnimatedCircularProgress>
      {/* <Modal isVisible={false}>
        <View style={{}}>
          <Image source={require('../../assets/360aimodel.gif')} style={styles.Icon} resizeMode="cover" />
        </View>
      </Modal> */}
    </View>
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
