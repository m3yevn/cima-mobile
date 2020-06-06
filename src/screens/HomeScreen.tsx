import React, { useEffect, useState } from "react";
import { Text, List, Card, Button, Spinner, Icon } from "@ui-kitten/components";
import { MainTheme } from "../theme";
import { getItems } from "../utils/ItemService";
import { View, Image } from "react-native";
import { Header } from "../components/Header";
import { logoImage } from "../constants/Image";
import { Item } from "../models/Item";

export const HomeScreen = ({ navigation }: any) => {
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
            source={{ uri: !!item.imageUrl ? item.imageUrl : logoImage }}
          />
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            {item.itemName}
          </Text>
          <Text style={{ fontWeight: "100", color: "gray" }}>
            {item.date}
          </Text>
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
