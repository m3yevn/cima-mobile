import firestore from "@react-native-firebase/firestore";
import { Item } from "../models/Item";

export const itemCollection = firestore().collection("ITEM_RECORDS");

export const getItems = async () => {
  const itemRecords = await firestore().collection("ITEM_RECORDS").get();
  const items: any[] = [];
  itemRecords.docs.forEach((doc) => {
    items.push({
      ...doc.data(),
      id: doc.id,
      date: (doc.data()["createDate"].toDate() as Date).toDateString(),
    } as Item);
  });
  return items;
};

export const addItem = async (item: any) => {
  firestore().collection("ITEM_RECORDS").add(item);
};
