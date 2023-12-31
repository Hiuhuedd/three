import { useEffect, useState } from 'react';
import ViewAtom from '../Atoms/ViewAtom';
import TextAtom from '../Atoms/TextAtom';
import { COLORS, SIZES } from '../../constants/theme';
import { StyleSheet, View ,TouchableOpacity} from 'react-native';
import CardAtom from '../Atoms/CardAtom';
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
const Settings=({navigation,handleAction})=>{
  const theme=useSelector(state => state.userReducer.theme);
  const model=useSelector(state => state.userReducer.model);
  const premium=useSelector(state => state.userReducer.premium);
 
const [selectedItem, setSelectedItem]=useState('')
useEffect(() => {
}, []);

const settings=[
  {icon:"pencil",name:"Edit profile",active:"Edit my student profile ",number:"" ,screen:"",disabled:false},
  {icon:"color-palette",name:"Themes",active:"Explore themes ",number:theme.name ,screen:"Themes",disabled:false},
  {icon:"hardware-chip",name:"360ai",active:"Select & Customize your 360ai assistant to your preferences",number:model.name,screen:"AiModels" ,disabled:true},
  // {icon:"key",name:"Premium",active:"Discover the packs of premium leverage ",number:premium.plan,screen:"Premium"},
    // {icon:"card",name:"360Wallet",active:"Manage your student wallet, instantly withdraw to cash ",number:"",screen:"Tokens"},
    // {icon:"walk",name:"Invites",active:"Generate invite code, invite peers & earn",number:"",screen:"ReferralScreen"},
    // {icon:"navigate",name:"Navigate",active:"Find venues and places around school",number:"",screen:screenn,disabled:false},
    {icon:"walk",name:"Discord",active:"share your experiences as a student & learn from others in the school community",number:"",screen:"Discord",disabled:true},
    {icon:"information-circle",name:"Help & Support",active:"Engage our student support team",number:"",screen:"FeedBack",disabled:false},

    {icon:"cloud-upload-outline",name:"Contribute",active:"Contribute study materials ",number:"",screen:"Contributions",disabled:false},
    {icon:"clipboard",name:"Create",active:"Create and view projects, group assignments, announcements and more ",number:"",screen:"Me",disabled:true},
    {icon:"log-out",name:"Sign out",active:"",number:"",screen:"AuthScreen",disabled:false},
]


    return(
  
        <View    >
           <ViewAtom  fd="row" ai="flex-end"  bg="transparent" ph={10} br={0} mv={0} mh={0}>
          
<TextAtom text={`Preferences`} c={COLORS.gray4} f="Roboto" s={SIZES.h5} w="500"  ls={-1}/>

                             </ViewAtom>

       
           { settings.slice(0,3).map(i=>{
            return(
              <TouchableOpacity onPress={()=>{handleAction(i.screen)}}>
                <ViewAtom fd="row" jc="space-between" ai="center" w="100%" bg="transparent" pv={5} br={0} ph={5}mv={0} mh={0}>
                <ViewAtom fd="row" jc="center" ai="center"  bg="transparent" pv={5} ph={0} br={0} mv={0} mh={0}>
                <CardAtom fd="row"  jc="space-between" ai="flex-start" pv={15} ph={15} bg={COLORS.dark2} br={5} mv={0} mh={0}   el={3} sh='#111' >
          
                <Icon name={i.icon} type="ionicon" color={!i.disabled?COLORS.gray2:COLORS.gray2} size={SIZES.h2}  />
          
                  </CardAtom>
             
               <ViewAtom fd="column" jc="flex-start" ai="flex-start"  bg="transparent" pv={5} br={0} mv={0} mh={5}>
             
                           <TextAtom text={i.name} c={i.disabled?COLORS.gray2:COLORS.white} f="Roboto" s={SIZES.h5} w="500" />
                           <TextAtom text={i.active} c={i.disabled?COLORS.gray2:COLORS.white} f="Roboto" s={SIZES.base} w="500" />
                           {/* <TextAtom text={` Two Rivers`} c={COLORS.gray2} f="Roboto" s={SIZES.base} w="500" /> */}
          
                           {/* <ViewAtom  ai="center" ph={3}pv={2}  bg={COLORS.black}  br={5} mv={2} mh={0}>
                          </ViewAtom> */}
                          <TextAtom text={i.number} c={COLORS.gray2} f="Roboto" s={SIZES.base} w="500" />
                  </ViewAtom>         
                   </ViewAtom>
                <ViewAtom fd="row" jc="flex-start" ai="center"  bg="transparent" pv={5} br={0} mv={0} mh={0}>
                <Icon name={"chevron-forward-outline"} type="ionicon" color={i.disabled?COLORS.gray2:COLORS.white} size={SIZES.h3} onPress={() => {}} />
          
                 
                   </ViewAtom>
                   </ViewAtom>           
                
              </TouchableOpacity>
                    )
            })}
   <ViewAtom   bg="transparent" ph={10} br={0} mv={0} mh={0}>
          
<TextAtom text={`Utilities`} c={COLORS.gray4} f="Roboto" s={SIZES.h5} w="500"  ls={-1}/>
<CardAtom fd="row" jc="flex-start"   ai="flex-start" pv={.2} ph={40} bg={COLORS.gray2} br={2} mv={0} mh={0} el={30} sh={COLORS.black}></CardAtom>
                   </ViewAtom>

           { settings.slice(3,settings.length).map(i=>{
            return(
              <TouchableOpacity onPress={()=>{navigation.navigate(i.screen)}}>
                <ViewAtom fd="row" jc="space-between" ai="center" w="100%" bg="transparent" pv={5} br={0} ph={5}mv={0} mh={0}>
                <ViewAtom fd="row" jc="center" ai="center"  bg="transparent" pv={5} ph={0} br={0} mv={0} mh={0}>
                <CardAtom fd="row"  jc="space-between" ai="flex-start" pv={15} ph={15} bg={COLORS.black} br={10} mv={0} mh={0}   el={3} sh='#111' >
          
                <Icon name={i.icon} type="ionicon" color={i.disabled?COLORS.gray2:COLORS.gray} size={SIZES.h2}  />
          
                  </CardAtom>
             
               <ViewAtom fd="column" jc="flex-start" ai="flex-start"  bg="transparent" pv={5} br={0} mv={0} mh={5}>
             
                           <TextAtom text={i.name} c={i.disabled?COLORS.gray2:COLORS.white} f="Roboto" s={SIZES.h5} w="500" />
                           <TextAtom text={i.active} c={i.disabled?COLORS.gray2:COLORS.gray4} f="Roboto" s={SIZES.base} w="500" />
                           {/* <TextAtom text={` Two Rivers`} c={COLORS.gray2} f="Roboto" s={SIZES.base} w="500" /> */}
          
                           {/* <ViewAtom  ai="center" ph={3}pv={2}  bg={COLORS.black}  br={5} mv={2} mh={0}>
                          </ViewAtom> */}
                          <TextAtom text={i.number} c={COLORS.gray2} f="Roboto" s={SIZES.base} w="500" />
                  </ViewAtom>         
                   </ViewAtom>
                <ViewAtom fd="row" jc="flex-start" ai="center"  bg="transparent" pv={5} br={0} mv={0} mh={0}>
                <Icon name={"chevron-forward-outline"} type="ionicon" color={i.disabled?COLORS.gray2:COLORS.white} size={SIZES.h3} onPress={() => {}} />
          
                 
                   </ViewAtom>
                   </ViewAtom>           
                
              </TouchableOpacity>
                    )
            })}
   
      </View>
       
    )
}
export default Settings
const styles = StyleSheet.create({
 
  });