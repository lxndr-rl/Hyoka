import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Inicio from "../screens/HomeScreen";
import Notas from "../screens/ShowDataScreen";

const StackNavigator = createStackNavigator();

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
