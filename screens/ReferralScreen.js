import React, { useState, useEffect } from 'react';
import { View, Text, Image,StyleSheet ,TouchableOpacity,ActivityIndicator} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
import QRCode from 'react-native-qrcode-svg';
import LinearAtom from '../components/Atoms/LinearAtom';
import ViewAtom from '../components/Atoms/ViewAtom';
import { COLORS, SIZES } from '../constants/theme';
import { Icon } from 'react-native-elements';
import TextAtom from '../components/Atoms/TextAtom';
import { Button } from '../components/Atoms/Button';
import { useSelector } from 'react-redux';
import { BackHandler } from 'react-native';

const ReferralScreen = ({navigation}) => {
           //=================backpress====================
const handleBackPress = () => {
  navigation.navigate("Me")
    return true;
  };
  
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);
  //=================backpress====================
  const theme=useSelector(state => state.userReducer.theme);
  const premium=useSelector(state => state.userReducer.premium);

  const [qrCodeData, setQrCodeData] = useState(null);
  const [isScanning, setIsScanning] = useState(premium.isPremium);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scanned')

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setTimeout(() => {
        setHasPermission(status === 'granted');
      }, 2000);
    })()
  }

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data)
    console.log('Type: ' + type + '\nData: ' + data)
  };

  // Check permissions and return the screens
 
 
  return (
    <View style={{flex:1,marginTop:0,display:"flex",flexDirection:"column",}}>
      {/* Section for generating QR code signature */}
      <LinearAtom   pv={5}  ph={20} bg={COLORS.white} br={0} mv={0} mh={0}   el={0} sh='#000' colors={[theme.color,COLORS.dark]} >
                <ViewAtom fw="wrap" fd="row" jc="center" ai="center" w="100%" bg="transparent" pv={5} br={0} mv={20} mh={0}>    
     </ViewAtom>

     <ViewAtom fd="row" width="100%" ph={10} pv={10} jc="space-between" >
        <Icon name={"arrow-back-outline"} type="ionicon" color={COLORS.white} size={SIZES.h2} onPress={() => {navigation.navigate('Me')}} />
        {isScanning?<ViewAtom fd="row"  ph={7} pv={5} bg={COLORS.dark} br={15} >
        <TouchableOpacity onPress={()=>{ setIsScanning(!isScanning)}}>
          <TextAtom text={"Generate QR"} f="Poppins"s={SIZES.h5} w={"500"} ls={0}c={COLORS.white} />
        </TouchableOpacity>
      </ViewAtom>:<></>}
      
</ViewAtom>
  <TextAtom text={"Invites"} f="Poppins"s={SIZES.h1} w={"500"} ta="left" ls={-2}c={COLORS.white} />
  <TextAtom text={"Lets you earn while you share the goodness of 360 to friends and peers"} f="Poppins"s={SIZES.h5} w={"500"} ta="left" ls={0}c={COLORS.gray} />
 
  {hasPermission === null? <ViewAtom  fd="column" jc="center" ai="center" w="100%" bg="transparent" pv={50} br={0} mv={5} mh={0}>
     
     <ActivityIndicator size="small" color={COLORS.white} style={{marginBottom:20}} />
     <TextAtom text={"Requesting for camera permission"} f="Poppins"s={SIZES.base} w={"500"} ta="center" ls={0}c={COLORS.gray} />

 </ViewAtom>:
  <>
  {hasPermission === false?<>
    <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
  </>:
  
  <>
                <ViewAtom  fd="column" jc="center" ai="center" w="100%" bg="transparent" pv={5} br={0} mv={10} mh={0}>
                {/* <Icon name={"scan"} type="ionicon" color={COLORS.white} size={SIZES.largeTitle} onPress={() => {navigation.navigate('Me')}} /> */}

     
     {!isScanning&& <QRCode value='https://www.github.com/chelseafarley' logo={require('../assets/360.png')}
      logoSize={30}
      logoBackgroundColor='transparent' size={200}/>}

      {/* Section for scanning QR code */}
      {hasPermission && !qrCodeData && (
        <View>
          {isScanning &&(
            <View style={styles.barcodebox}>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={{ height: 400, width: 400 }} />
          </View>
          )}

        </View>
      )}
     </ViewAtom>
     <ViewAtom  fd="column" jc="flex-start" ai="center" w="100%" bg="transparent" pv={5} br={0} mv={20} mh={0}>    
    
     <TextAtom text={!isScanning?"Refer-a-Friend Program  ":"Your scan key"} f="Poppins"s={SIZES.h2} w={"500"} ta="center" ls={-2}c={COLORS.white} />
     {!isScanning?<TextAtom text={"Earn fast easy cash sharing 360 with your friends and peers and grow together"} f="Poppins"s={SIZES.h5} w={"500"} ta="center" ls={0}c={COLORS.gray2} />:<TextAtom text={"-#GFG8F6-"} f="Poppins"s={SIZES.h1} w={"500"} ta="center" ls={0}c={COLORS.gray2} />}

     </ViewAtom>
     <View style={{}} >
     { premium.isPremium &!isScanning?<Button text={"Add invite"}width={"100%"}bg={theme.color}  screen={""} onMethodSelected={()=>{setIsScanning(!isScanning)}}borderRadius={10}s={SIZES.h5}pv={0}ph={0} tc={COLORS.white} />:
      <Button text={!isScanning?"Take a tour":"Invites & revenue"}width={"100%"}bg={theme.color} navigation={navigation} screen={!isScanning?"InvitesOnboarding":"Tokens"} onMethodSelected={()=>{}}borderRadius={10}s={SIZES.h5}pv={0}ph={0} tc={COLORS.white} />}
     </View>
  </>
  }
  </>

  }


     </LinearAtom>
    </View>
  );
};
const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     backgroundColor: '#fff',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //   },
      maintext: {
        fontSize: 16,
        margin: 20,
      },
    barcodebox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        width: 304,
        overflow: 'hidden',
        borderRadius: 30,
        padding:0,
        backgroundColor: COLORS.white
      }
  });
export default ReferralScreen;