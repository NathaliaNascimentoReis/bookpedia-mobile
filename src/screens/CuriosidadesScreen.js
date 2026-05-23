import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { useIdioma } from '../IdiomaContext.js';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function Curiosidades() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const { idioma } = useIdioma();

    const getCurisosidade = async () => {
        try {
            const API_KEY = 'bookpedia-backend-2026';

            const response = await fetch(
                'https://bookpedia-backend-4ab3.onrender.com/curiosidades',
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
            } else if (json.curiosidades && Array.isArray(json.curiosidades)) {
                setData(json.curiosidades);
            } else if (json.curiosidade) {
                setData([json.curiosidade]);
            } else {
                setData([json]);
            }
        } catch (error) {
            console.error('Erro ao buscar lista de curiosidades: ' + error.message);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCurisosidade();
    }, []);

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

            <View style={styles.div}>
                <View style={styles.subtitulo}>
                    <Text style={styles.subtituloTexto}>
                        {idioma === 'en'
                            ? 'Quer conhecer fatos interessantes? Explore o que as páginas não contam, mas o BookPedia sim!'
                            : "Want to discover interesting facts? Explore what the pages don't tell you, but BookPedia does!"}
                    </Text>
                </View>
            </View>

            <View style={styles.main}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#caad92" />
                ) : (
                    data?.map((curiosidade) => (
                        <View key={curiosidade.id} style={styles.curiosidadeCard}>
                            {/* Cabeçalho da Curiosidade */}
                            <View style={styles.curiosidadeHeader}>
                                <Text style={styles.tituloInfo}>
                                    {idioma === 'en'
                                        ? curiosidade.tituloCuriosidadeEn ||
                                          curiosidade.tituloCuriosidade
                                        : curiosidade.tituloCuriosidade}
                                </Text>
                            </View>

                            {/* Corpo da Curiosidade */}
                            <View style={styles.curiosidadeBody}>
                                <Text style={styles.descricaoTexto}>
                                    {idioma === 'en'
                                        ? curiosidade.curiosidadeEn || curiosidade.curiosidade
                                        : curiosidade.curiosidade}
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
    container: {
        flexGrow: 1,
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
        backgroundColor: '#C0DE9E',
        padding: 10,
        paddingHorizontal: 20,
        marginHorizontal: 20,
        margin: 10,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    subtituloTexto: {
        color: '#3A4A28',
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center',
    },
    main: {
        width: '100%',
        padding: 14,
    },
    curiosidadeCard: {
        backgroundColor: '#E0D5C4',
        borderRadius: 15,
        overflow: 'hidden',
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    curiosidadeHeader: {
        backgroundColor: '#b49e7e',
        paddingVertical: 12,
        paddingHorizontal: 15,
    },
    tituloInfo: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#ffffff',
    },
    curiosidadeBody: {
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    descricaoTexto: {
        fontSize: 14,
        color: '#2B431E',
        lineHeight: 20,
    },
});
