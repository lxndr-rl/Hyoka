import * as Device from "expo-device";

const keys = ["osName", "osVersion", "modelName", "deviceName", "manufacturer"];
var data = {};
for (let i = 0; i < keys.length; i++) {
  data[keys[i]] = Device[keys[i]];
}
export default data;
