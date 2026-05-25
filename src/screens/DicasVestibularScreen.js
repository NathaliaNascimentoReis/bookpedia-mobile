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
        <ScrollView style={styles.background} contentContainerStyle={styles.container}>
            <View style={styles.tituloSection}>
                <View style={styles.tituloDiv}>
                    <FontAwesome5 name="graduation-cap" size={24} color="#1E1E1E" />
                    <Text style={styles.titulo}>
                        {idioma === 'en' ? 'Exam Tips' : 'Dicas de Vestibular'}
                    </Text>
                </View>
                <View style={styles.linha}></View>
            </View>

            <View style={styles.intro}>
                <Text style={styles.introTexto}>
                    {idioma === 'en'
                        ? 'Want to know how to ace the test? Learn valuable strategies with tips from BookPedia!'
                        : 'Quer saber como se destacar na prova? Aprenda estratégias valiosas com as dicas do BookPedia!'}
                </Text>
            </View>

            <View style={styles.main}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#caad92" />
                ) : (
                    data?.map((dica) => (
                        <View key={dica.id} style={styles.dicaCard}>
                            {/* Cabeçalho da Dica (Título) */}
                            <View style={styles.dicaHeader}>
                                <Text style={styles.tituloInfo}>
                                    {idioma === 'en' ? dica.tituloEn || dica.titulo : dica.titulo}
                                </Text>
                            </View>

                            {/* Corpo da Dica (Descrição) */}
                            <View style={styles.dicaBody}>
                                <Text style={styles.descricaoTexto}>
                                    {idioma === 'en' ? dica.dicaEn || dica.dica : dica.dica}
                                </Text>
                            </View>
                        </View>
                    ))
                )}
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
    intro: {
        backgroundColor: '#C0DE9E',
        width: '100%',
        paddingVertical: 14,
        paddingHorizontal: 15,
        borderRadius: 12,
        marginBottom: 15,
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
        marginBottom: 20,
    },
    dicaCard: {
        backgroundColor: '#E0D5C4',
        borderRadius: 15,
        overflow: 'hidden', // Garante que o fundo do título não vaze pelas bordas
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    dicaHeader: {
        backgroundColor: '#b49e7e',
        paddingVertical: 12,
        paddingHorizontal: 15,
    },
    tituloInfo: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#ffffff',
    },
    dicaBody: {
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    descricaoTexto: {
        color: '#453E34',
        fontSize: 15.5,
        lineHeight: 24,
        fontWeight: '500',
    },
});
