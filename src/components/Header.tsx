import React from "react";
import { View, Text } from "react-native";
import { Button, Icon } from "@ui-kitten/components";
import { signOut } from "../utils/AuthService";

export const Header = ({
  title,
  back,
  navigation,
  refresh,
  onRefresh,
}: any) => {
  const backToPrevious = () => {
    navigation.navigate("Home");
  };
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "deepskyblue",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 50,
      }}
    >
      {!!refresh && (
        <View style={{ left: 5, position: "absolute" }}>
          <Button
            onPress={() => onRefresh()}
            accessoryRight={(props) => (
              <Icon width={20} height={20} {...props} name="refresh" />
            )}
          >
            {}
          </Button>
        </View>
      )}
      {!!back && (
        <View style={{ left: 5, position: "absolute" }}>
          <Button
            onPress={backToPrevious}
            accessoryRight={(props) => (
              <Icon width={40} height={50} {...props} name="chevron-left" />
            )}
          >
            {}
          </Button>
        </View>
      )}
      <Text style={{ fontSize: 25, fontWeight: "bold", color: "white" }}>
        {title}
      </Text>
      <View style={{ right: 5, position: "absolute" }}>
        <Button
          onPress={signOut}
          status="danger"
          accessoryRight={(props) => <Icon {...props} name="log-out" />}
        >
          {}
        </Button>
      </View>
    </View>
  );
};
