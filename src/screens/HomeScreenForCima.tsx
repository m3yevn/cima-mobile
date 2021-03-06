import React, { useState, useEffect } from "react";
import { getItems, deleteItem } from "../utils/ItemService";
import { Item } from "../models/Item";
import { Card, Spinner, List, Button, Icon } from "@ui-kitten/components";
import { View, Image, Text } from "react-native";
import { Header } from "../components/Header";
import { MainTheme } from "../theme";
import Swiper from "react-native-swiper";
import { useSelector } from "../utils/redux/Store";
import { popupError } from "../utils/PopupService";

export const CimaHomeScreen = ({ navigation }: any) => {
  const success = useSelector((state) => state.globalSuccess.name);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const handleOnRefresh = () => {
    setLoading(true);
    getItems()
      .then((result) => {
        setItems(result);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    getItems()
      .then((result) => {
        setItems(result);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [success]);

  interface IRenderItem {
    item: Item;
    index: number;
  }

  const handleDeleteItem = (id: string, fileName: string) => {
    setLoading(true);
    deleteItem(id, fileName)
      .then(() => {
        const poppedItems = items.filter((value) => {
          return value.id != id;
        });
        setItems(poppedItems);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleItemDetail = (item: Item) => {
    if (item.testStatus) {
      popupError(
        "Restricted",
        "Item is already tested.\r\nUnable to make changes.\r\nPlease contact service desk at \r\n+65 97330256"
      );
      return;
    }
    navigation.navigate("ItemDetailScreenForCima", {
      item,
    });
  };

  const renderItem = ({ item, index }: IRenderItem) => (
    <Swiper style={{ height: 130 }} showsPagination={false} loop={false}>
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
            <Text style={{ fontWeight: "100", color: "gray" }}>
              {item.date}
            </Text>
          </View>
          <View style={{ right: 5, position: "absolute", width: "60%" }}>
            <Text style={{ textAlign: "right" }}>${item.cost} SGD</Text>
            <Text style={{ textAlign: "right" }}>{item.description}</Text>
            <Text style={{ textAlign: "right" }}>
              Shape : {item?.shape?.toLocaleUpperCase()}
            </Text>
            <Text style={{ textAlign: "right" }}>
              Test needed? : {item.test ? "Yes" : "No"}
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
      <View style={{ flexDirection: "row", height: 126 }}>
        <Button
          status="success"
          style={{ height: 126, width: "50%" }}
          accessoryRight={(props) => <Icon {...props} name="edit" />}
          onPress={() => handleItemDetail(item)}
        >
          Edit this?
        </Button>
        <Button
          status="danger"
          style={{ height: 126, width: "50%" }}
          accessoryRight={(props) => <Icon {...props} name="trash" />}
          onPress={() => {
            handleDeleteItem(item.id, item.image.fileName);
          }}
        >
          Delete this?
        </Button>
      </View>
    </Swiper>
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
