import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { HomeScreen } from "./src/screens/HomeScreen";
import { LoginScreen } from "./src/screens/LoginScreen";
import { default as Colors } from "./src/theme/Colors.json";
import { checkPreviousSession } from "./src/utils/helpers/SessionHelper";
import { LogoutScreen } from "./src/screens/LogoutScreen";
import auth from '@react-native-firebase/auth';
import { AddItemScreen } from "./src/screens/AddItemScreen";

const Stack = createStackNavigator();

function RootStack() {
  checkPreviousSession();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const onAuthStateChanged = (user:any) => {
    if(user){
    setIsAuthenticated(true);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...Colors }}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={isAuthenticated ? "Home" : "Login"}
            headerMode="none"
          >
            {isAuthenticated && (
              <>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="AddItem" component={AddItemScreen} />
              </>
            )}
            {!isAuthenticated && (
              <>
                <Stack.Screen name="Login" component={LoginScreen} />
              </>
            )}
            <Stack.Screen name="Logout" component={LogoutScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
}

export class App extends React.Component {
  render() {
    return (
        <RootStack />
    );
  }
}
