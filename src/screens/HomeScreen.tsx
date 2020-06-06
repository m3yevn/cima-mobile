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
      setRole(result);
    });
  }, []);

  switch (role) {
    case UserLoginType.Cima:
      return <CimaHomeScreen navigation={navigation} />;
    case UserLoginType.Lab:
      return <LabHomeScreen navigation={navigation} />;
    default:
      return <></>;
  }
};
