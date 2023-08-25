import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // You can use any icon library you prefer
import { COLORS, SIZES } from '../../constants/theme';
import TextAtom from '../Atoms/TextAtom';
import { useSelector } from 'react-redux';
import { TextInput } from 'react-native';
import ViewAtom from '../Atoms/ViewAtom';
import { Icon } from 'react-native-elements';

const samplePapers = [
  { id: '1', unitCode: 'COMP101', pdfUrl: 'link_to_pdf_1' },
  { id: '2', unitCode: 'MATH202', pdfUrl: 'link_to_pdf_2' },
  { id: '3', unitCode: 'PHYS301', pdfUrl: 'link_to_pdf_3' },
  { id: '1', unitCode: 'COMP101', pdfUrl: 'link_to_pdf_1' },
  { id: '2', unitCode: 'MATH202', pdfUrl: 'link_to_pdf_2' },
  { id: '3', unitCode: 'PHYS301', pdfUrl: 'link_to_pdf_3' },
  { id: '1', unitCode: 'COMP101', pdfUrl: 'link_to_pdf_1' },
  { id: '2', unitCode: 'MATH202', pdfUrl: 'link_to_pdf_2' },
  { id: '3', unitCode: 'PHYS301', pdfUrl: 'link_to_pdf_3' },
  { id: '1', unitCode: 'COMP101', pdfUrl: 'link_to_pdf_1' },
  { id: '2', unitCode: 'MATH202', pdfUrl: 'link_to_pdf_2' },
  { id: '3', unitCode: 'PHYS301', pdfUrl: 'link_to_pdf_3' },
  { id: '2', unitCode: 'MATH202', pdfUrl: 'link_to_pdf_2' },
  { id: '3', unitCode: 'PHYS301', pdfUrl: 'link_to_pdf_3' },
  { id: '1', unitCode: 'COMP101', pdfUrl: 'link_to_pdf_1' },
  { id: '2', unitCode: 'MATH202', pdfUrl: 'link_to_pdf_2' },
  { id: '3', unitCode: 'PHYS301', pdfUrl: 'link_to_pdf_3' },
  
  // Add more sample papers here...
];

const Resources = () => {
    
  const user=useSelector(state => state.userReducer.user);
  const theme=useSelector(state => state.userReducer.theme);

  const renderPaperItem = ({ item }) => {
    return (
      
      <ViewAtom fd="column"  ai="center" w="33.3%"  pv={2} ph={2} br={0} mv={0} mh={0}>
      <TouchableOpacity style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: 90,
        height: 80,
        margin: 10,
        backgroundColor: COLORS.black,
        borderRadius: 10,
        elevation: 3,
      }} onPress={() => handlePaperPress(item.pdfUrl)}>
        <AntDesign name="pdffile1" size={SIZES.h1} color={COLORS.white} />
      </TouchableOpacity>
          <TextAtom text={item.unitCode} f="Poppins"s={SIZES.h5} w={"500"}  ls={-1}c={COLORS.white} />
    </ViewAtom>
    );
  };

  const handlePaperPress = (pdfUrl) => {
    // Implement PDF viewer logic here
  };
  const [searchText, setSearchText] = useState('');

  const filteredPrograms = samplePapers.filter((pdf) =>
  pdf.unitCode.includes(searchText)
);

  return (
    <View style={styles.container}>
          <TextAtom text={"Resources"} f="Poppins"s={SIZES.h1} w={"500"}  ls={-2}c={COLORS.white} />
          <TextAtom text={user.StudentProgram} f="Poppins"s={SIZES.base} w={"500"}  ls={0}c={COLORS.white} />
          <ViewAtom fd="row" jc="space-around" ai="center" w="100%"  pv={2} ph={2} br={0} mv={0} mh={0}>
          {/* <Icon name="search" size={30} color={COLORS.white} /> */}

          <TextInput
        style={styles.searchInput}
        placeholder="Search by unit Code"
        value={searchText}
        onChangeText={setSearchText}
      />
</ViewAtom>
     
        <View>
          <TextAtom text={"Past papers"} f="Poppins"s={SIZES.h3} w={"500"}  ls={-2}c={COLORS.white} />
          <FlatList
            data={samplePapers.slice(0,8)}
            renderItem={renderPaperItem}
            keyExtractor={(item) => item.id}
            numColumns={3}
            contentContainerStyle={styles.paperList}
          />
          <TextAtom text={"PDF resources"} f="Poppins"s={SIZES.h3} w={"500"}  ls={-2}c={COLORS.white} />
          <FlatList
            data={samplePapers.slice(8,16)}
            renderItem={renderPaperItem}
            keyExtractor={(item) => item.id}
            numColumns={3}
            contentContainerStyle={styles.paperList}
          />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems:"center"
    // backgroundColor: '#111',
  },
  paperList: {
    display:"flex",
    // alignItems: 'center',
    justifyContent:"center"
  },
 
  searchInput: {
    height: 40,
    borderColor: '#fff',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius:5,
    color:"#fff",
    width:"90%"
  },
  unitCode: {
    marginTop: 10,
    fontWeight: 'bold',
  },
});

export default Resources;
