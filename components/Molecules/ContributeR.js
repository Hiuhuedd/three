import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, ScrollView,Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // You can use any icon library you prefer
import { COLORS, SIZES } from '../../constants/theme';
import TextAtom from '../Atoms/TextAtom';
import { useSelector } from 'react-redux';
import { TextInput } from 'react-native';
import ViewAtom from '../Atoms/ViewAtom';
import { Icon } from 'react-native-elements';
import { getShade } from '../../utils/colorShade';
import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';  
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from "../../firebase" // Import your Firebase storage instance
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import axios from 'axios';

const Contribute = () => {

  
  const [file, setFile] = useState(null);


  
 
const  pickFile=async()=> {
  try {
   
    // Pick a document
    const result = await DocumentPicker.getDocumentAsync({});
    if (result.type === 'success') {
      setFile(result)
      setItem({ ...item, size:Math.floor(result.size/1000) })
      console.log(
        `URI: ${result.uri}`,
        `Name: ${result.name || 'unknown'}`,
        `Type: ${result.type}`,
        `Size: ${result.size || 'unknown'}`,
      );

      // You can add your handling logic here, such as uploading the file or processing it.
    } else {
      console.log('Document picking was canceled.');
    }
  } catch (error) {
    console.error('Error picking a document:', error);
  }
}





  const user=useSelector(state => state.userReducer.user);
  const typesArr=["select document Type","PDF","Audio book","Video"]
  const [Loading, setLoading] = React.useState(false);

  const [item, setItem] = useState({
    id: '1',
    unitCode: '',
    docUrl: null,
    attribution: {
      userName: user.firstName +' '+user.lastName,
      userId: user.id,
      profile: user.profile
    },
    description: "",
    title: "",
    type: "",
    length: 0,
    size: 0,
    hearts:0,
  });

  // Accessing individual properties of the state object
  const { id, unitCode, pdfUrl, attribution, description, title, type, length, size } = item;
    
  const theme=useSelector(state => state.userReducer.theme);

  
  const [searching, setSearching] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [Uhearters, setUhearters] = useState([]);
  const handleHeart=()=>{
    if(Uhearters.length!==0){
      setUhearters([])
      setItem({ ...item, hearts: 0 })
    }else{
      setItem({ ...item, hearts: 1 })
      let hearters=[]
      hearters.push(user.id)
      setUhearters(hearters)
    }
  }
  const handlePut=async()=>{
    if (item.docUrl) {
      // console.log(("download url log "),downloadURL);
    console.log(item);
      try {
      const db = getFirestore();
      const collectionRef = collection(db, 'contributions'); // Collection reference
      const documentRef = doc(collectionRef, item.unitCode); // Document reference
      const itemsCollectionRef = collection(documentRef, 'items');

      await addDoc(itemsCollectionRef, item);
      setLoading(false);
      alert('Resource upload successful.')
    }catch (error) {
      alert('File upload failed.')
      setLoading(false);
      console.error('Error adding document to Firestore:', error);
    }
    } else {
      // setItem({ ...item, docUrl: downloadURL})
      setTimeout(() => {
        handlePut()
      }, 2000);
    }
   
  }
  useEffect(()=>{
    if (item.docUrl) {
      handlePut()
    } else {
      // setLoading(false)
    }

  },[item.docUrl])

  const uploadFileToStorage = async (file) => {
    const blob = await new Promise((resolve, reject) => {
      const fetchXHR = new XMLHttpRequest();
      fetchXHR.onload = function () {
        resolve(fetchXHR.response);
      };
      fetchXHR.onerror = function (e) {
        reject(new TypeError('Network request failed'));
      };
      fetchXHR.responseType = 'blob';
      fetchXHR.open('GET', file.uri, true);
      fetchXHR.send(null);
    }).catch((err) => console.log(err));
    const recordRef = ref(storage, "contributions/"+file.name);
return await uploadBytes(recordRef, blob)
      .then(async (snapshot) => {
        const downloadURL = await getDownloadURL(recordRef)
        blob.close();
        setItem({ ...item, docUrl: downloadURL})
        console.log(downloadURL);
        alert("Almost there...")
        return downloadURL
      })
      .catch((err) => console.log(err));
  };

  const handleUpdate = async () => {
    setLoading(true);
  
  const downloadURL=  await uploadFileToStorage(file);
  
 
 

 
  
  };
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:"100%",
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems:"center",
  },
  container2: {
    width:"100%",
   position:"relative",
    alignItems:"center",
    flexDirection:"row",
  },
  Icon: {
    width: 70,
    height: 160,
    borderTopLeftRadius: 5,
  },
  Icon2: {
    width: 15,
    height: 15,
    borderTopLeftRadius: 5,
  },

  paperList: {
    width:"100%",
    display:"flex",
    // alignItems: 'center',
    justifyContent:"center"
  },
 
  searchInput: {
    height: 35,
    backgroundColor: theme.color,
    marginBottom: 10,
    paddingLeft:40,
    paddingHorizontal: 10,
    borderRadius:5,
    color:"#fff",
    width:"85%",
    // textTransform:"uppercase"
  },
  searchInput2: {
    height: 35,
    backgroundColor: theme.color,
    marginBottom: 10,
    paddingLeft:40,
    paddingHorizontal: 10,
    borderRadius:5,
    color:"#fff",
    width:"85%",
    // textTransform:"capitalize"
  },
  unitCode: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  btn:  {
    backgroundColor: theme.color,
    alignItems: "center",
    borderRadius: 5,
    width: "100%",
    paddingHorizontal:10,
    paddingVertical: 10,
    elevation: 3,
    shadowColor: theme.color,
    fontFamily:"Poppins"
  }
});
  return (
    <View style={styles.container}> 
      <View style={{width:"100%",marginBottom:20}}>
          <TextAtom text={user.StudentProgram} f="Poppins"s={SIZES.base} w={"500"}  ls={0}c={COLORS.white} />
          <TextAtom text={"Resource contribution"} f="Poppins"s={SIZES.h2} w={"500"} ta="left" ls={-2}c={COLORS.white} />
</View>
    <View style={styles.container2}>


      <TextInput
    style={styles.searchInput}
    placeholder="Unit Code"
    value={item.unitCode.toUpperCase()}
    maxLength={6}
    onChangeText={(v)=>setItem({ ...item, unitCode: v.toUpperCase() })}
  />
    <View style={{position:"absolute",top:6,left:10}}>
  <Icon name={"albums"} type="ionicon" style={{}} color={COLORS.white} size={SIZES.h4} onPress={() => {}} />
  </View>
    <View style={{
       height: 35,
    backgroundColor: theme.color,
    marginBottom: 10,
    marginLeft: 10,
    padding: 5,
    paddingHorizontal:10,
    borderRadius:5,
    color:"#fff",
    
  position:"relative"
   }}>

    <TextAtom text={"Type"} f="Poppins"s={SIZES.base} w={"500"}  ls={0}c={COLORS.white} />
    {/* <Icon name={"arrow-down"} type="ionicon" style={{}} color={COLORS.white} size={SIZES.base} onPress={() => {}} /> */}
    <Picker
        style={{width:20,color:COLORS.white,height:40,zIndex:2,position:"absolute",left:23,top:-2}}
        onValueChange={(itemValue, itemIndex) =>
          setItem({ ...item, type: itemValue })

        }>
           { typesArr.map(i=>{
            return(
                <Picker.Item label={i} value={i} style={{color:COLORS.gray2,fontSize:SIZES.h5}} />
            )
            })}
        </Picker>   

  </View>
    </View>
    <View style={styles.container2}>


<TextInput
style={styles.searchInput2}
placeholder="Title"
value={item.title}
maxLength={50}
onChangeText={(v)=>setItem({ ...item, title: v })}
/>
<View style={{position:"absolute",top:6,left:10}}>
<Icon name={"text-outline"} type="ionicon" style={{}} color={COLORS.white} size={SIZES.h4} onPress={() => {}} />
</View>

</View>
    <View style={styles.container2}>


      <TextInput
    style={styles.searchInput2}
    placeholder="Description"
    maxLength={100}
    value={item.description}
    onChangeText={(v)=>setItem({ ...item, description: v })}
  />
    <View style={{position:"absolute",top:6,left:10}}>
  <Icon name={"information-circle"} type="ionicon" style={{}} color={COLORS.white} size={SIZES.h4} onPress={() => {}} />
  </View>
    <TouchableOpacity onPress={()=>{pickFile()}}
     style={{
       height: 35,
    backgroundColor: theme.color,
    marginBottom: 10,
    marginLeft: 10,
    padding: 12,
    borderRadius:5,
    color:"#fff",
    alignItems:"center",
  flexDirection:"row"
   }}>
    <TextAtom text={"Attach"} f="Poppins"s={SIZES.base} w={"500"}  ls={0}c={COLORS.white} />
    <Icon name={"attach-outline"} type="ionicon" style={{}} color={COLORS.white} size={SIZES.h6} onPress={() => {pickFile()}} />

  </TouchableOpacity>
    </View>
   
  
          <ViewAtom fd="row" jc="space-around" ai="center" w="100%"  pv={2} ph={2} br={0} mv={0} mh={0}>
          {/* <Icon name="search" size={30} color={COLORS.white} /> */}

</ViewAtom>
     
        <View style={{width:"100%"}}>
          {searching&&<ActivityIndicator size="small" color="#fff" />}
          {/* <TextAtom text={"Past papers"} f="Poppins"s={SIZES.h3} w={"500"}  ls={-2}c={COLORS.white} /> */}
          <ViewAtom fd="column"  ai="center" w="100%"  pv={2} ph={2} br={0} mv={0} mh={0}>
      <View style={{
        alignItems: 'center',
        justifyContent: 'center',
        width:"100%",
        height: 160,
        margin: 10,
        backgroundColor: COLORS.white,
        borderRadius: 5,
      }} >
       <ViewAtom fd="row" jc="space-between"  ai="center" w="100%"  pv={2} ph={0} br={0} mv={0} mh={0}>
       <View style={{position:"relative",}}>
       {user.profile?  
 <Image source={{uri:user.profile}} style={[styles.Icon]} />
:
 <Image source={require('../../assets/usericon.jpg')} style={[styles.Icon]} />
 }               
       <View style={{position:"absolute",top:0,left:0,  width: 70, zIndex:2,   height: 160,backgroundColor:"#abaaaaaa", alignItems:"center",justifyContent:"center",   borderTopLeftRadius: 5,padding:1}}>
      {
      item.type==="PDF"?
      <Icon name={"book"} type="ionicon" style={{}} color={COLORS.white} size={SIZES.h2} onPress={() => {}} />
      :
   ( <>
 {  item.type==="Video"?
      <Icon name={"videocam"} type="ionicon" style={{}} color={COLORS.white} size={SIZES.h2} onPress={() => {}} />
    :  <Icon name={"headset"} type="ionicon" style={{}} color={COLORS.white} size={SIZES.h2} onPress={() => {}} />
   }
    </>
)
      }
      </View>
    </View>
      <ViewAtom fd="column" w={"40%"} ai="flex-start"  pv={2} ph={10} br={0} mv={0} mh={0}>

          <TextAtom text={item.unitCode} f="Poppins"s={SIZES.h2} w={"700"}  ls={-1}c={theme.color} />
          <TextAtom text={item.title} f="Poppins1"s={SIZES.base} w={"500"}  ls={0}c={COLORS.gray2} />
          <TextAtom text={item.description.toUpperCase()} f="Poppins"s={SIZES.base} w={"500"}  ls={0}c={COLORS.gray2} />
          
          <TextAtom text={item.type} f="Poppins1"s={SIZES.base-1} w={"500"}  ls={0}c={COLORS.gray2} />
          
    </ViewAtom>
       <ViewAtom fd="column" w={"35%"}  ai="flex-start"  pv={2} ph={10} br={0} mv={0} mh={0}>
       <View style={{position:"relative",padding:0}}>
          <TextAtom text={`${item.length}min read`} f="Poppins"s={SIZES.base} w={"500"}  ls={0}c={COLORS.gray2} />
       <View style={{position:"absolute",top:3,left:-7,padding:2,borderRadius:50,backgroundColor:COLORS.gray4}}>

    </View>
    </View>
          <TextAtom text={`${item.size} kb`} f="Poppins"s={SIZES.base} w={"500"}  ls={0}c={COLORS.gray2} />
          <TextAtom text={`contributed by ${item.attribution.userName}`} f="Poppins"s={SIZES.base} w={"500"}  ls={0}c={COLORS.gray2} />
          <ViewAtom fd="row"  ai="center"  pv={0} ph={0} br={0} mv={0} mh={0}>
          <TextAtom text={`${item.hearts} `} f="Poppins"s={SIZES.base} w={"500"}  ls={0}c={Uhearters.length===0?COLORS.gray2:theme.color} />

          <Icon name={"heart"} type="ionicon" style={{}} color={Uhearters.length===0?COLORS.gray2:theme.color} size={SIZES.h3} onPress={() => {handleHeart()}} />
        </ViewAtom>
    </ViewAtom>
       {/* <ViewAtom fd="column"  ai="flex-start"  pv={2} ph={0} br={0} mv={0} mh={0}>
    <Icon name={"chevron-forward-circle"} type="ionicon" color={theme.color} size={SIZES.h3} onPress={() => {}} />

    </ViewAtom> */}

    </ViewAtom>
      </View>
    </ViewAtom>       
        </View>
    {file&& <TextAtom text={`${file.name} `} f="Poppins"s={SIZES.base} w={"500"}  ls={0}c={COLORS.gray} />
}
        <ViewAtom w="100%" mv={30} mh={0}ai="center" >
     <TouchableOpacity style={styles.btn} onPress={ ()=>{handleUpdate()  } }  >
{    Loading?<ActivityIndicator size="small" color={COLORS.white} />: 
          <ViewAtom fd="row"  ai="center"  pv={0} ph={0} br={0} mv={0} mh={0}>
          <TextAtom text="Upload" c={COLORS.white} f="Poppins" s={SIZES.h5} w="500"/>
<Icon name={"arrow-up"} type="ionicon" style={{}} color={COLORS.white} size={SIZES.h3} onPress={() => {handleUpdate()}} />

            </ViewAtom>
   
            }
    </TouchableOpacity>
         </ViewAtom>
    </View>
  );
};



export default Contribute;
