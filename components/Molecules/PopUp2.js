import {Picker} from '@react-native-picker/picker';
import { useState } from 'react';
import ViewAtom from '../Atoms/ViewAtom';
import TextAtom from '../Atoms/TextAtom';
import { COLORS, SIZES } from '../../constants/theme';
import { StyleSheet, View } from 'react-native';
const PopUp2=({arr,handleSetItem})=>{
 
const [selectedItem, setSelectedItem]=useState('')
    return(
  
        <View style={styles.input}   >

        <Picker
        // selectedValue={selectedItem}
        onValueChange={(itemValue, itemIndex) =>
            handleSetItem(itemValue)
        }>
           { arr.map(i=>{
            return(
                <Picker.Item label={i.location} value={i.location} style={{color:COLORS.gray2,fontSize:SIZES.h5}} />
            )
            })}
        </Picker>
      </View>
       
    )
}
export default PopUp2
const styles = StyleSheet.create({
    input: {
      // height: 0,
<<<<<<< HEAD
      width: '10%',
=======
      width: '25%',
>>>>>>> 609b2e1e1d7abf10666e93cdddd011cef40cd2f4
    },
  });