import { StatusBar } from 'expo-status-bar';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    useWindowDimensions,
    TouchableOpacity,
} from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function PaginaInicial() {
    const { width } = useWindowDimensions();
    const size = width > 600 ? 2 : 1;

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: '#E7F0DB' }}
            contentContainerStyle={styles.container}>
            <View style={styles.tituloSection}>
                <View style={styles.tituloDiv}>
                    <FontAwesome5 name="book-open" size={24} color="black" />
                    <Text style={styles.titulo}>Enredo</Text>
                </View>
                <View style={styles.linha}></View>
            </View>
            <View style={styles.div}>
                <View style={styles.subtitulo}>
                    <Text style={styles.subtituloTexto}>Conheça a história com profundidade!</Text>
                </View>
            </View>

            <FontAwesome6
                name="arrow-down"
                size={30}
                color="black"
                style={{ marginVertical: 20 }}
            />

            <View style={styles.historiaSection}>
                <View style={styles.historiaSecao}>
                    <View style={styles.tituloHistoriaDiv}>
                        <Text style={styles.tituloTextoDiv}>Introdução</Text>
                    </View>
                    <View style={styles.textoDiv}>
                        <Text style={styles.textOParagrafoDiv}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat.
                        </Text>
                    </View>
                </View>

                <View style={styles.historiaSecao}>
                    <View style={styles.tituloHistoriaDiv}>
                        <Text style={styles.tituloTextoDiv}>Conflito</Text>
                    </View>
                    <View style={styles.textoDiv}>
                        <Text style={styles.textOParagrafoDiv}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua.
                        </Text>
                    </View>
                </View>

                <View style={styles.historiaSecao}>
                    <View style={styles.tituloHistoriaDiv}>
                        <Text style={styles.tituloTextoDiv}>Climax</Text>
                    </View>
                    <View style={styles.textoDiv}>
                        <Text style={styles.textOParagrafoDiv}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat.
                        </Text>
                    </View>
                </View>

                <View style={styles.historiaSecao}>
                    <View style={styles.tituloHistoriaDiv}>
                        <Text style={styles.tituloTextoDiv}>Desfecho</Text>
                    </View>
                    <View style={styles.textoDiv}>
                        <Text style={styles.textOParagrafoDiv}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua.
                        </Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity>
                <View style={styles.divButton}>
                    <View style={styles.subtituloButton}>
                        <Text style={styles.textoButton}>Saiba mais sobre os cenários!</Text>
                    </View>
                </View>
            </TouchableOpacity>

            <View style={styles.livroDestaque}></View>
            <StatusBar style="auto" />
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
        alignItems: 'flex-start',
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
    historiaSection: {
        margin: 20,
        gap: 10,
    },
    tituloHistoriaDiv: {
        backgroundColor: '#9DBC8A',
        padding: 10,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    tituloTextoDiv: {
        fontSize: 20,
        fontWeight: 500,
    },
    textoDiv: {
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        backgroundColor: '#D4EBB9',
    },
    textOParagrafoDiv: {
        padding: 10,
        fontSize: 17,
        color: '#2B431E',
        fontWeight: 500,
    },
    divButton: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    subtituloButton: {
        backgroundColor: '#9DBC8A',
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
