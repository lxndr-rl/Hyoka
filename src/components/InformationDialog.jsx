import React, { useCallback } from "react";
import Modal, {
  ModalTitle,
  ModalContent,
  ModalFooter,
  ModalButton,
  ScaleAnimation,
} from "react-native-modals";
import { Text, Linking, Platform } from "react-native";

function InformationDialog({ popupVisible, setPopupVisible }) {
  return (
    <Modal
      visible={popupVisible}
      modalAnimation={
        new ScaleAnimation({
          initialValue: 0,
          useNativeDriver: false,
        })
      }
      modalTitle={(
        <ModalTitle
          style={{ backgroundColor: "#2b2b2b" }}
          textStyle={{ color: "white", fontSize: 20, fontWeight: "bold" }}
          title="Información | Hyoka"
        />
      )}
      footer={(
        <ModalFooter style={{ backgroundColor: "#2b2b2b" }}>
          <ModalButton
            style={{ backgroundColor: "#2b2b2b" }}
            text="Ver código fuente"
            textStyle={{ color: "#31AA84" }}
            onPress={useCallback(() => (Platform.OS === "web"
              ? window.open("https://github.com/lxndr-rl/Hyoka", "_blank")
              : Linking.openURL("https://github.com/lxndr-rl/Hyoka")))}
          />
          <ModalButton
            style={{ backgroundColor: "#2b2b2b" }}
            text="Bug Tracker"
            textStyle={{ color: "#CC5500" }}
            onPress={useCallback(() => (Platform.OS === "web"
              ? window.open(
                "https://github.com/lxndr-rl/Hyoka/issues/",
                "_blank",
              )
              : Linking.openURL("https://github.com/lxndr-rl/Hyoka/issues/")))}
          />
          <ModalButton
            style={{ backgroundColor: "#2b2b2b" }}
            textStyle={{ color: "#D22B2B" }}
            text="Cerrar"
            onPress={useCallback(() => setPopupVisible(false))}
          />
          <Text
            style={{
              alignSelf: "center",
              color: "white",
              backgroundColor: "#2b2b2b",
            }}
          >
            lxndr
          </Text>
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
          Esta aplicación fue hecha de forma independiente y es de código
          abierto.
          {"\n\n"}
          NO asociada a la Universidad Agraria del Ecuador.
        </Text>
      </ModalContent>
    </Modal>
  );
}

export default InformationDialog;
