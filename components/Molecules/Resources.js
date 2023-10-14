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
import { ResourcesArray } from '../../constants/content/ResourcesArray';


const samplePapers = [
  { 
    id: '1',
    unitCode: 'UCU100',
    docUrl: 'link_to_pdf_1',
    attribution: { userName: "Beth", userId: "qweoj238u293u92hd", profile: "url_to_image" },
    description: "past paper for year 2020",
    title: "Communication Skills",
    type: "PDF",
    length: "30 min",
    size: "34kb"
  },
  { 
    id: '2',
    unitCode: 'ECU200',
    docUrl: 'link_to_pdf_2',
    attribution: { userName: "John", userId: "aslkdf23jlkjsdf", profile: "url_to_image" },
    description: "sample document",
    title: "Introduction to Economics",
    type: "PDF",
    length: "20 min",
    size: "25kb"
  },
  { 
    id: '3',
    unitCode: 'MTH300',
    docUrl: 'link_to_pdf_3',
    attribution: { userName: "Alice", userId: "a0923lkjasdf", profile: "url_to_image" },
    description: "practice problems",
    title: "Advanced Mathematics",
    type: "Audio Book",
    length: "45 min",
    size: "40kb"
  },
  { 
    id: '4',
    unitCode: 'PHY400',
    docUrl: 'link_to_pdf_4',
    attribution: { userName: "David", userId: "qweio2304jsdf", profile: "url_to_image" },
    description: "physics notes",
    title: "Physics Fundamentals",
    type: "PDF",
    length: "25 min",
    size: "28kb"
  },
  { 
    id: '5',
    unitCode: 'CHM500',
    docUrl: 'link_to_pdf_5',
    attribution: { userName: "Emily", userId: "o238uf0239lj", profile: "url_to_image" },
    description: "chemistry review",
    title: "Chemistry Basics",
    type: "Video",
    length: "35 min",
    size: "32kb"
  },
  { 
    id: '6',
    unitCode: 'BIO600',
    docUrl: 'link_to_pdf_6',
    attribution: { userName: "Frank", userId: "lkj23o4i0sdf", profile: "url_to_image" },
    description: "biology study guide",
    title: "Biology Essentials",
    type: "Audio Book",
    length: "40 min",
    size: "38kb"
  },
  { 
    id: '7',
    unitCode: 'ENG700',
    docUrl: 'link_to_pdf_7',
    attribution: { userName: "Grace", userId: "asd2340l23sdf", profile: "url_to_image" },
    description: "literature notes",
    title: "English Literature",
    type: "PDF",
    length: "22 min",
    size: "26kb"
  },
  { 
    id: '8',
    unitCode: 'HIS800',
    docUrl: 'link_to_pdf_8',
    attribution: { userName: "Henry", userId: "lkjwer2390sdf", profile: "url_to_image" },
    description: "history review",
    title: "World History",
    type: "PDF",
    length: "32 min",
    size: "36kb"
  },
  { 
    id: '9',
    unitCode: 'GEO900',
    docUrl: 'link_to_pdf_9',
    attribution: { userName: "Ivy", userId: "asd9023oj0sdf", profile: "url_to_image" },
    description: "geography study material",
    title: "Geography Fundamentals",
    type: "Audio Book",
    length: "28 min",
    size: "30kb"
  },
  { 
    id: '10',
    unitCode: 'ART1000',
    docUrl: 'link_to_pdf_10',
    attribution: { userName: "Jack", userId: "lkjwer9023sdf", profile: "url_to_image" },
    description: "art history notes",
    title: "Art History",
    type: "PDF",
    length: "26 min",
    size: "24kb"
  },
  { 
    id: '11',
    unitCode: 'GEO900',
    docUrl: 'link_to_pdf_9',
    attribution: { userName: "Ivy", userId: "asd9023oj0sdf", profile: "url_to_image" },
    description: "geography study material",
    title: "Geography Fundamentals",
    type: "PDF",
    length: "28 min",
    size: "30kb"
  },
  { 
    id: '12',
    unitCode: 'ART1000',
    docUrl: 'link_to_pdf_10',
    attribution: { userName: "Jack", userId: "lkjwer9023sdf", profile: "url_to_image" },
    description: "art history notes",
    title: "Art History",
    type: "PDF",
    length: "26 min",
    size: "24kb"
  },
  { 
    id: '13',
    unitCode: 'GEO900',
    docUrl: 'link_to_pdf_9',
    attribution: { userName: "Ivy", userId: "asd9023oj0sdf", profile: "url_to_image" },
    description: "geography study material",
    title: "Geography Fundamentals",
    type: "PDF",
    length: "28 min",
    size: "30kb"
  },
  { 
    id: '14',
    unitCode: 'ART1000',
    docUrl: 'link_to_pdf_10',
    attribution: { userName: "Jack", userId: "lkjwer9023sdf", profile: "url_to_image" },
    description: "art history notes",
    title: "Art History",
    type: "PDF",
    length: "26 min",
    size: "24kb",
    
  }
];



const Resources = ({navigation,isRefreshing}) => {
    
  const user=useSelector(state => state.userReducer.user);
  const units=useSelector(state => state.userReducer.units);
  const theme=useSelector(state => state.userReducer.theme);

  const renderPaperItem = ({ item }) => {
    console.log("render item",item);
    return (
      
      <ViewAtom fd="column"  ai="center" w="100%"  pv={2} ph={2} br={0} mv={0} mh={0}>
      <TouchableOpacity style={{
        alignItems: 'center',
        justifyContent: 'center',
        width:"100%",
        height: 70,
        margin: 5,
        marginVertical:10,
        backgroundColor: COLORS.white,
        borderRadius: 5,
      }} onPress={() => handlePaperPress(item)}>
       <ViewAtom fd="row" jc="space-between"  ai="center" w="100%"  pv={2} ph={0} br={0} mv={0} mh={0}>
       <View style={{position:"relative",}}>
       <Image source={require('../../assets/360.png')} style={[styles.Icon]} />
       
       <View style={{position:"absolute",top:0,left:0,  width: 70, zIndex:2,   height: 70,backgroundColor:"#008aaaa0", alignItems:"center",justifyContent:"center",   borderTopLeftRadius: 5,padding:1}}>
      {
      item.type==="PDF"?
      <Icon name={"book"} type="ionicon" style={{}} color={COLORS.white} size={SIZES.h2} onPress={() => {handlePaperPress(item)}} />
      :
   ( <>
 {  item.type==="Video"?
      <Icon name={"videocam"} type="ionicon" style={{}} color={COLORS.white} size={SIZES.h2} onPress={() => {handlePaperPress(item)}} />
    :  <Icon name={"headset"} type="ionicon" style={{}} color={COLORS.white} size={SIZES.h2} onPress={() => {handlePaperPress(item)}} />
   }
    </>
)
      }
      </View>
    </View>
      <ViewAtom fd="column" w={"40%"} ai="flex-start"  pv={2} ph={10} br={0} mv={0} mh={0}>

          <TextAtom text={item.unitCode} f="Poppins"s={SIZES.h4} w={"500"}  ls={-1}c={theme.color} />
          <TextAtom text={item.type} f="Poppins"s={SIZES.base} w={"500"}  ls={0}c={COLORS.gray2} />
          <TextAtom text={item.description?.toUpperCase()} f="Poppins"s={SIZES.base} w={"500"}  ls={0}c={COLORS.gray2} />
          <ViewAtom fd="row"  ai="flex-start"  pv={0} ph={0} br={0} mv={0} mh={0}>
          <TextAtom text={`${item.hearts} `} f="Poppins"s={SIZES.base} w={"500"}  ls={0}c={COLORS.gray2} />
          <Icon name={"heart"} type="ionicon" style={{}} color={theme.color} size={SIZES.base-1} onPress={() => {}} />

        </ViewAtom>
    </ViewAtom>
       <ViewAtom fd="column" w={"35%"}  ai="flex-start"  pv={2} ph={10} br={0} mv={0} mh={0}>

       <View style={{position:"relative",padding:0}}>
          <TextAtom text={item.title} f="Poppins"s={SIZES.base} w={"500"}  ls={0}c={theme.color} />
       <View style={{position:"absolute",top:3,left:-7,padding:2,borderRadius:50,backgroundColor:COLORS.fillColor}}>

    </View>
          <TextAtom text={`${item.length} read`} f="Poppins"s={SIZES.base} w={"500"}  ls={0}c={COLORS.gray2} />
    </View>
          <TextAtom text={item.size} f="Poppins"s={SIZES.base} w={"500"}  ls={0}c={COLORS.gray2} />
         
          <TextAtom text={`contributed by ${item.attribution.userName}`} f="Poppins"s={SIZES.base} w={"500"}  ls={0}c={COLORS.gray2} />
    </ViewAtom>
       {/* <ViewAtom fd="column"  ai="flex-start"  pv={2} ph={0} br={0} mv={0} mh={0}>
    <Icon name={"chevron-forward-circle"} type="ionicon" color={theme.color} size={SIZES.h3} onPress={() => {}} />

    </ViewAtom> */}

    </ViewAtom>
      </TouchableOpacity>
    </ViewAtom>
    );
  };

  const handlePaperPress = (item) => {
    navigation.navigate("DocViewer",{resource:item})
    // Implement PDF viewer logic here
  };
  const [searching, setSearching] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [renderResources, setrenderResources] = useState([]);

  useEffect(()=>{
    setSearching(true)

    const getD=async()=>{
    
        const d= await ResourcesArray(units) 
       const n =d.map(i=>i.itemsData).flat(1);
      setrenderResources(n)
      if(n.length>1){
        setSearching(false)
      }
    };
    getD()
 
  },[isRefreshing])
  useEffect(()=>{
    const filteredResources = renderResources.filter((pdf) =>
    pdf.unitCode.toLowerCase().includes(searchText.toLowerCase())
  );
  if (filteredResources) {
    setrenderResources(filteredResources)
  }
  },[searchText])
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:"100%",
    paddingHorizontal: 15,
    paddingTop: 20,
    alignItems:"center",
  },
  container2: {
    width:"100%",
   position:"relative",
    alignItems:"center",
    flexDirection:"row",
    paddingHorizontal:5
  },
  Icon: {
    width: 70,
    height: 70,
    borderTopLeftRadius: 5,
    opacity:.35,
    backgroundColor:"#000"
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
    height: 38,
    backgroundColor: theme.color,
    marginBottom: 10,
    paddingLeft:40,
    paddingHorizontal: 10,
    borderRadius:5,
    color:"#fff",
    width:"85%",
    textTransform:"uppercase"
  },
  unitCode: {
    marginTop: 10,
    fontWeight: 'bold',
  },
});
  return (
    <View style={styles.container}> 
    <View style={styles.container2}>


      <TextInput
    style={styles.searchInput}
    placeholder="Find by unit Code"
    value={searchText}
    onChangeText={(v)=>setSearchText(v)}
  />
    <View style={{position:"absolute",top:6,left:10}}>
  <Icon name={"search"} type="ionicon" style={{}} color={COLORS.white} size={SIZES.h2} onPress={() => {}} />
  </View>
    <View style={{
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
    <TextAtom text={"Sort"} f="Poppins"s={SIZES.base} w={"500"}  ls={0}c={COLORS.white} />
    <Icon name={"arrow-down"} type="ionicon" style={{}} color={COLORS.white} size={SIZES.base} onPress={() => {}} />

  </View>
    </View>
    <View style={{width:"100%"}}>
          <TextAtom text={user.StudentProgram} f="Poppins"s={SIZES.base} w={"500"}  ls={0}c={COLORS.white} />
          <TextAtom text={"Resources"} f="Poppins"s={SIZES.h2} w={"500"} ta="left" ls={-2}c={COLORS.white} />
</View>
          <ViewAtom fd="row" jc="space-around" ai="center" w="100%"  pv={2} ph={2} br={0} mv={0} mh={0}>
          {/* <Icon name="search" size={30} color={COLORS.white} /> */}

</ViewAtom>
     
        <View style={{width:"100%"}}>
          {searching&&<ActivityIndicator size="small" color="#fff" />}
          {/* <TextAtom text={"Past papers"} f="Poppins"s={SIZES.h3} w={"500"}  ls={-2}c={COLORS.white} /> */}
          <FlatList
            data={renderResources.slice(0,8)}
            renderItem={renderPaperItem}
            keyExtractor={(item) => item.id}
            numColumns={1}
            contentContainerStyle={styles.paperList}
          />
          {/* <TextAtom text={"PDF resources"} f="Poppins"s={SIZES.h3} w={"500"}  ls={-2}c={COLORS.white} />
          <FlatList
            data={renderResources.slice(8,16)}
            renderItem={renderPaperItem}
            keyExtractor={(item) => item.id}
            numColumns={1}
            contentContainerStyle={styles.paperList}
          /> */}
        </View>
    </View>
  );
};



export default Resources;
