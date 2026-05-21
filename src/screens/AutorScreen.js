import { StatusBar } from 'expo-status-bar';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
    ActivityIndicator,
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
            const response = await fetch('https://bookpedia-backend-4ab3.onrender.com/autores');
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
                <View style={styles.autorSecao}>
                    <View style={styles.autorDiv}>
                        <Text style={styles.autorNome}>José de Alencar</Text>
                        <Text style={styles.epocaAutor}>(1829-1877)</Text>
                    </View>
                    <View style={styles.autorDescricao}>
                        {isLoading ? (
                            <ActivityIndicator size="large" color="#caad92" />
                        ) : (
                            data?.map((autor, index) => (
                                <View key={autor.id} style={styles.autor}>
                                    <View style={styles.overlay}>
                                        <Text style={styles.textoOverlay}>
                                            {idioma === 'en'
                                                ? autor.descricaoEn || autor.descricao
                                                : autor.descricao}
                                        </Text>
                                    </View>
                                </View>
                            ))
                        )}
                    </View>
                </View>
            </View>

            <View style={styles.descricaoSection}>
                <View style={styles.descricaoDiv}>
                    <Text style={styles.tituloDescricao}>Descrição do autor</Text>
                </View>
                <View style={styles.descricaoCampo}>
                    <Text>
                        "Lorem Ipsum" est exemplar textus typographicus typographicus. "Lorem Ipsum"
                        iam ab annis 1500 fuit, cum typographus ignotus seriem typorum confudit ut
                        librum exemplarium typorum crearet.
                    </Text>
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
        marginHorizontal: 20,
    },
    subtituloTexto: {
        color: '#453E34',
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
    },
    autorSection: {
        margin: 20,
        gap: 10,
        width: 320,
    },
    autorDiv: {
        padding: 10,
        backgroundColor: '#9DBC8A',
        padding: 10,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    autorNome: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#2B431E',
    },
    epocaAutor: {
        color: '#59734A',
        fontWeight: 500,
        fontSize: 18,
    },
    autorDescricao: {
        minHeight: 50,
        backgroundColor: '#D5EBBA',
        padding: 10,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    descricaoSection: {
        margin: 20,
        width: 320,
    },
    descricaoDiv: {
        backgroundColor: '#9DBC8A',
        padding: 10,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tituloDescricao: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#2B431E',
    },
    descricaoCampo: {
        padding: 10,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        backgroundColor: '#D5EBBA',
        height: 200,
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
        marginHorizontal: 20,
    },
    textoButton: {
        color: '#ffffffff',
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
    },
});
