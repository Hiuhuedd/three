import React ,{useState,useEffect}from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, Platform,TextInput, } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Axios from 'axios';
import { Button } from '../Atoms/Button';
import Feather from 'react-native-vector-icons/Feather';
import appTheme from '../../constants/theme';
import ViewAtom from '../Atoms/ViewAtom';
import TextAtom from '../Atoms/TextAtom';
import CardAtom from '../Atoms/CardAtom';
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
const {COLORS, SIZES, FONTS}=appTheme
const BottomSheetHome = React.forwardRef(({onMethodSelected,navigation,tData}, ref) => {
  
  const theme=useSelector(state => state.userReducer.theme);

  const handleSetFilter=(f)=>{
    onMethodSelected(f)
  }
 
const FilterArr=[{name:"Program",icon:"school-outline"},{name:"In campus",icon:'bookmark-outline'},{name:"Beyond",icon:'bookmarks-outline'}]

  return (
    <RBSheet
      ref={ref}
      height={100}
      openDuration={250}
      dragFromTopOnly  
      closeOnDragDown
      customStyles={{
        container: {
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          alignItems:"center",
          backgroundColor:theme.color,
          paddingBottom:20
        },
      }}
      >
         
           

<ViewAtom fd="row" jc="space-between"   ai="center" pv={0} ph={0}  br={2} mv={0} mh={0} >
{FilterArr.map(i=>{
  return(
    <TouchableOpacity onPress={()=>handleSetFilter(i.name)}style={{ width:70, flexDirection:"column",alignItems:"center", padding:10, marginHorizontal:20, marginBottom:20}}>
    <Icon name={i.icon} type="ionicon" color={COLORS.white} size={SIZES.h3+2} />

     <TextAtom text={i.name} c={COLORS.white} f="Poppins" s={SIZES.base} w="500" ta="center" />

   </TouchableOpacity>
 )
})}
</ViewAtom>
    
    
              
            
    </RBSheet>
  );
});
const styles =StyleSheet.create({
    pickerOption: {
      alignItems: 'center',
      alignContent:"center",
      display:"flex",
      width:'100%',
      flexDirection:"row",
      justifyContent: 'space-evenly',  
      borderRadius:5,
      alignSelf: 'center',
      textAlign:"center",
      paddingHorizontal:15,
      paddingVertical:10
    },
Option: {
      alignItems: 'center',
      alignContent:"center",
      display:"flex",
      flexDirection:"column",
      justifyContent: 'center',  
    },
    bottomCard: {
        width:" 100%",
        paddingHorizontal: 30,
        // alignItems:"center"
       
    },
    circleBg: {
      alignItems: 'center',
      alignContent:"center",
      display:"flex",
      justifyContent: 'center',  
      backgroundColor:COLORS.white,
      borderRadius:50,
      padding:15
     
    },
  
    scrollViewContent: {
      flexGrow: 1, // Allow the content to grow to fill the ScrollView
      // alignItems: 'center', // Center items vertically
      justifyContent: 'center', // Center items horizontally
    },
    text: {
      fontSize: SIZES.h2,
      fontWeight:"600",
      color:COLORS.primary,
    },
    text_: {
    fontSize: SIZES.body5,
      color:COLORS.primary,
      marginBottom:10,
    
    },
    text__: {
      fontSize: SIZES.body5,
      color:COLORS.gray2,
      marginBottom:10,
      textTransform:"capitalize"
    },
   
     
     userImg: {
      height: 50,
      width: 50,
      borderRadius: 50,
      backgroundColor:COLORS.white
    },
  });
export default BottomSheetHome;