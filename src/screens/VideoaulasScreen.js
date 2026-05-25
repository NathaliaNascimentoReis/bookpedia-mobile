import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { useIdioma } from '../IdiomaContext.js';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import YoutubePlayer from 'react-native-youtube-iframe';

const { width } = Dimensions.get('window');

export default function VideoaulasScreen() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const { idioma } = useIdioma();

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

            <View style={[styles.intro, { backgroundColor: '#C2E799' }]}>
                <Text
                    style={[
                        styles.introTexto,
                        { color: '#2B431E', fontSize: 15, textAlign: 'center' },
                    ]}>
                    {idioma === 'en'
                        ? 'BookPedia can help you with that through video lessons!'
                        : 'O BookPedia pode te ajudar nisso com videoaulas!'}
                </Text>
            </View>

            <View style={styles.videoCard}>
                <View style={styles.videoWrapper}>
                    <YoutubePlayer
                        height={width * 0.51}
                        play={false}
                        videoId={'dQw4w9WgXcQ'}
                    />
                </View>
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
        padding: 10,
        paddingHorizontal: 20,
        marginHorizontal: 20,
        borderRadius: 15,
        alignSelf: 'center',
    },
    introTexto: {
        fontWeight: '500',
    },
    videoCard: {
        width: width * 0.9,
        marginTop: 10,
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
