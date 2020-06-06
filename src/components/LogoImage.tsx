import React from "react";
import { Image } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { default as Colors } from "../theme/Colors.json";

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
      <Image style={{ width, height }} source={require("../assets/logo.png")} />
      <Layout>
        <Text style={{ textAlign: "center", fontSize, fontWeight: "bold" }}>
        CIMA
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            color: Colors["color-primary-500"],
          }}
        >
        🚧Construction Inventory Management App🚧
        </Text>
      </Layout>
    </Layout>
  );
};
