import React, { useState, useEffect } from "react";
import { getTestItems } from "../utils/ItemService";
import { Item } from "../models/Item";
import { Card, Spinner, List, Button, Icon } from "@ui-kitten/components";
import { View, Image, Text } from "react-native";
import { Header } from "../components/Header";
import { MainTheme } from "../theme";
import { useSelector } from "../utils/redux/Store";

export const LabHomeScreen = ({ navigation }: any) => {
  const success = useSelector((state) => state.globalSuccess.name);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const handleOnRefresh = () => {
    setLoading(true);
    getTestItems()
      .then((result) => {
        setItems(result);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    setLoading(true);
    getTestItems()
      .then((result) => {
        setItems(result);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [success]);

  const handleItemDetail = (item: Item) => {
    navigation.navigate("ItemDetailScreenForLab", {
      item,
    });
  };

  interface IRenderItem {
    item: Item;
    index: number;
  }

  const renderItem = ({ item, index }: IRenderItem) => (
    <Card onPress={() => handleItemDetail(item)}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ paddingHorizontal: 10 }}>
          <Image
            style={{ width: 50, height: 50 }}
            source={
              !!item.image && !!item.image.imageUrl
                ? { uri: item.image.imageUrl }
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
      <Header refresh onRefresh={handleOnRefresh} title="Home" />
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
    </>
  );
};
