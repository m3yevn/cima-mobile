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
import auth from "@react-native-firebase/auth";
import { AddItemScreen } from "./src/screens/AddItemScreen";
import { useSelector, Store } from "./src/utils/redux/Store";
import { SuccessModalInjector } from "./src/components/ModalSuccess";
import { ErrorModalInjector } from "./src/components/ModalError";
import { Provider } from "react-redux";
import { ItemDetailScreenForLab } from "./src/screens/ItemDetailScreenForLab";
import { ItemDetailScreenForCima } from "./src/screens/ItemDetailScreenForCima";

const Stack = createStackNavigator();

function RootStack() {
  checkPreviousSession();
  const error = useSelector((state) => state.globalError);
  const success = useSelector((state) => state.globalSuccess);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const onAuthStateChanged = (user: any) => {
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      {!!success && !!success.name && (
        <SuccessModalInjector title={success.name} message={success.message} />
      )}
      {!!error && !!error.name && (
        <ErrorModalInjector title={error.name} message={error.message} />
      )}
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...Colors }}>
        <NavigationContainer>
          <Stack.Navigator headerMode="none">
            {isAuthenticated && (
              <>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="AddItem" component={AddItemScreen} />
                <Stack.Screen
                  name="ItemDetailScreenForLab"
                  component={ItemDetailScreenForLab}
                />
                <Stack.Screen
                  name="ItemDetailScreenForCima"
                  component={ItemDetailScreenForCima}
                />
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
      <Provider store={Store}>
        <RootStack />
      </Provider>
    );
  }
}
