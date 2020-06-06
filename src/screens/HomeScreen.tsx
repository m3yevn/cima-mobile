import React, { useEffect, useState } from "react";
import { Layout, Text, List, Card, Button } from "@ui-kitten/components";
import { MainTheme } from "../theme";
import { getItems, itemCollection } from "../utils/ItemService";
import { View, Image } from "react-native";
import { Header } from "../components/Header";
import { ScrollView } from "react-native-gesture-handler";

export const HomeScreen = ({ navigation }: any) => {
  const [items, setItems] = useState<any>([]);

  useEffect(() => {
    getItems().then((result) => {
      setItems(result);
    });
  }, []);

  const renderItem = ({ item, index }: any) => (
    <Card>
      <View>
        <Image
          style={{ width: 50, height: 50 }}
          source={{ uri: item.imageUrl || require("../assets/logo.png") }}
        />
        <Text>{item.itemName}</Text>
      </View>
    </Card>
  );

  return (
    <>
      <Header title="Home" />
      <ScrollView>
        {items && !!items.length && (
          <List
            style={{ height: "86%" }}
            data={items}
            renderItem={renderItem}
          />
        )}
        {!items.length && (
          <Layout
            style={{ minHeight: "86%", ...MainTheme.LayoutTheme.container }}
          >
            <Text>No items</Text>
          </Layout>
        )}
      </ScrollView>
      <Button
        onPress={() => {
          navigation.navigate("AddItem");
        }}
      >
        Add Item
      </Button>
    </>
  );
};
