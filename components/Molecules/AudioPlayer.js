import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ProgressBarAndroid, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { Icon } from 'react-native-elements';
import { COLORS, SIZES } from '../../constants/theme';

const AudioPlayer = ({ audioUri }) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const [playbackDuration, setPlaybackDuration] = useState(null);

  useEffect(() => {
    async function loadAudio() {
      const { sound } = await Audio.Sound.createAsync(
        { uri: audioUri },
        { shouldPlay: false }
      );
      setSound(sound);
    }

    loadAudio();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [audioUri]);

  const togglePlayback = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const updatePlaybackStatus = async () => {
      if (sound) {
        const status = await sound.getStatusAsync();
        setPlaybackPosition(status.positionMillis);
        setPlaybackDuration(status.durationMillis);
      }
    };

    const intervalId = setInterval(updatePlaybackStatus, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [sound]);

  return (
    <View style={styles.container}>
      <View style={styles.playbackControls}>
        <TouchableOpacity onPress={togglePlayback}>
          <Icon
            name={isPlaying ? 'pause' : 'play-arrow'}
            type="material"
            color={COLORS.primary}
            size={SIZES.h3}
          />
        </TouchableOpacity>
      </View>
      <ProgressBarAndroid
        styleAttr="Horizontal"
        indeterminate={false}
        progress={playbackPosition / playbackDuration}
        style={styles.progressBar}
      />
      <View style={styles.duration}>
        <Text>{formatTime(playbackPosition)}</Text>
        <Text>{formatTime(playbackDuration)}</Text>
      </View>
    </View>
  );
};

const formatTime = (milliseconds) => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  playbackControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBar: {
    width: '80%',
    height: 20,
  },
  duration: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});

export default AudioPlayer;
