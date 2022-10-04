import React, { useState, useEffect, useCallback } from "react";
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
} from "react-native";
import ModalSelector from "react-native-modal-selector";
import Card from "../components/CardView";
import deviceInfo from "../util/deviceInfo";
import ErrorAlert from "../components/ErrorAlert";

let data = [];
let dataYear = [];
const phoneWidth = Platform.OS === "web"
  ? Dimensions.get("window").width < 800
    ? Dimensions.get("window").width
    : Dimensions.get("window").width / 2.5
  : Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "black",
    padding: 10,
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "center",
    color: "white",
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
    });
    setNotasParciales(route.params.data.parciales);
    setNotasSemestrales(route.params.data.promedios);
    setCedula(route.params.cedula);
    setInitialSemester(
      route.params.data.parciales[route.params.data.semestres[0]],
    );
    setInitialSemester2(
      route.params.data.promedios[route.params.data.semestres[0]],
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

  const toggleSwitch = useCallback(() => setIsPromedio((previousState) => !previousState));

  const FetchAPI = (anioLectivo) => {
    if (!anioLectivo) return;
    setLoading(true);
    fetch(
      `https://api.lxndr.dev/uae/notas/v2/?cedula=${cedula}&alect=${anioLectivo}&analytics=${JSON.stringify(
        deviceInfo,
      )}`,
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
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "black",
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
          data={dataYear}
          sectionTextStyle={{
            color: "#BFBCBC",
          }}
          optionTextStyle={{
            color: "lightblue",
          }}
          optionContainerStyle={{
            borderRadius: 5,
            flexShrink: 1,
            marginBottom: 8,
            alignSelf: "center",
            width: phoneWidth - 50,
            padding: 8,
            backgroundColor: "#171717",
          }}
          cancelStyle={{
            borderRadius: 5,
            backgroundColor: "#171717",
            width: phoneWidth - 50,
            padding: 8,
          }}
          cancelTextStyle={{
            textAlign: "center",
            color: "#D22B2B",
            alignSelf: "center",
            fontSize: 16,
          }}
          cancelContainerStyle={{
            width: phoneWidth - 50,
            alignSelf: "center",
          }}
          optionStyle={{
            padding: 8,
            borderBottomWidth: 1,
            borderBottomColor: "#818181",
          }}
          style={{ width: 200, alignSelf: "center" }}
          backdropPressToClose
          initValue={anioLect ?? route.params.data.aniosLect[0]}
          onChange={useCallback((option) => {
            setAnioLect(option.label);
            FetchAPI(option.label);
            Keyboard.dismiss();
          })}
          cancelText="Cerrar"
        />
        <Text style={styles.title}>Semestre</Text>
        {loading ? null : (
          <ModalSelector
            data={data}
            sectionTextStyle={{
              color: "#BFBCBC",
            }}
            optionTextStyle={{
              color: "lightblue",
            }}
            optionContainerStyle={{
              borderRadius: 5,
              flexShrink: 1,
              marginBottom: 8,
              width: phoneWidth - 50,
              alignSelf: "center",
              padding: 8,
              backgroundColor: "#171717",
            }}
            cancelContainerStyle={{
              width: phoneWidth - 50,
              alignSelf: "center",
            }}
            cancelStyle={{
              borderRadius: 5,
              backgroundColor: "#171717",
              padding: 8,
              width: phoneWidth - 50,
            }}
            cancelTextStyle={{
              textAlign: "center",
              color: "#D22B2B",
              alignSelf: "center",
              fontSize: 16,
            }}
            optionStyle={{
              padding: 8,
              borderBottomWidth: 1,
              borderBottomColor: "#818181",
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
            }}
            trackColor={{ false: "#767577", true: "#31AA84" }}
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
            color: "white",
            fontStyle: "italic",
          }}
        >
          Nota: Pulsa una nota parcial para ver el desglose
        </Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="white" />
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
  );
}

export default ShowDataScreen;