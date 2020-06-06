import firestore from "@react-native-firebase/firestore";
import { Item } from "../models/Item";
import { Store } from "./redux/Store";
import { GLOBAL_ERROR } from "./redux/actions/Types";
import { GlobalError } from "../models/Error";

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

export const getTestItems = async () => {
  const itemRecords = await firestore()
    .collection("ITEM_RECORDS")
    .where("test", "==", true)
    .where("shape", "==", "cube")
    .get();
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

export const deleteItem = (id: string) => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection("ITEM_RECORDS")
      .doc(id)
      .delete()
      .then(() => {
        resolve();
      })
      .catch(() => {
        Store.dispatch({
          type: GLOBAL_ERROR,
          payload: new GlobalError(500, "Delete Failed"),
        });
        reject();
      });
  });
};

export const addItem = async (item: Item) => {
  if (item.shape === "cube" && item.weight > 10) {
    item.test = true;
    item.testStatus = null;
  }
  firestore().collection("ITEM_RECORDS").add(item);
};
