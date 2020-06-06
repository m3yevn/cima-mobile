import auth from "@react-native-firebase/auth";
import { Store } from "./redux/Store";
import { GLOBAL_ERROR } from "./redux/actions/Types";
import { GlobalError } from "../models/Error";

export const signIn = (email: string, password: string) => {
  auth()
    .signInWithEmailAndPassword(email, password)
    .catch(() => {
      Store.dispatch({
        type: GLOBAL_ERROR,
        payload: new GlobalError(500, "Login Failed", "Invalid credentails"),
      });
    });
};

export const signOut = () => {
  auth().signOut();
};

export const currentUser = () => {
  return auth().currentUser;
};
