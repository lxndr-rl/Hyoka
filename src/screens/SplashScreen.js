/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
  Platform,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppIntroSlider from 'react-native-app-intro-slider';
import HomeScreen from './StackNavigator';

const phoneWidth = Dimensions.get('window').width;

const SplashScreen = () => {

  const [showApp, setShowApp] = useState(false);
  const [firstRun, setFirstRun] = useState();

  useEffect(() => {
    (async () => {
      await AsyncStorage.getItem('alreadyLaunched').then(value => {
        if (value == null) {
          AsyncStorage.setItem('alreadyLaunched', JSON.stringify(true));
          setFirstRun(true);
        } else {
          setFirstRun(false);
        }
      });
      if (Platform.OS === 'web') setFirstRun(false);
    })();
  }, []);

  const RenderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingBottom: 100,
        }}>
        <StatusBar translucent backgroundColor={"transparent"} barStyle="light-content" />
        <Text style={styles.introTitleStyle}>{item.title}</Text>
        <Image style={styles.introImageStyle} source={item.image} />
        <Text style={styles.introTextStyle}>{item.text}</Text>
      </View>
    );
  };

  return firstRun ? (
    showApp ? (
      <HomeScreen />
    ) : (
      <AppIntroSlider
        data={slides}
        renderItem={RenderItem}
        onDone={() => setShowApp(true)}
        showPrevButton={true}
        prevLabel={'Atrás'}
        nextLabel={'Siguiente'}
        doneLabel={'Terminar'}
        onSkip={() => setShowApp(true)}
      />
    )
  ) : (
    <HomeScreen />
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  image: {
    flex: 1,
    position: 'absolute',
    width: phoneWidth,
    height: phoneWidth - 200,
  },
  containerWelc: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },
  titleStyle: {
    padding: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  paragraphStyle: {
    padding: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  introImageStyle: {
    width: 200,
    height: 200,
  },
  introTextStyle: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 30,
  },
  introTitleStyle: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

const slides = [
  {
    key: 's1',
    text: 'Obtén tus calificaciones de forma fácil',
    title: 'UAE SICAU',
    image: require('../assets/grade.png'),
    backgroundColor: '#20d2bb',
  },
  {
    key: 's2',
    title: 'Historial de Consulta',
    text: 'Guarda otros números para consultarlos luego de forma fácil',
    image: require('../assets/history.png'),
    backgroundColor: '#febe29',
  },
];
