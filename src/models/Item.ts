import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { FirebaseImageType } from "./Image";

export interface Item {
  id: string;
  itemName: string;
  test: boolean;
  cost: number;
  testStatus: string | null;
  description: string;
  image: FirebaseImageType;
  weight: number;
  shape: string;
  date: string;
  createDate: FirebaseFirestoreTypes.Timestamp;
  result: number;
}
