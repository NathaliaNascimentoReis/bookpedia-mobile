import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    ActivityIndicator,
} from 'react-native';
import { useIdioma } from '../IdiomaContext.js';
import { useState, useEffect } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

function TextoLongo({ texto, idioma, style }) {
    const [expandido, setExpandido] = useState(false);

    const limiteLinhas = expandido ? undefined : 8;

    return (
        <View>
            <Text numberOfLines={limiteLinhas} style={style}>
                {texto}
            </Text>
            <TouchableOpacity onPress={() => setExpandido(!expandido)} style={styles.botaoLerMais}>
                <Text style={styles.textoBotaoLerMais}>
                    {expandido
                        ? idioma === 'en'
                            ? 'Show less'
                            : 'Ler menos...'
                        : idioma === 'en'
                          ? 'Read more...'
                          : 'Ler mais...'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default function LivroDestaque() {
    const route = useRoute();
    const navigation = useNavigation();

    const { livroOGuarani: livroDaRota } = route.params || {};

    const [isLoading, setLoading] = useState(true);
    const [livro, setLivro] = useState(null);
    const [data, setData] = useState(null);
    const [movimento, setMovimento] = useState(null);
    const [tema, setTema] = useState(null);

    const { idioma } = useIdioma();

    const [temaAberto, setAberto] = useState(null);

    const getLivro = async () => {
        try {
            const API_KEY = 'bookpedia-backend-2026';

            const response = await fetch('https://bookpedia-backend-4ab3.onrender.com/livros', {
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
            let listaDeLivros = [];

            if (Array.isArray(json)) {
                listaDeLivros = json;
            } else if (json.livros && Array.isArray(json.livros)) {
                listaDeLivros = json.livros;
            } else if (json.livro) {
                listaDeLivros = [json.livro];
            } else {
                listaDeLivros = [json];
            }

            const livrosMapeados = listaDeLivros.map((item) => ({
                id: item.id,
                titulo: item.tituloDoLivro || item.titulo || 'Título Desconhecido',
                tituloEn: item.tituloDoLivroEn || item.titulo_en || 'Unknown Title',
                capa:
                    item.capaURL ||
                    (idioma === 'en'
                        ? 'https://i.pinimg.com/736x/94/d8/43/94d843e8a5152bbf5a025a1d12df8715.jpg'
                        : 'https://i.pinimg.com/736x/f3/1f/3d/f31f3dbb229686dee4ed693fbbdf3e7d.jpg'),
                ano: item.anoDeLancamento || 'Ano de lançamento desconhecido',
                autor:
                    item.autores && item.autores.length > 0
                        ? item.autores[0].nome
                        : typeof item.autor === 'string'
                          ? item.autor
                          : 'Autor Desconhecido',
                descricao: item.descricao || 'Descrição Indisponível',
                descricaoEn: item.descricaoEn || 'Unavailable Description',
                resumo: item.resumo || 'Resumo da obra indisponível',
                resumoEn: item.resumoEn || 'Unavailable Summary',
                analise: item.analise || 'Análise Desconhecida',
                analiseEn: item.analiseEn || 'Unavailable Analysis',
                contextoHistorico: item.contextoHistorico || 'Contexto Histórico Desconhecido',
                contextoHistoricoEn: item.contextoHistoricoEn || 'Unknown Historical Context',
            }));
            const oGuarani = livrosMapeados.find(
                (l) => l.titulo.toLowerCase().includes('guarani') || l.id === '1',
            );

            if (oGuarani) {
                setLivro(oGuarani);
            } else {
                setLivro(livrosMapeados[0]);
            }
        } catch (error) {
            console.error('Erro ao buscar o livro: ' + error);
        } finally {
            setLoading(false);
        }
    };

    const getCenarios = async () => {
        try {
            const API_KEY = 'bookpedia-backend-2026';

            const response = await fetch('https://bookpedia-backend-4ab3.onrender.com/cenarios', {
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
            } else if (json.cenarios && Array.isArray(json.cenarios)) {
                setData(json.cenarios);
            } else if (json.cenario) {
                setData([json.cenario]);
            } else {
                setData([json]);
            }
        } catch (error) {
            console.error('Erro ao buscar cenários: ' + error);
        } finally {
            setLoading(false);
        }
    };

    const getMovimento = async () => {
        try {
            const API_KEY = 'bookpedia-backend-2026';

            const response = await fetch(
                'https://bookpedia-backend-4ab3.onrender.com/movimentos-literarios',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': API_KEY,
                    },
                },
            );

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }

            const json = await response.json();

            if (Array.isArray(json)) {
                setMovimento(json[0]);
            } else if (json.movimentos && Array.isArray(json.movimentos)) {
                setMovimento(json.movimentos[0]);
            } else if (json.movimento) {
                setMovimento(json.movimento);
            } else {
                setMovimento(json);
            }
        } catch (error) {
            console.error('Erro ao buscar movimentos literários: ' + error);
        }
    };

    const getTema = async () => {
        try {
            const API_KEY = 'bookpedia-backend-2026';

            const response = await fetch(
                'https://bookpedia-backend-4ab3.onrender.com/temas-de-vestibular',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': API_KEY,
                    },
                },
            );

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }

            const json = await response.json();

            if (Array.isArray(json)) {
                setTema(json);
            } else if (json.temas && Array.isArray(json.temas)) {
                setTema(json.temas);
            } else if (json.tema) {
                setTema([json.tema]);
            } else {
                setTema([json]);
            }
        } catch (error) {
            console.error('Erro ao buscar temas de vestibular: ' + error);
        }
    };

    useEffect(() => {
        if (livroDaRota) {
            setLivro(livroDaRota);
            setLoading(false);
            getCenarios();
            getMovimento();
            getTema();
        } else {
            getLivro();
            getCenarios();
            getMovimento();
            getTema();
        }
    }, [livroDaRota]);

    const alternarCard = (id) => {
        if (temaAberto === id) {
            setAberto(null);
        } else {
            setAberto(id);
        }
    };

    if (isLoading || !livro) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#E7F0DB',
                }}>
                <ActivityIndicator size="large" color="#453E34" />
            </View>
        );
    }

    return (
        <ScrollView style={styles.background} contentContainerStyle={styles.container}>
            <View style={styles.tituloSection}>
                <View style={styles.tituloDiv}>
                    <FontAwesome name="book" size={24} color="black" />
                    <Text style={styles.titulo}>
                        {idioma === 'en' ? 'Featured Book' : 'Livro Destaque'}
                    </Text>
                </View>
                <View style={styles.linha}></View>
            </View>

            <View style={styles.main}>
                <View style={styles.introLivro}>
                    <Image source={{ uri: livro.capa }} style={styles.capa} />
                    <View style={styles.introInfos}>
                        <Text style={styles.livroTitulo}>
                            {idioma === 'en' ? livro.tituloEn : livro.titulo}
                        </Text>
                        <Text style={styles.livroAutor}>{livro.autor}</Text>

                        <Text style={styles.infoTexto}>
                            <Text style={styles.boldText}>
                                {idioma === 'en' ? 'Year: ' : 'Ano: '}
                            </Text>
                            {livro.ano}
                        </Text>
                    </View>
                </View>

                <View style={styles.livroSection}>
                    <View style={[styles.tituloSectionDiv, { backgroundColor: '#9e8569' }]}>
                        <Text style={[styles.sectionTitulo, { color: '#ffffff' }]}>
                            {idioma === 'en' ? 'Description' : 'Descrição'}
                        </Text>
                    </View>
                    <View style={[styles.sectionInfo, { backgroundColor: '#E1D3C1' }]}>
                        <Text style={[styles.sectionTexto, { color: '#453E34' }]}>
                            {idioma === 'en' ? livro.descricaoEn : livro.descricao}
                        </Text>
                    </View>
                </View>

                <View style={styles.enredo}>
                    <ImageBackground
                        source={{
                            uri: 'https://s5.static.brasilescola.uol.com.br/be/2023/07/indigena-guarani.jpg',
                        }}
                        style={styles.imageBackground}
                        resizeMode="cover">
                        <View style={styles.overlay}>
                            <TextoLongo
                                idioma={idioma}
                                style={styles.textoOverlay}
                                texto={idioma === 'en' ? livro.resumoEn : livro.resumo}
                            />
                        </View>
                    </ImageBackground>
                </View>

                <View style={styles.livroSection}>
                    <View style={[styles.tituloSectionDiv, { backgroundColor: '#839c73' }]}>
                        <Text style={[styles.sectionTitulo, { color: '#ffffff' }]}>
                            {idioma === 'en' ? 'Analysis' : 'Análise'}
                        </Text>
                    </View>
                    <View style={[styles.sectionInfo, { backgroundColor: '#C0DE9E' }]}>
                        <TextoLongo
                            idioma={idioma}
                            style={[styles.sectionTexto, { color: '#453E34' }]}
                            texto={idioma === 'en' ? livro.analiseEn : livro.analise}
                        />
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
                        <TextoLongo
                            idioma={idioma}
                            style={[styles.sectionTexto, { color: '#453E34' }]}
                            texto={
                                idioma === 'en'
                                    ? livro.contextoHistoricoEn
                                    : livro.contextoHistorico
                            }
                        />
                    </View>
                </View>

                <View
                    style={[
                        styles.intro,
                        { backgroundColor: '#C2E799', marginTop: 30, marginBottom: 20 },
                    ]}>
                    <Text style={[styles.introTexto, { color: '#2B431E', fontSize: 16 }]}>
                        {idioma === 'en'
                            ? "Discover the featured book's literary movement and its characteristics!"
                            : 'Conheça o movimento literário do livro em destaque e suas características!'}
                    </Text>
                </View>

                {movimento && (
                    <View>
                        <View style={styles.livroSection}>
                            <View
                                style={[
                                    styles.tituloSectionDiv,
                                    {
                                        backgroundColor: '#9e8569',
                                        flexDirection: 'row',
                                        gap: 10,
                                        justifyContent: 'space-between',
                                    },
                                ]}>
                                <Text style={[styles.sectionTitulo, { color: '#ffffff' }]}>
                                    {idioma === 'en' ? movimento.nomeEn : movimento.nome}
                                </Text>
                                <Text style={[styles.sectionTitulo, { color: '#ffffff' }]}>
                                    {movimento.periodo}
                                </Text>
                            </View>
                            <View style={[styles.sectionInfo, { backgroundColor: '#E1D3C1' }]}>
                                <TextoLongo
                                    idioma={idioma}
                                    style={[styles.sectionTexto, { color: '#453E34' }]}
                                    texto={
                                        idioma === 'en'
                                            ? movimento.contextoHistoricoEn
                                            : movimento.contextoHistorico
                                    }
                                />
                            </View>
                        </View>

                        <View style={styles.livroSection}>
                            <View style={[styles.tituloSectionDiv, { backgroundColor: '#9e8569' }]}>
                                <Text style={[styles.sectionTitulo, { color: '#ffffff' }]}>
                                    {idioma === 'en'
                                        ? 'Characteristics of ' + movimento.nomeEn
                                        : 'Características do ' + movimento.nome}
                                </Text>
                            </View>
                            <View style={[styles.sectionInfo, { backgroundColor: '#E1D3C1' }]}>
                                <TextoLongo
                                    idioma={idioma}
                                    style={[styles.sectionTexto, { color: '#453E34' }]}
                                    texto={
                                        idioma === 'en'
                                            ? movimento.caracteristicasEn
                                            : movimento.caracteristicas
                                    }
                                />
                            </View>
                        </View>

                        <View style={styles.livroSection}>
                            <View style={[styles.tituloSectionDiv, { backgroundColor: '#9e8569' }]}>
                                <Text style={[styles.sectionTitulo, { color: '#ffffff' }]}>
                                    {idioma === 'en' ? movimento.faseEn : movimento.fase}
                                </Text>
                            </View>
                            <View style={[styles.sectionInfo, { backgroundColor: '#E1D3C1' }]}>
                                <TextoLongo
                                    idioma={idioma}
                                    style={[styles.sectionTexto, { color: '#453E34' }]}
                                    texto={
                                        idioma === 'en'
                                            ? movimento.faseTextoEn
                                            : movimento.faseTexto
                                    }
                                />
                            </View>
                        </View>
                    </View>
                )}

                <View style={[styles.intro, { backgroundColor: '#C2E799', marginBottom: 10 }]}>
                    <Text style={[styles.introTexto, { color: '#2B431E', fontSize: 16 }]}>
                        {idioma === 'en'
                            ? "Discover the story's settings!"
                            : 'Conheça os cenários da história!'}
                    </Text>
                </View>

                {isLoading ? (
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color="#453E34" />
                    </View>
                ) : (
                    data?.map((cenario) => (
                        <View key={cenario.id} style={styles.dadosContainer}>
                            {/* Foto do Cenário */}
                            <View style={[styles.card, { marginTop: 20 }]}>
                                <View style={[styles.cardHeader, { backgroundColor: '#839c73' }]}>
                                    <Text style={styles.cardHeaderTextoBranco}>
                                        {idioma === 'en' ? cenario.nomeEn : cenario.nome}
                                    </Text>
                                </View>
                                <View
                                    style={[
                                        styles.cardBody,
                                        { backgroundColor: '#D1E6BA', alignItems: 'center' },
                                    ]}>
                                    <Image
                                        source={{ uri: cenario.fotoURL }}
                                        style={styles.imagemAutor}
                                        resizeMode="cover"
                                    />
                                </View>
                            </View>

                            {/* Contexto Histórico */}
                            <View style={styles.card}>
                                <View style={[styles.cardHeader, { backgroundColor: '#7A8C66' }]}>
                                    <Text style={styles.cardHeaderTextoBranco}>
                                        {idioma === 'en'
                                            ? 'Scenario Characteristics'
                                            : 'Características do Cenário'}
                                    </Text>
                                </View>
                                <View style={[styles.cardBody, { backgroundColor: '#D1E6BA' }]}>
                                    <TextoLongo
                                        idioma={idioma}
                                        style={styles.textoVerde}
                                        texto={
                                            idioma === 'en'
                                                ? cenario.caracteristicasEn ||
                                                  cenario.caracteristicas
                                                : cenario.caracteristicas
                                        }
                                    />
                                </View>
                            </View>

                            {/* Descrição do Cenário */}
                            <View style={styles.card}>
                                <View style={[styles.cardHeader, { backgroundColor: '#C2A88D' }]}>
                                    <Text style={styles.cardHeaderTextoBranco}>
                                        {idioma === 'en'
                                            ? 'Scenario Description'
                                            : 'Descrição do cenário'}
                                    </Text>
                                </View>
                                <View style={[styles.cardBody, { backgroundColor: '#E1D3C1' }]}>
                                    <TextoLongo
                                        idioma={idioma}
                                        style={styles.cardHeaderTextoEscuro}
                                        texto={
                                            idioma === 'en'
                                                ? cenario.descricaoEn || cenario.descricao
                                                : cenario.descricao
                                        }
                                    />
                                </View>
                            </View>
                        </View>
                    ))
                )}

                <View style={[styles.intro, { backgroundColor: '#C2E799' }]}>
                    <Text style={[styles.introTexto, { color: '#2B431E', fontSize: 16 }]}>
                        {idioma === 'en'
                            ? 'Discover university entrance exam themes connected to the book!'
                            : 'Conheça Temas de Vestibulares que conversam com o livro!'}
                    </Text>
                </View>

                {isLoading ? (
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color="#453E34" />
                    </View>
                ) : (
                    tema?.map((tema, index) => {
                        const idTema = tema.id || index;
                        const estaAberto = temaAberto === idTema;

                        return (
                            <View key={idTema} style={styles.cardTema}>
                                <TouchableOpacity
                                    style={[styles.botaoTema, estaAberto && styles.botaoTemaAberto]}
                                    onPress={() => alternarCard(idTema)}
                                    activeOpacity={0.8}>
                                    <Text style={styles.temaTexto}>
                                        {idioma === 'en' ? tema.temaEn || tema.tema : tema.tema}
                                    </Text>
                                    {estaAberto ? (
                                        <FontAwesome5 name="chevron-up" size={18} color="white" />
                                    ) : (
                                        <FontAwesome5 name="chevron-down" size={18} color="white" />
                                    )}
                                </TouchableOpacity>

                                {estaAberto && (
                                    <View style={styles.temaContainer}>
                                        <Text style={styles.texto}>
                                            {idioma === 'en'
                                                ? tema.temaDescricaoEn || tema.temaDescricao
                                                : tema.temaDescricao}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        );
                    })
                )}
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
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    intro: {
        backgroundColor: '#C0DE9E',
        width: '100%',
        paddingVertical: 14,
        paddingHorizontal: 15,
        borderRadius: 12,
        marginBottom: 20,
        alignItems: 'center',
        shadowColor: 'rgb(0, 0, 0)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginTop: 30,
        marginBottom: 20,
    },
    introTexto: {
        color: '#3A4A28',
        fontSize: 16.5,
        fontWeight: '700',
        textAlign: 'center',
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
        borderRadius: 12,
        overflow: 'hidden',
        resizeMode: 'cover',
        marginBottom: 20,
        borderWeight: 5,
    },
    imageBackground: {
        width: '100%',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(225, 211, 193, 0.8)',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 20,
        justifyContent: 'center',
    },
    textoOverlay: {
        fontWeight: 'bold',
        color: '#453E34',
    },
    dadosContainer: {
        width: '100%',
        gap: 20,
    },
    card: {
        width: '100%',
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 4,
        backgroundColor: '#FFF',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 18,
    },
    cardHeaderTextoEscuro: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#453E34',
        lineHeight: 24,
    },
    cardHeaderTextoBranco: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#FFFFFF',
        letterSpacing: 0.3,
    },
    cardBody: {
        padding: 18,
    },
    imagemAutor: {
        width: '100%',
        height: 280,
        borderRadius: 12,
        borderWidth: 5,
        borderColor: '#FFFFFF',
    },
    textoVerde: {
        fontSize: 16,
        color: '#3A4A28',
        fontWeight: '500',
        lineHeight: 20,
    },
    cardTema: {
        width: '100%',
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 16,
        marginTop: 10,
        backgroundColor: '#FFF',
        // Sombras
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 4,
    },
    botaoTema: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#C2A88D',
        paddingVertical: 16,
        paddingHorizontal: 18,
    },
    botaoTemaAberto: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    temaTexto: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16.5,
        letterSpacing: 0.3,
    },
    temaContainer: {
        backgroundColor: '#E1D3C1',
        padding: 18,
    },
    texto: {
        color: '#453E34',
        fontSize: 15.5,
        lineHeight: 24,
        fontWeight: '500',
    },
    botaoLerMais: {
        alignSelf: 'flex-start',
        marginTop: 5,
        paddingVertical: 5,
    },
    textoBotaoLerMais: {
        color: '#453E34',
        fontWeight: 'bold',
        fontSize: 15,
    },
});
