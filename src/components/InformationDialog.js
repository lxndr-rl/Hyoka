import React from "react";
import Dialog, {
  DialogFooter,
  DialogButton,
  DialogContent,
  DialogTitle,
  ScaleAnimation,
} from "react-native-popup-dialog";
import { Text, Linking, Platform } from "react-native";

const InformationDialog = ({ popupVisible, setPopupVisible }) => {
  return (
    <Dialog
      visible={popupVisible}
      dialogAnimation={
        new ScaleAnimation({
          initialValue: 0,
          useNativeDriver: true,
        })
      }
      dialogTitle={
        <DialogTitle
          style={{ backgroundColor: "#2b2b2b" }}
          textStyle={{ color: "white", fontSize: 20, fontWeight: "bold" }}
          title="Información | UAE-SICAU"
        />
      }
      footer={
        <DialogFooter style={{ backgroundColor: "#2b2b2b" }}>
          <DialogButton
            style={{ backgroundColor: "#2b2b2b" }}
            text="Ver código fuente"
            textStyle={{ color: "#31AA84" }}
            onPress={() =>
              Platform.OS == "web"
                ? window.open("https://github.com/lxndr-rl/UAE-SICAU", "_blank")
                : Linking.openURL("https://github.com/lxndr-rl/UAE-SICAU")
            }
          />
          <DialogButton
            style={{ backgroundColor: "#2b2b2b" }}
            text="Bug Tracker"
            textStyle={{ color: "#CC5500" }}
            onPress={() =>
              Platform.OS == "web"
                ? window.open(
                    `https://github.com/lxndr-rl/UAE-SICAU/issues/`,
                    "_blank"
                  )
                : Linking.openURL(
                    `https://github.com/lxndr-rl/UAE-SICAU/issues/`
                  )
            }
          />
          <DialogButton
            style={{ backgroundColor: "#2b2b2b" }}
            textStyle={{ color: "#D22B2B" }}
            text="Cerrar"
            onPress={() => setPopupVisible(false)}
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
        </DialogFooter>
      }
    >
      <DialogContent style={{ backgroundColor: "#2b2b2b" }}>
        <Text
          style={{
            fontSize: 18,
            color: "white",
            backgroundColor: "#2b2b2b",
          }}
        >
          Esta aplicación fue hecha de forma independiente y es de código
          abierto.{"\n\n"}NO asociada a la Universidad Agraria del Ecuador.
        </Text>
      </DialogContent>
    </Dialog>
  );
};

export default InformationDialog;
