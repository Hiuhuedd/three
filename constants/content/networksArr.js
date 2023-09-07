
import { getFirestore, collection, getDocs,getDoc,doc } from 'firebase/firestore';

export const NetworksArray = async () => {
  try {
    const db = getFirestore();
    const querySnapshot = await getDocs(collection(db, 'networks'));

    const collectionData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("this is the networks array",collectionData.length)
    return collectionData;
  } catch (error) {
    // Handle any errors that may occur during the retrieval process
    console.error('Error retrieving nework data:', error);
    return null;
  }
};