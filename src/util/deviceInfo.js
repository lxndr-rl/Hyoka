import * as Device from "expo-device";

const keys = ["osName", "osVersion", "modelName", "deviceName", "manufacturer"];
const data = {};
for (let i = 0; i < keys.length; i += 1) {
  data[keys[i]] = Device[keys[i]];
}
export default data;
