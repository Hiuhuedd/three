import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import ViewAtom from '../Atoms/ViewAtom';
import TextAtom from '../Atoms/TextAtom';
import { COLORS, SIZES } from '../../constants/theme';
import MyInput from '../Atoms/MyInput';
import { ProgramsArray } from '../../constants/content/programs';

const StepComponent  = React.memo(({ children, isActive }) => {
  return <View style={{ display: isActive ? 'flex' : 'none' }}>{children}</View>;

});

function InputCarousel({ activeIndex, setActiveIndex, setUserData }) {
  const ref = useRef(null);
  const [error, setError] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [Gender, setGender] = useState('');
  const [DOB, setDOB] = useState('');
  const [ProgramId, setProgramId] = useState('');
  const [Year, setYear] = useState('');
  const [Sem, setSem] = useState('');
  const [StudentId, setStudentId] = useState('');
  const [StudentProgram, setStudentProgram] = useState(null);

  const inputArray = [
    [
      {
        label: 'Firstname',
        placeholder: 'First name',
        value: firstName,
        setValue: setFirstName,
        keyboardType: 'default',
        maxLength: 40,
        secureTextEntry: false,
      },
      {
        label: 'Lastname',
        placeholder: 'Last name',
        value: lastName,
        setValue: setLastName,
        keyboardType: 'default',
        maxLength: 40,
        secureTextEntry: false,
      },
    ],
    [
      {
        label: 'Email',
        placeholder: 'Email',
        value: email,
        setValue: setEmail,
        keyboardType: 'default',
        maxLength: 40,
        secureTextEntry: false,
      },
      {
        label: 'Phone',
        placeholder: 'Phone',
        value: phone,
        setValue: setPhone,
        keyboardType: 'numeric',
        maxLength: 10,
        secureTextEntry: false,
      },
    ],
    [
      {
        label: 'Gender',
        placeholder: 'Gender',
        value: Gender,
        setValue: setGender,
        keyboardType: 'default',
        maxLength: 40,
        secureTextEntry: true,
      },
      // {
      //   label: 'Date of Birth',
      //   placeholder: 'DoB',
      //   value: DOB,
      //   setValue: setDOB,
      //   keyboardType: 'default',
      //   maxLength: 40,
      //   secureTextEntry: true,
      // },
    ],
    [
      {
        label: 'Course ID',
        placeholder: 'C45',
        value: ProgramId,
        setValue: setProgramId,
        keyboardType: 'defaut',
        maxLength: 5,
        secureTextEntry: false,
      },
    ],
    [
      {
        label: 'Current Year',
        placeholder: 'select',
        value: Year,
        setValue: setYear,
        keyboardType: 'numeric',
        maxLength: 4,
        secureTextEntry: true,
      },
      {
        label: 'Current Semester',
        placeholder: 'select',
        value: Sem,
        setValue: setSem,
        keyboardType: 'numeric',
        maxLength: 4,
        secureTextEntry: true,
      },
    ],
    [
      {

        label: 'Student ID',
        placeholder: '2121/2019',
        value: StudentId,
        setValue: setStudentId,
        keyboardType: 'default',
        maxLength: 12,
        secureTextEntry: false,
      },
      {
        label: '4 digit pin',
        placeholder: 'Pin',
        value: pin,
        setValue: setPin,
        keyboardType: 'numeric',
        maxLength: 4,
        secureTextEntry: false,
      },
    ],
  ];

  useEffect(() => {
    if (error) {
      showAlert(ALERT_TYPE.WARNING, 'Oops!', error);
    }
  }, [error]);


  useEffect(() => {
    ref.current?.scrollTo({ index: activeIndex });
  }, [activeIndex]);
  useEffect(() => {
setUserData({firstName,lastName,email,phone,pin,Gender,DOB,ProgramId,Year,Sem,StudentId,StudentProgram})
console.log(firstName,lastName,email,phone,pin,Gender,DOB,ProgramId,Year,Sem,StudentId,StudentProgram);
  }, [firstName,lastName,email,phone,pin,Gender,DOB,ProgramId,Year,Sem,StudentId,StudentProgram]);

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;


  const styles = StyleSheet.create({
    input: {
      height: height*.06,
      borderWidth: 1,
      borderColor: COLORS.gray2,
      borderRadius: 5,
      paddingHorizontal: 5,
      marginBottom: 3,
      width: '100%',
      color: '#fff',
    },
  });
  return (
    <View style={{}}>
 <TextAtom text={`Step ${activeIndex+1} of ${inputArray.length}`}s={SIZES.h3} w={"500"} f="Poppins" ta="left" ls={-1}c={COLORS.white} />

 {inputArray.map((pairArr, index) => (
        <StepComponent key={index} isActive={activeIndex === index}>
          {pairArr.map((input) => (
                  <ViewAtom key={input.label} fd="column" jc="center" ai="center"  bg="transparent" pv={5} br={0} mv={0} mh={0}>

              {/* Your InputComponent code here */}
              <ViewAtom key={input.label} fd="row" jc="flex-start" ai="center" w="100%" bg="transparent" pv={5} br={0} mv={0} mh={0}>
            <TextAtom text={`${input.label}  `} c={COLORS.white} f="Roboto" s={SIZES.h5} w="500" />
            
            {input.label==='Course ID'&&            <TextAtom text={`First 3 or 4 characters of your registration number `} c={COLORS.white} f="Roboto" s={SIZES.base} w="500" />
}
          </ViewAtom>
              <MyInput
                editable={true}
                keyboardType={input.keyboardType}
                secureTextEntry={input.secureTextEntry}
                style={styles.input}
                placeholder={input.placeholder}
                maxLength={input.maxLength}
                value={input.value}
                setisUpdated={input.setValue}
                label={input.label}
                setProgram={setStudentProgram}
              />
            </ViewAtom>
          ))}
        </StepComponent>
      ))}
    </View>
  );
}

export default InputCarousel;
// const styles = StyleSheet.create({
//   input: {
//     height: 50,
//     borderWidth: 1,
//     borderColor: COLORS.gray2,
//     borderRadius: 5,
//     paddingHorizontal: 5,
//     marginBottom: 5,
//     width: '100%',
//     color: '#fff',
//   },
// });

