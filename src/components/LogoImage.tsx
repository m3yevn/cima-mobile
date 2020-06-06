import React from "react";
import { Image } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { default as Colors } from "../theme/Colors.json";
import { logoImage } from "../constants/Image";

export const LogoImage = ({ width, height, padding, fontSize }: any) => {
  return (
    <Layout
      style={{
        padding,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Image style={{ width, height }} source={{ uri: require("../assets/logo.png") }} />
      <Layout style={{ flexDirection: "row" }}>
        <Text style={{ fontSize, fontWeight: "bold" }}>Penta</Text>
        <Text
          style={{
            fontSize,
            fontWeight: "bold",
            color: Colors["color-primary-500"],
          }}
        >
          Ocean
        </Text>
      </Layout>
    </Layout>
  );
};
