import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    ImageBackground,
    useWindowDimensions,
    ActivityIndicator,
    Platform,
} from 'react-native';
import { useEffect, useState } from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useIdioma } from '../IdiomaContext.js';

export default function PaginaInicial() {
    const { width } = useWindowDimensions();

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const { idioma } = useIdioma();

    const getLivros = async () => {
        try {
            const response = await fetch('https://bookpedia-backend-4ab3.onrender.com/livros');
            const json = await response.json();

            if (Array.isArray(json)) {
                setData(json);
            } else if (json.livros && Array.isArray(json.livros)) {
                setData(json.livros);
            } else if (json.livro) {
                setData([json.livro]);
            } else {
                setData([json]);
            }
        } catch (error) {
            console.error('Erro ao buscar o livro destaque: ' + error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getLivros();
    }, []);

    return (
        <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator
            nestedScrollEnabled
            bounces={false}>
            <View style={styles.tituloSection}>
                <View style={styles.tituloDiv}>
                    <FontAwesome5 name="home" size={24} color="black" />
                    <Text style={styles.titulo}>{idioma === 'en' ? 'Home' : 'Início'}</Text>
                </View>
                <View style={styles.linha}></View>
            </View>

            <View style={styles.intro}>
                <Text style={styles.introTexto}>
                    {idioma === 'en' ? 'Discover the featured book!' : 'Conheça o livro destaque!'}
                </Text>
            </View>

            {isLoading ? (
                <ActivityIndicator size="large" color="#caad92" />
            ) : (
                data?.map((livro, index) => (
                    <View key={livro.id} style={styles.livroDestaque}>
                        <ImageBackground
                            source={{ uri: livro.capaURL }}
                            style={styles.ImageBackground}
                            resizeMode="cover">
                            <View style={styles.overlay}>
                                <Text style={styles.textoOverlay}>
                                    {idioma === 'en'
                                        ? livro.tituloEn || livro.titulo
                                        : livro.titulo}
                                    {idioma === 'en'
                                        ? livro.descricaoEn || livro.descricao
                                        : livro.descricao}
                                </Text>
                            </View>
                        </ImageBackground>
                    </View>
                ))
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#E7F0DB',
        ...(Platform.OS === 'web'
            ? {
                  height: '100%',
                  overflowY: 'auto',
              }
            : null),
    },
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingBottom: 32,
        ...(Platform.OS === 'web'
            ? {
                  minHeight: '100%',
              }
            : null),
    },
    tituloSection: {
        gap: 5,
        marginTop: 30,
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
    intro: {
        backgroundColor: '#839c73',
        padding: 10,
        paddingHorizontal: 20,
        marginHorizontal: 20,
        margin: 10,
        borderRadius: 15,
    },
    introTexto: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: '500',
    },
    livroDestaque: {
        width: 280,
        height: 300,
        borderRadius: 15,
        overflow: 'hidden',
        marginTop: 5,
    },
    ImageBackground: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 20,
    },
    textoOverlay: {
        fontWeight: 'bold',
        color: '#ffffff',
    },
});
