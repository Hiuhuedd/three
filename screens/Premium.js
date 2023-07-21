import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet,ScrollView  } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import TextAtom from '../components/Atoms/TextAtom';
import { CheckBox, Divider, Icon } from 'react-native-elements';
import ViewAtom from '../components/Atoms/ViewAtom';
import { useSelector } from 'react-redux';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import LinearAtom from '../components/Atoms/LinearAtom';
import CardAtom from '../components/Atoms/CardAtom';
import { Button } from '../components/Atoms/Button';

const Premium = ({navigation}) => {
    const theme=useSelector(state => state.userReducer.theme);

    const user=useSelector(state => state.userReducer.user);
    const showAlert = (type, title, msg) => {
        Toast.show({
          type: type,
          title: title,
          textBody: msg,
        });
      };
   
  return (
    <View style={styles.container}>
        <LinearAtom   pv={5}  ph={20} bg={COLORS.white} br={0} mv={0} mh={0} w="100%"  jc="center" el={0} sh='#000' colors={[theme.color,COLORS.dark]} >
  <ViewAtom fw="wrap" fd="row" jc="center" ai="center" w="100%" bg="transparent" pv={5} br={0} mv={20} mh={0}>
     
</ViewAtom>
  <TextAtom text={"Discover Premium"} f="Poppins"s={SIZES.h1} w={"500"} ta="center" ls={-2}c={COLORS.white} />
  <TextAtom text={"-Start Plan-"} f="Poppins"s={SIZES.base} w={"700"} ta="center" ls={0}c={COLORS.gray4} />
  <TextAtom text={"Lets you choose plans that meet your academic and financial needs"} f="Poppins"s={SIZES.base} w={"500"} ta="center" ls={0}c={COLORS.gray4} />

  <ScrollView  showsVerticalScrollIndicator={false}    >

  <ViewAtom  fd="row" jc="center" ai="center" w="100%" bg="transparent" pv={5} br={0} mv={0} mh={0}>
  <Icon name="medal-outline" type="ionicon"  color={COLORS.gray4} size={SIZES.largeTitle} />

  </ViewAtom>
  <CardAtom fd="column" jc="flex-start"  ai="flex-start" pv={0}  bg={theme.color}  br={15} mv={3} mh={0} el={30} sh={COLORS.black}>
  {/* fd="row" ai="center" w={"100%"} ph={20} pv={20}  br={15}   jc="space-between" bg={COLORS.amber} */}
  <View style={{flexDirection:"column",alignItems:"center",width:"100%",padding:20, borderTopRightRadius:15,borderTopLeftRadius:15, justifyContent:"space-between",backgroundColor:COLORS.black}} >
  <ViewAtom fd="row" jc="space-between"  ai="center" w={"100%"}  ph={0}pv={-3}  >

        <TextAtom text={"360 Freemium "} f="Poppins"s={SIZES.h3} w={"500"} ta="center" ls={-1}c={COLORS.white} />
        <TextAtom text={"Free "} f="Poppins"s={SIZES.h3} w={"500"} ta="center" ls={-1}c={COLORS.white} />
   
  </ViewAtom>
        <ViewAtom fd="row" jc="space-between"  ai="center" w={"100%"}  ph={0}pv={-3}  >
        <TextAtom text={"Start"} f="Poppins"s={SIZES.h6} w={"500"} ta="center" ls={0}c={COLORS.white} />
        <TextAtom text={"forever "} f="Poppins"s={SIZES.h6} w={"500"} ta="center" ls={0}c={COLORS.white} />

        </ViewAtom>

          {/* <Icon name={"wallet-outline"} type="ionicon" color={COLORS.white} size={SIZES.h2} onPress={() => {}} /> */}
</View>
<ViewAtom fd="column" jc="flex-start"  ai="flex-start" w={"100%"}  ph={20}pv={-3}  >

<ViewAtom fd="row" ai="center"  ph={0} pv={3} jc="flex-start" >

<Icon name={"checkmark-circle"} type="ionicon" color={COLORS.white} size={SIZES.h5} onPress={() => {}} />
<TextAtom text={"   3,000 free tokens for 360ai research assistant"} f="Poppins"s={SIZES.h6} w={"500"} ta="left" ls={0}c={COLORS.white} />
</ViewAtom>
<ViewAtom fd="row" ai="center"  ph={0} pv={3} jc="flex-start" >

<Icon name={"checkmark-circle"} type="ionicon" color={COLORS.white} size={SIZES.h5} onPress={() => {}} />
<TextAtom text={"   Access all networking events related to your course & career"} f="Poppins"s={SIZES.h6} w={"500"} ta="left" ls={0}c={COLORS.white} />
</ViewAtom>
<ViewAtom fd="row" ai="center"  ph={0} pv={3} jc="flex-start" >

<Icon name={"checkmark-circle"} type="ionicon" color={COLORS.white} size={SIZES.h5} onPress={() => {}} />
<TextAtom text={"   Smart timetable/sedules"} f="Poppins"s={SIZES.h6} w={"500"} ta="left" ls={0}c={COLORS.white} />
</ViewAtom>
<ViewAtom fd="row" ai="center"  ph={0} pv={3} jc="flex-start" >

<Icon name={"checkmark-circle"} type="ionicon" color={COLORS.white} size={SIZES.h5} onPress={() => {}} />
<TextAtom text={"   Program guide and resumes"} f="Poppins"s={SIZES.h6} w={"500"} ta="left" ls={0}c={COLORS.white} />
</ViewAtom>
<ViewAtom fd="row" ai="center"  ph={0} pv={3} jc="flex-start" >

<Icon name={"checkmark-circle"} type="ionicon" color={COLORS.white} size={SIZES.h5} onPress={() => {}} />
<TextAtom text={"   1 week free maps for venue, class locations and direcations"} f="Poppins"s={SIZES.h6} w={"500"} ta="left" ls={0}c={COLORS.white} />
</ViewAtom>
<ViewAtom fd="row" ai="center"  ph={0} pv={3} jc="flex-start" >

<Icon name={"checkmark-circle"} type="ionicon" color={COLORS.white} size={SIZES.h5} onPress={() => {}} />
<TextAtom text={"   Up to 3 free themes"} f="Poppins"s={SIZES.h6} w={"500"} ta="left" ls={0}c={COLORS.white} />
</ViewAtom>


</ViewAtom>



</CardAtom>
  <CardAtom fd="column" jc="flex-start"  ai="flex-start" pv={0}  bg={theme.color}  br={15} mv={15} mh={0} el={30} sh={COLORS.black}>
  {/* fd="row" ai="center" w={"100%"} ph={20} pv={20}  br={15}   jc="space-between" bg={COLORS.amber} */}
  <View style={{flexDirection:"column",alignItems:"center",width:"100%",padding:20, borderTopRightRadius:15,borderTopLeftRadius:15, justifyContent:"space-between",backgroundColor:COLORS.black}} >
  <ViewAtom fd="row" jc="space-between"  ai="center" w={"100%"}  ph={0}pv={-3}  >

        <TextAtom text={"360 Premium "} f="Poppins"s={SIZES.h3} w={"500"} ta="center" ls={-1}c={COLORS.white} />
        <TextAtom text={"Ksh 199/= "} f="Poppins"s={SIZES.h3} w={"500"} ta="center" ls={-1}c={COLORS.white} />
   
  </ViewAtom>
        <ViewAtom fd="row" jc="space-between"  ai="center" w={"100%"}  ph={0}pv={-3}  >
        <TextAtom text={"Focus"} f="Poppins"s={SIZES.h6} w={"500"} ta="center" ls={0}c={COLORS.white} />
        <TextAtom text={"Per semester "} f="Poppins"s={SIZES.h6} w={"500"} ta="center" ls={0}c={COLORS.white} />

        </ViewAtom>

          {/* <Icon name={"wallet-outline"} type="ionicon" color={COLORS.white} size={SIZES.h2} onPress={() => {}} /> */}
</View>
<ViewAtom fd="column" jc="flex-start"  ai="flex-start" w={"100%"}  ph={20}pv={5}  >
<ViewAtom fd="row" ai="center"  ph={0} pv={3} jc="flex-start" >

<Icon name={"checkmark-circle"} type="ionicon" color={COLORS.white} size={SIZES.h5} onPress={() => {}} />
<TextAtom text={"   Auto-generate your invites-scan-code "} f="Poppins"s={SIZES.h6} w={"500"} ta="left" ls={0}c={COLORS.white} />
</ViewAtom>
<ViewAtom fd="row" ai="center"  ph={0} pv={3} jc="flex-start" >

<Icon name={"checkmark-circle"} type="ionicon" color={COLORS.white} size={SIZES.h5} onPress={() => {}} />
<TextAtom text={"   15,000 free tokens for 360ai research assistant"} f="Poppins"s={SIZES.h6} w={"500"} ta="left" ls={0}c={COLORS.white} />
</ViewAtom>
<ViewAtom fd="row" ai="center"  ph={0} pv={3} jc="flex-start" >

<Icon name={"checkmark-circle"} type="ionicon" color={COLORS.white} size={SIZES.h5} onPress={() => {}} />
<TextAtom text={"   Access priority networks related to your course & career"} f="Poppins"s={SIZES.h6} w={"500"} ta="left" ls={0}c={COLORS.white} />
</ViewAtom>
<ViewAtom fd="row" ai="center"  ph={0} pv={3} jc="flex-start" >

<Icon name={"checkmark-circle"} type="ionicon" color={COLORS.white} size={SIZES.h5} onPress={() => {}} />
<TextAtom text={"   Smart timetable/sedules with customizable notifications"} f="Poppins"s={SIZES.h6} w={"500"} ta="left" ls={0}c={COLORS.white} />
</ViewAtom>
<ViewAtom fd="row" ai="center"  ph={0} pv={3} jc="flex-start" >

<Icon name={"checkmark-circle"} type="ionicon" color={COLORS.white} size={SIZES.h5} onPress={() => {}} />
<TextAtom text={"   Program guide and editable resumes"} f="Poppins"s={SIZES.h6} w={"500"} ta="left" ls={0}c={COLORS.white} />
</ViewAtom>
<ViewAtom fd="row" ai="center"  ph={0} pv={3} jc="flex-start" >

<Icon name={"checkmark-circle"} type="ionicon" color={COLORS.white} size={SIZES.h5} onPress={() => {}} />
<TextAtom text={"   Access Student resources, PDF past-papers for all your units "} f="Poppins"s={SIZES.h6} w={"500"} ta="left" ls={0}c={COLORS.white} />
</ViewAtom>
<ViewAtom fd="row" ai="center"  ph={0} pv={3} jc="flex-start" >

<Icon name={"checkmark-circle"} type="ionicon" color={COLORS.white} size={SIZES.h5} onPress={() => {}} />
<TextAtom text={"   Unlimited maps for venue, class locations and direcations"} f="Poppins"s={SIZES.h6} w={"500"} ta="left" ls={0}c={COLORS.white} />
</ViewAtom>
<ViewAtom fd="row" ai="center"  ph={0} pv={3} jc="flex-start" >

<Icon name={"checkmark-circle"} type="ionicon" color={COLORS.white} size={SIZES.h5} onPress={() => {}} />
<TextAtom text={"   Unlimited themes"} f="Poppins"s={SIZES.h6} w={"500"} ta="left" ls={0}c={COLORS.white} />
</ViewAtom>

<Button text={"Get Focus plan"} width="100%" bg={COLORS.black} borderRadius={10} onMethodSelected={()=>{alert("Pay with m-pesa ")}} />

</ViewAtom>



</CardAtom>
  <CardAtom fd="column" jc="flex-start"  ai="flex-start" pv={0}  bg={theme.color}  br={15} mv={15} mh={0} el={30} sh={COLORS.black}>
  {/* fd="row" ai="center" w={"100%"} ph={20} pv={20}  br={15}   jc="space-between" bg={COLORS.amber} */}
  <View style={{flexDirection:"column",alignItems:"center",width:"100%",padding:20, borderTopRightRadius:15,borderTopLeftRadius:15, justifyContent:"space-between",backgroundColor:COLORS.chocolate}} >
  <ViewAtom fd="row" jc="space-between"  ai="center" w={"100%"}  ph={0}pv={-3}  >

        <TextAtom text={"360 Premium "} f="Poppins"s={SIZES.h3} w={"500"} ta="center" ls={-1}c={COLORS.white} />
        <TextAtom text={"Ksh 499/= "} f="Poppins"s={SIZES.h3} w={"500"} ta="center" ls={-1}c={COLORS.white} />
   
  </ViewAtom>
        <ViewAtom fd="row" jc="space-between"  ai="center" w={"100%"}  ph={0}pv={-3}  >
        <TextAtom text={"Enthusiastic"} f="Poppins"s={SIZES.h6} w={"500"} ta="center" ls={0}c={COLORS.white} />
        <TextAtom text={"Per year (30% off) "} f="Poppins"s={SIZES.h6} w={"500"} ta="center" ls={0}c={COLORS.white} />

        </ViewAtom>

          {/* <Icon name={"wallet-outline"} type="ionicon" color={COLORS.white} size={SIZES.h2} onPress={() => {}} /> */}
</View>
<ViewAtom fd="column" jc="flex-start"  ai="flex-start" w={"100%"}  ph={20}pv={5}  >

<ViewAtom fd="row" ai="center"  ph={0} pv={3} jc="flex-start" >

<Icon name={"checkmark-circle"} type="ionicon" color={COLORS.white} size={SIZES.h5} onPress={() => {}} />
<TextAtom text={"   Auto-generate your invites-scan-code "} f="Poppins"s={SIZES.h6} w={"500"} ta="left" ls={0}c={COLORS.white} />
</ViewAtom>
<ViewAtom fd="row" ai="center"  ph={0} pv={3} jc="flex-start" >

<Icon name={"checkmark-circle"} type="ionicon" color={COLORS.white} size={SIZES.h5} onPress={() => {}} />
<TextAtom text={"   25,000 free tokens for 360ai research assistant"} f="Poppins"s={SIZES.h6} w={"500"} ta="left" ls={0}c={COLORS.white} />
</ViewAtom>
<ViewAtom fd="row" ai="center"  ph={0} pv={3} jc="flex-start" >

<Icon name={"checkmark-circle"} type="ionicon" color={COLORS.white} size={SIZES.h5} onPress={() => {}} />
<TextAtom text={"   Unlimited 360ai assistant selection"} f="Poppins"s={SIZES.h6} w={"500"} ta="left" ls={0}c={COLORS.white} />
</ViewAtom>
<ViewAtom fd="row" ai="center"  ph={0} pv={3} jc="flex-start" >

<Icon name={"checkmark-circle"} type="ionicon" color={COLORS.white} size={SIZES.h5} onPress={() => {}} />
<TextAtom text={"   Access priority networks related to your course & career"} f="Poppins"s={SIZES.h6} w={"500"} ta="left" ls={0}c={COLORS.white} />
</ViewAtom>
<ViewAtom fd="row" ai="center"  ph={0} pv={3} jc="flex-start" >

<Icon name={"checkmark-circle"} type="ionicon" color={COLORS.white} size={SIZES.h5} onPress={() => {}} />
<TextAtom text={"   Smart timetable/sedules with customizable notifications"} f="Poppins"s={SIZES.h6} w={"500"} ta="left" ls={0}c={COLORS.white} />
</ViewAtom>
<ViewAtom fd="row" ai="center"  ph={0} pv={3} jc="flex-start" >

<Icon name={"checkmark-circle"} type="ionicon" color={COLORS.white} size={SIZES.h5} onPress={() => {}} />
<TextAtom text={"   Program guide and editable resumes"} f="Poppins"s={SIZES.h6} w={"500"} ta="left" ls={0}c={COLORS.white} />
</ViewAtom>
<ViewAtom fd="row" ai="center"  ph={0} pv={3} jc="flex-start" >

<Icon name={"checkmark-circle"} type="ionicon" color={COLORS.white} size={SIZES.h5} onPress={() => {}} />
<TextAtom text={"   Access Student resources, PDF past-papers for all your units "} f="Poppins"s={SIZES.h6} w={"500"} ta="left" ls={0}c={COLORS.white} />
</ViewAtom>
<ViewAtom fd="row" ai="center"  ph={0} pv={3} jc="flex-start" >

<Icon name={"checkmark-circle"} type="ionicon" color={COLORS.white} size={SIZES.h5} onPress={() => {}} />
<TextAtom text={"   Unlimited maps for venue, class locations and direcations"} f="Poppins"s={SIZES.h6} w={"500"} ta="left" ls={0}c={COLORS.white} />
</ViewAtom>
<ViewAtom fd="row" ai="center"  ph={0} pv={3} jc="flex-start" >

<Icon name={"checkmark-circle"} type="ionicon" color={COLORS.white} size={SIZES.h5} onPress={() => {}} />
<TextAtom text={"   Unlimited themes"} f="Poppins"s={SIZES.h6} w={"500"} ta="left" ls={0}c={COLORS.white} />
</ViewAtom>
<Button text={"Get Enthusiastic plan"} width="100%" bg={COLORS.black} borderRadius={10}  onMethodSelected={()=>{alert("Pay with m-pesa ")}} />


</ViewAtom>



</CardAtom>
<ViewAtom fd="column" ai="center"  ph={0} pv={3} jc="center" >

<TextAtom text={"Terms and Conditions apply"} f="Poppins"s={SIZES.h6} w={"500"} ta="left" ls={0}c={COLORS.white} />
<TextAtom text={"Threesixty student v-1.1.02"} f="Poppins"s={SIZES.h6} w={"500"} ta="left" ls={0}c={COLORS.white} />
</ViewAtom>
      </ScrollView>
  </LinearAtom> 
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:COLORS.dark,
    height:SIZES.height,
    
  },
 
 
 
});

export default Premium;

