import { useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Easing } from 'react-native-reanimated';
import ViewAtom from '../Atoms/ViewAtom';
import { COLORS, SIZES } from '../../constants/theme';
import CardAtom from '../Atoms/CardAtom';
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
const NetworkItemSkeleton = () => {
    const theme = useSelector(state => state.userReducer.theme);

    const opacity = new Animated.Value(1);
  const arr=[1,2,3,4,5,6,7,8]
    // Create a looped animation for opacity
   
    // Start the animation when the component mounts
    useEffect(() => {
        const opacityAnimation = Animated.loop(
            Animated.sequence([
              Animated.timing(opacity, {
                toValue: 0.2,
                duration: 1500, // 1 second
                useNativeDriver: true,
              }),
              Animated.timing(opacity, {
                toValue: .9,
                duration: 1500, // 1 second
                useNativeDriver: true,
              }),
            ]),
            { iterations: -1 }, // Infinite loop
           
          );
      
          opacityAnimation.start();
      
          return () => opacityAnimation.stop();
    }, [opacity]);
  
    return (

        <>
    {  arr.map(n=>{
        return(

            <Animated.View style={[styles.skeletonItem, { opacity }]}>
              {/* Your skeleton content goes here */}
              <ViewAtom fd="row" jc="space-between" ai="center" w="100%" bg="transparent" pv={5} br={0} mv={0} mh={0}>
                <ViewAtom fd="row" jc="flex-start" ai="center" bg="transparent" pv={5} br={0} mv={0} mh={0}>
                  <CardAtom fd="row" jc="space-between" ai="flex-start" pv={0} ph={0} bg={COLORS.black} br={20} mv={0} mh={0} el={3} sh='#525252'>
                    <Image source={require("../../assets/events.png")} style={styles.Icon} resizeMode="contain" />
                  </CardAtom>
                  <ViewAtom fd="column" jc="flex-start" ai="flex-start"  w="50%" bg="transparent" pv={5} br={0} mv={0} mh={5}>
                    <CardAtom fd="row" jc="space-between" w="60%" ai="flex-start" pv={4} ph={0} bg={COLORS.white} br={5} mv={4} mh={0} el={3} sh='#525252'>
                      {/* Placeholder text */}
                    </CardAtom>
                    <CardAtom fd="row" jc="space-between" w="90%" ai="flex-start" pv={3} ph={0} bg={COLORS.gray4} br={5} mv={4} mh={0} el={3} sh='#525252'>
                      {/* Placeholder text */}
                    </CardAtom>
                    <CardAtom fd="row" jc="space-between" w="80%" ai="flex-start" pv={3} ph={0} bg={COLORS.black} br={2} mv={4} mh={0} el={3} sh='#525252'>
                      {/* Placeholder text */}
                    </CardAtom>
                  </ViewAtom>
                </ViewAtom>
                <ViewAtom fd="row" jc="flex-start" ai="center" bg="transparent" pv={5} br={0} mv={0} mh={0}>
                  <Icon name={"chevron-forward-outline"} type="ionicon" color={COLORS.white} size={SIZES.h3} onPress={() => {}} />
                </ViewAtom>
              </ViewAtom>
            </Animated.View>
        )
    })  
    }
        </>
    );
  };
  
  const styles = StyleSheet.create({
    skeletonItem: {
    //   backgroundColor: '#f0f0f0', // Skeleton background color
    //   padding: 10,
    //   marginVertical: 5,
    //   borderRadius: 8,
    },
    Icon: {
      width: 60,
      height: 60,
      borderRadius: 5,
    },
    placeholderText: {
    //   backgroundColor: '#ddd', // Placeholder text background color
      width: 100, // Adjust the width as needed
      height: 20, // Adjust the height as needed
      borderRadius: 5,
    },
    // Other styles...
  });
  
  export default NetworkItemSkeleton;
  