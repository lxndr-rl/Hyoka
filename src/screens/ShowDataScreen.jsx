import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  Keyboard,
  Text,
  View,
  Platform,
  ActivityIndicator,
  Dimensions,
  Switch,
  ImageBackground,
} from "react-native";
import ModalSelector from "react-native-modal-selector";
import { LinearGradient } from "expo-linear-gradient";
import Card from "../components/CardView";
import { deviceInfo } from "../util";
import ErrorAlert from "../components/ErrorAlert";

let data = [];
let dataYear = [];
const phoneWidth =
  Platform.OS === "web"
    ? Dimensions.get("window").width < 800
      ? Dimensions.get("window").width
      : Dimensions.get("window").width / 2.5
    : Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "transparent",
    padding: 10,
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "center",
    color: "#8f6960",
  },
});

function ShowDataScreen({ route, navigation }) {
  const [initialSemester, setInitialSemester] = useState(null);
  const [initialSemester2, setInitialSemester2] = useState(null);
  const [semestres, setSemestres] = useState([]);
  const [notasParciales, setNotasParciales] = useState(null);
  const [notasSemestrales, setNotasSemestrales] = useState(null);
  const [cedula, setCedula] = useState(null);
  const [loading, setLoading] = useState(false);
  const [anioLect, setAnioLect] = useState();
  const [isPromedio, setIsPromedio] = useState(false);
  const [errorContent, setErrorContent] = useState({
    visible: false,
    message: "",
    title: "",
    buttons: null,
  });

  useEffect(() => {
    navigation.setOptions({
      title: route.params.name,
      headerStyle: {
        backgroundColor: "#ff809d",
      },
      headerTintColor: "#fff",
    });
    setNotasParciales(route.params.data.parciales);
    setNotasSemestrales(route.params.data.promedios);
    setCedula(route.params.cedula);
    setInitialSemester(
      route.params.data.parciales[route.params.data.semestres[0]]
    );
    setInitialSemester2(
      route.params.data.promedios[route.params.data.semestres[0]]
    );
    let i = 0;
    data = [{ key: i - 1, section: true, label: "Semestre" }];
    for (i = 0; i < route.params.data.semestres.length; i += 1) {
      data.push({ key: i, label: route.params.data.semestres[i] });
    }
    i = 0;
    dataYear = [{ key: i - 1, section: true, label: "Año Lectivo" }];
    for (i = 0; i < route.params.data.aniosLect.length; i += 1) {
      dataYear.push({ key: i, label: route.params.data.aniosLect[i] });
    }
  }, []);

  const toggleSwitch = () => setIsPromedio((previousState) => !previousState);

  const FetchAPI = (anioLectivo) => {
    if (!anioLectivo) return;
    setLoading(true);
    fetch(
      `https://api.lxndr.dev/uae/notas/v2/?cedula=${cedula}&alect=${anioLectivo}&analytics=${JSON.stringify(
        deviceInfo
      )}`
    )
      .then((res) => res.json())
      .then((apiDATA) => {
        if (apiDATA.error) {
          setErrorContent({
            visible: true,
            message: apiDATA.message,
            title: "Error",
          });
        } else {
          setSemestres(apiDATA.semestres);
          setNotasParciales(apiDATA.parciales);
          setNotasSemestrales(apiDATA.promedios);
          setInitialSemester(apiDATA.parciales[apiDATA.semestres[0]]);
          setInitialSemester2(apiDATA.promedios[apiDATA.semestres[0]]);
          let i = 0;
          data = [{ key: i - 1, section: true, label: "Semestre" }];
          for (i = 0; i < apiDATA.semestres.length; i += 1) {
            data.push({ key: i, label: apiDATA.semestres[i] });
          }
          i = 0;
          dataYear = [{ key: i - 1, section: true, label: "Año Lectivo" }];
          for (i = 0; i < apiDATA.aniosLect.length; i += 1) {
            dataYear.push({ key: i, label: apiDATA.aniosLect[i] });
          }
        }
        setLoading(false);
      });
  };

  return (
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
        source={require("../assets/details.webp")}
        style={{
          position: "absolute",
          flexDirection: "row",
          height: "100%",
          width: "100%",
        }}
        resizeMode="cover"
      >
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: "transparent",
            padding: 10,
          }}
        >
          <View style={styles.container}>
            <ErrorAlert
              errorContent={errorContent}
              setErrorContent={setErrorContent}
            />
            <Text style={styles.title}>Año Lectivo</Text>
            <ModalSelector
              animationType="fade"
              data={dataYear}
              sectionTextStyle={{
                color: "#8f7960",
                fontWeight: "bold",
              }}
              optionTextStyle={{
                color: "#8f6960",
              }}
              optionContainerStyle={{
                borderRadius: 5,
                flexShrink: 1,
                marginBottom: 8,
                alignSelf: "center",
                width: phoneWidth - 50,
                padding: 8,
                backgroundColor: "rgba(254, 238, 239, .9)",
              }}
              cancelStyle={{
                borderRadius: 5,
                backgroundColor: "rgba(254, 238, 239, .9)",
                width: phoneWidth - 50,
                padding: 8,
              }}
              cancelTextStyle={{
                textAlign: "center",
                color: "#D22B2B",
                alignSelf: "center",
                fontSize: 16,
                fontWeight: "bold",
              }}
              cancelContainerStyle={{
                width: phoneWidth - 50,
                alignSelf: "center",
              }}
              optionStyle={{
                padding: 8,
                borderBottomWidth: 1,
                borderBottomColor: "#fff",
              }}
              style={{ width: 200, alignSelf: "center" }}
              backdropPressToClose
              initValue={anioLect ?? route.params.data.aniosLect[0]}
              onChange={(option) => {
                setAnioLect(option.label);
                FetchAPI(option.label);
                Keyboard.dismiss();
              }}
              cancelText="Cerrar"
              selectStyle={{ borderColor: "black" }}
              selectTextStyle={{ color: "black" }}
              initValueTextStyle={{ color: "black" }}
            />
            <Text style={styles.title}>Semestre</Text>
            {loading ? null : (
              <ModalSelector
                animationType="fade"
                data={data}
                sectionTextStyle={{
                  color: "#8f7960",
                  fontWeight: "bold",
                }}
                optionTextStyle={{
                  color: "#8f6960",
                }}
                optionContainerStyle={{
                  borderRadius: 5,
                  flexShrink: 1,
                  marginBottom: 8,
                  width: phoneWidth - 50,
                  alignSelf: "center",
                  padding: 8,
                  backgroundColor: "rgba(254, 238, 239, .9)",
                }}
                cancelContainerStyle={{
                  width: phoneWidth - 50,
                  alignSelf: "center",
                }}
                cancelStyle={{
                  borderRadius: 5,
                  backgroundColor: "rgba(254, 238, 239, .9)",
                  padding: 8,
                  width: phoneWidth - 50,
                }}
                cancelTextStyle={{
                  textAlign: "center",
                  color: "#D22B2B",
                  alignSelf: "center",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
                optionStyle={{
                  padding: 8,
                  borderBottomWidth: 1,
                  borderBottomColor: "#fff",
                }}
                style={{ width: 200, alignSelf: "center" }}
                backdropPressToClose
                initValue={semestres[0] ?? route.params.data.semestres[0]}
                onChange={(option) => {
                  setInitialSemester(notasParciales[option.label]);
                  setInitialSemester2(notasSemestrales[option.label]);
                  Keyboard.dismiss();
                }}
                cancelText="Cerrar"
                selectStyle={{ borderColor: "black" }}
                selectTextStyle={{ color: "black" }}
                initValueTextStyle={{ color: "black" }}
              />
            )}
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Text style={[styles.title, { fontSize: 14, marginTop: 7 }]}>
                Notas Parciales
              </Text>
              <Switch
                style={{
                  marginTop: 10,
                  marginHorizontal: 10,
                  color: "#D22B2B",
                }}
                trackColor={{ false: "#767577", true: "#ff809d" }}
                thumbColor={isPromedio ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isPromedio}
              />
              <Text style={[styles.title, { fontSize: 14, marginTop: 7 }]}>
                Notas Semestrales
              </Text>
            </View>
            <Text
              style={{
                marginTop: 10,
                fontSize: 12,
                color: "#8f6960",
                fontStyle: "italic",
              }}
            >
              Nota: Pulsa una nota parcial para ver el desglose
            </Text>
          </View>
          {loading ? (
            <ActivityIndicator size="large" color="#8f6960" />
          ) : isPromedio ? (
            initialSemester2 ? (
              initialSemester2.map((element) => (
                <Card
                  key={element.materia + Math.random() * 20}
                  materia={element.materia}
                  total={element.total}
                />
              ))
            ) : null
          ) : initialSemester ? (
            initialSemester.map((element) => (
              <Card
                isParcial
                key={element.materia + Math.random() * 20}
                materia={element.materia}
                ac1={element.ac1}
                aa1={element.aa1}
                ap1={element.ap1}
                primero={element.primero}
                ac2={element.ac2}
                aa2={element.aa2}
                ap2={element.ap2}
                segundo={element.segundo}
                recuperacion={element.recuperacion}
                total={element.total}
              />
            ))
          ) : null}
        </ScrollView>
      </ImageBackground>
    </LinearGradient>
  );
}

export default ShowDataScreen;
