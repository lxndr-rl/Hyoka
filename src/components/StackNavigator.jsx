import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, StyleSheet } from "react-native";
import Inicio from "../screens/HomeScreen";
import Notas from "../screens/ShowDataScreen";
import CustomizeScreen from "../screens/CustomizeScreen";
import { getActualColor } from "../util";

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
});

const StackNavigator = createStackNavigator();
const Tab = createBottomTabNavigator();
const selectedColor = getActualColor();

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Hyoka"
        component={Inicio}
        options={{
          headerStyle: {
            backgroundColor: selectedColor.headerColor,
          },
          headerRight: () => (
            <Image
              source={require("../assets/lxndr.png")}
              style={styles.logo}
            />
          ),
          headerTintColor: selectedColor.textColor,
        }}
      />
      <Tab.Screen name="Personalización" component={CustomizeScreen} />
    </Tab.Navigator>
  );
}

function MainStack() {
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen
        name="Consulta de Notas"
        component={Inicio}
        options={{
          headerShown: false,
        }}
      />
      <StackNavigator.Screen
        name="Notas"
        component={Notas}
        options={{
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "#fff",
          headerBackTitle: "Inicio",
        }}
      />
    </StackNavigator.Navigator>
  );
}

// eslint-disable-next-line no-undef
function App() {
  return <MainStack />;
}

export default App;
