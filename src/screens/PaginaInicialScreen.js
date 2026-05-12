import { StatusBar } from 'expo-status-bar';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    useWindowDimensions,
    ActivityIndicator,
    Platform,
    FlatList,
} from 'react-native';
import { useEffect, useState } from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function PaginaInicial() {
    const { width } = useWindowDimensions();

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getLivros = async () => {
        try {
            const response = await fetch('https://bookpedia-backend-4ab3.onrender.com/livros');
            const json = await response.json();

            console.log(json);

            setData(json.livro || json);
        } catch (error) {
            console.error(error);
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
                    <Text style={styles.titulo}>Home</Text>
                </View>
                <View style={styles.linha}></View>
            </View>

            <View style={styles.subtitulos}>
                <Text style={styles.subtitulo}>Já explorou a literatura hoje?</Text>

                <View style={styles.intro}>
                    <Text style={styles.introTexto}>Conheça o novo livro destaque!</Text>
                </View>
            </View>

            {isLoading ? (
                <ActivityIndicator size="large" color="#caad92" />
            ) : (
                data?.map((livro) => (
                    <View key={livro.id} style={styles.livroDestaque}>
                        <Text style={styles.tituloLivro}>{livro.titulo}</Text>
                        <Image
                            source={{ uri: livro.capaURL }}
                            style={{ width: width - 50, height: 300, borderRadius: 15 }}
                            resizeMode="cover"
                        />
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
        alignItems: 'flex-start',
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
    subtitulos: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        gap: 5,
    },
    subtitulo: {
        color: '#453E34',
        fontSize: 20,
        fontWeight: '500',
    },
    subtitulo: {
        backgroundColor: '#E0D5C4',
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
});
