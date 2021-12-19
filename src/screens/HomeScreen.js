/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  Platform,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image,
  Text,
  Linking,
  KeyboardAvoidingView,
  Alert,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { TextAnimationFadeIn as FancyText } from "react-native-text-effects";
import deviceInfo from "../util/deviceInfo";
import Dialog, {
  DialogFooter,
  DialogButton,
  DialogContent,
  DialogTitle,
  ScaleAnimation,
} from "react-native-popup-dialog";

const phoneWidth =
  Platform.OS == "web"
    ? Dimensions.get("window").width < 800
      ? Dimensions.get("window").width - 100
      : 350
    : Dimensions.get("window").width - 100;
const reg = /^\d+$/;

const App = ({ navigation }) => {
  const [inputVisible, setInputVisible] = useState(false);
  const [inputAnimation, setInputAnimation] = useState("zoomIn");
  const [searchButton, setSearchButton] = useState(false);
  const [textCedula, setTextCedula] = useState("Cédula");
  const [popupVisible, setPopupVisible] = useState(false);
  const [foundVisible, setFoundVisible] = useState(false);
  const [studentData, setStudentData] = useState({});
  const [apiData, setApiData] = useState(null);
  const [loadingData, setLoadingData] = useState(false);

  const searchBtn = async () => {
    Keyboard.dismiss();
    if (!inputVisible) {
      setInputVisible(true);
    } else {
      if (!textCedula || textCedula == "Cédula") {
        setInputAnimation("zoomOut");
      } else if (textCedula.length < 9 || !reg.test(textCedula)) {
        Platform.OS == "web"
          ? alert(`La cédula ${textCedula} no es válida`)
          : Alert.alert("Error", `La cédula ${textCedula} no es válida`);
      } else {
        setLoadingData(true);
        setSearchButton(true);
        await fetch(`https://api.lxndr.dev/uae/notas/v2/?cedula=${textCedula}&analytics=${JSON.stringify(deviceInfo)}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.error)
              return Platform.OS == "web"
                ? alert(`Ocurrió un error\n${data.message}`)
                : Alert.alert("Error", `Ocurrió un error\n${data.message}`);
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
            Platform.OS == "web"
              ? alert("Ocurrió un error\n" + err)
              : Alert.alert("Error", "Ocurrió un error\n" + err);
          });
        setLoadingData(null);
        setSearchButton(false);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <TouchableOpacity
        onPress={() => setPopupVisible(true)}
        style={styles.buttonInfoCont}
      >
        <LinearGradient
          colors={["#18bc9c", "#128f76"]}
          style={styles.buttonInfo}
        >
          <MaterialIcons name="info" size={40} color="white" />
        </LinearGradient>
      </TouchableOpacity>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <StatusBar backgroundColor="black" />
        <View style={{ alignSelf: "center" }}>
          <FancyText
            value={"Consulta de Notas"}
            delay={100}
            duration={1000}
            style={{ color: "white" }}
          />
        </View>
        <Image
          style={styles.tinyLogo}
          source={require("../assets/uaeLOGO.png")}
        />
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
              textStyle={{ color: "white" }}
              title="Información | UAE-SICAU"
            />
          }
          footer={
            <DialogFooter style={{ backgroundColor: "#2b2b2b" }}>
              <DialogButton
                style={{ backgroundColor: "#2b2b2b" }}
                text="Ver código fuente"
                onPress={() =>
                  Platform.OS == "web"
                    ? window.open(
                        "https://github.com/lxndr-rl/UAE-SICAU",
                        "_blank"
                      )
                    : Linking.openURL("https://github.com/lxndr-rl/UAE-SICAU")
                }
              />
              <DialogButton
                style={{ backgroundColor: "#2b2b2b" }}
                text="Informar un problema"
                onPress={() =>
                  Platform.OS == "web"
                    ? window.open(
                        `https://github.com/lxndr-rl/UAE-SICAU/issues/new?title=[ERROR]%20...&body=Platform: ${Platform.OS}`,
                        "_blank"
                      )
                    : Linking.openURL(
                        `https://github.com/lxndr-rl/UAE-SICAU/issues/new?title=[ERROR]%20...&body=Platform: ${Platform.OS}`
                      )
                }
              />
              <DialogButton
                style={{ backgroundColor: "#2b2b2b" }}
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
                Hecha con ❤️ - lxndr
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
              abierto.{"\n\n"}No asociada a la Universidad Agraria del Ecuador.
              {"\n"}Este proyecto es netamente educativo.
            </Text>
          </DialogContent>
        </Dialog>
        <Dialog
          visible={foundVisible}
          dialogAnimation={
            new ScaleAnimation({
              initialValue: 0,
              useNativeDriver: true,
            })
          }
          dialogTitle={
            <DialogTitle
              style={{ backgroundColor: "#2b2b2b" }}
              textStyle={{ color: "white" }}
              title="Estudiante encontrado"
            />
          }
          footer={
            <DialogFooter style={{ backgroundColor: "#2b2b2b" }}>
              <DialogButton
                style={{ backgroundColor: "#2b2b2b" }}
                text="Cancelar"
                onPress={() => setFoundVisible(false)}
              />
              <DialogButton
                style={{ backgroundColor: "#2b2b2b" }}
                text="Continuar"
                onPress={() => {
                  setFoundVisible(false);
                  setTextCedula("Cédula");
                  navigation.navigate("Notas", {
                    name: `${studentData.nombres} ${studentData.apellidos}`,
                    data: apiData,
                    cedula: textCedula,
                  });
                }}
              />
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
              Nombres: {studentData.apellidos} {studentData.nombres}
              {"\n\n"}Carrera: {studentData.carrera}
              {"\n\n"}Sede: {studentData.sede}
              {"\n\n"}Facultad: {studentData.facultad}
            </Text>
          </DialogContent>
        </Dialog>
        <TouchableOpacity disabled={searchButton} onPress={() => searchBtn()}>
          <LinearGradient colors={["#18bc9c", "#128f76"]} style={styles.button}>
            {loadingData ? (
              <ActivityIndicator size={"large"} color={"white"} />
            ) : (
              <MaterialIcons name="search" size={40} color="white" />
            )}
          </LinearGradient>
        </TouchableOpacity>
        {inputVisible ? (
          <Animatable.View
            style={{ paddingTop: 10 }}
            animation={inputAnimation}
            onAnimationEnd={() => {
              inputAnimation === "zoomOut"
                ? (setInputVisible(false), setInputAnimation("zoomIn"))
                : null;
            }}
          >
            <TextInput
              autoCorrect={false}
              autoCompleteType={"off"}
              keyboardType={"number-pad"}
              onSubmitEditing={() => searchBtn()}
              style={styles.input}
              placeholder={"Cédula"}
              onChangeText={(cedula) => setTextCedula(cedula)}
            />
          </Animatable.View>
        ) : null}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignSelf: "center",
    padding: 10,
    justifyContent: "center",
  },
  tinyLogo: {
    width: 200,
    height: 200,
    padding: 20,
    margin: 20,
    alignSelf: "center",
  },
  button: {
    padding: 20,
    alignItems: "center",
    borderRadius: 50,
    fontSize: 35,
    fontWeight: "bold",
    color: "white",
    width: phoneWidth - 70,
    alignSelf: "center",
    margin: 10,
  },
  buttonInfo: {
    padding: 5,
    alignItems: "flex-end",
    borderRadius: 50,
    margin: 5,
  },
  buttonInfoCont: {
    alignSelf: "flex-end",
  },
  paragraphStyle: {
    padding: 20,
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  input: {
    width: phoneWidth - 70,
    color: "#555555",
    paddingRight: 10,
    paddingLeft: 10,
    height: 50,
    borderColor: "#6E5BAA",
    borderWidth: 1,
    borderRadius: 50,
    alignSelf: "center",
    backgroundColor: "#ffffff",
  },
});
