import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
    Image,
} from 'react-native';
import { useIdioma } from '../IdiomaContext.js';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';

export default function LivroDestaque() {
    const route = useRoute();
    const navigation = useNavigation();

    const { livroOGuarani: livro } = route.params || {};

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const { idioma } = useIdioma();

    const getMovimento = async () => {
        try {
            const API_KEY = 'bookpedia-backend-2026';

            const response = await fetch(
                'https://bookpedia-backend-4ab3.onrender.com/movimentos-literarios',
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
            } else if (json.movimentosLiterarios && Array.isArray(json.movimentosLiterarios)) {
                setData(json.movimentosLiterarios);
            } else if (json.movimentoLiterario) {
                setData([json.movimentoLiterario]);
            } else {
                setData([json]);
            }
        } catch (error) {
            console.error('Erro ao buscar o movimento literário: ' + error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMovimento();
    }, []);

    if (!livro) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#E7F0DB',
                }}>
                <ActivityIndicator size="large" color="#1E1E1E" />
            </View>
        );
    }

    return (
        <ScrollView style={styles.background} contentContainerStyle={styles.container}>
            <View style={styles.tituloSection}>
                <View style={styles.tituloDiv}>
                    <FontAwesome name="bookmark" size={22} color="#1E1E1E" />
                    <Text style={styles.titulo}>
                        {idioma === 'en' ? 'Featured Book' : 'Livro Destaque'}
                    </Text>
                </View>
                <View style={styles.linha}></View>
            </View>

            <View style={styles.main}>
                <View style={styles.introLivro}>
                    <Image source={{ uri: livro.capa }} style={styles.capa} />
                    <View style={styles.introInfos}>
                        <Text style={styles.livroTitulo}>{livro.titulo}</Text>
                        <Text style={styles.livroAutor}>{livro.autor}</Text>

                        <Text style={styles.infoTexto}>
                            <Text style={styles.boldText}>
                                {idioma === 'en' ? 'Year: ' : 'Ano: '}
                            </Text>
                            {livro.ano}
                        </Text>
                    </View>
                </View>
            </View>

            <View
                style={{
                    alignSelf: 'flex-start',
                    marginTop: 20,
                }}>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 20,
                        borderRadius: 12,
                        padding: 12,
                        backgroundColor: '#C2E799',
                        shadowColor: 'rgb(0, 0, 0)',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        elevation: 3,
                    }}
                    onPress={() => navigation.navigate('Biblioteca')}>
                    <FontAwesome name="chevron-left" size={22} color="#000000" />
                    <Text style={{ fontSize: 16, color: '#000000', fontWeight: '500' }}>
                        {idioma === 'en' ? 'Return' : 'Voltar'}
                    </Text>
                </TouchableOpacity>
            </View>
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
        padding: 14,
    },
    capa: {
        width: '90%',
        height: 200,
        borderRadius: 12,
        resizeMode: 'cover',
    },
    infoTexto: {
        color: '#453E34',
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 20,
    },
    boldText: {
        fontWeight: 'bold',
        color: '#332C24',
    },
});
