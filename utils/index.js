
export const BASE_URL = "http://192.168.43.102:8000/"  
<<<<<<< HEAD
export const GOOGLE_MAP_KEY = "AIzaSyAqU6CfmRqVar8MRRUdMmk7U3JlQMl2wsU"
=======
export const GOOGLE_MAP_KEY = "AIzaSyA5tg2gPu-u2dKFmcvi7UkEbdw7G_d0Ybk"
>>>>>>> 609b2e1e1d7abf10666e93cdddd011cef40cd2f4

export const getFeatureViewAnimation = (animatedValue, outputX) => {
    const TRANSLATE_X_INPUT_RANGE = [0, 80];
    const translateY = {
      translateY: animatedValue.interpolate({
        inputRange: [0, 100],
        outputRange: [0, -50],
        extrapolate: 'clamp',
      }),
    };
    return {
      transform: [
        {
          translateX: animatedValue.interpolate({
            inputRange: TRANSLATE_X_INPUT_RANGE,
            outputRange: [0, outputX],
            extrapolate: 'clamp',
          }),
        },
        translateY,
      ],
    };
  };