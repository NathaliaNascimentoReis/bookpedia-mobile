import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useIdioma } from '../IdiomaContext.js';
import { useState } from 'react';

export default function EquipeAvaliacao() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const { idioma } = useIdioma();

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: '#E7F0DB' }}
            contentContainerStyle={styles.container}>
            <View style={styles.tituloSection}>
                <View style={styles.tituloDiv}>
                    <FontAwesome6 name="circle-info" size={22} color="#1E1E1E" />
                    <Text style={styles.titulo}>
                        {idioma === 'en'
                            ? 'About the project and team'
                            : 'Sobre o Projeto e Equipe'}
                    </Text>
                </View>
                <View style={styles.linha}></View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexGrow: 1,
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
