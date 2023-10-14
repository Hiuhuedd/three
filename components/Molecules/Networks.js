import React from 'react';
import { View, Text,Image,StyleSheet,TouchableOpacity } from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import ViewAtom from '../Atoms/ViewAtom';
import TextAtom from '../Atoms/TextAtom';
import { COLORS, SIZES } from '../../constants/theme';
import { CheckBox, Divider, Icon } from 'react-native-elements';
import CardAtom from '../Atoms/CardAtom';
import NetworkItemSkeleton from './NetworkItemSkeleton';
import { useState } from 'react';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { NetworksArray } from '../../constants/content/networksArr';

export default Networks = ({ navigation ,arr,isRefreshing}) => {
  const [uArr, setuArr] = useState(arr);
  const networks=useSelector(state => state.userReducer.networks);

  useEffect(() => {
const getN=async()=>{
  const net = await NetworksArray();
setuArr(net)
}
getN()

    
   }, [isRefreshing]);
    return (
        <>
         {uArr.length === 0 ?
         
         <>
          <NetworkItemSkeleton />
        
         </>:(
   uArr.map((network)=>{
    return(
<TouchableOpacity onPress={()=>{navigation.navigate("Events",{event:network})}}>

   <ViewAtom fd="row" jc="space-between" ai="center" w="100%" bg="transparent" pv={5} br={0} mv={0} mh={0}>
      <ViewAtom fd="row" jc="flex-start" ai="center"  bg="transparent" pv={5} br={0} mv={0} mh={0}>
      <CardAtom fd="row"  jc="space-between" ai="flex-start" pv={0} ph={0}  br={0} mv={0} mh={0}   el={3} sh='#525252' >

      <Image source={network.img!==''?{ uri: network.img }:require("../../assets/events.png")} style={styles.Icon}  resizeMode="contain"/>


        </CardAtom>
   
     <ViewAtom fd="column" jc="flex-start" ai="flex-start"  bg="transparent" pv={5} br={0} mv={0} mh={5}>
   
                 <TextAtom text={`${network.title}`} c={COLORS.black} f="Roboto" s={SIZES.h5} w="500" />
                 <TextAtom text={` ${network.date} `} c={COLORS.gray2} f="Roboto" s={SIZES.base} w="500" />
                 {/* <TextAtom text={` Two Rivers`} c={COLORS.gray2} f="Roboto" s={SIZES.base} w="500" /> */}

                 <ViewAtom  ai="center" ph={3}pv={2}  bg={COLORS.gray3}  br={5} mv={2} mh={0}>
                <TextAtom text={`${network.venue} .  ${network.location}`} c={COLORS.black} f="Roboto" s={SIZES.base} w="500" />
                </ViewAtom>
        </ViewAtom>         
         </ViewAtom>
      <ViewAtom fd="row" jc="flex-start" ai="center"  bg="transparent" pv={5} br={0} mv={0} mh={0}>
      <Icon name={"chevron-forward-outline"} type="ionicon" color={COLORS.black} size={SIZES.h3} onPress={() => {}} />

       
         </ViewAtom>
         </ViewAtom>
</TouchableOpacity>
    )

  }) 
         
         )}
      
        </>
   
    );
  };
  const styles = StyleSheet.create({
    Icon:{
      width:60,
      height: 60,
      borderRadius:2,

      
    },
 
  screen:{
    backgroundColor:"#000",
    flex: 1,
    display:"flex",
    flexDirection:"column",
    alignItems: 'center',
    justifyContent:"center",

  }
})