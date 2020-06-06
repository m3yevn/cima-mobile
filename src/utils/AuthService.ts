import auth from "@react-native-firebase/auth";

export const signIn = (email: string, password: string) => {
  auth().signInWithEmailAndPassword(email, password);
};
