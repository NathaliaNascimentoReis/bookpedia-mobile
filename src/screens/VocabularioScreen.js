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
        <ScrollView
            style={{ flex: 1, backgroundColor: '#E7F0DB' }}
            contentContainerStyle={styles.container}>
            <View style={styles.tituloSection}>
                <View style={styles.tituloDiv}>
                    <FontAwesome5 name="list-alt" size={18} color="#1E1E1E" />
                    <Text style={styles.titulo}>
                        {idioma === 'en' ? 'Vocabularies' : 'Vocabulário'}
                    </Text>
                </View>
                <View style={styles.linha}></View>
            </View>

            <View style={styles.main}>
                <View style={[styles.vocabularioContainer, { marginBottom: 20 }]}>
                    <Text style={styles.bannerTexto}>
                        {idioma === 'en'
                            ? 'Master the vocabulary of great literary works with BookPedia!'
                            : 'Domine o vocabulário das grandes obras com o BookPedia!'}
                    </Text>
                    {isLoading ? (
                        <ActivityIndicator size="large" color="#caad92" />
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
                                            (
                                                <FontAwesome5
                                                    name="chevron-up"
                                                    size={24}
                                                    color="white"
                                                />
                                            ) || (
                                                <FontAwesome5
                                                    name="chevron-down"
                                                    size={24}
                                                    color="white"
                                                />
                                            )
                                        ) : (
                                            <FontAwesome5
                                                name="chevron-down"
                                                size={24}
                                                color="white"
                                            />
                                        )}
                                    </TouchableOpacity>

                                    {estaAberta && (
                                        <View style={styles.significadoContainer}>
                                            <Text style={styles.significadoTexto}>
                                                {idioma === 'en'
                                                    ? vocabulario.significadoEn ||
                                                      vocabulario.significado ||
                                                      'Lorem ipsum dolor sit amet...'
                                                    : vocabulario.significado ||
                                                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            );
                        })
                    )}
                </View>
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
        marginBottom: 20,
    },
    main: {
        backgroundColor: '#F7F3E8',
        padding: 14,
        borderRadius: 12,
    },
    vocabularioContainer: {
        width: 300,
        marginTop: 5,
        padding: 12,
    },
    bannerTexto: {
        fontSize: 12,
        fontWeight: '700',
        color: '#5C664F',
        textTransform: 'uppercase',
        letterSpacing: 0.6,
        paddingHorizontal: 8,
        marginBottom: 15,
    },
    cardPalavra: {
        width: '100%',
        borderRadius: 12,
        overflow: 'hidden',
        marginVertical: 7,
    },
    botaoPalavra: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#94B97B',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 12,
    },
    botaoPalavraAberto: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    palavraTexto: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    significadoContainer: {
        backgroundColor: '#D4EBBA',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },
    significadoTexto: {
        color: '#2B431E',
        fontSize: 14,
        fontWeight: 500,
    },
});
