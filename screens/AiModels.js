import React, { useState,useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet,FlatList,Image,BackHandler } from 'react-native';
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
import { ScrollView } from 'react-native-gesture-handler';

const  AiModels = ({navigation}) => {
//=================backpress====================
const handleBackPress = () => {
  BackHandler.exitApp();
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
    const m=useSelector(state => state.userReducer.model);
 

   const [checking,setchecking]=useState(true)
   const modelsArr=[
     {img:require("../assets/ai.png"),name:"Bella"},
     // {color:COLORS.black,name:"Charcoal"},
     {img:require("../assets/ai.png"),name:"Raquel"},
     {img:require("../assets/ai.png"),name:"Antoni"},
     {img:require("../assets/ai.png"),name:"Victor"},
     {img:require("../assets/ai.png"),name:"Paul"},
     {img:require("../assets/ai.png"),name:"Helen"},
     {img:require("../assets/ai.png"),name:"George"},
     {img:require("../assets/ai.png"),name:"Anne"},
     
     
    ]
    const [mymodel,setmyModel]=useState(m)
   const CustomizeArr=[
    {color:COLORS.amber,name:"Happy",i:"happy-outline"},
    {color:COLORS.chocolate,name:"Playful",i: "game-controller-outline"},
    {color:COLORS.rose,name:"Educative",i:"school-outline"},
    {color:COLORS.gold,name:"Precise",i:"pin-outline"},
    {color:COLORS.green,name:"Detailed",i:"albums-outline"},
    {color:COLORS.green2,name:"Sensitive",i:"eye-off-outline"},
    {color:COLORS.pink,name:"Free",i:"body-outline"},
    {color:COLORS.primary,name:"Conscious",i:"ear-outline"},
  
   
   ]
   const handleSetModel=(item)=>{
    setmyModel(item)
    dispatch({
        type: "MY_MODEL",
        payload:item
      });
    // navigation.navigate("Me")
   }
   const [activeItems, setActiveItems] = useState([]);

  const handleCustomize = (item) => {
    // Check if the item is already in the activeItems array
    if (activeItems.some((activeItem) => activeItem.name === item.name)) {
      // If it's active, remove it from the activeItems array
      setActiveItems((prevItems) =>
        prevItems.filter((activeItem) => activeItem.name !== item.name)
      );
    } else {
      // If it's inactive, add it to the activeItems array
      setActiveItems((prevItems) => [...prevItems, item]);
    }
  };
   useEffect(() => {

  }, []);
  const renderItem1 = ({ item }) => {
    const isActive = activeItems.some((activeItem) => activeItem.name === item.name);

    return (
      <TouchableOpacity
        style={[styles.modelItem,  {}]}
        onPress={() => {
          handleCustomize(item);
        }}
      >
        <CardAtom
          fd="row"
          jc="space-between"
          ai="flex-start"
          pv={13}
          ph={13}
          bg={COLORS.black}
          br={10}
          mv={0}
          mh={0}
          el={3}
          sh="#525252"
        >
          {/* Remove -outline from the icon name if it's active */}
          <Icon
            name={isActive ? item.i.replace('-outline', '') : item.i}
            type="ionicon"
            color={item.color}
            size={SIZES.h2}
          />
        </CardAtom>

        <ViewAtom fd="row" jc="center" ai="center" w="100%" bg="transparent" pv={5} br={0}  mh={0}>
       {isActive&& <CardAtom
          pv={2}
          ph={2}
          bg={item.color}
          br={30}
          mh={2}
          el={3}
          sh="#525252"
        >
        
        </CardAtom>}
        <TextAtom text={item.name} f="Poppins" s={SIZES.h6} w={"500"} ta="left" ls={0} c={COLORS.gray2} />
      </ViewAtom>

      </TouchableOpacity>
    );
  };
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={[styles.modelItem, {  }]}
        onPress={() => {handleSetModel(item)}}
      >
        <CardAtom fd="row"  jc="space-between" ai="flex-start" pv={0} ph={0} bg={COLORS.black} br={15} mv={10} mh={0}   el={3} sh='#525252' >

<Image source={item.img} style={styles.Icon}  resizeMode="contain"/>


  </CardAtom>
            <TextAtom text={item.name} f="Poppins"s={SIZES.h6} w={"500"} ta="left" ls={0}c={item.name===mymodel.name?theme:COLORS.gray2} />
            <TextAtom text={'v-1.1.02'} f="Poppins"s={SIZES.base} w={"500"} ta="left" ls={0}c={item.name===mymodel.name?theme:COLORS.gray2} />

      </TouchableOpacity>
    );
  };
  
  return (
    <View style={styles.container}>
                <LinearAtom  ai="center"  pv={5}  ph={10} bg={COLORS.white} br={0} mv={0} mh={0}   el={0} sh='#000' colors={[mymodel,COLORS.dark]} >
  <ViewAtom fd="row" jc="center" ai="center" w="100%" bg="transparent" pv={5} br={0} mv={15} mh={0}>
      </ViewAtom>
  <ViewAtom fd="row" width="100%" ph={10} pv={10} jc="space-between" >
        <Icon name={"arrow-back-outline"} type="ionicon" color={COLORS.white} size={SIZES.h2} onPress={() => {navigation.navigate('Me')}} />
      <ViewAtom fd="row"  ph={7} pv={5} bg={COLORS.dark} br={15} >
        <TouchableOpacity onPress={()=>{}}>
          <TextAtom text={""} f="Poppins"s={SIZES.h5} w={"500"} ls={0}c={COLORS.white} />
        </TouchableOpacity>
      </ViewAtom>
</ViewAtom>
  <TextAtom text={"360 Assistant"} f="Poppins"s={SIZES.h2} w={"500"} ta="left" ls={-2}c={COLORS.white} />
  <TextAtom text={"Lets you select and customize your 360 assistant to your desired wants.."} f="Poppins"s={SIZES.h5} w={"500"} ta="left" ls={0}c={COLORS.gray2} />

  <ScrollView>
 

  <TextAtom text={"Select your assistant"} f="Poppins"s={SIZES.h3} w={"500"} ta="left" ls={0}c={COLORS.gray} />
  <ViewAtom  fd="row" jc="space-between" ai="center" w="100%" bg="transparent" pv={5} br={0} mv={10} mh={0}>
     
  <FlatList
        data={modelsArr}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        numColumns={4}
        // style={{width}}
      />
     </ViewAtom>
  <TextAtom text={`Customize ${mymodel.name} `} f="Poppins"s={SIZES.h3} w={"500"} ta="left" ls={0}c={COLORS.gray} />
    <TextAtom text={`Give ${mymodel.name} a language, tone and attitude ..`} f="Poppins"s={SIZES.h6} w={"500"} ta="left" ls={0}c={COLORS.gray2} />

  <ViewAtom  fd="row" jc="space-between" ai="center" w="100%" bg="transparent" pv={5} br={0} mv={10} mh={0}>
     
  <FlatList
        data={CustomizeArr}
        renderItem={renderItem1}
        keyExtractor={(item) => item.name}
        numColumns={4}
        // style={{width}}
      />
     </ViewAtom>
     <TextAtom text={"About 360 Assistant "} f="Poppins"s={SIZES.h2} w={"500"} ta="left" ls={-2}c={COLORS.white} />
  <TextAtom text={"360ai "} f="Poppins"s={SIZES.h3} w={"500"} ta="left" ls={-2}c={COLORS.white} />
  <TextAtom text={"360 ai is an interesting tool. it explores the advantage of your uniqueness while leveraging the power of AGI to guide you through your daily experiences "} f="Poppins"s={SIZES.base} w={"500"} ta="left" ls={0}c={COLORS.gray2} />
  <TextAtom text={"Parameter value "} f="Poppins"s={SIZES.h3} w={"500"} ta="left" ls={-2}c={COLORS.white} />
  <TextAtom text={"360 ai works under the concept of Machine Learning(ML). The more engagement you provide, the more accurate in responses it gets. This is the parameter value   "} f="Poppins"s={SIZES.base} w={"500"} ta="left" ls={0}c={COLORS.gray2} />
  <ViewAtom  fd="row" jc="space-between" ai="center" w="100%" bg="transparent" pv={5} br={0} mv={10} mh={0}>
  <TextAtom text={'v-1.1.02'} f="Poppins"s={SIZES.base} w={"500"} ta="left" ls={0}c={COLORS.gray2} />
 
     </ViewAtom>
  </ScrollView>

  
</LinearAtom> 

            
  {/* <BottomTabs navigation={navigation} model={COLORS.primary} /> */}

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
  Icon:{
    width:50,
    height: 50,
    borderRadius:5,

    
  },
 
  modelItem: {
    flex: 1,
    height: 100,
    borderRadius: 8,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
 
});

export default AiModels ;

