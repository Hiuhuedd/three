import React, { useRef, useState, useEffect } from 'react';
import { TextInput ,ActivityIndicator} from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';
import SelectItem from '../Molecules/SelectItem';
import ViewAtom from './ViewAtom';
import MyCalendar from '../Molecules/MyCalendar';
import TextAtom from './TextAtom';
import { ProgramsArray } from '../../constants/content/programs';
<<<<<<< HEAD
import { useSelector } from 'react-redux';
=======
>>>>>>> 609b2e1e1d7abf10666e93cdddd011cef40cd2f4

const MyInput = ({editable, keyboardType, secureTextEntry, style, placeholder,maxLength,setisUpdated,label,setProgram}) => {
 //arrays
 const genders=["select","Male","Female","Other"]
 const year=["select","1st","2nd","3rd","4th","5th"]
 const semester=["select","1st","2nd","3rd"]
 //arrays
<<<<<<< HEAD
 const programs=useSelector(state => state.userReducer.programs);

=======
 
>>>>>>> 609b2e1e1d7abf10666e93cdddd011cef40cd2f4
 const [selectedGender, setSelectedGender] = useState("");
 const [selectedYear, setSelectedYear] = useState("");
 const [selectedSem, setSelectedSem] = useState("");
 const [StudentProgram, setStudentProgram] = useState(null);
 const [LoadProgram, setLoadProgram] = useState(false);

 //arrays states
 useEffect(() => {
  if (label==="Gender") {
    handleChange(selectedGender)
  }
  if (label==="Current Year") {
    handleChange(selectedYear)
  }
  if (label==="Current Semester") {
    handleChange(selectedSem)
  }
}, [selectedGender,selectedYear,selectedSem]);
 
 

function getProgramByCode(programCode) {
<<<<<<< HEAD
  console.log("pCode",programCode);
  for (let i = 0; i < programs.length; i++) {
    if (programs[i].programCode.toLowerCase() === programCode.toLowerCase()) {
      setLoadProgram(false)
      setProgram(programs[i].programName)
        return (programs[i]) 
=======
  for (let i = 0; i < ProgramsArray.length; i++) {
    if (ProgramsArray[i].programCode === programCode) {
      setLoadProgram(false)
      setProgram(ProgramsArray[i].programName)
        return (ProgramsArray[i]) 
>>>>>>> 609b2e1e1d7abf10666e93cdddd011cef40cd2f4
    }
  }
  return(null)
}
 
function addSlashEveryFourCharacters(text) {
  const formattedText = text.replace(/\//g, ''); // Remove any existing slashes
  const regex = /(.{4})/g;
  const newText = formattedText.replace(regex, '$1/');
  setText(newText);
  setisUpdated(newText);
}
 
  const [text, setText] = useState('');
  const inputRef = useRef(null);

  const handleChange = (value) => {
    if (label==="Course ID") {
      if (value.length>0) {setLoadProgram(true)}else{setLoadProgram(false)}

<<<<<<< HEAD
    if (value.length>=3) {
=======
    if (value.length===3) {
>>>>>>> 609b2e1e1d7abf10666e93cdddd011cef40cd2f4
      setStudentProgram(getProgramByCode(value))
    }else{
      setStudentProgram(null)

    }
  }

    if(label==="Student ID"){
<<<<<<< HEAD
        // addSlashEveryFourCharacters(value)  
        setText(value);
        setisUpdated(value);  
=======
        addSlashEveryFourCharacters(value)  
>>>>>>> 609b2e1e1d7abf10666e93cdddd011cef40cd2f4
    }else{
      setText(value);
      setisUpdated(value);  
    }
  };
  
if(label==="Current Year"){
    return(
        <SelectItem itemArr={year}selectedItem={selectedYear} setSelectedItem={setSelectedYear}/>
    )
  }
if(label==="Current Semester"){
    return(
        <SelectItem itemArr={semester}selectedItem={selectedSem} setSelectedItem={setSelectedSem}/>
    )
  }
if(label==="Gender"){
  return(
      <SelectItem itemArr={genders}selectedItem={selectedGender} setSelectedItem={setSelectedGender}/>
  )
}else if(label==="Date of Birth"){
  return(
    <MyCalendar handleSetDate={handleChange}/>
  )
}

else{
   return (
   <>
    <TextInput 
      ref={inputRef}
      autoFocus={editable}
      value={text}
      onChangeText={handleChange}
      placeholder={placeholder}
      placeholderTextColor={COLORS.gray2}
      keyboardType={keyboardType}
      textContentType="none"
      secureTextEntry={secureTextEntry}
      autoCompleteType="off"
      autoCapitalize="sentences"
      maxLength={maxLength}
      editable={editable}
      style={style}
    />
    {LoadProgram&&<ActivityIndicator size={10} color={COLORS.gold} style={{alignSelf:"flex-start", marginLeft:3}} />}
{StudentProgram&& <TextAtom text={`${StudentProgram.programName}  `} c={COLORS.gold} f="Roboto" s={SIZES.h5} w="500" />
}
   </>
  );}
};

export default MyInput;