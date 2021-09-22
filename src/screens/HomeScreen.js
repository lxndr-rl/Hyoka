/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, View, StatusBar, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const phoneWidth = Dimensions.get('window').width;
const App = () => {
  const [inputVisible, setInputVisible] = React.useState(false);
  const [inputAnimation, setInputAnimation] = React.useState('zoomIn');
  const [searchButton, setSearchButton] = React.useState(false);
  const [textCedula, setTextCedula] = React.useState(null);

  const searchBtn = async () => {
    if (!inputVisible) {
      setInputVisible(true);
    }
    else {
      if (!textCedula) {
        setInputAnimation('zoomOut');
        return;
      }
      alert(textCedula);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" />
      <TouchableOpacity disabled={searchButton} onPress={() => searchBtn()}>
        <LinearGradient
          colors={['#8E2DE2', '#4A00E0']}
          style={styles.button}>
          <FontAwesome5 name="search" size={40} color="white" />
        </LinearGradient>
      </TouchableOpacity>
      {inputVisible ?
        <Animatable.View style={styles.titleStyle} animation={inputAnimation} onAnimationEnd={() => { inputAnimation === 'zoomOut' ? (setInputVisible(false), setInputAnimation('zoomIn')) : null }}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Cédula"
            value={textCedula}
            onChangeText={text => setTextCedula(text)}
          />
        </Animatable.View> : null}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 10,
    justifyContent: 'center',
  },
  button: {
    padding: 30,
    alignItems: 'center',
    borderRadius: 50,
  },
  titleStyle: {
    padding: 10,
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  paragraphStyle: {
    padding: 20,
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  input: {
    width: phoneWidth - 70,
    color: '#555555',
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 5,
    height: 50,
    borderColor: '#6E5BAA',
    borderWidth: 1,
    borderRadius: 2,
    alignSelf: 'center',
    backgroundColor: '#ffffff',
  },
});
