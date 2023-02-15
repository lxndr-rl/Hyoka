import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { getActualColor } from "../util";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
});

function CustomizeScreen({ navigation }) {
  const [color, setColor] = useState(null);
  useEffect(() => {
    (async () => {
      await getActualColor().then((colore) => {
        if (colore) {
          navigation.setOptions({
            headerStyle: { backgroundColor: colore.headerColor },
            headerRight: () => (
              <Image
                source={require("../assets/lxndr.png")}
                style={styles.logo}
              />
            ),
            headerTintColor: colore.textColor,
          });
          setColor(colore);
        }
      });
    })();
  });
  return color ? (
    <View
      style={[
        styles.container,
        {
          backgroundColor: color.bgColor,
        },
      ]}
    >
      <Text>Customizar color</Text>
      <StatusBar style={color.isDarkHeader ? "light" : "dark"} />
    </View>
  ) : null;
}

export default CustomizeScreen;
