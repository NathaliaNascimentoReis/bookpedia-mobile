import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useIdioma } from '../IdiomaContext.js';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useState } from 'react';

export default function MovimentosLiterarios() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const { idioma } = useIdioma();

    return (
       <ScrollView style={styles.background} contentContainerStyle={styles.container}>
            <View style={styles.tituloSection}>
                <View style={styles.tituloDiv}>
                    <FontAwesome5 name="feather-alt" size={24} color="black" />
                    <Text style={styles.titulo}>
                        {idioma === 'en' ? 'Literary Movement' : 'Movimentos Literarios'}
                    </Text>
                </View>
                <View style={styles.linha}></View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#EFF3E7',
    },
    container: {
        alignItems: 'center',
        flexGrow: 1,
        paddingVertical: 20,
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    tituloSection: {
        gap: 5,
    },
    tituloDiv: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    titulo: {
        fontWeight: 'bold',
        fontSize: 19,
        color: '#453E34',
    },
    linha: {
        width: 300,
        height: 1,
        backgroundColor: '#9B6737',
        marginBottom: 20,
    },
});
