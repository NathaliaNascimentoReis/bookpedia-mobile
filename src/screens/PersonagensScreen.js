import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useIdioma } from '../IdiomaContext.js';
import { useState } from 'react';

export default function Personagens() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const { idioma } = useIdioma();
    
    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: '#E7F0DB' }}
            contentContainerStyle={styles.container}>
            <View style={styles.tituloSection}>
                <View style={styles.tituloDiv}>
                    <FontAwesome5 name="users" size={24} color="black" />
                    <Text style={styles.titulo}>{idioma === 'en' ? 'Characters' : 'Personagens'}</Text>
                </View>
                <View style={styles.linha}></View>
            </View>
            <View style={styles.div}>
                <View style={styles.subtitulo}>
                    <Text style={styles.subtituloTexto}>{idioma === 'en' ? 'Get to know the characters' : 'Conheça os personagens!'}</Text>
                </View>
            </View>

            <View style={styles.fotoPrincipalDiv}>
                <Image
                    source={{
                        uri: 'https://www.planocritico.com/wp-content/uploads/2022/06/O-Guarani.jpeg',
                    }}
                    style={styles.fotoPrincipal}
                />
            </View>

            <View style={styles.divButton}>
                <View style={styles.subtituloButton}>
                    <Text style={styles.subtituloTexto}>{idioma === 'en' ? 'Get to know the characters' : 'Saiba mais sobre suas histórias clicando nos cards!'}</Text>
                </View>
            </View>

            <View style={styles.personagemContainer}>
                <View style={styles.divPersonagem}>
                    <Text style={styles.personagemNome}>Fulano de Tal</Text>
                    <TouchableOpacity>
                        <FontAwesome name="external-link" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.infoDiv}>
                    <Text style={styles.texto}>Idade: x anos</Text>
                    <Text style={styles.texto}>Classe social: lorem ipsum</Text>
                    <Text style={styles.texto}>
                        Descrição: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Text>
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
    fotoPrincipalDiv: {
        marginTop: 20,
    },
    fotoPrincipal: {
        width: 300,
        height: 200,
        borderRadius: 15,
        borderWidth: 5,
        borderColor: '#fff',
    },
    divButton: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
    },
    subtituloButton: {
        backgroundColor: '#839378',
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 15,
        marginVertical: 10,
        marginHorizontal: 20,
        borderWidth: 2,
        borderColor: '#637558ff',
    },
    textoButton: {
        color: '#ffffffff',
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center',
    },
    personagemContainer: {
        marginTop: 20,
    },
    divPersonagem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        width: 300,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#9EBC8B',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderWidth: 2,
        borderColor: '#6F9058'
    },
    personagemNome: {
        fontSize: 18,
        fontWeight: '500',
    },
    infoDiv: {
        backgroundColor: '#D4EBBA',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        marginHorizontal: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
        gap: 5,
    },
    texto: {
        fontSize: 15,
        color: '#',
    },
});
