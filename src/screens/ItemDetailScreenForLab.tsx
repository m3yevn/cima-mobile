import React, { useState, useEffect } from "react";
import { Layout, Input, Button, Datepicker, Card } from "@ui-kitten/components";
import { MainTheme } from "../theme";
import { Header } from "../components/Header";
import { Dimensions, Text, Image, Platform, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TableRow } from "../components/TableRow";
import { Item } from "../models/Item";
import { saveItems } from "../utils/ItemService";

export const ItemDetailScreenForLab = ({ navigation, route }: any) => {
  const [item, setItem] = useState(route.params.item as Item);
  const originalCost = route.params.item.cost;
  const [loading, setLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(true);

  const handleSubmit = () => {
    saveItems(item).then(() => {
      navigation.navigate("Home");
    });
  };

  useEffect(() => {
    if (!item.result) {
      setDisableButton(true);
      return;
    }
    setDisableButton(false);
    switch (!!item.result) {
      case item.result > 50:
        setItem({ ...item, cost: originalCost / 2, testStatus: "FAIL" });
        break;
      default:
        setItem({ ...item, cost: originalCost, testStatus: "PASS" });
        break;
    }
  }, [item.result]);

  return (
    <>
      <Header navigation={navigation} back title={item.itemName} />
      <Layout
        style={{
          flex: 1,
          width: "100%",
          alignItems: "center",
          paddingVertical: 20,
          minHeight: Dimensions.get("window").height,
        }}
      >
        <TouchableOpacity>
          <Image
            style={{ width: 150, height: 150 }}
            source={{ uri: item.image.imageUrl }}
          />
        </TouchableOpacity>
        <Input
          value={item.result ? item.result.toString() : "0"}
          keyboardType={Platform.OS === "android" ? "numeric" : "number-pad"}
          style={MainTheme.LayoutTheme.width_90}
          label="Enter result"
          onChangeText={(value) => {
            setItem({ ...item, result: parseInt(value) });
          }}
          accessoryRight={() => <Text>%</Text>}
        />
        <View style={{ width: "100%" }}>
          <TableRow
            label="Name"
            labelWidth="30%"
            value={item.itemName}
            valueWidth="50%"
          />
          <TableRow
            label="Cost"
            labelWidth="30%"
            value={`$ ${item.cost} SGD`}
            valueWidth="50%"
          />
          <TableRow
            label="Description"
            labelWidth="30%"
            value={item.description || "----"}
            valueWidth="50%"
          />
          <TableRow
            label="Date added"
            labelWidth="30%"
            value={item.date}
            valueWidth="50%"
          />
          <TableRow
            label="Shape"
            labelWidth="30%"
            value={item.shape.toLocaleUpperCase()}
            valueWidth="50%"
          />
          <TableRow
            label="Weight"
            labelWidth="30%"
            value={item.weight + " KG"}
            valueWidth="50%"
          />
        </View>
        <Layout style={{ marginTop: 50 }}>
          <Layout
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              disabled={disableButton || loading}
              style={{ width: "45%", marginHorizontal: "2%" }}
              onPress={handleSubmit}
            >
              {loading ? "Saving..." : "Submit"}
            </Button>
            <Button
              onPress={() => navigation.navigate("Home")}
              appearance="outline"
              style={{ width: "45%", marginHorizontal: "2%" }}
            >
              Cancel
            </Button>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};
