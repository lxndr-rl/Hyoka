import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import RollingText from "react-native-rolling-text";

const phoneWidth =
  Platform.OS === "web"
    ? Dimensions.get("window").width < 800
      ? Dimensions.get("window").width
      : Dimensions.get("window").width / 2.5
    : Dimensions.get("window").width;

const styles = StyleSheet.create({
  cardView: {
    margin: 7,
    borderRadius: 20,
    backgroundColor: "gray",
    width: phoneWidth - 30,
    alignSelf: "center",
    height: 125,
  },
  cardTitle: {
    paddingTop: 5,
    fontWeight: "bold",
    fontSize: 25,
    color: "white",
    paddingStart: 15,
  },
  cardSection: {
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  cardTextSection1: {
    flex: 2,
    color: "#8f6960",
    padding: 8,
    alignSelf: "stretch",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  cardTextSection2: {
    flex: 2,
    color: "white",
    padding: 8,
    alignSelf: "stretch",
    justifyContent: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#8f6960",
    alignSelf: "center",
    marginBottom: 20,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "rgba(254, 238, 239, .9)",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#E94057",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    color: "#8f6960",
    marginBottom: 15,
    textAlign: "center",
  },
});

function Card({
  materia,
  isParcial,
  aa1,
  ap1,
  ac1,
  primero,
  segundo,
  recuperacion,
  total,
  aa2,
  ap2,
  ac2,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [desglose, setDesglose] = useState({ aa: "-", ap: "-", ac: "-" });
  const colors = [["#ff809d", "#f8b0c0"]];
  const showIcon = materia !== "PROMEDIOS TOTALES";
  if (isParcial) {
    return (
      <LinearGradient
        colors={colors[Math.floor(Math.random() * colors.length)]}
        style={styles.cardView}
      >
        <Modal
          animationType="fade"
          transparent
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <View
            style={[styles.centeredView, { backgroundColor: "transparent" }]}
          >
            <View style={styles.modalView}>
              <Text
                style={styles.modalTitle}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {materia}
              </Text>
              <Text
                style={[
                  styles.modalText,
                  { marginBottom: 1, fontWeight: "bold" },
                ]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                Aprendizaje en contacto con el docente (Exámen)
              </Text>
              <Text style={styles.modalText}>{desglose.ac}</Text>
              <Text
                style={[
                  styles.modalText,
                  { marginBottom: 1, fontWeight: "bold" },
                ]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                Aprendizaje autónomo (PIS)
              </Text>
              <Text style={styles.modalText}>{desglose.aa}</Text>
              <Text
                style={[
                  styles.modalText,
                  { marginBottom: 1, fontWeight: "bold" },
                ]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                Aprendizaje práctico-experimental (Académico)
              </Text>
              <Text style={styles.modalText}>{desglose.ap}</Text>

              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <RollingText style={styles.cardTitle} durationMsPerWidth={30}>
          {materia}
        </RollingText>
        <View style={styles.cardSection}>
          <Text style={styles.cardTextSection1}>1º</Text>
          <Text style={styles.cardTextSection1}>2º</Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.cardTextSection1}
          >
            Recuperación
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.cardTextSection1}
          >
            Total
          </Text>
        </View>
        <View style={styles.cardSection}>
          <TouchableOpacity
            style={{
              flex: 2,
            }}
            disabled={!showIcon}
            onPress={() => {
              setModalVisible(true);
              setDesglose({
                aa: aa1,
                ap: ap1,
                ac: ac1,
              });
            }}
          >
            <Text style={styles.cardTextSection2}>
              {primero}{" "}
              {showIcon ? (
                primero < 6 ? (
                  <MaterialIcons name="error" size={18} color="#FF416C" />
                ) : primero === 6 ? (
                  <MaterialIcons name="warning" size={18} color="#FDC830" />
                ) : null
              ) : null}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 2,
            }}
            disabled={!showIcon}
            onPress={() => {
              setModalVisible(true);
              setDesglose({
                aa: aa2,
                ap: ap2,
                ac: ac2,
              });
            }}
          >
            <Text style={styles.cardTextSection2}>
              {segundo}{" "}
              {showIcon ? (
                segundo < 6 ? (
                  <MaterialIcons name="error" size={18} color="#FF416C" />
                ) : segundo === 6 ? (
                  <MaterialIcons name="warning" size={18} color="#FDC830" />
                ) : null
              ) : null}
            </Text>
          </TouchableOpacity>
          <Text style={styles.cardTextSection2}>
            {recuperacion}{" "}
            {showIcon ? (
              recuperacion < 6 && total < 7 ? (
                <MaterialIcons name="error" size={18} color="#FF416C" />
              ) : recuperacion === 6 ? (
                <MaterialIcons name="warning" size={18} color="#FDC830" />
              ) : null
            ) : null}
          </Text>
          <Text style={styles.cardTextSection2}>
            {total}{" "}
            {showIcon ? (
              total < 7 ? (
                <MaterialIcons name="error" size={18} color="#FF416C" />
              ) : (
                <MaterialIcons name="check-circle" size={18} color="#38ef7d" />
              )
            ) : null}
          </Text>
        </View>
      </LinearGradient>
    );
  }
  return (
    <LinearGradient
      colors={colors[Math.floor(Math.random() * colors.length)]}
      style={[
        styles.cardView,
        {
          margin: 7,
          borderRadius: 20,
          backgroundColor: "gray",
          width:
            Platform.OS === "web"
              ? Dimensions.get("window").width < 800
                ? phoneWidth - 30
                : phoneWidth / 2.5
              : phoneWidth - 30,
          alignSelf: "center",
          height: Dimensions.get("window").width < 800 ? 110 : 90,
          marginBottom: 20,
        },
      ]}
    >
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={[styles.cardTitle, { alignSelf: "stretch" }]}
      >
        {materia}
      </Text>
      <View
        style={[
          styles.cardSection,
          {
            alignSelf: "center",
            flexDirection: "row",
            width: Platform.OS === "web" ? phoneWidth / 2.5 : phoneWidth / 1.9,
          },
        ]}
      >
        <Text style={styles.cardTextSection1}>Nota Final: </Text>
        <Text style={styles.cardTextSection2}>
          {total}{" "}
          {showIcon ? (
            total < 7 ? (
              <MaterialIcons name="error" size={18} color="#FF416C" />
            ) : (
              <MaterialIcons name="check-circle" size={18} color="#38ef7d" />
            )
          ) : null}
        </Text>
      </View>
    </LinearGradient>
  );
}
export default Card;
