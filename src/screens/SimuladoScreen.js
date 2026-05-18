import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useIdioma } from '../IdiomaContext.js';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Simulado() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const { idioma } = useIdioma();

    return (
        <View style={styles.container}>
            <View style={styles.tituloSection}>
                <View style={styles.tituloDiv}>
                    <FontAwesome name="check-square" size={24} color="#1E1E1E" />
                    <Text style={styles.titulo}>{idioma === 'en' ? 'Quizzes' : 'Simulado'}</Text>
                </View>
                <View style={styles.linha}></View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E7F0DB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tituloSection: {
        gap: 5,
        marginTop: 30,
    },
    tituloDiv: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    titulo: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#453E34',
    },
    linha: {
        width: 300,
        height: 1,
        backgroundColor: '#9B6737',
    },
});
