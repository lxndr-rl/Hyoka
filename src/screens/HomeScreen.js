/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { StyleSheet, View, StatusBar, Platform, Dimensions, TouchableOpacity, TextInput, Image, Text, Linking, KeyboardAvoidingView, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { TextAnimationFadeIn as FancyText } from 'react-native-text-effects';
import Dialog, { DialogFooter, DialogButton, DialogContent, DialogTitle, ScaleAnimation } from 'react-native-popup-dialog';

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
        Platform.OS == 'web' ? alert(`La cédula ${textCedula} no es válida`) : Alert.alert('Error', `La cédula ${textCedula} no es válida`);
        return;
      }
      setSearchButton(true);
      fetch(`https://api.lxndr.dev/uae/notas/v2/?cedula=${textCedula}`).then(
        res => res.json()
      ).then(data => {
        if (data.error) return Platform.OS == 'web' ? alert(`Ocurrió un error\n${data.message}`) : Alert.alert('Error', `Ocurrió un error\n${data.message}`);
        setSearchButton(false);
        navigation.navigate('Notas', { name: `${data.nombres} ${data.apellidos}`, data: data, cedula: textCedula });
      }).catch(err => {
        console.log("error:", err);
        Platform.OS == 'web' ? alert('Ocurrió un error\n' + err) : Alert.alert('Error', 'Ocurrió un error\n' + err);
      });
      setSearchButton(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <TouchableOpacity onPress={() => setPopupVisible(true)} style={styles.buttonInfo}>
        <LinearGradient
          colors={['#f38ba0', '#e4c1f9']}
          style={styles.buttonInfo}>
          <MaterialIcons name="info" size={40} color="white" />
        </LinearGradient>
      </TouchableOpacity>
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
      >
        <StatusBar backgroundColor="black" />
        <View style={{ alignSelf: 'center' }}><FancyText value={"Consulta de Notas"} delay={100} duration={1000} style={{ color: 'white' }} /></View>
        <Image
          style={styles.tinyLogo}
          source={require('../assets/uaeLOGO.png')}
        />
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
                onPress={() => Platform.OS == 'web' ? window.open('https://github.com/lxndr-rl/UAE-SICAU', '_blank') : Linking.openURL('https://github.com/lxndr-rl/UAE-SICAU')}
              />
              <DialogButton
                style={{ backgroundColor: '#2b2b2b' }}
                text="Informar un problema"
                onPress={() => Platform.OS == 'web' ? window.open(`https://github.com/lxndr-rl/UAE-SICAU/issues/new?title=[ERROR]%20...&body=Platform: ${Platform.OS}`, '_blank') : Linking.openURL(`https://github.com/lxndr-rl/UAE-SICAU/issues/new?title=[ERROR]%20...&body=Platform: ${Platform.OS}`)}
              />
              <DialogButton
                style={{ backgroundColor: '#2b2b2b' }}
                text="Solicitar una característica"
                onPress={() => Platform.OS == 'web' ? window.open(`https://github.com/lxndr-rl/UAE-SICAU/issues/new?title=[REQUEST]%20...&body=Platform: ${Platform.OS}`, '_blank') : Linking.openURL(`https://github.com/lxndr-rl/UAE-SICAU/issues/new?title=[REQUEST]%20...&body=Platform: ${Platform.OS}`)}
              />
              <DialogButton
                style={{ backgroundColor: '#2b2b2b' }}
                text="Cerrar"
                onPress={() => setPopupVisible(false)}
              />
              <Text style={{ alignSelf: 'center', color: 'white', backgroundColor: '#2b2b2b' }}>Hecha con ❤️ - lxndr</Text>
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
            <MaterialIcons name="search" size={40} color="white" />
          </LinearGradient>
        </TouchableOpacity>
        {inputVisible ?
          <Animatable.View style={{paddingTop: 10}} animation={inputAnimation} onAnimationEnd={() => { inputAnimation === 'zoomOut' ? (setInputVisible(false), setInputAnimation('zoomIn')) : null }}>
            <TextInput style={styles.input} placeholder={'Cédula'} onChangeText={(cedula) => setTextCedula(cedula)} />
          </Animatable.View> : null}
      </KeyboardAvoidingView>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignSelf: 'center',
    padding: 10,
    justifyContent: 'center'
  },
  tinyLogo: {
    width: 200,
    height: 200,
    padding: 20,
    margin: 20,
    alignSelf: 'center'
  },
  button: {
    padding: 20,
    alignItems: 'center',
    borderRadius: 50,
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
    width: phoneWidth - 70,
    alignSelf: 'center',
    margin: 10
  },
  buttonInfo: {
    padding: 5,
    alignItems: 'flex-end',
    borderRadius: 50,
    margin: 5
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
    height: 50,
    borderColor: '#6E5BAA',
    borderWidth: 1,
    borderRadius: 50,
    alignSelf: 'center',
    backgroundColor: '#ffffff',
  },
});
