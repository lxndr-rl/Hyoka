import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
  Platform,
  Text,
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { NavigationContainer } from "@react-navigation/native";
import { ModalPortal } from "react-native-modals";
import HomeScreen from "../components/StackNavigator";
import { getValueWithKey, setValueWithKey } from "../util";

const phoneWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  image: {
    flex: 1,
    position: "absolute",
    width: phoneWidth,
    height: phoneWidth - 200,
  },
  containerWelc: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    justifyContent: "center",
  },
  titleStyle: {
    padding: 10,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  paragraphStyle: {
    padding: 20,
    textAlign: "center",
    fontSize: 16,
  },
  introImageStyle: {
    width: 200,
    height: 200,
  },
  introTextStyle: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
    paddingVertical: 30,
  },
  introTitleStyle: {
    fontSize: 30,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});

const slides = [
  {
    key: "s1",
    text: "Obtén tus calificaciones de forma fácil",
    title: "Hyoka",
    image: require("../assets/grade.png"),
    backgroundColor: "#20d2bb",
  },
  {
    key: "s2",
    title: "Historial de Consulta",
    text: "Guarda otros números para consultarlos luego de forma fácil",
    image: require("../assets/history.png"),
    backgroundColor: "#febe29",
  },
/*   {
    key: "s3",
    title: "Customizable",
    text: "Personaliza el color de la aplicación",
    image: require("../assets/colors.png"),
    backgroundColor: "#9120d2",
  }, */
];

function SplashScreen() {
  const [showApp, setShowApp] = useState(false);
  const [firstRun, setFirstRun] = useState();

  useEffect(() => {
    setValueWithKey(
      "@availableColors",
      JSON.stringify([
        {
          name: "Hyoka",
          bgColor: "#000000",
          headerColor: "#000000",
          headerTextColor: "#ffffff",
          textColor: "#8f6960",
          highlightColor: "#FF0063",
          borderColor: "#C93384",
          buttonGradient: ["#ff809d", "#f8b0c0"],
          itemGradient: ["#f4c4f3", "#B993D6"],
          textButtonGradient: "#ffffff",
          isDarkHeader: false,
        },
      ]),
    );
    (async () => {
      await getValueWithKey("@firstRun").then((value) => {
        if (value) {
          setFirstRun(false);
        } else {
          setFirstRun(true);
          setValueWithKey("@selectedColor", "0");
          setValueWithKey("@firstRun", "false");
        }
      });
      if (Platform.OS === "web") setFirstRun(false);
    })();
  }, []);

  function RenderItem({ item }) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: "center",
          justifyContent: "space-around",
          paddingBottom: 100,
        }}
      >
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <Text style={styles.introTitleStyle}>{item.title}</Text>
        <Image style={styles.introImageStyle} source={item.image} />
        <Text style={styles.introTextStyle}>{item.text}</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {firstRun ? (
        showApp ? (
          <HomeScreen />
        ) : (
          <AppIntroSlider
            data={slides}
            renderItem={RenderItem}
            onDone={setShowApp(true)}
            showPrevButton
            prevLabel="Atrás"
            nextLabel="Siguiente"
            doneLabel="Terminar"
            onSkip={setShowApp(true)}
          />
        )
      ) : (
        <HomeScreen />
      )}
      <ModalPortal />
    </NavigationContainer>
  );
}

export default SplashScreen;
