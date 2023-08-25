import React, { useState , useEffect} from 'react';
import { View, TouchableOpacity, Text, StyleSheet,ScrollView ,BackHandler } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import TextAtom from '../components/Atoms/TextAtom';
import { CheckBox, Divider, Icon } from 'react-native-elements';
import ViewAtom from '../components/Atoms/ViewAtom';
import { useDispatch, useSelector } from 'react-redux';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import LinearAtom from '../components/Atoms/LinearAtom';
import CardAtom from '../components/Atoms/CardAtom';
import { Button } from '../components/Atoms/Button';

const Premium = ({navigation}) => {
  const handleBackPress = () => {
    navigation.navigate('Tokens');
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);
    const theme=useSelector(state => state.userReducer.theme);
    const t=useSelector(state => state.userReducer.tokens);
    const dispatch = useDispatch();

    const user=useSelector(state => state.userReducer.user);
    const premium=useSelector(state => state.userReducer.premium);

    const showAlert = (type, title, msg) => {
        Toast.show({
          type: type,
          title: title,
          textBody: msg,
        });
      };
      const plans = [
        {
          title: '360 Freemium',
          price: 'Free',
         offer: 'Forever',
         name: 'Start',
         premium:{isPremium:false,plan:"Start"},
        tokens:{total:3000,},
         features: [
           '3,000 free tokens for 360ai research assistant',
           'Access all networking events related to your course & career',
           'Smart timetable/schedules',
           'Program guide and resumes',
           '1 week free maps for venue, class locations and directions',
           'Up to 3 free themes',
          ],
        },
        {
          title: '360 Premium',
          price: 'Ksh 199/=',
          offer: 'Per semester (30% off till sep 9th)',
          name: 'Focus',
          premium:{isPremium:true,plan:"Focus"},
    tokens:{total:8000},
          features: [
            'Auto-generate your invites-scan-code',
            '8,000 free tokens for 360ai research assistant',
            'Access priority networks related to your course & career',
            'Smart timetable/schedules with customizable notifications',
            'Program guide and editable resumes',
            'Access Student resources, PDF past-papers for all your units',
            'Unlimited maps for venue, class locations and directions',
            'Unlimited themes',
          ],
        },
        {
          title: '360 Premium',
          price: 'Ksh 499/=',
          name: 'Enthusiastic',
          offer: 'Per year (30% off of focus plan)',
          premium:{isPremium:true,plan:"Enthusiastic"},
          tokens:{total:15000},
          
          features: [
            'Auto-generate your invites-scan-code',
            '15,000 free tokens for 360ai research assistant',
            'Unlimited 360ai assistant selection',
            'Access priority networks related to your course & career',
            'Smart timetable/schedules with customizable notifications',
            'Program guide and editable resumes',
            'Access Student resources, PDF past-papers for all your units',
            'Unlimited maps for venue, class locations and directions',
            'Unlimited themes',
          ],
        },
      ];

      const PlanCard = ({ title, price, features,name,offer,plan }) => {
        return (
          <CardAtom
            fd="column"
            jc="flex-start"
            ai="flex-start"
            pv={0}
            bg={COLORS.black}
            br={15}
            mv={15}
            mh={0}
            el={30}
            sh={theme.color}
          >
            <View style={{ flexDirection: 'column', alignItems: 'flex-start', width: '100%', padding: 20, borderTopRightRadius: 15, borderTopLeftRadius: 15, justifyContent: 'space-between', backgroundColor: theme.color }}>
              <ViewAtom fd="row" jc="space-between" ai="center" w={'100%'} ph={0} pv={-3}>
                <TextAtom text={title} f="Poppins" s={SIZES.h3} w={'500'} ta="center" ls={-1} c={COLORS.white} />
                <TextAtom text={price} f="Poppins" s={SIZES.h3} w={'500'} ta="center" ls={-1} c={COLORS.white} />
              </ViewAtom>
              <ViewAtom fd="row" jc="space-between"  ai="center" w={"100%"}  ph={0}pv={-3}  >
        <TextAtom text={name} f="Poppins"s={SIZES.h6} w={"500"} ta="center" ls={0}c={COLORS.white} />
        <TextAtom text={offer} f="Poppins"s={SIZES.h6} w={"500"} ta="center" ls={0}c={COLORS.white} />

        </ViewAtom>
            </View>
        <ViewAtom  mv={10} ph={20} >

              {features.map((feature, index) => (
                <ViewAtom key={index} fd="row" ai="center" ph={0} pv={3} jc="flex-start">
                  <Icon name={'checkmark-circle'} type="ionicon" color={COLORS.white} size={SIZES.h5} onPress={() => {}} />
                  <TextAtom text={`  ${feature}`} f="Poppins" s={SIZES.h6} w={'500'} ta="left" ls={0} c={COLORS.white} />
                </ViewAtom>
              ))}
              </ViewAtom>
              <ViewAtom  mv={10} ph={20} w="100%" >

              <Button text={`Get ${name} plan`} width="100%" bg={theme.color} borderRadius={8} onMethodSelected={() => { handlePremium(plan) }} />
              </ViewAtom>
          </CardAtom>
        );
      };
   const handlePremium=(plan)=>{

    dispatch({
      type: "MY_PREMIUM",
      payload:plan.premium
    });
    dispatch({
      type: "MY_TOKENS",
      payload:{total:plan.tokens.total,pending:t.pending,ai:plan.tokens.total,withdrawableTokens:t.withdrawableTokens,withdrawableAmount:t.withdrawableAmount}
    });
   }
  return (
    <View style={styles.container}>
        <LinearAtom   pv={5}  ph={20} bg={COLORS.white} br={0} mv={0} mh={0} w="100%"  jc="center" el={0} sh='#000' colors={[theme.color,COLORS.dark]} >
  <ViewAtom fw="wrap" fd="row" jc="center" ai="center" w="100%" bg="transparent" pv={5} br={0} mv={20} mh={0}>
     
</ViewAtom>
  <TextAtom text={"Discover Premium"} f="Poppins"s={SIZES.h1} w={"500"} ta="center" ls={-2}c={COLORS.white} />
  <TextAtom text={`-${premium.plan} Plan-`} f="Poppins"s={SIZES.base} w={"700"} ta="center" ls={0}c={COLORS.gray4} />
  <TextAtom text={"Lets you choose plans that meet your academic and financial needs"} f="Poppins"s={SIZES.base} w={"500"} ta="center" ls={0}c={COLORS.gray4} />

  <ScrollView  showsVerticalScrollIndicator={false}    >

  <ViewAtom  fd="row" jc="center" ai="center" w="100%" bg="transparent" pv={5} br={0} mv={0} mh={0}>
  <Icon name="medal-outline" type="ionicon"  color={COLORS.gray4} size={SIZES.largeTitle} />

  </ViewAtom>
  {plans.map((plan, index) => (
        <PlanCard key={index} title={plan.title} price={plan.price} features={plan.features} name={plan.name} offer={plan.offer} plan={plan} />
      ))}
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

