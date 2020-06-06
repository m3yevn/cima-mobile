import React, { useState, useEffect } from "react";
import { getItems } from "../utils/ItemService";
import { Item } from "../models/Item";
import { Card, Spinner, List, Button, Icon } from "@ui-kitten/components";
import { View, Image, Text } from "react-native";
import { Header } from "../components/Header";
import { MainTheme } from "../theme";

export const CimaHomeScreen = ({ navigation }: any) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getItems()
      .then((result) => {
        setItems(result);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  interface IRenderItem {
    item: Item;
    index: number;
  }

  const renderItem = ({ item, index }: IRenderItem) => (
    <Card>
      <View style={{ flexDirection: "row" }}>
        <View style={{ paddingHorizontal: 10 }}>
          <Image
            style={{ width: 50, height: 50 }}
            source={
              !!item.imageUrl
                ? { uri: item.imageUrl }
                : require("../assets/logo.png")
            }
          />
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            {item.itemName}
          </Text>
          <Text style={{ fontWeight: "100", color: "gray" }}>{item.date}</Text>
        </View>
        <View style={{ right: 5, position: "absolute", width: "60%" }}>
          <Text style={{ textAlign: "right" }}>${item.cost} SGD</Text>
          <Text style={{ textAlign: "right" }}>{item.description}</Text>
          <Text style={{ textAlign: "right" }}>Shape: {item.shape}</Text>
          <Text style={{ textAlign: "right" }}>
            Need Test?: {item.test ? "Yes" : "No"}
          </Text>
          <Text
            style={{
              textAlign: "right",
              color: !item.testStatus
                ? "lightgray"
                : item.testStatus === "Pass"
                ? "green"
                : "red",
            }}
          >
            Status: {item.testStatus || "----"}
          </Text>
        </View>
      </View>
    </Card>
  );

  return (
    <>
      <Header title="Home" />
      <View style={{ minHeight: "86%", ...MainTheme.LayoutTheme.container }}>
        {loading && <Spinner size="giant" />}
        {!loading && (
          <>
            {items && !!items.length && (
              <List
                style={{ height: "86%", width: "98%" }}
                data={items}
                renderItem={renderItem}
              />
            )}
            {!items.length && <Text>No items</Text>}
          </>
        )}
      </View>
      <Button
        onPress={() => {
          navigation.navigate("AddItem");
        }}
        accessoryLeft={(props) => <Icon {...props} name="plus" />}
      >
        Add Item
      </Button>
    </>
  );
};
