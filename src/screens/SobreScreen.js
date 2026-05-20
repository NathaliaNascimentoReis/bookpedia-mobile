import { StyleSheet, Text, View, ScrollView } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useIdioma } from '../IdiomaContext.js';
import { useState } from 'react';

export default function Sobre() {
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

            <View style={[styles.intro, { backgroundColor: '#C2E799' }]}>
                <Text style={[styles.introTexto, { color: '#2B431E', fontSize: 15 }]}>
                    {idioma === 'en' ? 'Get to know the team too!' : 'Conheça a equipe também!'}
                </Text>
            </View>

            <View style={[styles.intro, { backgroundColor: '#839c73', marginTop: 20 }]}>
                <Text style={[styles.introTexto, { color: '#ffffff', fontSize: 13 }]}>
                    {idioma === 'en'
                        ? "Learn more about the team's individual reflections about the main work by clicking on their cards"
                        : 'Saiba mais sobre a reflexão individual da equipe acerca da obra principal clicando em seus cards!'}
                </Text>
            </View>

            <View style={styles.main}></View>
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
        fontSize: 20,
        color: '#453E34',
    },
    linha: {
        width: 300,
        height: 1,
        backgroundColor: '#9B6737',
        marginBottom: 20,
    },
    intro: {
        padding: 10,
        paddingHorizontal: 20,
        marginHorizontal: 20,
        borderRadius: 15,
    },
    introTexto: {
        fontWeight: '500',
    },
    main: {
        backgroundColor: '#F7F3E8',
        padding: 14,
        borderRadius: 12,
    },
});
