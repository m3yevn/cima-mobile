import React, { useState, useEffect } from "react";
import { Layout, Input, Button, Datepicker } from "@ui-kitten/components";
import { MainTheme } from "../theme";
import { addItem } from "../utils/ItemService";
import { Header } from "../components/Header";
import { Item } from "../models/Item";
import { Dimensions, Text, Image } from "react-native";
import ImagePicker from "react-native-image-picker";
import { firebase } from "@react-native-firebase/auth";
import { cameraImage } from "../constants/Image";
import { TouchableOpacity } from "react-native-gesture-handler";
import storage from "@react-native-firebase/storage";
import { v4 } from "react-native-uuid";

const newItem = {} as Item;
const options = {
  title: "Select option",
  storageOptions: {
    skipBackup: true,
    path: "Penta Ocean",
  },
};

export const AddItemScreen = ({ navigation }: any) => {
  const [date, setDate] = useState(new Date());
  const [item, setItem] = useState(newItem);

  const handleAddItem = async () => {
    const imageUrl = await storeImage();
    addItem({ ...item, imageUrl });
    clearInput();
  };

  const storeImage = () => {
    return new Promise((resolve, reject) => {
      const reference = storage().ref(`${v4()}_penta_item_image.png`);
      const pathToFile = item.imageUrl.split("///")[1];
      reference
        .putFile(pathToFile)
        .then((response) => {
          resolve(response.ref);
        })
        .catch(() => {
          reject();
        });
    });
  };

  const clearInput = () => {
    setItem({} as Item);
    setDate(new Date());
  };

  const handleItemChange = (value: any, key: string) => {
    setItem({ ...item, [key]: value });
  };

  useEffect(() => {
    handleItemChange(firebase.firestore.Timestamp.fromDate(date), "createDate");
  }, [date]);

  const handleImagePicker = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        handleItemChange(response.uri, "imageUrl");
      }
    });
  };

  return (
    <>
      <Header navigation={navigation} back title="Add Item" />
      <Layout
        style={{
          flex: 1,
          width: "100%",
          alignItems: "center",
          paddingVertical: 20,
          minHeight: Dimensions.get("window").height,
        }}
      >
        <TouchableOpacity onPress={handleImagePicker}>
          <Image
            style={{ width: 150, height: 150 }}
            source={{ uri: item.imageUrl || cameraImage }}
          />
        </TouchableOpacity>
        <Input
          style={MainTheme.LayoutTheme.width_90}
          label="Enter name"
          onChangeText={(value) => {
            handleItemChange(value, "itemName");
          }}
        />
        <Input
          style={MainTheme.LayoutTheme.width_90}
          accessoryLeft={() => <Text style={{ color: "gray" }}>$</Text>}
          accessoryRight={() => <Text style={{ color: "gray" }}>SGD</Text>}
          label="Enter cost"
          onChangeText={(value) => {
            handleItemChange(value, "cost");
          }}
        />
        <Input
          style={MainTheme.LayoutTheme.width_90}
          label="Enter description"
          onChangeText={(value) => {
            handleItemChange(value, "description");
          }}
        />
        <Input
          style={MainTheme.LayoutTheme.width_90}
          label="Enter weight"
          accessoryRight={() => <Text style={{ color: "gray" }}>KG</Text>}
          onChangeText={(value) => {
            handleItemChange(value, "weight");
          }}
        />
        <Input
          style={MainTheme.LayoutTheme.width_90}
          disabled={true}
          label="Enter shape"
          onChangeText={(value) => {
            handleItemChange(value, "shape");
          }}
        />
        <Datepicker
          label="Select date"
          style={{ width: "90%" }}
          date={date}
          onSelect={(nextDate) => setDate(nextDate)}
        />
        <Layout style={{ marginTop: 20 }}>
          <Layout
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              style={{ width: "45%", marginHorizontal: "2%" }}
              onPress={handleAddItem}
            >
              Add
            </Button>
            <Button
              onPress={() => navigation.goBack()}
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
