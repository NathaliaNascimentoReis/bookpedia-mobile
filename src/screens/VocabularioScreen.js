import { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import { useIdioma } from '../IdiomaContext.js';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function Vocabularios() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const [palavraAberta, setPalavraAberta] = useState(null);

    const { idioma } = useIdioma();

    const getVocabulario = async () => {
        try {
            const API_KEY = 'bookpedia-backend-2026';

            const response = await fetch(
                'https://bookpedia-backend-4ab3.onrender.com/vocabulario',
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
            } else if (json.vocabularios && Array.isArray(json.vocabularios)) {
                setData(json.vocabularios);
            } else if (json.vocabulario) {
                setData([json.vocabulario]);
            } else {
                setData([json]);
            }
        } catch (error) {
            console.error('Erro ao buscar lista de vocabulários: ' + error.message);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getVocabulario();
    }, []);

    const alternarCard = (id) => {
        if (palavraAberta === id) {
            setPalavraAberta(null);
        } else {
            setPalavraAberta(id);
        }
    };

    return (
        <ScrollView style={styles.background} contentContainerStyle={styles.container}>
            <View style={styles.tituloSection}>
                <View style={styles.tituloDiv}>
                    <FontAwesome5 name="list-alt" size={20} color="#2B3820" />
                    <Text style={styles.titulo}>
                        {idioma === 'en' ? 'Vocabularies' : 'Vocabulário'}
                    </Text>
                </View>
                <View style={styles.linha}></View>
            </View>

            <View style={styles.main}>
                <View style={styles.subtituloContainer}>
                    <Text style={styles.bannerTexto}>
                        {idioma === 'en'
                            ? 'Master the vocabulary of great literary works with BookPedia!'
                            : 'Domine o vocabulário das grandes obras com o BookPedia!'}
                    </Text>
                </View>

                {isLoading ? (
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color="#7A8C66" />
                    </View>
                ) : (
                    data?.map((vocabulario, index) => {
                        const idPalavra = vocabulario.id || index;
                        const estaAberta = palavraAberta === idPalavra;

                        return (
                            <View key={idPalavra} style={styles.cardPalavra}>
                                <TouchableOpacity
                                    style={[
                                        styles.botaoPalavra,
                                        estaAberta && styles.botaoPalavraAberto,
                                    ]}
                                    onPress={() => alternarCard(idPalavra)}
                                    activeOpacity={0.8}>
                                    <Text style={styles.palavraTexto}>
                                        {idioma === 'en'
                                            ? vocabulario.palavraEn || vocabulario.palavra
                                            : vocabulario.palavra}
                                    </Text>
                                    {estaAberta ? (
                                        <FontAwesome5 name="chevron-up" size={18} color="white" />
                                    ) : (
                                        <FontAwesome5 name="chevron-down" size={18} color="white" />
                                    )}
                                </TouchableOpacity>

                                {estaAberta && (
                                    <View style={styles.significadoContainer}>
                                        <Text style={styles.significadoTexto}>
                                            {idioma === 'en'
                                                ? vocabulario.significadoEn ||
                                                  vocabulario.significado
                                                : vocabulario.significado}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        );
                    })
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
    main: {
        width: '100%',
    },
    subtituloContainer: {
        backgroundColor: '#C0DE9E',
        width: '100%',
        paddingVertical: 14,
        paddingHorizontal: 15,
        borderRadius: 12,
        marginBottom: 25,
        alignItems: 'center',
        // Sombras
        shadowColor: 'rgb(0, 0, 0)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    bannerTexto: {
        color: '#3A4A28',
        fontSize: 16.5,
        fontWeight: '700',
        textAlign: 'center',
    },
    loaderContainer: {
        paddingVertical: 40,
        alignItems: 'center',
    },
    cardPalavra: {
        width: '100%',
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 16,
        backgroundColor: '#FFF',
        // Sombras
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 4,
    },
    botaoPalavra: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#C2A88D',
        paddingVertical: 16,
        paddingHorizontal: 18,
    },
    botaoPalavraAberto: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    palavraTexto: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16.5,
        letterSpacing: 0.3,
    },
    significadoContainer: {
        backgroundColor: '#E1D3C1',
        padding: 18,
    },
    significadoTexto: {
        color: '#453E34',
        fontSize: 15.5,
        lineHeight: 24,
        fontWeight: '500',
    },
});
