import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { useIdioma } from '../IdiomaContext.js';
import { useState, useEffect } from 'react';

export default function LivroDestaque() {
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

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: '#E7F0DB' }}
            contentContainerStyle={styles.container}>
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
                <View style={styles.infoSection}>
                    <View style={[styles.infoDiv, { backgroundColor: '#b49e7e' }]}>
                        <Text style={styles.tituloInfo}>
                            {idioma === 'en' ? 'Literary Movement' : 'Movimento Literário'}
                        </Text>
                    </View>
                    <View style={styles.livroCampo}>
                        {isLoading ? (
                            <ActivityIndicator size="large" color="#caad92" />
                        ) : (
                            data?.map((movimentoLiterario) => (
                                <View
                                    key={movimentoLiterario.id}
                                    style={[
                                        styles.movimentoLiterario,
                                        {
                                            paddingHorizontal: 15,
                                            paddingVertical: 10,
                                            backgroundColor: '#E0D5C4',
                                            borderBottomLeftRadius: 15,
                                            borderBottomRightRadius: 15,
                                        },
                                    ]}>
                                    <Text style={styles.livroTexto}>
                                        {idioma === 'en'
                                            ? movimentoLiterario.nomeEn || movimentoLiterario.nome
                                            : movimentoLiterario.nome}
                                    </Text>
                                </View>
                            ))
                        )}
                    </View>
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
        paddingHorizontal: 15,
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
        backgroundColor: '#F7F3E8',
        padding: 14,
        borderRadius: 12,
    },
    autor: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoDiv: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
