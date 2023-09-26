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
// import DocumentPicker from 'react-native-document-picker';

const Contribute = ({navigation,resource}) => {
  

  const user=useSelector(state => state.userReducer.user);
 
  const [Loading, setLoading] = React.useState(false);

  const [item, setItem] = useState(resource);

  // Accessing individual properties of the state object
  const { id, unitCode, pdfUrl, attribution, description, title, type, length, size } = item;
    
  const theme=useSelector(state => state.userReducer.theme);

  

  const handlePaperPress = (pdfUrl) => {
    // Implement PDF viewer logic here
  };

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

  useEffect(()=>{
  
  },[])
  const handleUpdate=  async()=>{
    setLoading(true)
setTimeout(() => {
  setLoading(false)
  
}, 3000);
  }
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
    textTransform:"uppercase"
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
    textTransform:"capitalize"
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
          <TextAtom text={item.title} f="Poppins"s={SIZES.h2} w={"500"} ta="left" ls={-2}c={COLORS.white} />
</View>
   
   
  
          <ViewAtom fd="row" jc="space-around" ai="center" w="100%"  pv={2} ph={2} br={0} mv={0} mh={0}>
          {/* <Icon name="search" size={30} color={COLORS.white} /> */}

</ViewAtom>
     
        <View style={{width:"100%"}}>
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
      }} onPress={() => handlePaperPress(item.pdfUrl)}>
       <ViewAtom fd="row" jc="space-between"  ai="center" w="100%"  pv={2} ph={0} br={0} mv={0} mh={0}>
       <View style={{position:"relative",}}>
       <Image source={require('../../assets/360.png')} style={[styles.Icon]} />
       
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
          <TextAtom text={item.description?.toUpperCase()} f="Poppins"s={SIZES.base} w={"500"}  ls={0}c={COLORS.gray2} />
          
          <TextAtom text={item.type} f="Poppins1"s={SIZES.base-1} w={"500"}  ls={0}c={COLORS.gray2} />
          
    </ViewAtom>
       <ViewAtom fd="column" w={"35%"}  ai="flex-start"  pv={2} ph={10} br={0} mv={0} mh={0}>
       <View style={{position:"relative",padding:0}}>
          <TextAtom text={`${item.length}min read`} f="Poppins"s={SIZES.base} w={"500"}  ls={0}c={COLORS.gray2} />
       <View style={{position:"absolute",top:3,left:-7,padding:2,borderRadius:50,backgroundColor:COLORS.gray4}}>

    </View>
    </View>
          <TextAtom text={`${item.size} kb`} f="Poppins"s={SIZES.base} w={"500"}  ls={0}c={COLORS.gray2} />
          <TextAtom text={`contributed by ${item.attribution?.userName}`} f="Poppins"s={SIZES.base} w={"500"}  ls={0}c={COLORS.gray2} />
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
        <ViewAtom w="100%" mv={30} mh={0}ai="center" >
     <TouchableOpacity style={styles.btn} onPress={ ()=>{handleUpdate()  } }  >
{    Loading?<ActivityIndicator size="small" color={COLORS.white} />: 
          <ViewAtom fd="row"  ai="center"  pv={0} ph={0} br={0} mv={0} mh={0}>
          <TextAtom text="Download" c={COLORS.white} f="Poppins" s={SIZES.h5} w="500"/>
<Icon name={"arrow-down"} type="ionicon" style={{}} color={COLORS.white} size={SIZES.h3} onPress={() => {}} />

            </ViewAtom>
   
            }
    </TouchableOpacity>
         </ViewAtom>
    </View>
  );
};



export default Contribute;
