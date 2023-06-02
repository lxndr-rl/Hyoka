/* eslint-disable no-restricted-syntax */
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

const toUnicodeVariant = (str, variant, flags) => {
  const offsets = {
    m: [0x1d670, 0x1d7f6],
    b: [0x1d400, 0x1d7ce],
    i: [0x1d434, 0x00030],
    bi: [0x1d468, 0x00030],
    c: [0x1d49c, 0x00030],
    bc: [0x1d4d0, 0x00030],
    g: [0x1d504, 0x00030],
    d: [0x1d538, 0x1d7d8],
    bg: [0x1d56c, 0x00030],
    s: [0x1d5a0, 0x1d7e2],
    bs: [0x1d5d4, 0x1d7ec],
    is: [0x1d608, 0x00030],
    bis: [0x1d63c, 0x00030],
    o: [0x24b6, 0x2460],
    p: [0x249c, 0x2474],
    w: [0xff21, 0xff10],
    u: [0x2090, 0xff10],
  };

  const variantOffsets = {
    monospace: "m",
    bold: "b",
    italic: "i",
    "bold italic": "bi",
    script: "c",
    "bold script": "bc",
    gothic: "g",
    "gothic bold": "bg",
    doublestruck: "d",
    sans: "s",
    "bold sans": "bs",
    "italic sans": "is",
    "bold italic sans": "bis",
    parenthesis: "p",
    circled: "o",
    fullwidth: "w",
  };

  const special = {
    m: {
      " ": 0x2000,
      "-": 0x2013,
    },
    i: {
      h: 0x210e,
    },
    g: {
      C: 0x212d,
      H: 0x210c,
      I: 0x2111,
      R: 0x211c,
      Z: 0x2128,
    },
    o: {
      0: 0x24ea,
      1: 0x2460,
      2: 0x2461,
      3: 0x2462,
      4: 0x2463,
      5: 0x2464,
      6: 0x2465,
      7: 0x2466,
      8: 0x2467,
      9: 0x2468,
    },
    p: {},
    w: {},
  };

  for (let i = 97; i <= 122; i += 1) {
    const char = String.fromCharCode(i);
    special.p[char] = 0x249c + (i - 97);
    special.w[char] = 0xff41 + (i - 97);
  }

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";

  const getType = (va) => variantOffsets[va] || (offsets[va] ? va : "m");
  const getFlag = (flag, flagss) => flagss && flags.split(",").includes(flag);

  const type = getType(variant);
  const underline = getFlag("underline", flags);
  const strike = getFlag("strike", flags);

  let result = "";
  for (const char of str) {
    let c = char;
    if (special[type] && special[type][c]) {
      c = String.fromCodePoint(special[type][c]);
    }
    let index = chars.indexOf(c);
    if (type && index > -1) {
      result += String.fromCodePoint(index + offsets[type][0]);
    } else {
      index = numbers.indexOf(c);
      if (type && index > -1) {
        result += String.fromCodePoint(index + offsets[type][1]);
      } else {
        result += c;
      }
    }
    if (underline) result += "\u0332";
    if (strike) result += "\u0336";
  }

  return result;
};

export {
  getValueWithKey,
  setValueWithKey,
  removeValueWithKey,
  toUnicodeVariant,
};
