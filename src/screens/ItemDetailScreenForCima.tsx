import React, { useState, useEffect } from "react";
import { Layout, Input, Button, Datepicker } from "@ui-kitten/components";
import { MainTheme } from "../theme";
import { addItem } from "../utils/ItemService";
import { Header } from "../components/Header";
import { Item } from "../models/Item";
import { Dimensions, Text, Image, Platform } from "react-native";
import ImagePicker from "react-native-image-picker";
import { firebase } from "@react-native-firebase/auth";
import { TouchableOpacity } from "react-native-gesture-handler";
import storage from "@react-native-firebase/storage";
import { ImageType, FirebaseImageType } from "../models/Image";

const newItem = { cost: 0, weight: 0, shape: "cube" } as Item;
const newImage = {} as ImageType;
const options = {
  title: "Select option",
  storageOptions: {
    skipBackup: true,
    path: "CIMA",
  },
};

export const ItemDetailScreenForCima = ({ navigation }: any) => {
  const [date, setDate] = useState(new Date());
  const [item, setItem] = useState(newItem);
  const [image, setImage] = useState(newImage);
  const [loading, setLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(true);

  const handleAddItem = async () => {
    setLoading(true);
    const imageUrl = (await storeImage()) as string;
    await addItem({ ...item, image: { ...item.image, imageUrl } });
    clearInput();
    setLoading(false);
  };

  const storeImage = () => {
    return new Promise((resolve, reject) => {
      const reference = storage().ref(image.fileName);
      const pathToFile = image.path;
      reference.putFile(pathToFile).then((result) => {
        console.log(result);
        console.log(reference.getDownloadURL());
        resolve(reference.getDownloadURL());
      });
    });
  };

  const clearInput = () => {
    setItem(newItem);
    setImage(newImage);
    setDate(new Date());
  };

  const handleItemChange = (value: any, key: string) => {
    setItem({ ...item, [key]: value });
  };

  useEffect(() => {
    if (
      !item.image ||
      !item.image.imageUrl ||
      !item.image.fileName ||
      !item.shape ||
      !item.cost ||
      !item.weight ||
      !item.createDate ||
      !item.itemName
    ) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }, [item]);

  useEffect(() => {
    handleItemChange(firebase.firestore.Timestamp.fromDate(date), "createDate");
  }, [date]);

  const handleImagePicker = () => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        setImage({
          fileName: response.fileName,
          path: response.path,
        } as ImageType);
        handleItemChange(
          {
            fileName: response.fileName,
            imageUrl: response.uri,
          } as FirebaseImageType,
          "image"
        );
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
            source={
              !!item.image && !!item.image.imageUrl
                ? { uri: item.image.imageUrl }
                : require("../assets/camera.png")
            }
          />
        </TouchableOpacity>
        <Input
          value={item.itemName}
          style={MainTheme.LayoutTheme.width_90}
          label="Enter name"
          onChangeText={(value) => {
            handleItemChange(value, "itemName");
          }}
        />
        <Input
          value={item.cost.toString()}
          style={MainTheme.LayoutTheme.width_90}
          accessoryLeft={() => <Text style={{ color: "gray" }}>$</Text>}
          accessoryRight={() => <Text style={{ color: "gray" }}>SGD</Text>}
          label="Enter cost"
          keyboardType={Platform.OS === "android" ? "numeric" : "number-pad"}
          onChangeText={(value) => {
            handleItemChange(value, "cost");
          }}
        />
        <Input
          value={item.description}
          style={MainTheme.LayoutTheme.width_90}
          label="Enter description"
          onChangeText={(value) => {
            handleItemChange(value, "description");
          }}
        />
        <Input
          value={item.weight.toString()}
          style={MainTheme.LayoutTheme.width_90}
          label="Enter weight"
          keyboardType={Platform.OS === "android" ? "numeric" : "number-pad"}
          accessoryRight={() => <Text style={{ color: "gray" }}>KG</Text>}
          onChangeText={(value) => {
            handleItemChange(value, "weight");
          }}
        />
        <Input
          style={MainTheme.LayoutTheme.width_90}
          disabled={true}
          value={item.shape.toLocaleUpperCase()}
          label="Shape will be auto-detected by the image"
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
              disabled={disableButton || loading}
              style={{ width: "45%", marginHorizontal: "2%" }}
              onPress={handleAddItem}
            >
              {loading ? "Adding..." : "Add"}
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
