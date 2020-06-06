import React, { useState, useReducer, useEffect } from "react";
import { Layout, Text, Input, Button, Datepicker } from "@ui-kitten/components";
import { MainTheme } from "../theme";
import { setItem } from "../utils/helpers/AsyncStorageHelper";
import { addItem } from "../utils/ItemService";

const newItem = {
  id: "",
  name: "",
  cost: "",
  desc: "",
  weight: "",
  date: "",
  shape: "",
};

export const AddItemScreen = ({navigation}:any) => {
  const [date, setDate] = useState(new Date());
  const [item, setItem] = useState(newItem);

  const handleAddItem = () => {
    addItem(item);
    navigation.navigate("Home");
  }

  const handleItemChange = (value: string, key: string) => {
    setItem({ ...item, [key]: value });
  };

  useEffect(() => {
    handleItemChange(date.toDateString(), "date");
  }, [date]);

  return (
    <Layout style={MainTheme.LayoutTheme.container}>
      <Text style={{ fontSize: 20 }}>Add item</Text>
      <Input
        style={MainTheme.LayoutTheme.width_90}
        placeholder="Item ID"
        onChangeText={(value) => {
          handleItemChange(value, "id");
        }}
      />
      <Input
        style={MainTheme.LayoutTheme.width_90}
        placeholder="Item name"
        onChangeText={(value) => {
          handleItemChange(value, "name");
        }}
      />
      <Input
        style={MainTheme.LayoutTheme.width_90}
        placeholder="Item cost"
        onChangeText={(value) => {
          handleItemChange(value, "cost");
        }}
      />
      <Input
        style={MainTheme.LayoutTheme.width_90}
        placeholder="Item description"
        onChangeText={(value) => {
          handleItemChange(value, "desc");
        }}
      />
      <Input
        style={MainTheme.LayoutTheme.width_90}
        placeholder="Item weight"
        onChangeText={(value) => {
          handleItemChange(value, "weight");
        }}
      />
      <Input
        style={MainTheme.LayoutTheme.width_90}
        disabled={true}
        placeholder="Item shape"
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
      <Layout style={{ flexDirection: "row", marginTop: 40 }}>
        <Button style={{ width: "45%", marginHorizontal: 5 }} onPress={handleAddItem}>Add</Button>
        <Button
          appearance="outline"
          style={{ width: "45%", marginHorizontal: 5 }}
        >
          Cancel
        </Button>
      </Layout>
    </Layout>
  );
};
