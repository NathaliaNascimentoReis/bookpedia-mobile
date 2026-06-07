import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { useIdioma } from '../IdiomaContext.js';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import YoutubePlayer from 'react-native-youtube-iframe';

const { width } = Dimensions.get('window');

const extrairYoutubeId = (url) => {
    const match = url?.match(/(?:youtu\.be\/|v=)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
};

export default function VideoaulasScreen() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const { idioma } = useIdioma();

    const getVideo = async () => {
        try {
            const API_KEY = 'bookpedia-backend-2026';

            const response = await fetch('https://bookpedia-backend-4ab3.onrender.com/videos', {
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
            } else if (json.videos && Array.isArray(json.videos)) {
                setData(json.videos);
            } else if (json.video) {
                setData([json.video]);
            } else {
                setData([json]);
            }
        } catch (error) {
            console.error('Erro ao buscar vídeos: ' + error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getVideo();
    }, []);

    return (
        <ScrollView style={styles.background} contentContainerStyle={styles.container}>
            <View style={styles.tituloSection}>
                <View style={styles.tituloDiv}>
                    <FontAwesome name="video-camera" size={24} color="#1E1E1E" />
                    <Text style={styles.titulo}>
                        {idioma === 'en' ? 'Video Classes' : 'Videoaulas'}
                    </Text>
                </View>
                <View style={styles.linha}></View>
            </View>

            <View style={[styles.intro, { backgroundColor: '#C2E799', marginBottom: 10 }]}>
                <Text style={[styles.introTexto, { color: '#2B431E', fontSize: 16 }]}>
                    {idioma === 'en'
                        ? 'Have you explored literature today? BookPedia can help you with that through video lessons!'
                        : 'Já explorou a literatura hoje? O BookPedia pode te ajudar nisso com videoaulas!'}
                </Text>
            </View>

            <View style={styles.main}>
                {isLoading ? (
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color="#453E34" />
                    </View>
                ) : (
                    data?.map((video) => (
                        <View key={video.id} style={styles.card}>
                            <View style={styles.header}>
                                <Text style={styles.tituloInfo}>
                                    {idioma === 'en'
                                        ? video.tituloEn || video.titulo
                                        : video.titulo}
                                </Text>
                            </View>
                            <View style={styles.body}>
                                <View style={styles.videoCard}>
                                    <View style={styles.videoWrapper}>
                                        <YoutubePlayer
                                            height={width * 0.51}
                                            play={false}
                                            videoId={extrairYoutubeId(video.url)}
                                        />
                                    </View>
                                </View>

                                <Text style={styles.descricaoTexto}>
                                    <Text style={styles.boldText}>
                                        {idioma === 'en' ? 'Description: ' : 'Descrição: '}
                                    </Text>
                                    {idioma === 'en'
                                        ? video.descricaoEn || video.descricao
                                        : video.descricao}
                                </Text>
                            </View>
                        </View>
                    ))
                )}
            </View>
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
    intro: {
        backgroundColor: '#C0DE9E',
        width: '100%',
        paddingVertical: 14,
        paddingHorizontal: 15,
        borderRadius: 12,
        marginBottom: 15,
        alignItems: 'center',
        shadowColor: 'rgb(0, 0, 0)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    introTexto: {
        color: '#3A4A28',
        fontSize: 16.5,
        fontWeight: '700',
        textAlign: 'center',
    },
    main: {
        flex: 1,
        width: '100%',
        marginBottom: 20,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#E0D5C4',
        borderRadius: 15,
        overflow: 'hidden',
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    header: {
        backgroundColor: '#b49e7e',
        paddingVertical: 12,
        paddingHorizontal: 15,
    },
    tituloInfo: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#ffffff',
    },
    body: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        alignItems: 'center',
    },
    descricaoTexto: {
        color: '#453E34',
        fontSize: 15.5,
        lineHeight: 24,
        fontWeight: '500',
        alignSelf: 'flex-start',
        width: '100%',
    },
    boldText: {
        fontWeight: 'bold',
    },
    videoCard: {
        width: '90%',
        marginBottom: 20,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
    },
    videoWrapper: {
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#000',
    },
});
