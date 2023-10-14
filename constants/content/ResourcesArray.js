import { collection, doc, getDocs, getFirestore, query } from 'firebase/firestore';

export const ResourcesArray = async (units) => {
  try {
    const db = getFirestore();
    const collectionRef = collection(db, 'contributions'); // Collection reference

    const unitDataPromises = units.map(async (unit) => {
      const documentRef = doc(collectionRef, unit.UnitCode); // Document reference
      if (documentRef) {
        const itemsCollectionRef = collection(documentRef, 'items'); // Subcollection reference
        const q = query(itemsCollectionRef); // Query all documents in the subcollection
        const snapshot = await getDocs(q);
        const itemsData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        return {  itemsData };
      }
      return null; // Handle the case where the documentRef doesn't exist
    });

    // Use Promise.all to wait for all unitDataPromises to resolve
    const unitDataArray = await Promise.all(unitDataPromises);
    const mergedItemsData =unitDataArray.reduce((acc, itemsData) => acc.concat(itemsData), []);

    return mergedItemsData.filter((unitData) => unitData !== null&&unitData.itemsData.length>0);
  } catch (error) {
    console.error('Error retrieving items data:', error);
    throw error; // Rethrow the error to handle it in the calling code.
  }
};
