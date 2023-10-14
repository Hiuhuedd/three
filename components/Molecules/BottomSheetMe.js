import React ,{useState,useEffect}from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, Platform,TextInput,ScrollView } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Axios from 'axios';
import { Button } from '../Atoms/Button';
import Feather from 'react-native-vector-icons/Feather';
import appTheme from '../../constants/theme';
import ViewAtom from '../Atoms/ViewAtom';
import TextAtom from '../Atoms/TextAtom';
import CardAtom from '../Atoms/CardAtom';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from 'react-native-elements';
import { ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, collection, setDoc, doc } from 'firebase/firestore';
import { storage } from '../../firebase';
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage"; 
const {COLORS, SIZES, FONTS}=appTheme
const BottomSheetMe = React.forwardRef(({onMethodSelected,navigation,tData}, ref) => {
  const [Loading, setLoading] = React.useState(false);

  const theme=useSelector(state => state.userReducer.theme);
  const user=useSelector(state => state.userReducer.user);
  
 console.log(user);
  const [item, setItem] = useState({
    DOB: "",
    Gender: user.Gender,
    id: user.id,
    ProgramId: user.ProgramId,
    Sem: user.Sem,
    StudentProgram: user.StudentProgram,
    pin: user.pin,
   firstName:user.firstName,
   lastName:user.lastName,
   email:user.email,
   phone:user.phone,
  StudentId:user.StudentId,
  Year:user.Year,
    profile:user.profile
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [uploaded, setuploaded] = useState(null);

  useEffect(() => {
    console.log(user);
    (async () => {
      // Ask for permission to access the device's camera roll
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);
  const dispatch=useDispatch()
  useEffect(() => {
   ( async()=>{
    if (uploaded) {
      console.log("====handle update====",item);
      setItem({...item,profile:uploaded})

      
      
      try {
        const db = getFirestore();
        const collectionRef = collection(db, 'users'); // Collection reference
        const documentRef = doc(collectionRef, user.id); // Document reference
         await setDoc(documentRef, { user });
        alert("Profile update successful")
        onMethodSelected()
  
         setLoading(false)
      } catch (error) {
        setLoading(false)
    console.error('Error uploading user data:', error);
      }
    }
      const iString=JSON.stringify(item)
      await AsyncStorage.setItem('Student',iString);
      dispatch({ type: 'ON_USER', payload: item });
      console.log("====useeefect====",item);

    })();
  }, [uploaded]);
const pickImage = async () => {
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!result.canceled) { // Fix the typo here
      setSelectedImage(result);
      setItem({ ...item, profile: result.assets[0].uri });
    }
  } catch (error) {
    console.error('Error picking an image:', error);
  }
};

  const uploadImageToFirebase = async () => {
    if (selectedImage) {
      try {
        const fetchResponse = await fetch(selectedImage.uri);
  const theBlob = await fetchResponse.blob();

  const recordRef = storageRef(storage, "profileImages/"+user.id);

  const uploadTask = await uploadBytes(recordRef, theBlob);
  if (uploadTask) {
    const downloadURL = await getDownloadURL(recordRef)
    console.log(downloadURL);
    console.log(item);

    setItem({...item, profile:downloadURL})
    alert("Almost there...")
    return downloadURL
  }

      } catch (error) {
        setLoading(false)
        console.error('Error uploading image to Firebase:', error);
        return null
      }
    }
  };
  const handleUpdate=async()=>{
    setLoading(true)   
    const upload =await uploadImageToFirebase()
if (upload) {
  setuploaded(upload)
}
  }
  return (
    <RBSheet
      ref={ref}
      height={700}
      openDuration={250}
      dragFromTopOnly  
      closeOnDragDown
      customStyles={{
        container: {
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          alignItems:"center",
          backgroundColor:COLORS.white,
          paddingBottom:20
        },
      }}
      >
         
           

<ViewAtom fd="column" jc="space-between" w="100%"  ai="center" pv={0} ph={0}  br={2} mv={0} mh={0} >
<ScrollView   showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>

<TextAtom text={`Edit profile `} f="Poppins"s={SIZES.h3} ls={-1} ta="left" w={"500"}  c={theme.color} />

<ViewAtom  fd="column" jc="flex-start" ai="flex-start" w="90%"  bg="transparent" pv={15} br={0} mv={10} mh={0}>
<View style={{position:"relative"}}>
{item.profile?<Image source={{ uri: item.profile }} style={[styles.Icon]} onPress={()=>{pickImage()}} />
:<Image source={require("../../assets/usericon.jpg")} style={[styles.Icon]} onPress={()=>{pickImage()}} />
}

  <TouchableOpacity onPress={()=>{pickImage()}} style={{position:"absolute",right:-10,top:1,padding:5,backgroundColor:theme.color,borderRadius:50}}>
  <Icon name={"pencil"} type="ionicon" color={COLORS.white} size={SIZES.h4}  />
  </TouchableOpacity>
  </View>
  <ViewAtom  fd="row"  ai="center"   bg="transparent"  br={0} mv={10} mh={0}>
    <TextAtom text={`${user.firstName} `} f="Poppins"s={SIZES.h5} w={"500"}  c={COLORS.gray2} />
    <TextAtom text={`${user.lastName} `} f="Poppins"s={SIZES.h5} w={"500"}  c={COLORS.gray2} />
</ViewAtom>


  <View style={styles.container2}>


          <TextInput
        style={[styles.searchInput2, { borderBottomColor: COLORS.gray2 }]}

          placeholder={item.firstName}
          maxLength={100}
          value={item.firstName}
          onChangeText={(v)=>setItem({ ...item, firstName: v })}
          />
          <View style={{position:"absolute",top:6,left:10,padding:2,backgroundColor:theme.color,borderRadius:50}}>
          <Icon name={"pencil"} type="ionicon" style={{}} color={COLORS.white} size={SIZES.h6-2} onPress={() => {}} />
          </View>
      </View>
  <View style={styles.container2}>


          <TextInput
        style={[styles.searchInput2, { borderBottomColor:COLORS.gray2  }]}

          placeholder={item.email}
          maxLength={100}
          value={item.email}
          onChangeText={(v)=>setItem({ ...item, email: v })}
          />
          <View style={{position:"absolute",top:6,left:10,padding:2,backgroundColor:theme.color,borderRadius:50}}>
          <Icon name={"pencil"} type="ionicon" style={{}} color={COLORS.white} size={SIZES.h6-2} onPress={() => {}} />
          </View>
      </View>
  <View style={styles.container2}>


          <TextInput
        style={[styles.searchInput2, { borderBottomColor: COLORS.gray2  }]}

          placeholder={item.StudentId}
          maxLength={100}
          value={item.StudentId}
          onChangeText={(v)=>setItem({ ...item, StudentId: v })}
          />
          <View style={{position:"absolute",top:6,left:10,padding:2,backgroundColor:theme.color,borderRadius:50}}>
          <Icon name={"pencil"} type="ionicon" style={{}} color={COLORS.white} size={SIZES.h6-2} onPress={() => {}} />
          </View>
      </View>
  <View style={styles.container2}>

  <View style={{position:"absolute",top:6,right:10,padding:2,backgroundColor:theme.color,borderRadius:2}}>
  <TextAtom text={`Year `} f="Poppins"s={SIZES.h6} ls={-1} ta="left" w={"500"}  c={COLORS.white} />
          </View>
          <TextInput
        style={[styles.searchInput2, { borderBottomColor: COLORS.gray2  }]}

          placeholder={item.Year}
          maxLength={10}
          value={item.Year}
          onChangeText={(v)=>setItem({ ...item, Year: v })}
          />
          <View style={{position:"absolute",top:6,left:10,padding:2,backgroundColor:theme.color,borderRadius:50}}>
          <Icon name={"pencil"} type="ionicon" style={{}} color={COLORS.white} size={SIZES.h6-2} onPress={() => {}} />
          </View>
      </View>
  <View style={styles.container2}>


          <TextInput
        style={[styles.searchInput2, { borderBottomColor: COLORS.gray2  }]}

          placeholder={item.phone}
          maxLength={10}
          value={item.phone}
          onChangeText={(v)=>setItem({ ...item, phone: v })}
          />
          <View style={{position:"absolute",top:6,left:10,padding:2,backgroundColor:theme.color,borderRadius:50}}>
          <Icon name={"pencil"} type="ionicon" style={{}} color={COLORS.white} size={SIZES.h6-2} onPress={() => {}} />
          </View>
      </View>
      <ViewAtom w="100%" mv={30} mh={0}ai="center" >
     <TouchableOpacity style={ {
    backgroundColor: theme.color,
    alignItems: "center",
    borderRadius: 5,
    width: "100%",
    paddingHorizontal:10,
    paddingVertical: 10,
    elevation: 3,
    shadowColor: theme.color,
    fontFamily:"Poppins"
  }} onPress={ ()=>{ handleUpdate()} }  >
{    Loading?<ActivityIndicator size="small" color={COLORS.white} />: 
          <ViewAtom fd="row"  ai="center"  pv={0} ph={0} br={0} mv={0} mh={0}>
          <TextAtom text="Update" c={COLORS.white} f="Poppins" s={SIZES.h5} w="500"/>

            </ViewAtom>
   
            }
    </TouchableOpacity>
         </ViewAtom>
          </ViewAtom>

          </ScrollView>
<ViewAtom fd="row" jc="space-between"   ai="center" pv={0} ph={0}  br={2} mv={0} mh={0} >

</ViewAtom>
</ViewAtom>
    
    
              
            
    </RBSheet>
  );
});
const styles =StyleSheet.create({
  Icon: {
    width: 80,
    height:80,
    borderRadius: 50,
    marginBottom:5
  },
 
  scrollViewContent: {
    flex: 1,
    alignItems:"center",
    justifyContent:"center"
  },
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
    container2: {
      width:"100%",
     position:"relative",
      alignItems:"center",
      flexDirection:"row",
      marginVertical:10
    },
    searchInput2: {
      height: 35,
      borderBottomWidth:1,
      borderBottomColor: COLORS.gray2,
      marginBottom: 10,
      paddingLeft:40,
      paddingHorizontal: 10,
      color:COLORS.gray2,
      width:"95%",
    },
  });
export default BottomSheetMe;