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
                    <FontAwesome5 name="user-alt" size={20} color="#2B3820" />
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
                        {/* Foto do Autor */}
                        <View style={styles.card}>
                            <View style={[styles.cardHeader, { backgroundColor: '#839c73' }]}>
                                <Text style={styles.cardHeaderTextoBranco}>{autor.nome}</Text>
                                <Text style={styles.cardHeaderTextoBranco}>
                                    ({autor.anoNascimento} - {autor.anoFalecimento})
                                </Text>
                            </View>
                            <View
                                style={[
                                    styles.cardBody,
                                    { backgroundColor: '#D1E6BA', alignItems: 'center' },
                                ]}>
                                <Image
                                    source={{ uri: autor.fotoURL }}
                                    style={styles.imagemAutor}
                                    resizeMode="cover"
                                />
                            </View>
                        </View>

                        {/* Descrição do Autor */}
                        <View style={styles.card}>
                            <View style={[styles.cardHeader, { backgroundColor: '#C2A88D' }]}>
                                <Text style={styles.cardHeaderTextoBranco}>
                                    {idioma === 'en'
                                        ? "Author's Description"
                                        : 'Descrição do autor'}
                                </Text>
                            </View>
                            <View style={[styles.cardBody, { backgroundColor: '#E1D3C1' }]}>
                                <Text style={styles.cardHeaderTextoEscuro}>
                                    {idioma === 'en'
                                        ? autor.descricaoEn || autor.descricao
                                        : autor.descricao}
                                </Text>
                            </View>
                        </View>

                        {/* Contexto Histórico */}
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
        marginBottom: 20,
    },
    tituloDiv: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 10,
    },
    titulo: {
        fontWeight: '900',
        fontSize: 22,
        color: '#2B3820',
        letterSpacing: 0.5,
    },
    linha: {
        width: '100%',
        height: 2,
        backgroundColor: '#BCA893',
        opacity: 0.6,
    },
    subtituloContainer: {
        backgroundColor: '#C0DE9E',
        width: '100%',
        paddingVertical: 14,
        paddingHorizontal: 15,
        borderRadius: 12,
        marginBottom: 25,
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
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 200,
    },
    dadosContainer: {
        width: '100%',
        gap: 24,
    },
    card: {
        width: '100%',
        borderRadius: 16,
        overflow: 'hidden',
        // Sombras
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 4,
        backgroundColor: '#FFF',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 18,
    },
    cardHeaderTextoEscuro: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#2B3820',
        lineHeight: 24,
    },
    cardHeaderTextoBranco: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#FFFFFF',
        letterSpacing: 0.3,
    },
    cardBody: {
        padding: 18,
    },
    imagemAutor: {
        width: '100%',
        height: 280,
        borderRadius: 12,
        borderWidth: 5,
        borderColor: '#FFFFFF',
    },
    textoEscuro: {
        fontSize: 15.5,
        color: '#2B3820',
        lineHeight: 24,
        fontWeight: '500',
    },
});
