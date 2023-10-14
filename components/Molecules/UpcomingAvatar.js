import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import ViewAtom from '../Atoms/ViewAtom';
import TextAtom from '../Atoms/TextAtom';
import { COLORS, SIZES } from '../../constants/theme';
import CardAtom from '../Atoms/CardAtom';
import { useSelector } from 'react-redux';

export default UpcomingAvatar = ({ event, navigation}) => {
    
  const theme=useSelector(state => state.userReducer.theme);

    return (
        <TouchableOpacity onPress={()=>{navigation.navigate("Timetable")}}>
      <CardAtom fd="row" jc="space-between" ai="center" w="100%" pv={5} ph={2} br={0} mv={0} mh={0}  el={1} sh={theme.color}>
      <ViewAtom fd="row" jc="flex-start" ai="center"  bg="transparent" pv={0} br={0} mv={0} mh={0}>
   
       
     <UserAvatar size={40} style={{width:40,height:40, borderRadius:50}} name={event.unitName?event.unitName.slice(0,1): `P`} bgColor="#000" />
     <ViewAtom fd="column" jc="flex-start" ai="flex-start"  bg="transparent" ph={5} br={0} mv={0} mh={0}>
   
                 <TextAtom text={event.unitName?event.unitName: ` Physics for engineers`} c={COLORS.white} f="Roboto" s={SIZES.h5} w="500" />
                 <TextAtom text={event.unitCode?event.unitCode.toUpperCase():` ETT100`} c={COLORS.gray} f="Roboto" s={SIZES.base} w="500" />
                
        </ViewAtom>         
         </ViewAtom>
      <ViewAtom fd="row" jc="flex-start" ai="center"  bg="transparent" pv={5} br={0} mv={0} mh={0}>
   
       
     <ViewAtom fd="column" jc="flex-start" ai="flex-end"  bg="transparent" pv={5} br={0} mv={0} mh={0}>
   
                 <TextAtom text={` ${event.start}`} c={COLORS.white} f="Roboto" s={SIZES.h5} w="500" />
                 <ViewAtom  ai="center" ph={3}pv={2}  bg={"transparent"}  br={5} mv={2} mh={0}>
                 <TextAtom text={`  From timetable`} c={COLORS.gray2} f="Roboto" s={SIZES.base} w="500" />
                </ViewAtom>
                        </ViewAtom>         
         </ViewAtom>
         </CardAtom>
     
        </TouchableOpacity>
   
    );
  };
  