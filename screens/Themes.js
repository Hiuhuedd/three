import React, { useState,useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet,FlatList } from 'react-native';
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
import CardAtom from '../components/Atoms/CardAtom';
import { BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Themes = ({navigation}) => {
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
    const dispatch = useDispatch();

    const user=useSelector(state => state.userReducer.user);
    const theme=useSelector(state => state.userReducer.theme.color);
 

   const [checking,setchecking]=useState(true)
   const [mytheme,setmyTheme]=useState()
   const themesArr=[
    {color:COLORS.amber,name:"A1"},
    // {color:COLORS.black,name:"Charcoal"},
    {color:COLORS.chocolate,name:"A2"},
    {color:COLORS.primary2,name:"A3"},
    {color:COLORS.gold,name:"A4"},
    {color:COLORS.green,name:"A5"},
    {color:COLORS.green2,name:"A6"},
    {color:COLORS.pink,name:"A7"},
    {color:COLORS.primary,name:"A8"},
    {color:COLORS.rose,name:"A9"},
    // {color:COLORS.white,name:"Paper"},
    {color:COLORS.gray2,name:"A10"},
    {color:COLORS.green,name:"A11"},
    {color:COLORS.green2,name:"A12"},
    {color:COLORS.pink,name:"A7"},
    {color:COLORS.primary,name:"A8"},
    {color:COLORS.rose,name:"A9"},
    // {color:COLORS.white,name:"Paper"},
    {color:COLORS.fuschia,name:"A13"},
   
   ]
   const handleSetTheme=(item)=>{
    setmyTheme(item.color)
    dispatch({
        type: "MY_THEME",
        payload:item
      });
    AsyncStorage.setItem('theme', JSON.stringify(item)).then(res => {
      navigation.navigate("Me")
    });
   }
   useEffect(() => {

  }, []);
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={[styles.themeItem, {  }]}
        onPress={() => {handleSetTheme(item)}}
      >
        <CardAtom fd="row"  jc="space-between" ai="flex-start" pv={10} ph={10} bg={COLORS.black} br={3} mv={2} mh={0}   el={3} sh='#525252' >
          
          <Icon name='color-palette' type="ionicon" color={item.color} size={SIZES.h2} onPress={() => {handleSetTheme(item)}} />
    
            </CardAtom>
            <TextAtom text={item.name} f="Poppins"s={SIZES.h6} w={"500"} ta="left" ls={0}c={COLORS.gray2} />

      </TouchableOpacity>
    );
  };
  
  return (
    <View style={styles.container}>
                <LinearAtom  ai="center"  pv={5}  ph={10} bg={COLORS.white} br={0} mv={0} mh={0}   el={0} sh='#000' colors={[mytheme,COLORS.dark]} >
  <ViewAtom fd="row" jc="center" ai="center" w="100%" bg="transparent" pv={5} br={0} mv={15} mh={0}>
      </ViewAtom>
  <ViewAtom fd="row" width="100%" ph={10} pv={10} jc="space-between" >
        <Icon name={"arrow-back-outline"} type="ionicon" color={COLORS.white} size={SIZES.h2} onPress={() => {navigation.navigate('Me')}} />
      <ViewAtom fd="row"  ph={7} pv={5}  br={15} >
        <TouchableOpacity onPress={()=>{}}>
          <TextAtom text={""} f="Poppins"s={SIZES.h5} w={"500"} ls={0}c={COLORS.white} />
        </TouchableOpacity>
      </ViewAtom>
</ViewAtom>
  <TextAtom text={"Themes"} f="Poppins"s={SIZES.h1} w={"500"} ta="left" ls={-2}c={COLORS.white} />
  <TextAtom text={"Customize your app theme.."} f="Poppins"s={SIZES.h5} w={"500"} ta="left" ls={0}c={COLORS.gray2} />
  <TextAtom text={"Select theme"} f="Poppins"s={SIZES.h3} w={"500"} ta="left" ls={0}c={COLORS.gray} />
  <ViewAtom  fd="row" jc="space-between" ai="center" w="100%" bg="transparent" pv={5} br={0} mv={20} mh={0}>
     
  <FlatList
        data={themesArr}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        numColumns={4}
        // style={{width}}
      />
     </ViewAtom>


</LinearAtom> 

            
  {/* <BottomTabs navigation={navigation} theme={COLORS.primary} /> */}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:COLORS.dark,
    height:SIZES.height,
    paddingTop:0,

  },
 
  themeItem: {
    flex: 1,
    height: 100,
    borderRadius: 8,
    margin: -5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  themeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
 
});

export default Themes;

