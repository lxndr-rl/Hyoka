/* eslint-disable no-unused-expressions */
/* eslint-disable no-alert */
import { Alert, Platform } from "react-native";
import { toUnicodeVariant } from "../util";
//
const alertPolyfill = (title, description, options) => {
  const result = window.confirm(
    [toUnicodeVariant(title, "bold sans", "bold"), description]
      .filter(Boolean)
      .join("\n")
  );

  if (result) {
    const confirmOption = options.find(({ style }) => style !== "cancel");
    confirmOption && confirmOption.onPress();
  } else {
    const cancelOption = options.find(({ style }) => style === "cancel");
    cancelOption && cancelOption.onPress();
  }
};

const alert = Platform.OS === "web" ? alertPolyfill : Alert.alert;

export default alert;
