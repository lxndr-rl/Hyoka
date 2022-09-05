import React from "react";
import Dialog, {
  DialogFooter,
  DialogButton,
  DialogContent,
  DialogTitle,
  ScaleAnimation,
} from "react-native-popup-dialog";
import { Text, Linking, Platform } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const ErrorAlert = ({ errorContent, setErrorContent }) => {
  const isURL = (str) => {
    try {
      new URL(str);
      return true;
    } catch (e) {
      return false;
    }
  };

  return (
    <Dialog
      visible={errorContent.visible}
      dialogAnimation={
        new ScaleAnimation({
          initialValue: 0,
          useNativeDriver: true,
        })
      }
      dialogTitle={
        <DialogTitle
          style={{ backgroundColor: "#2b2b2b" }}
          textStyle={{ color: "white", fontWeight: "bold", fontSize: 20 }}
          title={
            <Text>
              {errorContent.title}{" "}
              <MaterialIcons name="error" size={16} color="#FF416C" />
            </Text>
          }
        />
      }
      footer={
        <DialogFooter style={{ backgroundColor: "#2b2b2b" }}>
          <DialogButton
            style={{ backgroundColor: "#2b2b2b" }}
            text="Aceptar"
            onPress={() => setErrorContent({ ...errorContent, visible: false })}
          />
          {errorContent.buttons ? (
            errorContent.buttons.map((button, index) => {
              return (
                <DialogButton
                  key={index}
                  style={{
                    backgroundColor: button.colorbackground || "#2b2b2b",
                  }}
                  textStyle={{ color: button.colortext || "white" }}
                  text={button.text}
                  onPress={() => {
                    if (isURL(button.url)) {
                      Platform.OS === "web"
                        ? window.open(button.url)
                        : Linking.openURL(button.url);
                    } else {
                      setErrorContent({ ...errorContent, visible: false });
                    }
                  }}
                />
              );
            })
          ) : (
            <></>
          )}
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
          {errorContent.message}
        </Text>
      </DialogContent>
    </Dialog>
  );
};
export default ErrorAlert;
