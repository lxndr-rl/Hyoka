import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Inicio from './HomeScreen';
import Notas from './ShowDataScreen';

const StackNavigator = createStackNavigator();

const MainStack = () => {
    return (
        <StackNavigator.Navigator>
            <StackNavigator.Screen
                name="Inicio"
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
                        backgroundColor: 'black',
                    },
                    headerTintColor: '#fff',
                }}
            />
        </StackNavigator.Navigator>
    );
};

// eslint-disable-next-line no-undef
const App = () => {
    return (
        <NavigationContainer>
            <MainStack />
        </NavigationContainer>
    );
};

export default App;