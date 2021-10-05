import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View, Text, Dimensions, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const phoneWidth = Platform.OS == 'web' ? Dimensions.get('window').width / 2.5 : Dimensions.get('window').width;
const Card = (props) => {
    const colors = [['#2b2b2b', '#2b2b2b']];
    const materia = props.materia;
    return (
        <LinearGradient
            colors={colors[Math.floor(Math.random() * colors.length)]} style={styles.cardView}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.cardTitle}>{materia}</Text>
            <View style={styles.cardSection}>
                <Text style={styles.cardTextSection1}>1st</Text>
                <Text style={styles.cardTextSection1}>2st</Text>
                <Text style={styles.cardTextSection1}>{Platform.OS == 'web' ? 'Recuperación' : 'Rec...'}</Text>
                <Text style={styles.cardTextSection1}>Total</Text>
            </View>
            <View style={styles.cardSection}>
                <Text style={styles.cardTextSection2}>{props.primero}  {props.primero < 6 ? <MaterialIcons name="error" size={18} color="#FF416C" /> : props.primero == 6 ? <MaterialIcons name="warning" size={18} color="#FDC830" /> : null}</Text>
                <Text style={styles.cardTextSection2}>{props.segundo} {props.segundo < 6 ? <MaterialIcons name="error" size={18} color="#FF416C" /> : props.segundo == 6 ? <MaterialIcons name="warning" size={18} color="#FDC830" /> : null}</Text>
                <Text style={styles.cardTextSection2}>{props.recuperacion} {props.recuperacion < 6 && props.total < 7 ? <MaterialIcons name="error" size={18} color="#FF416C" /> : props.recuperacion == 6 ? <MaterialIcons name="warning" size={18} color="#FDC830" /> : null}</Text>
                <Text style={styles.cardTextSection2}>{props.total} {props.total < 7 ? <MaterialIcons name="error" size={18} color="#FF416C" /> : <MaterialIcons name="check-circle" size={18} color="#38ef7d" />}</Text>
            </View>
        </LinearGradient>
    )
};
export default Card;

const styles = StyleSheet.create({
    cardView: {
        margin: 7,
        borderRadius: 20,
        backgroundColor: 'gray',
        width: phoneWidth - 30,
        alignSelf: 'center',
        height: 125
    },
    cardTitle: {
        paddingTop: 5,
        fontWeight: 'bold',
        fontSize: 25,
        color: 'white',
        paddingStart: 15
    },
    cardSection: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardTextSection1: {
        flex: 2,
        color: '#a2a2a2',
        padding: 8,
        alignSelf: 'stretch',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: 20
    },
    cardTextSection2: {
        flex: 2,
        color: '#81d4fa',
        padding: 8,
        alignSelf: 'stretch',
        justifyContent: 'center',
        fontSize: 18,
        fontWeight: 'bold'
    }
});
