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
        <ScrollView style={styles.background} contentContainerStyle={styles.container}>
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
                <View style={styles.subtituloContainer}>
                    <Text style={styles.subtituloTexto}>
                        {idioma === 'en'
                            ? "Want to discover interesting facts? Explore what the pages don't tell you, but BookPedia does!"
                            : "Quer conhecer fatos interessantes? Explore o que as páginas não contam, mas o BookPedia sim!"}
                    </Text>
                </View>
            </View>

            <View style={styles.main}>
                {isLoading ? (
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color="#453E34" />
                    </View>
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
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    div: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    subtituloContainer: {
        backgroundColor: '#D4EBAB',
        width: '100%',
        paddingVertical: 14,
        paddingHorizontal: 15,
        borderRadius: 12,
        marginBottom: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    subtituloTexto: {
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
    curiosidadeCard: {
        backgroundColor: '#c6ae91ff',
        borderRadius: 12,
        marginBottom: 20,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
    },
    curiosidadeHeader: {
        backgroundColor: '#9e8569',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    curiosidadeBody: {
        padding: 15,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },
    tituloInfo: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#ffffff',
    },
    descricaoTexto: {
        color: '#ffffff',
        fontSize: 15.5,
        lineHeight: 24,
        fontWeight: '500',
    },
});
