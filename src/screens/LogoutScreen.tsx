import React, { useEffect, useState } from "react";
import { Layout, Spinner, Text } from "@ui-kitten/components";
import { MainTheme } from "../theme";
import auth from "@react-native-firebase/auth";

export const LogoutScreen = ({ navigation }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const onAuthStateChanged = (user: any) => {
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    if(isAuthenticated) {
      setTimeout(() => {
        navigation.navigate("Home")
      },500);
    } else {
      setTimeout(() => {
        navigation.navigate("Login")
      },500);
    }
  })

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <Layout style={MainTheme.LayoutTheme.container}>
      <Text>Wait for it..</Text>
      <Layout style={{ marginTop: 20 }}>
        <Spinner size="large" />
      </Layout>
    </Layout>
  );
};
