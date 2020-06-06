import firestore from "@react-native-firebase/firestore";

export const itemCollection = firestore().collection("ITEM_RECORDS");

export const getItems = async () => {
  const itemRecords = await firestore().collection("ITEM_RECORDS").get();
  const items: any[] = [];
  itemRecords.docs.forEach((doc) => {
    items.push(doc.data());
  });
  return items;
};

export const addItem = async (item: any) => {
  firestore().collection("ITEM_RECORDS").add(item);
};
