import React ,{useState,useEffect}from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, Platform,TextInput, } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Axios from 'axios';
import { Button } from '../Atoms/Button';
import Feather from 'react-native-vector-icons/Feather';
import appTheme from '../../constants/theme';
<<<<<<< HEAD
import ViewAtom from '../Atoms/ViewAtom';
import TextAtom from '../Atoms/TextAtom';
import CardAtom from '../Atoms/CardAtom';
import { useSelector } from 'react-redux';
const {COLORS, SIZES, FONTS}=appTheme
const SearchVenue = React.forwardRef(({onMethodSelected,navigation,nearestclinic,photoUrl,state}, ref) => {

  const theme=useSelector(state => state.userReducer.theme);
=======
const {COLORS, SIZES, FONTS}=appTheme
const SearchVenue = React.forwardRef(({onMethodSelected,navigation,nearestclinic,photoUrl,state}, ref) => {

>>>>>>> 609b2e1e1d7abf10666e93cdddd011cef40cd2f4

  return (
    <RBSheet
      ref={ref}
      height={270}
      openDuration={250}
      dragFromTopOnly  
      closeOnDragDown
      customStyles={{
        container: {
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          alignItems:"center",
          backgroundColor:COLORS.gray
         
        },
      }}
      >
          <View style={styles.bottomCard}>
<<<<<<< HEAD
          <ViewAtom  fd="column" jc="flex-start" ai="flex-start"  bg="transparent" pv={5} br={0} mv={0} mh={0}>
          <ViewAtom  fd="flex" jc="flex-start" ai="center"  bg="transparent" pv={5} br={0} mv={0} mh={0}>

            <TextAtom text={`Kenyatta university `} c={theme.color} f="Roboto" s={SIZES.h2} w="500" />
                  <Feather name="navigation" size={SIZES.icon}     color={COLORS.primary}/>
          </ViewAtom>
            <CardAtom fd="column" jc="center" ai="center" w={100}  pv={.2} ph={0} bg={theme.name==="Dark"?COLORS.white:theme.color} br={3} mv={1} mh={1}   el={3} sh='#525252' >
          </CardAtom>
          </ViewAtom>
            
               
                  
=======
           
               
                <Text style={styles.text_}><Feather name="navigation" size={SIZES.icon}     color={COLORS.primary}/> {Math.round(state.distance)} km away </Text>
>>>>>>> 609b2e1e1d7abf10666e93cdddd011cef40cd2f4
            
                <View style={styles.pickerOption} >
                <View  style={styles.Option} >
  
                <Text style={styles.text__}>Now open </Text>
                </View>
                    <View  style={styles.Option} >
                    
            
                <View style={styles.circleBg} >
                <Feather name="star" size={SIZES.icon}   color={COLORS.primary}/>
                </View>
                <Text style={styles.text__}>

              
                    </Text>
                    </View>
                <View  style={styles.Option}>
                <View style={styles.circleBg} >
                <Feather name="clock" size={SIZES.icon}     color={COLORS.primary}/>
                </View>
                <Text style={styles.text__}>{Math.round(state.time)}min </Text>
                </View>
                
                </View>
                <View style={{ flexDirection: "row", justifyContent: "center" }} >
       <Button text={"Proceed"}width="100%" bg={COLORS.primary} navigation={navigation} borderRadius={5} screen="LoginScreen"  onMethodSelected={onMethodSelected}/>
                    </View>
            </View>
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
export default SearchVenue;