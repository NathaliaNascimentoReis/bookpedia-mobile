import { StatusBar } from 'expo-status-bar';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
    ActivityIndicator,
    Image,
} from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useIdioma } from '../IdiomaContext.js';
import { useState, useEffect } from 'react';

export default function Autores() {
    const { width } = useWindowDimensions();
    const { idioma } = useIdioma();

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getAutor = async () => {
        try {
            const API_KEY = 'bookpedia-backend-2026';

            const response = await fetch('https://bookpedia-backend-4ab3.onrender.com/autores', {
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
            } else if (json.autores && Array.isArray(json.autores)) {
                setData(json.autores);
            } else if (json.autor) {
                setData([json.autor]);
            } else {
                setData([json]);
            }
        } catch (error) {
            console.error('Erro ao buscar o autor: ' + error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAutor();
    }, []);

    return (
        <ScrollView style={styles.background} contentContainerStyle={styles.container}>
            <View style={styles.tituloSection}>
                <View style={styles.tituloDiv}>
                    <FontAwesome5 name="user-alt" size={20} color="black" />
                    <Text style={styles.titulo}>{idioma === 'en' ? 'Author' : 'Autor'}</Text>
                </View>
                <View style={styles.linha}></View>
            </View>

            {/* Subtítulo */}
            <View style={styles.subtituloContainer}>
                <Text style={styles.subtituloTexto}>
                    {idioma === 'en' ? 'Get to know the author!' : 'Conheça o autor!'}
                </Text>
            </View>

            {isLoading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#7A8C66" />
                </View>
            ) : (
                data?.map((autor) => (
                    <View key={autor.id} style={styles.dadosContainer}>
                        {/* Card: Foto do Autor */}
                        <View style={styles.card}>
                            <View style={[styles.cardHeader, { backgroundColor: '#9CB48A' }]}>
                                <Text style={styles.cardHeaderTextoEscuro}>{autor.nome}</Text>
                                <Text style={styles.cardHeaderTextoEscuro}>
                                    ({autor.anoNascimento}-{autor.anoFalecimento})
                                </Text>
                            </View>
                            <View
                                style={[
                                    styles.cardBody,
                                    { backgroundColor: '#D1E6BA', alignItems: 'center' },
                                ]}>
                                <Image source={{ uri: autor.fotoURL }} style={styles.imagemAutor} />
                            </View>
                        </View>

                        {/* Card: Descrição do Autor */}
                        <View style={styles.card}>
                            <View style={[styles.cardHeader, { backgroundColor: '#E1D3C1' }]}>
                                <Text style={styles.cardHeaderTextoEscuro}>
                                    {idioma === 'en'
                                        ? "Author's Description"
                                        : 'Descrição do autor'}
                                </Text>
                            </View>
                            <View style={[styles.cardBody, { backgroundColor: '#C2A88D' }]}>
                                <Text style={styles.textoBranco}>
                                    {idioma === 'en'
                                        ? autor.descricaoEn || autor.descricao
                                        : autor.descricao}
                                </Text>
                            </View>
                        </View>

                        {/* Card: Contexto Histórico */}
                        <View style={styles.card}>
                            <View style={[styles.cardHeader, { backgroundColor: '#7A8C66' }]}>
                                <Text style={styles.cardHeaderTextoBranco}>
                                    {idioma === 'en' ? 'Historical Context' : 'Contexto Histórico'}
                                </Text>
                            </View>
                            <View style={[styles.cardBody, { backgroundColor: '#D1E6BA' }]}>
                                <Text style={styles.textoEscuro}>
                                    {idioma === 'en'
                                        ? autor.contextoEn || autor.contextoHistorico
                                        : autor.contextoHistorico}
                                </Text>
                            </View>
                        </View>
                    </View>
                ))
            )}

            <StatusBar style="dark" />
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
        width: '100%',
        marginBottom: 15,
    },
    tituloDiv: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 8,
    },
    titulo: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#000',
    },
    linha: {
        width: '100%',
        height: 1,
        backgroundColor: '#BCA893',
    },
    subtituloContainer: {
        backgroundColor: '#C0DE9E', // Verde claro do botão
        width: '100%',
        paddingVertical: 12,
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    subtituloTexto: {
        color: '#3A4A28',
        fontSize: 16,
        fontWeight: '600',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 200,
    },
    dadosContainer: {
        width: '100%',
        gap: 20, // Espaçamento entre os cards
    },
    card: {
        width: '100%',
        borderRadius: 12,
        overflow: 'hidden',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 15,
    },
    cardHeaderTextoEscuro: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#414D35',
    },
    cardHeaderTextoBranco: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#FFFFFF',
    },
    cardBody: {
        padding: 15,
    },
    imagemAutor: {
        width: 250,
        height: 220,
        borderRadius: 10,
        borderWidth: 4,
        borderColor: '#FFFFFF',
    },
    textoBranco: {
        fontSize: 15,
        color: '#FFFFFF',
        lineHeight: 22,
        fontWeight: '500',
    },
    textoEscuro: {
        fontSize: 15,
        color: '#2B3820',
        lineHeight: 22,
        fontWeight: '500',
    },
});
