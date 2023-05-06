import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Platform,
  Dimensions,
  TouchableOpacity,
  Image,
  Text,
  KeyboardAvoidingView,
  Keyboard,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getActualColor } from "../util";
/* import exampleUserData from "../util/exampleUserData"; */
import InformationDialog from "../components/InformationDialog";
import ErrorAlert from "../components/ErrorAlert";
import StudentInformation from "../components/StudentInformation";
import InputHistory from "../components/InputHistory";
import deviceInfo from "../util/deviceInfo";

const phoneWidth =
  Dimensions.get("window").width < 800
    ? Dimensions.get("window").width - 100
    : 350;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "center",
    padding: 10,
    justifyContent: "center",
    margin: 50,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  tinyLogo: {
    width: 200,
    height: 200,
    padding: 20,
    margin: 10,
    alignSelf: "center",
  },
  button: {
    alignItems: "center",
    borderRadius: 40,
    width: phoneWidth - 70,
    alignSelf: "center",
    marginTop: 5,
  },
  buttonInfo: {
    alignItems: "center",
    marginLeft: 5,
    borderRadius: 15,
  },
  buttonInfoCont: {
    alignSelf: "center",
  },
  input: {
    width: phoneWidth - 70,
    paddingRight: 10,
    paddingLeft: 10,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#ffffff",
    alignSelf: "center",
  },
});

function App({ navigation }) {
  const [searchButton, setSearchButton] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [textCedula, setTextCedula] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const [foundVisible, setFoundVisible] = useState(false);
  const [studentData, setStudentData] = useState({});
  const [apiData, setApiData] = useState(null);
  const [loadingData, setLoadingData] = useState(false);
  const [errorContent, setErrorContent] = useState({
    visible: false,
    message: "",
    title: "",
    buttons: null,
  });
  const [color, setColor] = useState(null);

  const getStatus = async () => {
    await fetch("https://api.lxndr.dev/uae/notas/status")
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "Disabled") {
          setErrorContent({
            visible: true,
            message: res.message,
            title: res.title,
            buttons: res.buttons,
          });
        }
      })
      .catch((err) => {
        setErrorContent({
          visible: true,
          message: "No se pudo conectar con el servidor",
          title: "Error",
        });
        throw new Error(err);
      });
  };

  useEffect(() => {
    /*     if (__DEV__) {
      navigation.navigate("Notas", {
        name: exampleUserData.name,
        data: JSON.parse(exampleUserData.data),
        cedula: exampleUserData.cedula,
      });
    } */
    console.log("HomeScreen");
    console.log(deviceInfo);
    (async () => {
      await getActualColor().then((colore) => {
        if (colore) {
          navigation.setOptions({
            headerStyle: {
              backgroundColor: colore.headerColor,
            },
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
    getStatus();
  }, []);

  const appendeUserData = async (uData) => {
    const data = await AsyncStorage.getItem("@history");
    if (!data) {
      await AsyncStorage.setItem("@history", JSON.stringify([uData]));
    } else {
      const parsedData = JSON.parse(data);
      const exists = parsedData.find((item) => item.cedula === uData.cedula);
      if (!exists) {
        parsedData.unshift(uData);
        await AsyncStorage.setItem("@history", JSON.stringify(parsedData));
      } else {
        const filteredData = parsedData.filter(
          (item) => item.cedula !== uData.cedula
        );
        filteredData.unshift(uData);
        await AsyncStorage.setItem("@history", JSON.stringify(filteredData));
      }
    }
  };

  const searchBtn = async () => {
    Keyboard.dismiss();
    if (textInput.length >= 9 && /^\d+$/.test(textInput)) {
      setLoadingData(true);
      setSearchButton(true);
      setTextCedula(textInput);
      await fetch(
        `https://api.lxndr.dev/uae/notas/v2/?cedula=${textInput}&analytics=${JSON.stringify(
          deviceInfo
        )}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            return setErrorContent({
              visible: true,
              message: data.message,
              title: "Error",
            });
          }
          appendeUserData({
            cedula: textInput,
            nombres: data.nombres.split(" ")[0],
            apellidos: data.apellidos.split(" ")[0],
            completos: `${data.apellidos} ${data.nombres}`,
          });
          setApiData(data);
          setStudentData({
            nombres: data.nombres,
            apellidos: data.apellidos,
            carrera: data.carrera,
            facultad: data.facultad,
            sede: data.sede,
          });
          setFoundVisible(true);
        })
        .catch((err) => {
          setErrorContent({
            visible: true,
            message: `Error de conexión. Más información: \n${err.message}`,
            title: "Error",
          });
        });
      setLoadingData(null);
      setSearchButton(false);
    } else if (textInput.length > 5 && !/^\d+$/.test(textInput)) {
      setLoadingData(true);
      setSearchButton(true);
      await fetch(`https://api.lxndr.dev/util/cedula?nombres=${textInput}`)
        .then((res) => res.json())
        .then(async (dataC) => {
          let cedula = dataC[0].identificacion;
          if (dataC[0].tipoIdentificacion === "R") {
            cedula = dataC[0].identificacion.substring(
              0,
              dataC[0].identificacion.length - 3
            );
          }
          setTextCedula(cedula);
          await fetch(
            `https://api.lxndr.dev/uae/notas/v2/?cedula=${cedula}&analytics=${JSON.stringify(
              deviceInfo
            )}`
          )
            .then((res) => res.json())
            .then((data) => {
              if (data.error) {
                return setErrorContent({
                  visible: true,
                  message: data.message,
                  title: "Error",
                });
              }
              appendeUserData({
                cedula,
                nombres: data.nombres.split(" ")[0],
                apellidos: data.apellidos.split(" ")[0],
                completos: `${data.apellidos} ${data.nombres}`,
              });
              setApiData(data);
              setStudentData({
                nombres: data.nombres,
                apellidos: data.apellidos,
                carrera: data.carrera,
                facultad: data.facultad,
                sede: data.sede,
              });
              setFoundVisible(true);
            })
            .catch((err) => {
              setErrorContent({
                visible: true,
                message: `Error de conexión. Más información: \n${err.message}`,
                title: "Error",
              });
            });
        })
        .catch((err) => {
          setErrorContent({
            visible: true,
            message: `No se encontró ningún estudiante con ese nombre.\n${textInput}`,
            title: "Error",
          });
          throw new Error(err);
        });
      setLoadingData(null);
      setSearchButton(false);
    } else {
      setErrorContent({
        visible: true,
        message: "Ingrese un número de cédula válido o nombres completos.",
        title: "Error",
      });
    }
  };

  return (
    color && (
      <SafeAreaView style={{ flex: 1 }}>
        <LinearGradient
          colors={["#feeeef", "#ffdbe5"]}
          style={{
            left: 0,
            right: 0,
            top: 0,
            height: "100%",
            width: "100%",
          }}
        >
          <ImageBackground
            source={require("../assets/sakura.webp")}
            style={{
              position: "absolute",
              flexDirection: "row",
              height: "100%",
              width: "100%",
            }}
            imageStyle={{ opacity: 0.1 }}
            resizeMode="contain"
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={[styles.container, { backgroundColor: "transparent" }]}
            >
              <StatusBar style={color.isDarkHeader ? "light" : "dark"} />
              <View
                style={{
                  alignSelf: "center",
                  flexDirection: "row",
                  marginTop: 50,
                }}
              >
                <Text
                  style={{
                    color: color.textColor,
                    fontSize: 30,
                    fontWeight: "bold",
                  }}
                >
                  Consulta De Notas
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setPopupVisible(true);
                    Keyboard.dismiss();
                  }}
                  style={styles.buttonInfoCont}
                >
                  <LinearGradient
                    colors={color.buttonGradient}
                    style={styles.buttonInfo}
                  >
                    <MaterialIcons
                      name="info"
                      size={30}
                      color={color.textButtonGradient}
                    />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              <Image
                style={styles.tinyLogo}
                source={require("../assets/uaeLOGO.png")}
              />
              <ErrorAlert
                errorContent={errorContent}
                setErrorContent={setErrorContent}
              />
              <InformationDialog
                popupVisible={popupVisible}
                setPopupVisible={setPopupVisible}
              />
              <StudentInformation
                foundVisible={foundVisible}
                setFoundVisible={setFoundVisible}
                apiData={apiData}
                navigation={navigation}
                studentData={studentData}
                textCedula={textCedula}
              />
              <View style={{ paddingBottom: 10 }}>
                <InputHistory
                  value={textInput}
                  onChange={setTextInput}
                  onFinish={searchBtn}
                  style={styles.input}
                  colorsGradient={color.itemGradient}
                  colorsGradientOk={color.buttonGradient}
                  colorsGradientCancel={["#B24592", "#F15F79"]}
                />
              </View>
              <TouchableOpacity
                style={styles.button}
                disabled={searchButton}
                onPress={searchBtn}
              >
                <LinearGradient
                  colors={color.buttonGradient}
                  style={[styles.button, { padding: 10 }]}
                >
                  {loadingData ? (
                    <ActivityIndicator
                      size="large"
                      color={color.textButtonGradient}
                    />
                  ) : (
                    <MaterialIcons
                      name="search"
                      size={40}
                      color={color.textButtonGradient}
                    />
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </ImageBackground>
        </LinearGradient>
      </SafeAreaView>
    )
  );
}

export default App;
