import React, { useState,useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import TextAtom from '../components/Atoms/TextAtom';
import { CheckBox, Divider, Icon } from 'react-native-elements';
import ViewAtom from '../components/Atoms/ViewAtom';
import { useSelector } from 'react-redux';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { Button } from '../components/Atoms/Button';
import { ActivityIndicator } from 'react-native-paper';
import LinearAtom from '../components/Atoms/LinearAtom';
import BottomTabs from '../components/Molecules/BottomTabs';
import { ProgramsArray } from '../constants/content/programs';
import Carousel from 'react-native-reanimated-carousel';
import { useRef } from 'react';
import { BackHandler } from 'react-native';
<<<<<<< HEAD
import Discord from './Discord';
import Resources from '../components/Molecules/Resources';
import { ScrollView } from 'react-native';

import V2Modal from '../components/Molecules/V2Modal';
import Modal from "react-native-modal";
=======

>>>>>>> 609b2e1e1d7abf10666e93cdddd011cef40cd2f4
const Program = ({navigation}) => {
           //=================backpress====================
const handleBackPress = () => {
  navigation.navigate("Home")
    return true;
  };
  
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);
  //=================backpress====================
<<<<<<< HEAD
  const programItems=[ <Resources navigation={navigation}/>  , <Discord navigation={navigation} />]
  const [program,setProgramName]=useState("")

    const theme=useSelector(state => state.userReducer.theme);
    const user=useSelector(state => state.userReducer.user);
   const [checking,setchecking]=useState(true)
   useEffect(() => {
    setProgramName(user.StudentProgram)
    setTimeout(() => {
    setchecking(false)
  }, 5000);
  }, []);
    // const ProgramView=({item, navigation})=>{
    //   return(
    //     <View style={{ flex: 1,}}>

    //     {/* <TextAtom text={item} f="Poppins"s={SIZES.h1} w={"500"} ta="left" ls={-2}c={COLORS.white} /> */}
    //     {/* <TextAtom text={program.programName} f="Poppins"s={SIZES.h3} w={"500"} ta="left" ls={-2}c={COLORS.white} /> */}
    //     </View>

    //   )
    // }
=======
  const programItems=["Guide","Resources","Resume"]
  const [program,setProgramName]=useState("")
  function getProgramByCode(programCode) {
    for (let i = 0; i < ProgramsArray.length; i++) {
      if (ProgramsArray[i].programCode === programCode) {
        setProgramName(ProgramsArray[i])
          return (ProgramsArray[i]) 
      }
    }
    return(null)
  }
    const user=useSelector(state => state.userReducer.user);
   const [checking,setchecking]=useState(true)
   useEffect(() => {
    getProgramByCode(user.ProgramId)
  setTimeout(() => {
    setchecking(false)
  }, 5000);
  }, []);
    const ProgramView=({item, navigation})=>{
      return(
        <ViewAtom fw="wrap" fd="row" jc="flex-start" ai="center" w="100%" bg="transparent" pv={5} br={0} mv={20} mh={0}>
     
        <TextAtom text={item} f="Poppins"s={SIZES.h1} w={"500"} ta="left" ls={-2}c={COLORS.white} />
        {/* <TextAtom text={program.programName} f="Poppins"s={SIZES.h3} w={"500"} ta="left" ls={-2}c={COLORS.white} /> */}
             </ViewAtom>
      )
    }
>>>>>>> 609b2e1e1d7abf10666e93cdddd011cef40cd2f4
    const ref = useRef(null);
    const [activeIndex,setActiveIndex]=useState(0)
    useEffect(() => {
      ref.current?.scrollTo({ index: activeIndex });
    }, [activeIndex]);
  return (
    <View style={styles.container}>
<<<<<<< HEAD
                 <LinearAtom   pv={5}  ph={0} bg={COLORS.white} br={0} mv={0} mh={0}   el={0} sh='#000' colors={[theme.color,COLORS.dark]} >
            
             



          <ScrollView contentContainerStyle={styles.scrollViewContent}>
  
      <Resources navigation={navigation}/> 
  </ScrollView>
  <Modal isVisible={true}>
        <ViewAtom fd="row" w='100%' jc="center" ai="center"  bg="transparent" pv={0} ph={10} br={0} mv={0} mh={0}>
           <V2Modal navigation={navigation} screen={"Home"} feature={'360 Program resources'} date={'9th September 2023.'} text='360 Program resources feature is scheduled for release on '/>
   
              
         </ViewAtom>
      </Modal>
=======
                 <LinearAtom   pv={5}  ph={20} bg={COLORS.white} br={0} mv={0} mh={0}   el={0} sh='#000' colors={[COLORS.black,COLORS.dark]} >
                <ViewAtom fw="wrap" fd="row" jc="center" ai="center" w="100%" bg="transparent" pv={5} br={0} mv={20} mh={0}>
     
     </ViewAtom>



<Carousel
        ref={ref}
        loop={true}
        width={SIZES.width-10}
        height={SIZES.height}
        autoPlay={false}
        data={programItems}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => {
          setActiveIndex(index);
        }}
        renderItem={({ item: item }) => <ProgramView item={item}  navigation={navigation} />}
      />
>>>>>>> 609b2e1e1d7abf10666e93cdddd011cef40cd2f4
        </LinearAtom>  
            
  <BottomTabs navigation={navigation} theme={COLORS.primary} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:COLORS.dark,
    height:SIZES.height,
    paddingTop:0,
  },
<<<<<<< HEAD
  scrollViewContent: {
    flexGrow: 1,
  },
=======
 
>>>>>>> 609b2e1e1d7abf10666e93cdddd011cef40cd2f4
  pinDot: {
    width: SIZES.h3,
    height: SIZES.h3,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.gray2,
    marginHorizontal: 5,
  },
  pinDotFilled: {
    backgroundColor:COLORS.gray2,
  },
  keypadContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems:"center",
    justifyContent:"center",
  },
  keypadButton: {
    width: '30%',
   aspectRatio:1.5,
    alignItems: 'center',
    justifyContent: 'center',

  },
 
});

export default Program;

<<<<<<< HEAD
=======
// import React, { useState,useEffect } from 'react';
// import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
// import { COLORS, SIZES } from '../constants/theme';
// import TextAtom from '../components/Atoms/TextAtom';
// import { CheckBox, Divider, Icon } from 'react-native-elements';
// import ViewAtom from '../components/Atoms/ViewAtom';
// import { useSelector } from 'react-redux';
// import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
// import { Button } from '../components/Atoms/Button';
// import { ActivityIndicator } from 'react-native-paper';
// import LinearAtom from '../components/Atoms/LinearAtom';
// import BottomTabs from '../components/Molecules/BottomTabs';
// import { greet } from '../utils/helper';

// const Me= ({navigation}) => {
//     const user=useSelector(state => state.userReducer.user);
//    const [checking,setchecking]=useState(true)
//    useEffect(() => {
//   setTimeout(() => {
//     setchecking(false)
//   }, 5000);
//   }, []);
      
//   return (
//     <View style={styles.container}>
//     <LinearAtom   pv={5}  ph={10} bg={COLORS.white} br={0} mv={0} mh={0}   el={0} sh='#000' colors={[COLORS.black,COLORS.dark]} >
//     <ViewAtom fw="wrap" fd="row" jc="center" ai="center" w="100%" bg="transparent" pv={5} br={0} mv={10} mh={0}>
     
//      </ViewAtom>
//     <ViewAtom  fd="column" jc="flex-start" ai="flex-start" w="100%" bg="transparent" pv={5} br={0} mv={0} mh={0}>
     
//     <ViewAtom  fd="row" jc="space-between" ai="center" w="100%" bg="transparent" pv={5} br={0} mv={0} mh={0}>
//      <TextAtom text={greet()} f="Poppins"s={SIZES.h2} w={"500"}  ls={-2}c={COLORS.white} />
//         <ViewAtom  fd="row" jc="space-between" ai="center" w="30%" bg="transparent" pv={5} br={0} mv={0} mh={0}>
//         <Icon name="information-circle" type="ionicon" ios="ios-lock" md="ios-lock" color={COLORS.white} size={SIZES.h2} />
//         <Icon name="mail-unread" type="ionicon" ios="ios-lock" md="ios-lock" color={COLORS.white} size={SIZES.h2} />
//         <Icon name="log-out" type="ionicon" ios="ios-lock" md="ios-lock" color={COLORS.white} size={SIZES.h2} />

//           </ViewAtom>
//     </ViewAtom>
//           <TextAtom text={user.firstName} f="Poppins"s={SIZES.h3} w={"500"}  ls={-2}c={COLORS.white} />
//      </ViewAtom>
   
//         </LinearAtom>  

// <BottomTabs navigation={navigation} theme={COLORS.primary} />

// </View>
// );
// };

// const styles = StyleSheet.create({
// container: {
// flex:1,
// backgroundColor:COLORS.dark,
// height:SIZES.height,
// paddingTop:0,
// },
 
//   pinDot: {
//     width: SIZES.h3,
//     height: SIZES.h3,
//     borderRadius: 5,
//     borderWidth: 1,
//     borderColor: COLORS.gray2,
//     marginHorizontal: 5,
//   },
//   pinDotFilled: {
//     backgroundColor:COLORS.gray2,
//   },
//   keypadContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     alignItems:"center",
//     justifyContent:"center",
//   },
//   keypadButton: {
//     width: '30%',
//    aspectRatio:1.5,
//     alignItems: 'center',
//     justifyContent: 'center',

//   },
 
// });

// export default Me;


// import React, { useState,useEffect,useRef } from 'react';
// import { View, TouchableOpacity, Text, StyleSheet,Image , ScrollView,  SafeAreaView,  Animated,  TextInput,} from 'react-native';
// import { COLORS, SIZES } from '../constants/theme';
// import TextAtom from '../components/Atoms/TextAtom';
// import { CheckBox, Divider, Icon } from 'react-native-elements';
// import ViewAtom from '../components/Atoms/ViewAtom';
// import { useSelector } from 'react-redux';
// import BottomTabs from '../components/Molecules/BottomTabs';
// import LinearAtom from '../components/Atoms/LinearAtom';
// import Upcoming from '../components/Molecules/Upcoming';
// import { getTimeSpans } from '../utils/timeFunction';
// import moment from 'moment';
// import ProgressMic from '../components/Molecules/ProgressMic';
// import CardAtom from '../components/Atoms/CardAtom';
// import { greet } from '../utils/helper';


// const AnimatedCard = Animated.createAnimatedComponent(View);
// const AnimatedImage = Animated.createAnimatedComponent(Image);
// const AnimatedTO = Animated.createAnimatedComponent(TouchableOpacity );


// const Me = ({navigation}) => {
//   const user=useSelector(state => state.userReducer.user);
//   const bgs=[COLORS.primary,COLORS.amber,COLORS.green,COLORS.gold,COLORS.gray2,COLORS.rose,COLORS.fuschia,COLORS.blue,COLORS.green2,COLORS.chocolate,COLORS.pink]
//   const [BgIndex,setBgIndex]=useState(9)
//   const theme=bgs[BgIndex]
//   //==============SCROLL ANIMATION===========
//   const animatedValue = useRef(new Animated.Value(0)).current;
//   const scrollViewRef = useRef(null);
//   const lastOffsetY = useRef(0);
//   const scrollDirection = useRef('');

//   const cardContainerAnimation = {
//    marginTop: animatedValue.interpolate({
//       inputRange: [0, 100],
//       outputRange: [130, 130],
//       extrapolate: 'clamp',
//     }),
//   };
//   const featureNameAnimation = {

//   //  opacity: animatedValue.interpolate({
//   //     inputRange: [0, 100],
//   //     outputRange: [1, 0],
//   //     extrapolate: 'clamp',
//   //   }),
//    height: animatedValue.interpolate({
//       inputRange: [0, 100],
//       outputRange: [100, 150],
//       extrapolate: 'clamp',
//     }),
//    borderRadius: animatedValue.interpolate({
//       inputRange: [0, 100],
//       outputRange: [0, 5],
//       extrapolate: 'clamp',
//     }),

//     left: animatedValue.interpolate({
//       inputRange: [0, 100],
//       outputRange: [0, 10],
//       extrapolate: 'clamp',
//     }),
//     right: animatedValue.interpolate({
//       inputRange: [0, 100],
//       outputRange: [0, 10],
//       extrapolate: 'clamp',
//     }),
//     top: animatedValue.interpolate({
//       inputRange: [0, 100],
//       outputRange: [0, 40],
//       extrapolate: 'clamp',
//     }),
//     // backgroundColor: animatedValue.interpolate({
//     //   inputRange: [0, 100],
//     //   outputRange: [COLORS.dark2, theme],
//     //   extrapolate: 'clamp',
//     // }),
//   };
//   const featureIconAnimation = {
//     opacity: animatedValue.interpolate({
//       inputRange: [0, 15],
//       outputRange: [1,0],
//       extrapolate: 'clamp',
//     }),
//     transform: [
//       {
//         translateY: animatedValue.interpolate({
//           inputRange: [0, 20],
//           outputRange: [0, -150],
//           extrapolate: 'clamp',
//         }),
//       },
//     ],
//   };

//   const aiAnimation = {
//     transform: [
//       {
//         translateX: animatedValue.interpolate({
//           inputRange: [0, 25],
//           outputRange: [0, 160],
//           extrapolate: 'clamp',
//         }),
//       },
//       {
//         translateY: animatedValue.interpolate({
//           inputRange: [0, 25],
//           outputRange: [5, 20],
//           extrapolate: 'clamp',
//         }),
//       },
//     ],

//   };
//   const aiAnimation2 = {
//     transform: [
//       {
//         translateX: animatedValue.interpolate({
//           inputRange: [0, 25],
//           outputRange: [-10, -25],
//           extrapolate: 'clamp',
//         }),
//       },
//       {
//         translateY: animatedValue.interpolate({
//           inputRange: [0, 25],
//           outputRange: [0, 10],
//           extrapolate: 'clamp',
//         }),
//       },
//     ],

//   };
//   const aiAnimation3 = {
//     opacity: animatedValue.interpolate({
//        inputRange: [0, 25],
//        outputRange: [0,1],
//        extrapolate: 'clamp',
//      }),
//      transform: [
//       {
//         translateY: animatedValue.interpolate({
//           inputRange: [0, 20],
//           outputRange: [10, 10],
//           extrapolate: 'clamp',
//         }),
//       },
//       {
//         translateX: animatedValue.interpolate({
//           inputRange: [0, 25],
//           outputRange: [-SIZES.width+50, -SIZES.width+50],
//           extrapolate: 'clamp',
//         }),
//       },
//     ],
 
//    };

//   //==============SCROLL ANIMATION===========
// console.log(user);
//   return (
//     <View style={styles.container}>
// <LinearAtom  ai="center"  pv={0}  ph={0} bg={COLORS.white} br={0} mv={0} mh={0}   el={0} sh='#000' colors={[theme,COLORS.dark]} >
      
//                 <AnimatedCard 
//                     style={[{
//                       position:"absolute", 
                                          
//                     display:"flex",
//                     flexDirection:"row",
//                     justifyContent: "space-between",
//                     paddingVertical:10,
//                     paddingHorizontal:10,
//                     zIndex:4,
//                    backgroundColor:COLORS.dark2,
//                      elevation:3,
//                     shadowColor:'#525252'
//                     },featureNameAnimation]}>
//                 <ViewAtom fd="column" jc="flex-start" ai="flex-start"  w={"100%"} pv={0} br={0} mv={0} mh={0}>
              
//                 <ViewAtom  fd="column" jc="flex-start" ai="flex-start" w="100%" bg="transparent" pv={5} br={0} mv={0} mh={0}>


//                 <AnimatedCard style={[{               
//                     },featureIconAnimation]}>

//          <ViewAtom  fd="row" jc="space-between" ai="center" w="100%" bg="transparent" pv={5} br={0} mv={0} mh={0}>
//           <TextAtom text={greet()} f="Poppins"s={SIZES.h2} w={"500"}  ls={-2}c={COLORS.white} />
//               <ViewAtom  fd="row" jc="space-between" ai="center" w="40%" bg="transparent" pv={5} br={0} mv={0} mh={0}>
//               <Icon name="create" type="ionicon" ios="ios-lock" md="ios-lock" color={COLORS.white} size={SIZES.h2} />
//               <Icon name="information-circle" type="ionicon" ios="ios-lock" md="ios-lock" color={COLORS.white} size={SIZES.h2} />
//               <Icon name="mail-unread" type="ionicon" ios="ios-lock" md="ios-lock" color={COLORS.white} size={SIZES.h2} />
//               <Icon name="log-out" type="ionicon" ios="ios-lock" md="ios-lock" color={COLORS.white} size={SIZES.h2} />
     
//                </ViewAtom>
//           </ViewAtom>
//                <TextAtom text={`${user.firstName} ${user.lastName}`} f="Poppins"s={SIZES.h3} w={"500"}  ls={-1}c={COLORS.white} />
         
//           </AnimatedCard>
     
//         </ViewAtom>
     
//             </ViewAtom>  
//             <AnimatedCard style={[{               
//             },aiAnimation3 ]}>
//                <ViewAtom  fd="row" jc="space-between" ai="center"  bg="transparent" pv={5} br={0} mv={0} mh={0}>
//                 <Image source={require('../assets/user.jpg')} style={[styles.Icon]} />
//               <ViewAtom  fd="row" jc="space-between" ai="center" w="70%" bg="transparent" pv={5} br={0} mv={0} mh={0}>
//               <ViewAtom  fd="column" jc="center" ai="center" bg="transparent" pv={5} br={0} mv={0} mh={0}>
//               <TextAtom text={`${user.Year}`} f="Poppins"s={SIZES.base} w={"500"}  c={COLORS.gray2} />
//               <TextAtom text={`year`} f="Poppins"s={SIZES.h3} w={"500"}  ls={-1}c={COLORS.white} />
//               </ViewAtom>
//               <ViewAtom  fd="column" jc="center" ai="center" bg="transparent" pv={5} br={0} mv={0} mh={0}>
//               <TextAtom text={`${user.Sem}`} f="Poppins"s={SIZES.base} w={"500"}  c={COLORS.gray2} />
//               <TextAtom text={`Semester`} f="Poppins"s={SIZES.h3} w={"500"}  ls={-1}c={COLORS.white} />
//               </ViewAtom>
//               <ViewAtom  fd="column" jc="center" ai="center" bg="transparent" pv={5} br={0} mv={0} mh={0}>
//               <TextAtom text={`${user.ProgramId}`} f="Poppins"s={SIZES.base} w={"500"}  c={COLORS.gray2} />
//               <TextAtom text={`program`} f="Poppins"s={SIZES.h3} w={"500"}  ls={-1}c={COLORS.white} />
//               </ViewAtom>
            
     
//                </ViewAtom>
//           </ViewAtom>

//              </AnimatedCard>
         

//             </AnimatedCard>
//             <AnimatedCard style={[{display:"flex",zIndex:0
//                     },cardContainerAnimation]}>
//           </AnimatedCard >
  
    
// <ScrollView
//         showsVerticalScrollIndicator={false}
//         ref={scrollViewRef}
//         onScroll={(e) => {
//           const offsetY = e.nativeEvent.contentOffset.y;
//           scrollDirection.current =
//             offsetY - lastOffsetY.current > 0 ? 'down' : 'up';
//           lastOffsetY.current = offsetY;
//           animatedValue.setValue(offsetY);
//         }}
    
//         scrollEventThrottle={0}
//         style={{zIndex:1}}
//       >
    
      


//  <ViewAtom fd="row" jc="space-between"  ai="flex-start"  bg="transparent" pv={0} br={0} mv={0} mh={10}>
//  <TextAtom text={`Coming up`}  c={COLORS.white} f="Poppins" s={SIZES.h3} w="500" />
//  <ViewAtom   fd="row" ai="center"  bg={theme} pv={3} ph={3} br={50} mv={0} mh={0}>
//  <TextAtom text={`see all  `} c={COLORS.white} f="Poppins" s={SIZES.base} w="500" />

//  <Icon name={"return-up-forward-outline"} type="ionicon" color={COLORS.white} size={SIZES.h3} onPress={() => {}} />
// </ViewAtom>
// </ViewAtom>
// <ViewAtom   bg="transparent" pv={0} br={0} mv={0} mh={10}>
// <Upcoming UpcomingArr={[]}/>
// <Upcoming UpcomingArr={[]}/>
// <Upcoming UpcomingArr={[]}/>
// <Upcoming UpcomingArr={[]}/>
// <Upcoming UpcomingArr={[]}/>
// <Upcoming UpcomingArr={[]}/>
// <Upcoming UpcomingArr={[]}/>
// <Upcoming UpcomingArr={[]}/>
// <Upcoming UpcomingArr={[]}/>
// <Upcoming UpcomingArr={[]}/>
// {/* <Upcoming UpcomingArr={[]}/>
// <Upcoming UpcomingArr={[]}/>
// <Upcoming UpcomingArr={[]}/>
// <Upcoming UpcomingArr={[]}/>
// <Upcoming UpcomingArr={[]}/>
// <Upcoming UpcomingArr={[]}/>
// <Upcoming UpcomingArr={[]}/> */}
// </ViewAtom>

//  </ScrollView>



// </LinearAtom>
//   <BottomTabs navigation={navigation} theme={theme} />
  
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex:1,
//     backgroundColor:COLORS.dark,
//     height:SIZES.height,
//     paddingTop:0,
//     padding:0,
//     // width:SIZES.width
//     // alignItems:"center"
//   },
//   Icon: {
//     width: 80,
//     height: 80,
//     borderRadius: 50,
//     margin:-10
//   },

 
// });

// export default Me;

>>>>>>> 609b2e1e1d7abf10666e93cdddd011cef40cd2f4

