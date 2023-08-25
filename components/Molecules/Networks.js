import React from 'react';
import { View, Text,Image,StyleSheet,TouchableOpacity } from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import ViewAtom from '../Atoms/ViewAtom';
import TextAtom from '../Atoms/TextAtom';
import { COLORS, SIZES } from '../../constants/theme';
import { CheckBox, Divider, Icon } from 'react-native-elements';
import CardAtom from '../Atoms/CardAtom';

export default Networks = ({ navigation ,arr}) => {

    return (
        <>
  {  arr.map((network)=>{
    return(
<TouchableOpacity onPress={()=>{navigation.navigate("Events",{event:network})}}>

   <ViewAtom fd="row" jc="space-between" ai="center" w="100%" bg="transparent" pv={5} br={0} mv={0} mh={0}>
      <ViewAtom fd="row" jc="flex-start" ai="center"  bg="transparent" pv={5} br={0} mv={0} mh={0}>
      <CardAtom fd="row"  jc="space-between" ai="flex-start" pv={0} ph={0} bg={COLORS.black} br={15} mv={0} mh={0}   el={3} sh='#525252' >

      <Image source={{ uri: network.img }} style={styles.Icon}  resizeMode="contain"/>


        </CardAtom>
   
     <ViewAtom fd="column" jc="flex-start" ai="flex-start"  bg="transparent" pv={5} br={0} mv={0} mh={5}>
   
                 <TextAtom text={`${network.title}`} c={COLORS.white} f="Roboto" s={SIZES.h5} w="500" />
                 <TextAtom text={` ${network.date.date}th ${network.date.month}`} c={COLORS.gray4} f="Roboto" s={SIZES.base} w="500" />
                 {/* <TextAtom text={` Two Rivers`} c={COLORS.gray2} f="Roboto" s={SIZES.base} w="500" /> */}

                 <ViewAtom  ai="center" ph={3}pv={2}  bg={COLORS.black}  br={5} mv={2} mh={0}>
                <TextAtom text={`${network.venue} .  ${network.location}`} c={COLORS.gray2} f="Roboto" s={SIZES.base} w="500" />
                </ViewAtom>
        </ViewAtom>         
         </ViewAtom>
      <ViewAtom fd="row" jc="flex-start" ai="center"  bg="transparent" pv={5} br={0} mv={0} mh={0}>
      <Icon name={"chevron-forward-outline"} type="ionicon" color={COLORS.white} size={SIZES.h3} onPress={() => {}} />

       
         </ViewAtom>
         </ViewAtom>
</TouchableOpacity>
    )

  }) 
         }
      
        </>
   
    );
  };
  const styles = StyleSheet.create({
    Icon:{
      width:60,
      height: 60,
      borderRadius:5,

      
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