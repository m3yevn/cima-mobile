import React from "react";
import { View, Text } from "react-native";
import { Button, Icon } from "@ui-kitten/components";

export const Header = ({ title }: any) => (
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
    <Text style={{ fontSize: 25, fontWeight: "bold", color: "white" }}>
      {title}
    </Text>
    <View style={{ right: 5, position: "absolute" }}>
      <Button
        status="danger"
        accessoryRight={(props) => <Icon {...props} name="log-out" />}
      >
        {}
      </Button>
    </View>
  </View>
);
