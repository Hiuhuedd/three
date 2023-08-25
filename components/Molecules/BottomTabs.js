import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import appTheme from '../../constants/theme';
import TextAtom from '../Atoms/TextAtom';
import CardAtom from '../Atoms/CardAtom';
import { useSelector } from 'react-redux';
import ViewAtom from '../Atoms/ViewAtom';

const { COLORS, SIZES } = appTheme;

export default function BottomTabs({ navigation }) {
  const [activeTab, setActiveTab] = useState('Home');
  const theme = useSelector(state => state.userReducer.theme);

  const tabs = [
    { icon: 'home-outline', text: 'Home', screen: 'Home' },
    { icon: 'chatbox-ellipses-outline', text: 'Chat', screen: 'Chat' },
    { icon: 'calendar-outline', text: '', screen: 'Timetable' },
    { icon: 'school-outline', text: 'Program', screen: 'Program' },
    { icon: 'person-outline', text: 'Me', screen: 'Me' },
  ];

  const handleTabPress = (screen) => {
    setActiveTab(screen);
    navigation.navigate(screen);
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.dark,
      }}
    >
      {tabs.map((tab, index) => (
        <IconTab
          key={index}
          icon={tab.icon}
          text={tab.text}
          screen={tab.screen}
          isActive={activeTab === tab.screen}
          onPress={() => handleTabPress(tab.screen)}
          theme={theme}
        />
      ))}
    </View>
  );
}

const IconTab = ({ icon, text, isActive, onPress,theme }) => {
  return (
    <TouchableOpacity onPress={onPress}>
     {text===""?
      <ViewAtom jc="space-between" ai="flex-start" pv={12} ph={15} bg={theme.color} br={50} mv={0} mh={0}>
      <Icon name={icon} type="ionicon" color={COLORS.white} size={25} /> 
    </ViewAtom>
     :
     <View
        style={{
          alignItems: 'center',
          paddingVertical:20
        }}
      >
        <Icon
          name={icon}
          type="ionicon"
          color={ COLORS.white}
          size={ 15}
        />
        <TextAtom
          text={text}
          f="Poppins"
          s={SIZES.base}
          w="500"
          ta="center"
          ls={0}
          c={ COLORS.gray4}
        />
        {isActive && (
          <CardAtom
            w={1}
            pv={2}
            ph={2}
            bg={theme.color} // Change this to the desired color
            br={50}
            mv={1}
            mh={1}
            el={3}
            sh="#111"
          ></CardAtom>
        )}
      </View>}
    </TouchableOpacity>
  );
};
