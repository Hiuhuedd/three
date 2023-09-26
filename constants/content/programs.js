
import { getFirestore, collection, getDocs,getDoc,doc } from 'firebase/firestore';

export const ProgramsArray = async () => {
  try {
    const db = getFirestore();
    const querySnapshot = await getDocs(collection(db, 'programs'));

    const collectionData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    if(collectionData){
      return collectionData;

    }else{
      return[]
    }
    // console.log(collectionData,collectionData.length);
  } catch (error) {
    // Handle any errors that may occur during the retrieval process
    console.error('Error retrieving prog data:', error);
    return null;
  }
};

export const UnitsArray = async () => {
  try {
    const db = getFirestore();
    const querySnapshot = await getDocs(collection(db, 'units'));

    const collectionData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    
    return collectionData;
  } catch (error) {
    // Handle any errors that may occur during the retrieval process
    console.error('Error retrieving prog data:', error);
    return null;
  }
};
export const getTimetableFromFirestore = async (user) => {
  try {
    const db = getFirestore();
    const usersCollection = collection(db, 'timetables');
    const refNo=`${user.ProgramId}${user.Year}`

    const userDocRef = doc(usersCollection, refNo);

    // Get the user document using the userDocRef
    const userDocSnapshot = await getDoc(userDocRef);

    // Check if the user document exists
    if (userDocSnapshot.exists()) {
      
      
    const timetable = userDocSnapshot.data();
    return timetable
  } else {
   
    
     
      return false;
    }
  } catch (error) {
    // Handle any errors that may occur during the retrieval process
    console.error('Error retrieving timetable user data:', error);
    return false;
  }
};
