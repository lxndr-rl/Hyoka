import React, { useState, useEffect } from "react";
import {
  View,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  Dimensions,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { filter } from "lodash/collection";
import { MaterialIcons } from "@expo/vector-icons";
import Alerta from "./Alert";

const phoneWidth =
  Dimensions.get("window").width < 800
    ? Dimensions.get("window").width - 100
    : 350;

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    padding: 10,
    marginHorizontal: 10,
    height: 50,
    alignItems: "center",
    borderRadius: 40,
    fontSize: 35,
    fontWeight: "bold",
    color: "white",
    width: phoneWidth - 170,
    alignSelf: "center",
    marginTop: 10,
  },
  inputText: {
    fontSize: 14,
    marginTop: 13,
    color: "gray",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  modalContent: {
    margin: 20,
    backgroundColor: "rgba(254, 238, 239, 1)",
    borderRadius: 20,
    alignSelf: "center",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    height:
      Platform.OS === "web"
        ? "50%"
        : Dimensions.get("window").height < 800
        ? "100%"
        : "30%",
    width: "auto",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: Dimensions.get("window").height - 30,
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
  items: {
    flexWrap: "wrap",
    marginTop: 10,
    alignSelf: "center",
    height: "auto",
    width: "auto",
  },
  item: {
    width: phoneWidth - 50,
    height: 50,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  itemText: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
  },
});

function InputHistory({
  value,
  onChange,
  onFinish,
  colorsGradient,
  colorsGradientOk,
  colorsGradientCancel,
}) {
  const [visible, setVisible] = useState(false);
  const [history, setHistory] = useState([]);
  const [fullHistory, setFullHistory] = useState([]);

  const handleText = (text) => {
    onChange(text);
    const formattedQuery = text.toLowerCase();
    const data = filter(fullHistory, (dat) => {
      if (
        dat.cedula.toLowerCase().includes(formattedQuery) ||
        dat.nombres.toLowerCase().includes(formattedQuery) ||
        dat.apellidos.toLowerCase().includes(formattedQuery) ||
        dat.completos.toLowerCase().includes(formattedQuery)
      ) {
        return true;
      }
      return false;
    });
    setHistory(data);
  };

  useEffect(() => {
    (async () => {
      const hist = await AsyncStorage.getItem("@history");
      if (hist) {
        setHistory(JSON.parse(hist));
        setFullHistory(JSON.parse(hist));
      }
    })();
  }, []);

  useEffect(() => {
    if (visible && value) {
      Keyboard.dismiss();
      (async () => {
        const hist = await AsyncStorage.getItem("@history");
        if (hist) {
          setHistory(JSON.parse(hist));
          setFullHistory(JSON.parse(hist));
        }
        handleText(value);
      })();
    }
  }, [visible]);

  const refreshHistory = async () => {
    const hist = await AsyncStorage.getItem("@history");
    if (hist) {
      setHistory(JSON.parse(hist));
      setFullHistory(JSON.parse(hist));
    }
  };

  const clearHistory = async () => {
    Alerta("Borrar historial", "¿Está seguro que desea borrar el historial?", [
      {
        text: "Cancelar",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Borrar",
        onPress: async () => {
          await AsyncStorage.removeItem("@history");
          setHistory([]);
          setFullHistory([]);
        },
      },
    ]);
  };

  return (
    <View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableOpacity onPress={() => setVisible(true)} style={styles.input}>
          <Text style={[styles.inputText, { color: value ? "black" : "gray" }]}>
            {value || "Cédula o Apellidos Nombres"}
          </Text>
        </TouchableOpacity>
        <Modal
          animationType="fade"
          transparent
          visible={visible}
          onRequestClose={() => setVisible(false)}
        >
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            disabled={Platform.OS === "web"}
          >
            <View style={styles.modalContent}>
              <View style={styles.buttons}>
                <TextInput
                  autoCorrect={false}
                  autoCompleteType="off"
                  value={value}
                  onSubmitEditing={() => {
                    onFinish();
                    refreshHistory();
                    setVisible(false);
                  }}
                  style={styles.input}
                  placeholder="Cédula o Apellidos Nombres"
                  onChangeText={handleText}
                  autoFocus
                  placeholderTextColor="gray"
                />
                <TouchableOpacity onPress={clearHistory}>
                  <LinearGradient
                    colors={colorsGradientOk}
                    style={[
                      styles.button,
                      {
                        width: 30,
                        height: 40,
                        marginTop: 0,
                        padding: 0,
                        paddingTop: 5,
                      },
                    ]}
                  >
                    <MaterialIcons
                      name="delete-outline"
                      size={24}
                      color="white"
                    />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              <ScrollView
                style={styles.items}
                showsVerticalScrollIndicator={false}
              >
                <View
                  style={[styles.items, { justifyContent: "space-between" }]}
                >
                  {history
                    ? history.map((item) => (
                        <TouchableOpacity
                          key={item.cedula}
                          onPress={() => {
                            onChange(item.cedula);
                          }}
                          style={styles.item}
                        >
                          <LinearGradient
                            colors={colorsGradient}
                            style={styles.item}
                          >
                            <Text style={styles.itemText}>
                              {item.apellidos} {item.nombres} - {item.cedula}
                            </Text>
                          </LinearGradient>
                        </TouchableOpacity>
                      ))
                    : null}
                </View>
              </ScrollView>
              <View style={styles.buttons}>
                <TouchableOpacity
                  onPress={() => {
                    onFinish();
                    refreshHistory();
                    setVisible(false);
                  }}
                >
                  <LinearGradient
                    colors={colorsGradientOk}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>Buscar</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setVisible(false);
                  }}
                >
                  <LinearGradient
                    colors={colorsGradientCancel}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>Cancelar</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </KeyboardAvoidingView>
    </View>
  );
}

export default InputHistory;
