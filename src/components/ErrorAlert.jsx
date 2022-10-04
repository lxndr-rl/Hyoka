import React, { useCallback } from "react";
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
      modalTitle={(
        <ModalTitle
          style={{ backgroundColor: "#2b2b2b" }}
          textStyle={{ color: "white", fontWeight: "bold", fontSize: 20 }}
          title={(
            <Text>
              {errorContent.title}
              {" "}
              <MaterialIcons name="error" size={16} color="#FF416C" />
            </Text>
          )}
        />
      )}
      footer={(
        <ModalFooter style={{ backgroundColor: "#2b2b2b" }}>
          <ModalButton
            style={{ backgroundColor: "#2b2b2b" }}
            text="Aceptar"
            onPress={useCallback(() => setErrorContent({ ...errorContent, visible: false }))}
          />
          {errorContent.buttons ? (
            errorContent.buttons.map((button) => (
              <ModalButton
                key={button.id}
                style={{
                  backgroundColor: button.colorbackground || "#2b2b2b",
                }}
                textStyle={{ color: button.colortext || "white" }}
                text={button.text}
                onPress={useCallback(() => {
                  if (isURL(button.url)) {
                    // eslint-disable-next-line no-unused-expressions
                    Platform.OS === "web"
                      ? window.open(button.url)
                      : Linking.openURL(button.url);
                  } else {
                    setErrorContent({ ...errorContent, visible: false });
                  }
                })}
              />
            ))
          ) : (
            <></>
          )}
        </ModalFooter>
      )}
    >
      <ModalContent style={{ backgroundColor: "#2b2b2b" }}>
        <Text
          style={{
            fontSize: 18,
            color: "white",
            backgroundColor: "#2b2b2b",
          }}
        >
          {errorContent.message}
        </Text>
      </ModalContent>
    </Modal>
  );
}
export default ErrorAlert;
