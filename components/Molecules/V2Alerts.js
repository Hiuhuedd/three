import React from 'react';
import { View, Text } from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import ViewAtom from '../Atoms/ViewAtom';
import TextAtom from '../Atoms/TextAtom';
import { COLORS, SIZES } from '../../constants/theme';
import CardAtom from '../Atoms/CardAtom';
import { useSelector } from 'react-redux';
import { Icon } from 'react-native-elements';

export default V2Alerts = ({text  }) => {
    const prop={}
  const theme=useSelector(state => state.userReducer.theme);

    return (
        <>
      <CardAtom fd="row" jc="space-between" ai="center" w="100%" bg={COLORS.white} pv={5} ph={2} br={5} mv={0} mh={0}  el={3} sh={theme.color}>
      <ViewAtom fd="row" jc="flex-start" ai="center"  bg="transparent" pv={0} br={0} mv={0} mh={0}>
   
       
      <Icon name={"information"} type="ionicon" color={COLORS.rose} size={SIZES.h3} />

     <ViewAtom fd="column" jc="flex-start" ai="flex-start"  bg="transparent" ph={5} br={0} mv={0} mh={0}>
   
                 <TextAtom text={ text} c={COLORS.black} f="Roboto" s={SIZES.base} w="500" />
                 <TextAtom text={ ` V1.1.02 `} c={COLORS.gray2} f="Roboto" s={SIZES.base} w="500" />
                
        </ViewAtom>         
         </ViewAtom>
      {/* <ViewAtom fd="row" jc="flex-start" ai="center"  bg="transparent" pv={5} br={0} mv={0} mh={0}>
   
       
     <ViewAtom fd="column" jc="flex-start" ai="flex-end"  bg="transparent" pv={5} br={0} mv={0} mh={0}>
   
                 <TextAtom text={` ${event.start}`} c={COLORS.white} f="Roboto" s={SIZES.h5} w="500" />
                 <ViewAtom  ai="center" ph={3}pv={2}  bg={"transparent"}  br={5} mv={2} mh={0}>
                 <TextAtom text={`  From timetable`} c={COLORS.gray2} f="Roboto" s={SIZES.base} w="500" />
                </ViewAtom>
                        </ViewAtom>         
         </ViewAtom> */}
         </CardAtom>
     
        </>
   
    );
  };
  