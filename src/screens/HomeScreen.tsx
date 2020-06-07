import React, { useEffect, useState } from "react";
import { Text, Button } from "@ui-kitten/components";
import { MainTheme } from "../theme";
import { View } from "react-native";
import { getRole } from "../utils/RoleService";
import { currentUser, signOut } from "../utils/AuthService";
import { UserLoginType } from "../constants/Types";
import { CimaHomeScreen } from "./HomeScreenForCima";
import { LabHomeScreen } from "./HomeScreenForLab";

export const HomeScreen = ({ navigation }: any) => {
  const [role, setRole] = useState<any>("");

  useEffect(() => {
    getRole(currentUser()?.uid as string).then((result) => {
      if (result !== UserLoginType.Cima && result !== UserLoginType.Lab) {
        signOut();
      }
      setRole(result);
    });
  }, []);

  return (
    <>
      {role === UserLoginType.Cima && (
        <CimaHomeScreen navigation={navigation} />
      )}
      {role === UserLoginType.Lab && <LabHomeScreen navigation={navigation} />}
    </>
  );
};
