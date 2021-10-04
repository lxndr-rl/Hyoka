/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  Keyboard,
  Text,
  View,
  Platform,
  ActivityIndicator,
} from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import Card from '../components/CardView';
import { Picker } from '@react-native-picker/picker';

let data;
let dataYear;
let pickerItemsSemestres;
let pickerItemsAños;
const ShowDataScreen = ({ route, navigation }) => {
  const [initialSemester, setInitialSemester] = useState(null);
  const [initialYear, setInitialYear] = useState(null);
  const [semestres, setSemestres] = useState([]);
  const [notasParciales, setNotasParciales] = useState(null);
  const [cedula, setCedula] = useState(null);
  const [aniosLectivos, setAniosLectivos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [anioLect, setAnioLect] = useState();
  const [semestre, setSemestre] = useState();

  useEffect(() => {
    navigation.setOptions({ title: route.params.name });
    setNotasParciales(route.params.data.parciales);
    setCedula(route.params.cedula);
    setAniosLectivos(route.params.data.aniosLect);
    setInitialSemester(route.params.data.parciales[route.params.data.semestres[0]]);
    setInitialYear(route.params.data.aniosLect[0]);
    let i = 0;
    data = [{ key: i - 1, section: true, label: 'Semestre' }];
    for (i = 0; i < route.params.data.semestres.length; i++) {
      data.push({ key: i, label: route.params.data.semestres[i] });
    }
    pickerItemsSemestres = route.params.data.semestres.map(i => (
      <Picker.Item label={i.toString()} value={i} />
    ));
    pickerItemsAños = route.params.data.aniosLect.map(i => (
      <Picker.Item label={i.toString()} value={i} />
    ));
    i = 0;
    dataYear = [{ key: i - 1, section: true, label: 'Año Lectivo' }];
    for (i = 0; i < route.params.data.aniosLect.length; i++) {
      dataYear.push({ key: i, label: route.params.data.aniosLect[i] });
    }
  }, []);

  const FetchAPI = (anioLectivo) => {
    if (!anioLectivo) return console.log('Error');
    setLoading(true);
    fetch(`https://api.lxndr.dev/uae/notas/v2/?cedula=${cedula}&alect=${anioLectivo}`).then(
      res => res.json()
    ).then(apiDATA => {
      if (apiDATA.error) return alert(`Ocurrió un error\n${apiDATA.message}`);
      setSemestres(apiDATA.semestres);
      setNotasParciales(apiDATA.parciales);
      setAniosLectivos(apiDATA.aniosLect);
      setInitialSemester(apiDATA.parciales[apiDATA.semestres[0]]);
      setInitialYear(apiDATA.aniosLect[0]);
      pickerItemsSemestres = apiDATA.semestres.map(i => (
        <Picker.Item label={i.toString()} value={i} />
      ));
      let i = 0;
      data = [{ key: i - 1, section: true, label: 'Semestre' }];
      for (i = 0; i < apiDATA.semestres.length; i++) {
        data.push({ key: i, label: apiDATA.semestres[i] });
      }
      i = 0
      dataYear = [{ key: i - 1, section: true, label: 'Año Lectivo' }];
      for (i = 0; i < apiDATA.aniosLect.length; i++) {
        dataYear.push({ key: i, label: apiDATA.aniosLect[i] });
      }
      setLoading(false);
    });
  };

  return (
    <ScrollView style={{
      flex: 1,
      backgroundColor: 'black',
      padding: 10,
    }}>
      <View style={styles.container}>
        <Text style={styles.title}>Año Lectivo</Text>
        {Platform.OS == 'web' ? <Picker
          selectedValue={anioLect ?? route.params.data.aniosLect[0]}
          onValueChange={(itemValue, itemIndex) => {
            setAnioLect(itemValue);
            setInitialYear(aniosLectivos[itemIndex]);
            FetchAPI(itemValue);
          }}>
          {pickerItemsAños}
        </Picker> : <ModalSelector
          data={dataYear}
          sectionTextStyle={{
            color: '#BFBCBC',
          }}
          optionTextStyle={{
            color: 'lightblue',
          }}
          optionContainerStyle={{
            borderRadius: 5,
            flexShrink: 1,
            marginBottom: 8,
            padding: 8,
            backgroundColor: '#171717',
          }}
          cancelStyle={{
            borderRadius: 5,
            backgroundColor: '#171717',
            padding: 8,
          }}
          cancelTextStyle={{
            textAlign: 'center',
            color: '#BFBCBC',
            fontSize: 16,
          }}
          optionStyle={{
            padding: 8,
            borderBottomWidth: 1,
            borderBottomColor: '#818181',
          }}
          style={{ width: 200, alignSelf: 'center' }}
          backdropPressToClose
          initValue={anioLect ?? route.params.data.aniosLect[0]}
          onChange={option => {
            setAnioLect(option.label);
            setInitialYear(aniosLectivos[option.key]);
            FetchAPI(option.label);
            Keyboard.dismiss();
          }}
          cancelText="Cancelar"
        />}
        <Text style={styles.title}>Semestre</Text>
        {loading ? null :
          Platform.OS == 'web' ?
            <Picker
              selectedValue={semestre ?? route.params.data.semestres[0]}
              onValueChange={(itemValue, itemIndex) => {
                setSemestre(itemValue);
                setInitialSemester(notasParciales[itemValue]);
              }}>
              {pickerItemsSemestres}
            </Picker> :
            <ModalSelector
              data={data}
              sectionTextStyle={{
                color: '#BFBCBC',
              }}
              optionTextStyle={{
                color: 'lightblue',
              }}
              optionContainerStyle={{
                borderRadius: 5,
                flexShrink: 1,
                marginBottom: 8,
                padding: 8,
                backgroundColor: '#171717',
              }}
              cancelStyle={{
                borderRadius: 5,
                backgroundColor: '#171717',
                padding: 8,
              }}
              cancelTextStyle={{
                textAlign: 'center',
                color: '#BFBCBC',
                fontSize: 16,
              }}
              optionStyle={{
                padding: 8,
                borderBottomWidth: 1,
                borderBottomColor: '#818181',
              }}
              style={{ width: 200, alignSelf: 'center' }}
              backdropPressToClose
              initValue={semestres[0] ?? route.params.data.semestres[0]}
              onChange={option => {
                setInitialSemester(notasParciales[option.label]);
                Keyboard.dismiss();
              }}
              cancelText="Cancelar"
            />}
        {loading ?
          <ActivityIndicator size={'large'} color={'white'} />
          : initialSemester ? initialSemester.map((element) => {
            return (<Card key={Math.floor(Math.random() * 1000 + 1)} materia={element.materia} primero={element.primero} segundo={element.segundo} recuperacion={element.recuperacion} total={element.total} />)
          })
            : null
        }
      </View>
    </ScrollView>
  )
};

export default ShowDataScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 10,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
    color: 'white',
    paddingStart: 20
  }
});
