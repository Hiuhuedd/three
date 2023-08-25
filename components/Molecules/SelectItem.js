import {Picker} from '@react-native-picker/picker';
import { useState } from 'react';
import ViewAtom from '../Atoms/ViewAtom';
import TextAtom from '../Atoms/TextAtom';
import { COLORS, SIZES } from '../../constants/theme';
import { StyleSheet, View } from 'react-native';
import { Dimensions } from 'react-native';
const SelectItem=({itemArr,selectedItem, setSelectedItem})=>{
  const height = Dimensions.get('window').height;

  const styles = StyleSheet.create({
    input: {
      height: height*.06,
      borderWidth: 1,
      borderColor: COLORS.gray2,
      borderRadius: 5,
      paddingHorizontal: 5,
      marginBottom: 5,
      width: '100%',
      color: '#fff',
    },
  });
    return(
  
        <View style={styles.input}   >

        <Picker
        selectedValue={selectedItem}
        onValueChange={(itemValue, itemIndex) =>
            setSelectedItem(itemValue)
        }>
           { itemArr.map(i=>{
            return(
                <Picker.Item label={i} value={i} style={{color:COLORS.gray2}} />
            )
            })}
        </Picker>
      </View>
       
    )
}
export default SelectItem


