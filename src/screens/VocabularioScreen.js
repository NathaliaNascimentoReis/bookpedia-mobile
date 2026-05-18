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
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

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

            <View style={styles.introContainer}>
                <Text style={styles.introTexto}>
                    {idioma === 'en'
                        ? 'Did you encounter an unfamiliar word?'
                        : 'Encontrou uma palavra desconhecida?'}
                </Text>
                <View style={styles.bannerVerdeClaro}>
                    <Text style={styles.bannerTexto}>
                        {idioma === 'en'
                            ? 'Master the vocabulary of great literary works with BookPedia!'
                            : 'Domine o vocabulário das grandes obras com o BookPedia!'}
                    </Text>
                    <FontAwesome6
                        name="arrow-down"
                        size={30}
                        color="black"
                        style={{ marginVertical: 10 }}
                    />
                </View>
            </View>

            <View style={styles.vocabularioContainer}>
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
                                </TouchableOpacity>

                                <FontAwesome6 name="arrow-down" size={24} color="white" />

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
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexGrow: 1,
        paddingBottom: 50,
    },
    tituloSection: {
        gap: 5,
        marginTop: 30,
        width: 300,
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
    },
    introContainer: {
        alignItems: 'center',
        marginTop: 20,
        width: 300,
    },
    introTexto: {
        fontSize: 18,
        color: '#2A3B1B',
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 10,
    },
    bannerVerdeClaro: {
        backgroundColor: '#C2E799',
        padding: 15,
        borderRadius: 12,
        width: '100%',
    },
    bannerTexto: {
        textAlign: 'center',
        color: '#2A3B1B',
        fontWeight: 'bold',
    },
    vocabularioContainer: {
        width: 300,
        marginTop: 5,
    },
    cardPalavra: {
        width: '100%',
        borderRadius: 12,
        overflow: 'hidden',
    },
    botaoPalavra: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#94B979',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: '#6F905C',
    },
    botaoPalavraAberto: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    palavraTexto: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    significadoContainer: {
        backgroundColor: '#D4EBBA',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    significadoTexto: {
        color: '#2A3B1B',
        fontSize: 14,
        lineHeight: 20,
    },
});
