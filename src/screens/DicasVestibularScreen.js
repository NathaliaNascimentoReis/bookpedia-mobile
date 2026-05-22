import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { useIdioma } from '../IdiomaContext.js';
import { useState, useEffect } from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function DicasVestibular() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const { idioma } = useIdioma();

    const getDica = async () => {
        try {
            const API_KEY = 'bookpedia-backend-2026';

            const response = await fetch(
                'https://bookpedia-backend-4ab3.onrender.com/dicas-de-vestibular',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': API_KEY,
                    },
                },
            );

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }

            const json = await response.json();

            if (Array.isArray(json)) {
                setData(json);
            } else if (json.dicas && Array.isArray(json.dicas)) {
                setData(json.dicas);
            } else if (json.dica) {
                setData([json.dica]);
            } else {
                setData([json]);
            }
        } catch (error) {
            console.error('Erro ao buscar a dica de vestibular: ' + error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getDica();
    }, []);

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: '#E7F0DB' }}
            contentContainerStyle={styles.container}>
            <View style={styles.tituloSection}>
                <View style={styles.tituloDiv}>
                    <FontAwesome5 name="graduation-cap" size={24} color="#1E1E1E" />
                    <Text style={styles.titulo}>
                        {idioma === 'en' ? 'Exam Tips' : 'Dicas de Vestibular'}
                    </Text>
                </View>
                <View style={styles.linha}></View>
            </View>

            <View style={styles.div}>
                <Text style={[styles.subtituloTexto, { marginBottom: 10 }]}>
                    {idioma === 'en'
                        ? 'Want to know how to ace the test?'
                        : 'Quer saber como se destacar na prova?'}
                </Text>
                <View style={styles.subtitulo}>
                    <Text style={styles.subtituloTexto}>
                        {idioma === 'en'
                            ? 'Learn valuable strategies with tips from BookPedia!'
                            : 'Aprenda estratégias valiosas com as dicas do BookPedia!'}
                    </Text>
                </View>
            </View>

            <View style={styles.main}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#caad92" />
                ) : (
                    data?.map((dica) => (
                        <View
                            key={dica.id}
                            style={[
                                styles.dica,
                                {
                                    paddingHorizontal: 15,
                                    paddingVertical: 10,
                                    backgroundColor: '#E0D5C4',
                                },
                            ]}>
                            {isLoading ? (
                                <ActivityIndicator size="large" color="#caad92" />
                            ) : (
                                data?.map((dica) => (
                                    <View style={styles.infoSection}>
                                        <View
                                            style={[
                                                styles.autorDiv,
                                                { backgroundColor: '#b49e7e' },
                                            ]}>
                                            <Text style={styles.tituloInfo}>
                                                {idioma === 'en'
                                                    ? dica.tituloEn || dica.titulo
                                                    : dica.titulo}
                                            </Text>
                                        </View>
                                        <View
                                            key={dica.id}
                                            style={[
                                                styles.autor,
                                                {
                                                    paddingHorizontal: 10,
                                                    paddingVertical: 5,
                                                    borderBottomLeftRadius: 15,
                                                    borderBottomRightRadius: 15,
                                                },
                                            ]}>
                                            <Text style={styles.descricaoTexto}>
                                                {idioma === 'en'
                                                    ? dica.descricaoEn || dica.descricao
                                                    : dica.descricao}
                                            </Text>
                                        </View>
                                    </View>
                                ))
                            )}
                        </View>
                    ))
                )}
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
        marginBottom: 20,
    },
    div: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    subtitulo: {
        backgroundColor: '#daccb3',
        padding: 10,
        paddingHorizontal: 20,
        marginHorizontal: 20,
        margin: 10,
        borderRadius: 15,
    },
    subtituloTexto: {
        color: '#453E34',
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center',
    },
    main: {
        width: '100%',
        backgroundColor: '#F7F3E8',
        padding: 14,
        borderRadius: 12,
    },
    infoSection: {
        width: '100%',
        marginVertical: 10,
    },
    tituloInfo: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#ffffff',
    },
    autorCampo: {
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        backgroundColor: '#E0D5C4',
        overflow: 'hidden',
        minHeight: 100,
    },
    infoTexto: {
        fontSize: 14,
        color: '#2B431E',
    },
});
