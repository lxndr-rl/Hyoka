import React from "react";
import Modal, {
  ModalTitle,
  ModalContent,
  ModalFooter,
  ModalButton,
  ScaleAnimation,
} from "react-native-modals";
import {
  Text, Linking, Platform, TouchableOpacity,
} from "react-native";

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
          style={{ backgroundColor: "rgba(254, 238, 239, .7))" }}
          textStyle={{ color: "#8f6960", fontSize: 20, fontWeight: "bold" }}
          title="Información | Hyoka"
        />
      )}
      footer={(
        <ModalFooter style={{ backgroundColor: "rgba(254, 238, 239, .7))" }}>
          <ModalButton
            style={{ backgroundColor: "rgba(254, 238, 239, .7))" }}
            text="Ver código fuente"
            textStyle={{ color: "#31AA84" }}
            onPress={() => (Platform.OS === "web"
              ? window.open("https://github.com/lxndr-rl/Hyoka", "_blank")
              : Linking.openURL("https://github.com/lxndr-rl/Hyoka"))}
          />
          <ModalButton
            style={{ backgroundColor: "rgba(254, 238, 239, .7))" }}
            text="Bug Tracker"
            textStyle={{ color: "#CC5500" }}
            onPress={() => (Platform.OS === "web"
              ? window.open(
                "https://github.com/lxndr-rl/Hyoka/issues/",
                "_blank",
              )
              : Linking.openURL("https://github.com/lxndr-rl/Hyoka/issues/"))}
          />
          <ModalButton
            style={{ backgroundColor: "rgba(254, 238, 239, .7))" }}
            textStyle={{ color: "#D22B2B" }}
            text="Cerrar"
            onPress={() => setPopupVisible(false)}
          />
          <Text
            style={{
              alignSelf: "center",
              color: "#8f6960",
              backgroundColor: "rgba(254, 238, 239, .7))",
            }}
          >
            by lxndr
          </Text>
        </ModalFooter>
      )}
    >
      <ModalContent style={{ backgroundColor: "rgba(254, 238, 239, .7))" }}>
        <Text
          style={{
            fontSize: 18,
            color: "#8f6960",
            backgroundColor: "rgba(254, 238, 239, .7))",
          }}
        >
          Esta aplicación está hecha de forma independiente y es de código
          abierto.
          {"\n\n"}
          NO asociada a la Universidad Agraria del Ecuador.
          {"\n\n\n"}
          Ilustraciones de la aplicación:
          {" "}
          {Platform.OS === "web" ? (
            <TouchableOpacity onPress={() => (Platform.OS === "web"
              ? window.open("https://www.instagram.com/ithan211/", "_blank")
              : Linking.openURL("https://www.instagram.com/ithan211/"))}
            >
              <Text
                style={{ color: "#E6AE82" }}
              >
                Ithan
              </Text>
            </TouchableOpacity>
          ) : (
            <Text
              style={{ color: "#E6AE82" }}
              onPress={() => Linking.openURL("https://www.instagram.com/ithan211/")}
            >
              Ithan
            </Text>
          )}
        </Text>
      </ModalContent>
    </Modal>
  );
}

export default InformationDialog;
