import React, { useEffect } from "react";
import { Modal, Card, Text, Button, Layout } from "@ui-kitten/components";
import { MainTheme } from "../theme";
import { clearSuccess } from "../utils/redux/actions/ActionSuccess";
import { Keyboard } from "react-native";

export const SuccessModalInjector = ({ title, message }: any) => {
  useEffect(() => {
    Keyboard.dismiss();
  }, [Keyboard]);

  return (
    <>
      <Modal
        visible={true}
        backdropStyle={MainTheme.LayoutTheme.blackTransparentBackground}
      >
        <Card disabled={true}>
          <Layout
            style={{ ...MainTheme.LayoutTheme.container, paddingVertical: 15 }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                width: 250,
                textAlign: "center",
              }}
            >
              {title}
            </Text>
            <Text style={{ fontSize: 18 }}>{message}</Text>
          </Layout>
          <Button
            style={{
              ...MainTheme.ComponentTheme.backgroundSuccess,
              ...MainTheme.ComponentTheme.borderSuccess,
            }}
            onPress={() => {
              clearSuccess();
            }}
          >
            OK
          </Button>
        </Card>
      </Modal>
    </>
  );
};
