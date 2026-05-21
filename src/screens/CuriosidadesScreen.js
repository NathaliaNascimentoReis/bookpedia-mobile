import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useIdioma } from '../IdiomaContext.js';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function Curiosidades() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const { idioma } = useIdioma();

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: '#E7F0DB' }}
            contentContainerStyle={styles.container}>
            <View style={styles.tituloSection}>
                <View style={styles.tituloDiv}>
                    <FontAwesome5 name="lightbulb" size={24} color="#1E1E1E" />
                    <Text style={styles.titulo}>
                        {idioma === 'en' ? 'Curiosities' : 'Curiosidades'}
                    </Text>
                </View>
                <View style={styles.linha}></View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 20,
        paddingBottom: 30,
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
    },
});
