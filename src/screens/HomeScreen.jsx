import React, { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  Platform,
  Dimensions,
  TouchableOpacity,
  Image,
  Text,
  KeyboardAvoidingView,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import deviceInfo from "../util/deviceInfo";
// import exampleUserData from "../util/exampleUserData";
import InformationDialog from "../components/InformationDialog";
import ErrorAlert from "../components/ErrorAlert";
import StudentInformation from "../components/StudentInformation";
import InputHistory from "../components/InputHistory";

const phoneWidth = Platform.OS === "web"
  ? Dimensions.get("window").width < 800
    ? Dimensions.get("window").width - 100
    : 350
  : Dimensions.get("window").width - 100;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignSelf: "center",
    padding: 10,
    justifyContent: "center",
    margin: 50,
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
  paragraphStyle: {
    padding: 20,
    color: "white",
    textAlign: "center",
    fontSize: 16,
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
    /* if (__DEV__) {
      navigation.navigate("Notas", {
        name: exampleUserData.name,
        data: JSON.parse(exampleUserData.data),
        cedula: exampleUserData.cedula,
      });
    } */
    getStatus();
  }, []);

  const appendeUserData = async (uData) => {
    const data = await AsyncStorage.getItem("@history");
    if (!data) {
      await AsyncStorage.setItem("@history", JSON.stringify([uData]));
    } else {
      const parsedData = JSON.parse(data);
      // check if object already exists
      const exists = parsedData.find((item) => item.cedula === uData.cedula);
      if (!exists) {
        parsedData.push(uData);
        await AsyncStorage.setItem("@history", JSON.stringify(parsedData));
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
          deviceInfo,
        )}`,
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
              dataC[0].identificacion.length - 3,
            );
          }
          setTextCedula(cedula);
          await fetch(
            `https://api.lxndr.dev/uae/notas/v2/?cedula=${cedula}&analytics=${JSON.stringify(
              deviceInfo,
            )}`,
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

    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <StatusBar backgroundColor="black" />
        <View
          style={{
            alignSelf: "center",
            flexDirection: "row",
            marginTop: 50,
          }}
        >
          <Text style={{ color: "white", fontSize: 30 }}>
            Consulta de Notas
          </Text>
          <TouchableOpacity
            onPress={useCallback(() => {
              setPopupVisible(true);
              Keyboard.dismiss();
            })}
            style={styles.buttonInfoCont}
          >
            <LinearGradient
              colors={["#18bc9c", "#128f76"]}
              style={styles.buttonInfo}
            >
              <MaterialIcons name="info" size={30} color="white" />
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
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          disabled={searchButton}
          onPress={searchBtn}
        >
          <LinearGradient
            colors={["#18bc9c", "#128f76"]}
            style={[styles.button, { padding: 10 }]}
          >
            {loadingData ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              <MaterialIcons name="search" size={40} color="white" />
            )}
          </LinearGradient>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default App;
