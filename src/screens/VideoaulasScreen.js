import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { useIdioma } from '../IdiomaContext.js';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import YoutubePlayer from 'react-native-youtube-iframe';

const { width } = Dimensions.get('window');

export default function VideoaulasScreen() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const { idioma } = useIdioma();

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: '#E7F0DB' }}
            contentContainerStyle={styles.container}>

            <View style={styles.tituloSection}>
                <View style={styles.tituloDiv}>
                    <FontAwesome name="video-camera" size={18} color="#1E1E1E" />
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

            <FontAwesome6
                name="arrow-down"
                size={30}
                color="black"
                style={{ marginVertical: 10 }}
            />
            <View style={styles.videoCard}>
                <YoutubePlayer
                    height={200}
                    play={false}
                    videoId={'dQw4w9WgXcQ'} // id do video do Youtube
                />
            </View>

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
        borderRadius: 12,
        overflow: 'hidden',
        marginTop: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
});