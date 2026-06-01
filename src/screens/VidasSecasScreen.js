import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import { useIdioma } from '../IdiomaContext.js';
import { useState, useEffect } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function VidasSecas() {
    const route = useRoute();
    const navigation = useNavigation();

    const { livroVidasSecas: livro } = route.params || {};

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const { idioma } = useIdioma();

    return (
        <ScrollView style={styles.background} contentContainerStyle={styles.container}>
            <View style={styles.tituloSection}>
                <View style={styles.tituloDiv}>
                    <FontAwesome name="book" size={24} color="black" />
                    <Text style={styles.titulo}>
                        {idioma === 'en' ? 'Barren Lives' : 'Vidas Secas'}
                    </Text>
                </View>
                <View style={styles.linha}></View>
            </View>

            <View style={styles.main}>
                <View style={styles.introLivro}>
                    <Image source={{ uri: livro.capa }} style={styles.capa} />
                    <View style={styles.introInfos}>
                        <Text style={styles.livroTitulo}>
                            {idioma === 'en' ? 'Barren Lives' : livro.titulo }
                        </Text>
                        <Text style={styles.livroAutor}>{livro.autor}</Text>

                        <Text style={styles.infoTexto}>
                            <Text style={styles.boldText}>
                                {idioma === 'en' ? 'Year: ' : 'Ano: '}
                            </Text>
                            {livro.ano}
                        </Text>
                        <Text style={styles.infoTexto}>
                            <Text style={styles.boldText}>
                                {idioma === 'en' ? 'Genre: ' : 'Gênero: '}
                            </Text>
                            {livro.genero}
                        </Text>
                    </View>
                </View>

                <View style={styles.livroSection}>
                    <View style={[styles.tituloSectionDiv, { backgroundColor: '#9e8569' }]}>
                        <Text style={[styles.sectionTitulo, { color: '#ffffff' }]}>
                            {idioma === 'en' ? 'Literary Movement' : 'Movimento Literário'}
                        </Text>
                    </View>
                    <View style={[styles.sectionInfo, { backgroundColor: '#c6ae91ff' }]}>
                        <Text style={[styles.sectionTexto, { color: '#ffffffff' }]}>
                            {idioma === 'en' ? livro.movimentoEn : livro.movimento}
                        </Text>
                    </View>
                </View>

                <View style={styles.enredo}>
                    <ImageBackground
                        source={{
                            uri: 'https://i.pinimg.com/474x/88/fa/0c/88fa0cd1043046d01ce7ac20f77b73e1.jpg',
                        }}
                        style={styles.imageBackground}
                        resizeMode="cover">
                        <View style={styles.overlay}>
                            <Text style={styles.textoOverlay}>
                                {idioma === 'en' ? livro.enredoEn : livro.enredo}
                            </Text>
                        </View>
                    </ImageBackground>
                </View>

                <View style={styles.livroSection}>
                    <View style={[styles.tituloSectionDiv, { backgroundColor: '#839c73' }]}>
                        <Text style={[styles.sectionTitulo, { color: '#ffffff' }]}>
                            {idioma === 'en' ? 'Story' : 'Enredo'}
                        </Text>
                    </View>
                    <View style={[styles.sectionInfo, { backgroundColor: '#C0DE9E' }]}>
                        <Text style={[styles.sectionTexto, { color: '#3A4A28' }]}>
                            {idioma === 'en' ? livro.descricaoEn : livro.descricao}
                        </Text>
                    </View>
                </View>

                <View style={styles.livroSection}>
                    <View
                        style={[
                            styles.tituloSectionDiv,
                            { backgroundColor: '#9e8569', flexDirection: 'row', gap: 10 },
                        ]}>
                        <FontAwesome6 name="clock" size={22} color="white" />
                        <Text style={[styles.sectionTitulo, { color: '#ffffff' }]}>
                            {idioma === 'en' ? 'Historical Context' : 'Contexto Histórico'}
                        </Text>
                    </View>
                    <View style={[styles.sectionInfo, { backgroundColor: '#E1D3C1' }]}>
                        <Text style={[styles.sectionTexto, { color: '#453E34' }]}>
                            {idioma === 'en' ? livro.contextoHistoricoEn : livro.contextoHistorico}
                        </Text>
                    </View>
                </View>
            </View>

            <View
                style={{
                    alignSelf: 'flex-start',
                    marginTop: 20,
                }}>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 20,
                        borderRadius: 12,
                        padding: 12,
                        backgroundColor: '#C2E799',
                        shadowColor: 'rgb(0, 0, 0)',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        elevation: 3,
                    }}
                    onPress={() => navigation.navigate('Biblioteca')}>
                    <FontAwesome name="chevron-left" size={22} color="#000000" />
                    <Text style={{ fontSize: 16, color: '#000000', fontWeight: '500' }}>
                        {idioma === 'en' ? 'Return' : 'Voltar'}
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#E7F0DB',
    },
    container: {
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
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
    main: {
        width: '100%',
    },
    introLivro: {
        backgroundColor: '#D4EBBA',
        borderRadius: 12,
        borderWidth: 3,
        borderColor: '#C0DE9E',
        padding: 14,
        flexDirection: 'row',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    capa: {
        width: '35%',
        borderRadius: 12,
        resizeMode: 'cover',
        marginRight: 15,
        alignSelf: 'stretch',
    },
    introInfos: {
        flex: 1,
        justifyContent: 'flex-start',
        gap: 5,
    },
    livroTitulo: {
        color: '#2B431E',
        fontSize: 22,
        fontWeight: '800',
        marginBottom: 3,
    },
    livroAutor: {
        color: '#2B431E',
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 10,
    },
    infoTexto: {
        color: '#2B431E',
        fontSize: 15,
        lineHeight: 22,
        marginBottom: 6,
    },
    boldText: {
        fontWeight: 'bold',
        color: '#2B431E',
    },
    livroSection: {
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    tituloSectionDiv: {
        paddingVertical: 12,
        paddingHorizontal: 15,
    },
    sectionTitulo: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    sectionInfo: {
        padding: 15,
    },
    sectionTexto: {
        fontSize: 14,
        fontWeight: '700',
        lineHeight: 20,
    },
    enredo: {
        width: '100%',
        height: 400,
        borderRadius: 12,
        overflow: 'hidden',
        resizeMode: 'cover',
        marginBottom: 20,
        borderWeight: 5,
    },
    imageBackground: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(225, 211, 193, 0.8)',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 20,
    },
    textoOverlay: {
        fontWeight: 'bold',
        color: '#453E34',
    },
});
