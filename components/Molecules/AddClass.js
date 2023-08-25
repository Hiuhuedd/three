import React ,{useState,useEffect, useRef}from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, TouchableWithoutFeedback, } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import appTheme from '../../constants/theme';
import ViewAtom from '../Atoms/ViewAtom';
import TextAtom from '../Atoms/TextAtom';
import { Icon } from 'react-native-elements';
import MyInput from '../Atoms/MyInput';
import { RadioButton } from 'react-native-paper';
import CardAtom from '../Atoms/CardAtom';
import { ProgramsArray, UnitsArray } from '../../constants/content/programs';
import PopUp2 from './PopUp2';
import { getFirestore, collection, setDoc, doc } from 'firebase/firestore';
import { useSelector } from 'react-redux';

const {COLORS, SIZES, FONTS}=appTheme
const AddClass= React.forwardRef(({slot,handleAddClass,handleUpdateTimetable }, ref) => {
  const locationArr = [
      { location: "Science Complex", longitude: 123.456, latitude: 78.901 },
      { location: "SZ39", longitude: 234.567, latitude: 89.012 },
      { location: "OLM", longitude: 345.678, latitude: 90.123 },
      { location: "Education", longitude: 456.789, latitude: 12.345 },
      { location: "Economics", longitude: 567.890, latitude: 23.456 },
      { location: "SOM", longitude: 678.901, latitude: 34.567 },
    ];

   const a_units=useSelector(state => state.userReducer.units);
    
    
    
    
    
    const [ClassObj, setClassObj]=useState({})
 const handleSetLocation=(f)=>{
      setlocation(f)
}
  
  const [Search, setSearch] = React.useState(false);
  const [broadcast, setValue] = React.useState(true);
  const [location, setlocation] = React.useState(locationArr[0].location);
  const [ClassName, setClassName] = React.useState('');
  const [NewClassName, setNewClassName] = React.useState('');
  const [UnitCode, setUnitCode] = React.useState('');
  const [professor, setprofessor] = React.useState('');
  const [Loading, setLoading] = React.useState(false);
  

  useEffect(() => {
    if (UnitCode.length > 1) setSearch(true);
    if (UnitCode.length === 6) findUnitByCode(UnitCode.toUpperCase());
  }, [UnitCode]);

  function findUnitByCode(unitCode) {
    console.log(a_units);

      const unit = a_units.find(unit => unit.UnitCode.toUpperCase() === unitCode);
      if (unit) {
      if (unit?.NewClassName!=='') {
       console.log(unit)
        setSearch(false);
        setNewClassName(unit?.NewClassName);
        setClassName(unit?.NewClassName);
      } else {
        setNewClassName('');
        setClassName(null);
        setSearch(false);
      }
    
  }    else {
    setNewClassName('');
    setClassName(null);
    setSearch(false);
  }
  }


  useEffect(() => {
    setClassObj({UnitCode,ClassName,location,broadcast,professor,slot})
}, [UnitCode,ClassName,location,broadcast,professor])

  const handleUpdate=  async()=>{

    setLoading(true)
    const slotObj={
      unitCode:UnitCode,
      unitName:ClassName?ClassName:NewClassName,
      start:slot.start,
      end: slot.end,
      professor: professor,
      index:slot.index,
      location:location,
      broadcast:broadcast
    }
    const slotDay=slot.day
    const slotHr=slot.index
  const updated=await handleUpdateTimetable(slotDay,slotHr,slotObj)
 
   

   // Update Firestore document
   try {
    const db = getFirestore();
    const collectionRef = collection(db, 'units'); // Collection reference
    const documentRef = doc(collectionRef, UnitCode); // Document reference

    // const usersCollection = collection(db, 'users'); // Replace 'users' with the name of your Firestore collection

    // Add the user data to Firestore using the set() function to ensure the data is stored with the predetermined user ID
    await setDoc(documentRef, { UnitCode,NewClassName });

    if (updated) {
      setTimeout(() => {
        handleAddClass()
        setLoading(false)
      }, 500);
    }

  } catch (error) {
    setLoading(false)

    // Handle any errors that occur during the upload process
    console.error('Error uploading user data:', error);
  }
};

  

      
  return (
    <>
   
    <RBSheet
      ref={ref}
      height={600}
      openDuration={200}
      dragFromTopOnly  
      closeOnDragDown
      customStyles={{
        container: {
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          alignItems:"center",
          backgroundColor:COLORS.black
         
        },
      }}
      >
          <ViewAtom fd="column" jc="space-between"  w="100%" pv={10} ph={30} bg="transparent" br={0} mv={0} mh={0} >
          <TextAtom text={`Add class `} c={COLORS.white} f="Roboto" s={SIZES.h5} ta="center" w="500" />

          <ViewAtom  fd="row" jc="flex-start" ai="center"  bg="transparent" pv={5} br={0} mv={0} mh={0}>
            <TextAtom text={`${slot.start}  `} c={COLORS.white} f="Roboto" s={SIZES.base} w="500" />
            <CardAtom fd="column" jc="center" ai="center"   pv={.3} ph="40%" bg={COLORS.green} br={3} mv={1} mh={1}   el={3} sh='#525252' >
          </CardAtom>
            <TextAtom text={`${slot.end}  `} c={COLORS.white} f="Roboto" s={SIZES.base} w="500" />
            
          </ViewAtom>

            <TextAtom text="Unit Code" c={COLORS.white} f="Poppins" s={SIZES.h5} w="500"/>
            <MyInput editable={true} keyboardType="default" secureTextEntry={false} style={styles.input1} placeholder={`UCU100`} maxLength={6} setisUpdated={(ex)=>{setUnitCode(ex)}} index={0} />

       {
        Search?<ActivityIndicator size={10} color={COLORS.gold} style={{alignSelf:"flex-start", marginLeft:3}} />:
       <>
      { ClassName===null? <>
       <TextAtom text="Unit Name" c={COLORS.white} f="Poppins" s={SIZES.h5} w="500"/>
            <MyInput editable={true} keyboardType="default" secureTextEntry={false} style={styles.input} placeholder={`Communication Skills`} maxLength={40} setisUpdated={(ex)=>{setNewClassName(ex)}} index={0} />
       </>
       :<>
              <TextAtom text={ClassName} c={COLORS.gold} f="Poppins" s={SIZES.base} w="500"/>

       </>}
       </>
            }
         <TextAtom text="Unit Professor" c={COLORS.white} f="Poppins" s={SIZES.h5} w="500"/>
            <MyInput editable={true} keyboardType="default" secureTextEntry={false} style={styles.input} placeholder={`Dr. Hiuhu`} maxLength={40} setisUpdated={(ex)=>{setprofessor(ex)}} index={0} />

            <TextAtom text="Should Your classmates see this update?" c={COLORS.gray} f="Poppins" s={SIZES.base} w="500"/>
            <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={broadcast}>
                        <View>
                        <ViewAtom fd="row" jc="flex-start" ai="center" w="100%" pv={0} ph={0} bg="transparent" br={0} mv={0} mh={0}>
                        <RadioButton  value={true} status={broadcast? 'checked' : 'unchecked'} uncheckedColor={COLORS.gray2} color={COLORS.primary} />
             <TextAtom text="Yes" c={COLORS.white} f="Poppins" s={SIZES.body5}w="500"/>

                        </ViewAtom>
                        <ViewAtom w="100%" pv={.2} ph={0} bg={COLORS.gray} br={0} mv={0} mh={0}>              
                </ViewAtom>
                        <ViewAtom fd="row" jc="flex-start" ai="center" w="100%" pv={0} ph={0} bg="transparent" br={0} mv={0} mh={0}>
                 
                    <RadioButton  value={false} status={!broadcast ? 'checked' : 'unchecked'} uncheckedColor={COLORS.gray2} color={COLORS.primary} />
             <TextAtom text="No" c={COLORS.white} f="Poppins" s={SIZES.body5} w="500"/>

                       </ViewAtom>
                        </View>                        
                    </RadioButton.Group>

                    <ViewAtom fd="row" jc="center" ai="center" w="100%" pv={0} ph={5} bg="transparent" br={0} mv={0} mh={0}>
                
                <CardAtom fd="column" w="100%" jc="flex-start" ai="center" pv={1} ph={2} bg={COLORS.white} br={5} mv={10} mh={0}
            el={2} sh='#525252' 
            >
                <ViewAtom fd="row" jc="space-between" ai="center" w="100%" pv={0} ph={5} bg="transparent" br={0} mv={0} mh={0}>
                <Icon  name="navigate-circle" type='ionicon' color={COLORS.primary} size={SIZES.h2}/>

                <ViewAtom fd="column" jc="center" ai="flex-end"bg="" w={"25%"} br={0} mv={10} mh={0}>

                 <TextAtom text="Venue" c={COLORS.primary} f="Poppins" s={SIZES.base} w="500"/>
                 <TextAtom text={` ${location}`} c={COLORS.primary} f="Poppins" s={SIZES.base} w="500"/>

                </ViewAtom>
             <PopUp2 handleSetItem={handleSetLocation} arr={locationArr} />
            
                </ViewAtom>
            </CardAtom>
                </ViewAtom>

            </ViewAtom>



      <ViewAtom w="100%" mv={20} mh={0}ai="center" >
     <TouchableOpacity style={styles.btn} onPress={ ()=>{ handleUpdate() } }  >
{    Loading?<ActivityIndicator size="small" color={COLORS.primary} />:    
            <TextAtom text="Add Class" c={COLORS.primary} f="Poppins" s={SIZES.h5} w="500"/>}
    </TouchableOpacity>
         </ViewAtom>
                        
         
    </RBSheet>
    </>
  );
});

export default AddClass
const styles = StyleSheet.create({
    input1: {
      height: 45,
      borderWidth: 1,
      paddingHorizontal: 10,
      marginBottom: 10,
      width:"100%",
      color:COLORS.white,
      borderColor: COLORS.white,
      borderRadius: 5,
      textTransform:"uppercase"
      },
    input: {
      height: 45,
      borderWidth: 1,
      borderColor: COLORS.white,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 10,
      width:"100%",
      color:COLORS.white
      },
    btn:  {
        backgroundColor: COLORS.white,
        alignItems: "center",
        borderRadius: 5,
        width: "85%",
        paddingHorizontal:10,
        paddingVertical: 10,
        elevation: 1,
        shadowColor: COLORS.gray2,
        fontFamily:"Poppins"
      }
    });