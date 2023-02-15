import React from "react";
import Modal, {
  ModalTitle,
  ModalContent,
  ModalFooter,
  ModalButton,
  ScaleAnimation,
} from "react-native-modals";
import { Text, Linking, Platform } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

function ErrorAlert({ errorContent, setErrorContent }) {
  const isURL = (str) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const _ = new URL(str);
      return true;
    } catch (e) {
      return false;
    }
  };

  return (
    <Modal
      visible={errorContent.visible}
      dialogAnimation={
        new ScaleAnimation({
          initialValue: 0,
          useNativeDriver: false,
        })
      }
      modalTitle={
        <ModalTitle
          style={{ backgroundColor: "rgba(254, 238, 239, .7))" }}
          textStyle={{ color: "#8f6960", fontWeight: "bold", fontSize: 20 }}
          title={
            <Text>
              {errorContent.title}{" "}
              <MaterialIcons name="error" size={16} color="#FF416C" />
            </Text>
          }
        />
      }
      footer={
        <ModalFooter style={{ backgroundColor: "rgba(254, 238, 239, .7))" }}>
          <ModalButton
            style={{ backgroundColor: "rgba(254, 238, 239, .7))" }}
            text="Aceptar"
            textStyle={{ color: "#8f6960", fontWeight: "bold", fontSize: 18 }}
            onPress={() => setErrorContent({ ...errorContent, visible: false })}
          />
          {errorContent.buttons ? (
            errorContent.buttons.map((button) => (
              <ModalButton
                key={button.id}
                style={{
                  backgroundColor:
                    button.colorbackground || "rgba(254, 238, 239, .7))",
                }}
                textStyle={{ color: button.colortext || "#8f6960" }}
                text={button.text}
                onPress={() => {
                  if (isURL(button.url)) {
                    // eslint-disable-next-line no-unused-expressions
                    Platform.OS === "web"
                      ? window.open(button.url)
                      : Linking.openURL(button.url);
                  } else {
                    setErrorContent({ ...errorContent, visible: false });
                  }
                }}
              />
            ))
          ) : (
            <></>
          )}
        </ModalFooter>
      }
    >
      <ModalContent style={{ backgroundColor: "rgba(254, 238, 239, .7))" }}>
        <Text
          style={{
            fontSize: 18,
            color: "#8f6960",
            backgroundColor: "rgba(254, 238, 239, .7))",
          }}
        >
          {errorContent.message}
        </Text>
      </ModalContent>
    </Modal>
  );
}
export default ErrorAlert;
