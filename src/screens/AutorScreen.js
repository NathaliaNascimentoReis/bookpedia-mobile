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
    const size = width > 600 ? 2 : 1;

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
        <ScrollView
            style={{ flex: 1, backgroundColor: '#E7F0DB' }}
            contentContainerStyle={styles.container}>
            <View style={styles.tituloSection}>
                <View style={styles.tituloDiv}>
                    <FontAwesome5 name="user-alt" size={24} color="black" />
                    <Text style={styles.titulo}>{idioma === 'en' ? 'Author' : 'Autor'}</Text>
                </View>
                <View style={styles.linha}></View>
            </View>
            <View style={styles.div}>
                <View style={styles.subtitulo}>
                    <Text style={styles.subtituloTexto}>
                        {idioma === 'en' ? 'Get to know the author!' : 'Conheça o autor!'}
                    </Text>
                </View>
            </View>

            <View style={styles.autorSection}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#caad92" />
                ) : (
                    data?.map((autor, index) => (
                        <View
                            key={autor.id}
                            style={[styles.autorDiv, { backgroundColor: '#9DBC8A' }]}>
                            <Text style={styles.autorNome}>{autor.nome}</Text>
                            <Text style={styles.epocaAutor}>
                                {autor.anoNascimento} - {autor.anoFalecimento}
                            </Text>
                        </View>
                    ))
                )}
                <View style={styles.autorFotoSection}>
                    {isLoading ? (
                        <ActivityIndicator size="large" color="#caad92" />
                    ) : (
                        data?.map((autor, index) => (
                            <View key={autor.id} style={styles.autor}>
                                <Image
                                    source={{ uri: autor.fotoURL }}
                                    style={styles.imagemAutor}></Image>
                            </View>
                        ))
                    )}
                </View>
            </View>

            <View style={styles.main}>
                <View style={styles.descricaoSection}>
                    <View style={[styles.autorDiv, { backgroundColor: '#b49e7e' }]}>
                        <Text style={styles.tituloDescricao}>
                            {idioma === 'en' ? "Author's Description" : 'Descrição do autor'}
                        </Text>
                    </View>
                    <View style={styles.descricaoCampo}>
                        {isLoading ? (
                            <ActivityIndicator size="large" color="#caad92" />
                        ) : (
                            data?.map((autor, index) => (
                                <View
                                    key={autor.id}
                                    style={[
                                        styles.autor,
                                        {
                                            paddingHorizontal: 15,
                                            paddingVertical: 10,
                                            backgroundColor: '#E0D5C4',
                                        },
                                    ]}>
                                    {isLoading ? (
                                        <ActivityIndicator size="large" color="#caad92" />
                                    ) : (
                                        data?.map((autor, index) => (
                                            <View
                                                key={autor.id}
                                                style={[
                                                    styles.autor,
                                                    {
                                                        paddingHorizontal: 10,
                                                        paddingVertical: 5,
                                                        borderBottomLeftRadius: 15,
                                                        borderBottomRightRadius: 15,
                                                    },
                                                ]}>
                                                <Text style={styles.descricaoTexto}>
                                                    {idioma === 'en'
                                                        ? autor.descricaoEn || autor.descricao
                                                        : autor.descricao}
                                                </Text>
                                            </View>
                                        ))
                                    )}
                                </View>
                            ))
                        )}
                    </View>
                </View>
            </View>

            <View style={styles.divButton}>
                <View style={styles.subtituloButton}>
                    <Text style={styles.textoButton}>
                        Saiba mais sobre esse movimento literário clicando no card!
                    </Text>
                </View>
            </View>
            <StatusBar style="auto" />
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
    },
    div: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    subtitulo: {
        backgroundColor: '#daccb3',
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 15,
        marginVertical: 10,
    },
    subtituloTexto: {
        color: '#453E34',
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
    },
    autorSection: {
        width: '100%',
        marginVertical: 10,
    },
    autorDiv: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    autorNome: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#2B431E',
    },
    epocaAutor: {
        color: '#59734A',
        fontWeight: 500,
        fontSize: 15,
    },
    autorFotoSection: {
        minHeight: 50,
        backgroundColor: '#D5EBBA',
        padding: 10,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        marginBottom: 20,
    },
    autor: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagemAutor: {
        width: 250,
        height: 280,
        borderRadius: 15,
        borderWidth: 5,
        borderColor: '#fff',
    },
    main: {
        width: '100%',
        backgroundColor: '#F7F3E8',
        padding: 14,
        borderRadius: 12,
    },
    descricaoSection: {
        width: '100%',
        marginVertical: 10,
    },
    tituloDescricao: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#ffffff',
    },
    descricaoCampo: {
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    descricaoTexto: {
        fontSize: 14,
        color: '#2B431E',
    },
    divButton: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    subtituloButton: {
        backgroundColor: '#6E7E63',
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 15,
        marginVertical: 10,
    },
    textoButton: {
        color: '#ffffffff',
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
    },
});
