import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 *
 * @param {string} key : Valor a ser buscado
 * @returns {string | null} : Valor buscado
 */
const getValueWithKey = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    //
  }
  return null;
};

/**
 *
 * @param {string} key : Key con la que se guarda
 * @param {any} value : Valor a ser guardado
 * @returns {boolean} : Se completó la acción o no
 */
const setValueWithKey = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (e) {
    //
  }
  return false;
};

/**
 *
 * @returns {Promise<object>} : Objeto con los colores actuales
 */
const getActualColor = async () => {
  const colors = await AsyncStorage.getItem("@availableColors");
  try {
    const value = await AsyncStorage.getItem("@selectedColor");
    if (value && colors) {
      return JSON.parse(colors)[value];
    }
    setValueWithKey("@selectedColor", "0");
    return {
      name: "Tema 1",
      bgColor: "#000000",
      headerColor: "#000000",
      headerTextColor: "#ffffff",
      textColor: "#8f6960",
      highlightColor: "#FF0063",
      borderColor: "#C93384",
      buttonGradient: ["#ff809d", "#f8b0c0"],
      itemGradient: ["#ff808d", "#f8b8d0"],
      textButtonGradient: "#ffffff",
      isDarkHeader: false,
    };
  } catch (e) {
    //
  }
  return JSON.parse(colors)[0];
};

/**
 *
 * @param {string} key : Valor a ser removido
 * @returns {boolean} : Se completó la acción o no
 */
const removeValueWithKey = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (e) {
    //
  }
  return false;
};

export { getValueWithKey, setValueWithKey, removeValueWithKey, getActualColor };
