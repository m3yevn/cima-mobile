import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { Item } from "../models/Item";
import { Store } from "./redux/Store";
import { GLOBAL_ERROR, GLOBAL_SUCCESS } from "./redux/actions/Types";
import { GlobalError } from "../models/Error";
import { GlobalSuccess } from "../models/Success";

export const saveItems = async (item: Item) => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection("ITEM_RECORDS")
      .doc(item.id)
      .set(item)
      .then(() => {
        Store.dispatch({
          type: GLOBAL_SUCCESS,
          payload: new GlobalSuccess(200, "Success", "Item is updated"),
        });
        resolve();
      })
      .catch(() => {
        reject();
      });
  });
};

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
    console.log(doc.data()["testStatus"]);
    if (doc.data()["testStatus"] === null) {
      items.push({
        ...doc.data(),
        id: doc.id,
        date: (doc.data()["createDate"].toDate() as Date).toDateString(),
      } as Item);
    }
  });
  return items;
};

export const deleteItem = (id: string, imageName: string) => {
  return new Promise(async (resolve, reject) => {
    storage()
      .ref(imageName)
      .delete()
      .catch((ex) => {
        Store.dispatch({
          type: GLOBAL_ERROR,
          payload: new GlobalError(500, "Storage Delete Failed",ex.message),
        });
      });
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
  return new Promise((resolve, reject) => {
    if (item.shape === "cube" && item.weight > 10) {
      item.test = true;
      item.testStatus = null;
    }
    firestore()
      .collection("ITEM_RECORDS")
      .add(item)
      .then((result) => {
        Store.dispatch({
          type: GLOBAL_SUCCESS,
          payload: new GlobalSuccess(200, "Success", "Item is added"),
        });
        resolve();
      })
      .catch(() => {
        reject();
      });
  });
};
