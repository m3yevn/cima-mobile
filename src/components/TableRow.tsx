import React from "react";
import { Text, View } from "react-native";

export const TableRow = ({ label, value, labelWidth, valueWidth }: any) => {
  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        paddingVertical: 15,
        justifyContent: "flex-end",
        borderBottomColor: "rgba(0,0,0,0.1)",
        borderBottomWidth: 0.3
      }}
    >
      <Text style={{ width: labelWidth, textAlign: "left" }}>{label}</Text>
      <Text> : </Text>
      <Text style={{ width: valueWidth, textAlign: "left" }}>{value}</Text>
    </View>
  );
};
