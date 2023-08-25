import React from 'react';
import { View, Text } from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import ViewAtom from '../Atoms/ViewAtom';
import TextAtom from '../Atoms/TextAtom';
import { COLORS, SIZES } from '../../constants/theme';
import CardAtom from '../Atoms/CardAtom';
import { useSelector } from 'react-redux';
import { Icon } from 'react-native-elements';
import { Button } from '../Atoms/Button';
import { Checkbox } from 'react-native-paper';
import { useState } from 'react';

export default V2Modal = ({text,navigation,screen,feature,date }) => {
    const prop={}
  const theme=useSelector(state => state.userReducer.theme);
  const [checked, setChecked] = useState(false);

   const handleCheckboxToggle = () => {
     setChecked(!checked);
   };
    return (
        <>
      <CardAtom fd="column" jc="space-between" ai="center" w="100%" bg={COLORS.white} pv={40} ph={2} br={15} mv={0} mh={0}  el={3} sh={theme.color}>
      <ViewAtom fd="column" jc="center" ai="center"  bg="transparent" pv={0} br={0} mv={0} mh={0}>
   
                 {/* <TextAtom text={ "360"} c={theme.color} f="Roboto" s={SIZES.base} w="500" /> */}
                 <CardAtom fd="column" jc="center" ai="center"  bg={COLORS.white} pv={10} ph={10} br={10} mv={0} mh={0}  el={3} sh={COLORS.gray2}>

      <Icon name={"information"} type="ionicon" color={theme.color} size={SIZES.h3} />
                 </CardAtom>

                 <TextAtom text={ `${feature}`} c={COLORS.black} f="Poppins" s={SIZES.h4} w="500" />
     <ViewAtom fd="column" jc="flex-start" ai="flex-start"  bg="transparent" ph={5} br={0} mv={10} mh={0}>
   
                 <TextAtom text={ `${text} ${date}`} c={COLORS.black} f="Poppins" s={SIZES.base} w="500" />

                 <ViewAtom  fd="row" jc="flex-start" ai="center" w="100%" bg="transparent" pv={5} br={0} mv={0} mh={0}>
     
     <Checkbox.Android
          status={checked ? 'checked' : 'unchecked'}
          onPress={handleCheckboxToggle}
          color={checked ? COLORS.green : theme.color}
        />
    <TextAtom text={"Notify me"} f="Poppins"s={SIZES.h6} w={"500"} ta="left" ls={0}c={COLORS.gray2} />
       </ViewAtom>

                 <TextAtom text={ ` V1.1.02 `} c={COLORS.gray2} f="Roboto" s={SIZES.base} w="500" />
                
        </ViewAtom>         
         </ViewAtom>
         <Button text={"Ok, cool"} width="90%" bg={theme.color} borderRadius={10} onMethodSelected={()=>navigation.navigate(screen)} />
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
  