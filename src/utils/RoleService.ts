import firestore from "@react-native-firebase/firestore";
import { Item } from "../models/Item";

export const getRole = async (id: string) => {
  let role;
  const roleRecords = await firestore()
    .collection("USER_ROLE")
    .where("ID", "==", id)
    .get();

  roleRecords.docs.forEach((doc) => {
    role = doc.data()["role"];
  });
  return role;
};
