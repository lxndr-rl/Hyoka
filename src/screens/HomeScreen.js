/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { StyleSheet, View, StatusBar, Platform, Dimensions, TouchableOpacity, TextInput, Text, Linking } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import SearchableDropdown from 'react-native-searchable-dropdown';
import Dialog, { DialogFooter, DialogButton, DialogContent, DialogTitle, ScaleAnimation } from 'react-native-popup-dialog';
import AsyncStorage from '@react-native-async-storage/async-storage';

const phoneWidth = Platform.OS == 'web' ? 350 : Dimensions.get('window').width;

const App = ({ navigation }) => {
  const [inputVisible, setInputVisible] = useState(false);
  const [inputAnimation, setInputAnimation] = useState('zoomIn');
  const [searchButton, setSearchButton] = useState(false);
  const [textCedula, setTextCedula] = useState('Cédula');
  const [popupVisible, setPopupVisible] = useState(false);

  const searchBtn = async () => {
    if (!inputVisible) {
      setInputVisible(true);
    }
    else {
      if (!textCedula || textCedula == 'Cédula') {
        setInputAnimation('zoomOut');
        return;
      } else if (textCedula.length < 9) {
        alert(`La cédula ${textCedula} no es válida`);
        return;
      }
      setSearchButton(true);
      fetch(`https://api.lxndr.dev/uae/notas/v2/?cedula=${textCedula}`).then(
        res => res.json()
      ).then(data => {
        if (data.error) return alert(`Ocurrió un error\n${data.message}`);
        setSearchButton(false);
        navigation.navigate('Notas', { name: `${data.nombres} ${data.apellidos}`, data: data, cedula: textCedula });
      }).catch(err => {
        console.log("error:", err);
        alert('Ocurrió un error\n' + err)
      });
      setSearchButton(false);
    }
  };

  const items = [];

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#2b2b2b" />
      <TouchableOpacity onPress={() => setPopupVisible(true)}>
        <LinearGradient
          colors={['#f38ba0', '#e4c1f9']}
          style={styles.buttonInfo}>
          <FontAwesome5 name="info-circle" size={40} color="white" />
        </LinearGradient>
      </TouchableOpacity>
      <Dialog
        visible={popupVisible}
        dialogAnimation={new ScaleAnimation({
          initialValue: 0,
          useNativeDriver: true,
        })}
        dialogTitle={<DialogTitle style={{ backgroundColor: '#2b2b2b' }} textStyle={{ color: 'white' }} title="Información | UAE-SICAU" />}
        footer={
          <DialogFooter style={{ backgroundColor: '#2b2b2b' }}>
            <DialogButton
              style={{ backgroundColor: '#2b2b2b' }}
              text="Ver código fuente"
              onPress={() => Linking.openURL('https://github.com/lxndr-rl/UAE-SICAU')}
            />
            <DialogButton
              style={{ backgroundColor: '#2b2b2b' }}
              text="Informar un problema"
              onPress={() => Linking.openURL(`https://github.com/lxndr-rl/UAE-SICAU/issues/new?title=[ERROR]%20...&body=Platform: ${Platform.OS}`)}
            />
            <DialogButton
              style={{ backgroundColor: '#2b2b2b' }}
              text="Solicitar una característica"
              onPress={() => Linking.openURL(`https://github.com/lxndr-rl/UAE-SICAU/issues/new?title=[REQUEST]%20...&body=Platform: ${Platform.OS}`)}
            />
            <DialogButton
              style={{ backgroundColor: '#2b2b2b' }}
              text="Cerrar"
              onPress={() => setPopupVisible(false)}
            />
            <Text style={{ alignSelf: 'center', color: 'white', backgroundColor: '#2b2b2b' }}>Hecho con ♡ - lxndr</Text>
          </DialogFooter>
        }>
        <DialogContent style={{ backgroundColor: '#2b2b2b' }}>
          <Text style={{ fontSize: 18, color: 'white', backgroundColor: '#2b2b2b' }}>Esta aplicación fue hecha de forma{'\n'}independiente y es de código abierto.</Text>
        </DialogContent>
      </Dialog>
      <TouchableOpacity disabled={searchButton} onPress={() => searchBtn()}>
        <LinearGradient
          colors={['#f38ba0', '#e4c1f9']}
          style={styles.button}>
          <FontAwesome5 name="search" size={40} color="white" />
        </LinearGradient>
      </TouchableOpacity>
      {inputVisible ?
        <Animatable.View style={styles.titleStyle} animation={inputAnimation} onAnimationEnd={() => { inputAnimation === 'zoomOut' ? (setInputVisible(false), setInputAnimation('zoomIn')) : null }}>
          {Platform.OS == 'web' ?
            <TextInput style={styles.input} placeholder={'Cédula'} onChangeText={(cedula) => setTextCedula(cedula)} />
            : <SearchableDropdown
              onTextChange={(text) => setTextCedula(text)}
              onItemSelect={(item) => setTextCedula(item.cedula)}
              containerStyle={{ padding: 5 }}
              textInputStyle={{
                padding: 12,
                borderWidth: 1,
                borderColor: '#ccc',
                backgroundColor: '#FAF7F6',
              }}
              itemStyle={{
                padding: 10,
                marginTop: 2,
                backgroundColor: '#FAF9F8',
                borderColor: '#bbb',
                borderWidth: 1,
              }}
              itemTextStyle={{
                color: '#222',
              }}
              itemsContainerStyle={{
                maxHeight: '60%',
              }}
              items={items}
              defaultIndex={2}
              resetValue={false}
              placeholder={textCedula}
              underlineColorAndroid="transparent"
            />}
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
    justifyContent: 'center'
  },
  button: {
    padding: 30,
    alignItems: 'center',
    borderRadius: 50,
    margin: 10
  },
  buttonInfo: {
    padding: 5,
    alignItems: 'center',
    borderRadius: 50,
    margin: 10
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
