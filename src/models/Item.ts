import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export interface Item {
  id: string;
  itemName: string;
  test: boolean;
  cost: number;
  testStatus: string;
  description: string;
  imageUrl: string;
  weight: number;
  shape: string;
  date: string;
  createDate: FirebaseFirestoreTypes.Timestamp;
}
