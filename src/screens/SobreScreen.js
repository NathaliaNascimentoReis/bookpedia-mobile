import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useIdioma } from '../IdiomaContext.js';

export default function SobreScreen() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    
    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: '#E7F0DB' }}
            contentContainerStyle={styles.container}>
            <View style={styles.tituloSection}>
                <View style={styles.tituloDiv}>
                    <FontAwesome6 name="circle-info" size={24} color="black" />
                    <Text style={styles.titulo}>Conheça a equipe também</Text>
                </View>
                <View style={styles.linha}></View>
            </View>
            <View style={styles.div}>
                <View style={styles.subtitulo}>
                    <Text style={styles.subtituloTexto}>Conheça os personagens!</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexGrow: 1,
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
        color: '#000000',
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
});
