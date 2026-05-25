import { StatusBar } from 'expo-status-bar';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
    ActivityIndicator,
} from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useIdioma } from '../IdiomaContext.js';
import { useState, useEffect } from 'react';

export default function Enredos() {
    const { width } = useWindowDimensions();
    const size = width > 600 ? 2 : 1;

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const { idioma } = useIdioma();

    const getEnredo = async () => {
        try {
            const API_KEY = 'bookpedia-backend-2026';

            const response = await fetch('https://bookpedia-backend-4ab3.onrender.com/enredos', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': API_KEY,
                },
            });

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }

            const json = await response.json();

            if (Array.isArray(json)) {
                setData(json);
            } else if (json.enredos && Array.isArray(json.enredos)) {
                setData(json.enredos);
            } else if (json.enredo) {
                setData([json.enredo]);
            } else {
                setData([json]);
            }
        } catch (error) {
            console.error('Erro ao buscar enredo do livro: ' + error.message);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getEnredo();
    }, []);

    return (
        <ScrollView style={styles.background} contentContainerStyle={styles.container}>
            <View style={styles.tituloSection}>
                <View style={styles.tituloDiv}>
                    <FontAwesome5 name="book-open" size={24} color="black" />
                    <Text style={styles.titulo}>{idioma === 'en' ? 'Story' : 'Enredo'}</Text>
                </View>
                <View style={styles.linha}></View>
            </View>
            <View style={[styles.intro, { backgroundColor: '#C2E799', marginBottom: 10 }]}>
                <Text style={[styles.introTexto, { color: '#2B431E', fontSize: 16 }]}>
                    {idioma === 'en' ? 'Get to know the team too!' : 'Conheça a equipe também!'}
                </Text>
            </View>

            <View style={styles.main}>
                {data?.map((enredo) => (
                    <View key={enredo.id}>
                        <View style={[styles.enredoCard, { backgroundColor: '#E0D5C4' }]}>
                            <View style={[styles.enredoHeader, { backgroundColor: '#b49e7e' }]}>
                                <Text style={[styles.tituloInfo, { color: '#ffffff' }]}>
                                    {idioma === 'en' ? 'Introduction' : 'Introducao'}
                                </Text>
                            </View>

                            <View style={styles.enredoBody}>
                                <Text style={[styles.enredoTexto, { color: '#453E34' }]}>
                                    {idioma === 'en'
                                        ? enredo.introducaoEn || enredo.introducao
                                        : enredo.introducao}
                                </Text>
                            </View>
                        </View>

                        <View style={[styles.enredoCard, { backgroundColor: '#C0DE9E' }]}>
                            <View style={[styles.enredoHeader, { backgroundColor: '#839c73' }]}>
                                <Text style={[styles.tituloInfo, { color: '#ffffff' }]}>
                                    {idioma === 'en' ? 'Conflict' : 'Conflito'}
                                </Text>
                            </View>

                            <View style={styles.enredoBody}>
                                <Text style={[styles.enredoTexto, { color: '#3A4A28' }]}>
                                    {idioma === 'en'
                                        ? enredo.conflitoEn || enredo.conflito
                                        : enredo.conflito}
                                </Text>
                            </View>
                        </View>

                        <View style={[styles.enredoCard, { backgroundColor: '#c6ae91ff' }]}>
                            <View style={[styles.enredoHeader, { backgroundColor: '#9e8569' }]}>
                                <Text style={[styles.tituloInfo, { color: '#ffffff' }]}>
                                    {idioma === 'en' ? 'Climax' : 'Clímax'}
                                </Text>
                            </View>

                            <View style={styles.enredoBody}>
                                <Text style={[styles.enredoTexto, { color: '#ffffffff' }]}>
                                    {idioma === 'en'
                                        ? enredo.climaxEn || enredo.climax
                                        : enredo.climax}
                                </Text>
                            </View>
                        </View>

                        <View style={[styles.enredoCard, { backgroundColor: '#D4EBAB' }]}>
                            <View style={[styles.enredoHeader, { backgroundColor: '#839c73' }]}>
                                <Text style={[styles.tituloInfo, { color: '#ffffff' }]}>
                                    {idioma === 'en' ? 'Outcome' : 'Desfecho'}
                                </Text>
                            </View>

                            <View style={styles.enredoBody}>
                                <Text style={[styles.enredoTexto, { color: '#2B431E' }]}>
                                    {idioma === 'en'
                                        ? enredo.desfechoEn || enredo.desfecho
                                        : enredo.desfecho}
                                </Text>
                            </View>
                        </View>
                    </View>
                ))}
            </View>

            <StatusBar style="auto" />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#E7F0DB',
    },
    container: {
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
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
        color: '#000000',
    },
    linha: {
        width: 300,
        height: 1,
        backgroundColor: '#9B6737',
        marginBottom: 20,
    },
    intro: {
        backgroundColor: '#C0DE9E',
        width: '100%',
        paddingVertical: 14,
        paddingHorizontal: 15,
        borderRadius: 12,
        marginBottom: 20,
        alignItems: 'center',
        shadowColor: 'rgb(0, 0, 0)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    introTexto: {
        color: '#3A4A28',
        fontSize: 16.5,
        fontWeight: '700',
        textAlign: 'center',
    },
    main: {
        flex: 1,
        width: '100%',
        marginTop: 20,
    },
    enredoCard: {
        borderRadius: 15,
        overflow: 'hidden', // Garante que o fundo do título não vaze pelas bordas
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        marginBottom: 30,
    },
    enredoHeader: {
        paddingVertical: 12,
        paddingHorizontal: 15,
    },
    tituloInfo: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    enredoBody: {
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    enredoTexto: {
        fontSize: 15.5,
        fontWeight: '500',
        lineHeight: 20,
    },
});
