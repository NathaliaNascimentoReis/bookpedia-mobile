import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    ActivityIndicator,
    ImageBackground,
    Image,
} from 'react-native';
import { useIdioma } from '../IdiomaContext.js';
import { useState, useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Biblioteca() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const { idioma } = useIdioma();

    const getVidasSecas = async () => {
        try {
            const API_KEY = 'amods';

            const response = await fetch('https://bookverse-back-pob5.onrender.com/livros', {
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
            } else if (json.livrosVidasSecas && Array.isArray(json.livrosVidasSecas)) {
                setData(json.livrosVidasSecas);
            } else if (json.livroVidasSecas) {
                setData([json.livroVidasSecas]);
            } else {
                setData([json]);
            }
        } catch (error) {
            console.error('Erro ao buscar livro "Vidas Secas": ' + error.message);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getVidasSecas();
    }, []);

    return (
        <ScrollView style={styles.background} contentContainerStyle={styles.container}>
            <View style={styles.tituloSection}>
                <View style={styles.tituloDiv}>
                    <FontAwesome name="book" size={24} color="#1E1E1E" />
                    <Text style={styles.titulo}>{idioma === 'en' ? 'Library' : 'Biblioteca'}</Text>
                </View>
                <View style={styles.linha}></View>
            </View>

            {isLoading ? (
                <ActivityIndicator size="large" color="#caad92" />
            ) : (
                data?.map((livroVidaSeca, index) => (
                    <View style={styles.main}>
                        <View key={livroVidaSeca.id || index} style={styles.livroContainer}>
                            <View style={styles.cardLivro}>
                                <Image
                                    source={{ uri: livroVidaSeca.capa_url }}
                                    style={styles.capa}></Image>
                                <View style={styles.infoLivro}>
                                    <Text style={styles.livroTexto}>{livroVidaSeca.titulo}</Text>
                                    <Text style={styles.autorTexto}>{livroVidaSeca.autor}</Text>
                                </View>
                            </View>
                        </View>
                        <View key={livroVidaSeca.id || index} style={styles.livroContainer}>
                            <View style={styles.cardLivro}>
                                <Image
                                    source={{ uri: livroVidaSeca.capa_url }}
                                    style={styles.capa}></Image>
                                <View style={styles.infoLivro}>
                                    <Text style={styles.livroTexto}>{livroVidaSeca.titulo}</Text>
                                    <Text style={styles.autorTexto}>{livroVidaSeca.autor}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                ))
            )}
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
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    livroContainer: {
        width: '47%',
        height: 250,
        borderRadius: 12,
        overflow: 'hidden',
    },
    cardLivro: {
        backgroundColor: '#D4EBBA',
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 3,
        borderColor: '#C0DE9E',
        flex: 1,
        padding: 15,
    },
    capa: {
        width: '100%',
        maxHeight: 200,
        borderRadius: 12,
        marginBottom: 10,
    },
    infoLivro: {
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        gap: 5,
    },
    livroTexto: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2B431E',
    },
    autorTexto: {
        fontSize: 14,
        fontWeight: '500',
        color: '#2B431E',
    },
});
