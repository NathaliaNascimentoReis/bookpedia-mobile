import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    ImageBackground,
    useWindowDimensions,
    ActivityIndicator,
    Platform,
    Image,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { useEffect, useState } from 'react';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useIdioma } from '../IdiomaContext.js';
import { useNavigation } from '@react-navigation/native';

function TextoProjeto({ texto, idioma, style }) {
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

export default function PaginaInicial() {
    const navigation = useNavigation();

    const [isLoading, setLoading] = useState(true);
    const [livroDestaque, setLivroDestaque] = useState(null);
    const [outrosLivros, setOutrosLivros] = useState([]);
    const [projeto, setProjeto] = useState([]);
    const [data, setData] = useState([]);

    const { idioma } = useIdioma();

    const [expandido, setExpandido] = useState(false);

    const getLivroDestaque = async () => {
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

            let livro = null;

            if (Array.isArray(json) && json.length > 0) {
                livro = json[0];
            } else if (json.livros && Array.isArray(json.livros) && json.livros.length > 0) {
                livro = json.livros[0];
            } else if (json.livro) {
                livro = json.livro;
            } else if (!Array.isArray(json)) {
                livro = json;
            }

            setLivroDestaque(livro);
        } catch (error) {
            console.error('Erro ao buscar o livro destaque: ' + error.message);
            setLivroDestaque(null);
        }
    };

    const carregarTodosOsLivros = async () => {
        try {
            // requisição do livro O Guarani
            const API_KEY_GUARANI = 'bookpedia-backend-2026';
            const headersGuarani = {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY_GUARANI,
            };

            const oGuarani = await fetch('https://bookpedia-backend-4ab3.onrender.com/livros', {
                method: 'GET',
                headers: headersGuarani,
            });

            let livrosGuarani = [];

            if (oGuarani.ok) {
                const jsonDiferente = await oGuarani.json();

                const listaGuarani = Array.isArray(jsonDiferente) ? jsonDiferente : [];

                livrosGuarani = listaGuarani.map((item) => ({
                    id: item.id,
                    titulo: item.tituloDoLivro || 'Título Desconhecido',
                    tituloEn: item.tituloDoLivroEn || 'Unknown Title',
                    capa:
                        item.capaURL && item.capaURL.trim() !== ''
                            ? item.capaURL
                            : idioma === 'en'
                              ? 'https://i.pinimg.com/736x/94/d8/43/94d843e8a5152bbf5a025a1d12df8715.jpg'
                              : 'https://i.pinimg.com/736x/f3/1f/3d/f31f3dbb229686dee4ed693fbbdf3e7d.jpg',
                    autor:
                        item.autores && item.autores.length > 0
                            ? item.autores[0].nome
                            : 'Autor Desconhecido',
                }));
            }

            // Requisição do livro Vidas Secas
            const API_KEY_VIDAS_SECAS = 'amods';
            const headersVidasSecas = {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY_VIDAS_SECAS,
            };

            const vidasSecas = await fetch('https://bookverse-back-pob5.onrender.com/livros', {
                method: 'GET',
                headers: headersVidasSecas,
            });

            let livrosVidasSecas = [];

            if (vidasSecas.ok) {
                const jsonDiferente = await vidasSecas.json();

                let listaVidasSecas = [];

                if (Array.isArray(jsonDiferente)) {
                    listaVidasSecas = jsonDiferente;
                } else if (
                    jsonDiferente.livrosVidasSecas &&
                    Array.isArray(jsonDiferente.livrosVidasSecas)
                ) {
                    listaVidasSecas = jsonDiferente.livrosVidasSecas;
                } else if (jsonDiferente.livroVidasSecas) {
                    listaVidasSecas = [jsonDiferente.livroVidasSecas];
                } else {
                    listaVidasSecas = [jsonDiferente];
                }

                livrosVidasSecas = listaVidasSecas.map((item) => ({
                    id: item.id,
                    titulo:
                        idioma === 'en'
                            ? 'Barren Lives' || 'Untitled'
                            : item.titulo || 'Sem Título',
                    capa:
                        item.capa_url && item.capa_url.trim() !== ''
                            ? item.capa_url
                            : idioma === 'en'
                              ? 'https://i.pinimg.com/736x/94/d8/43/94d843e8a5152bbf5a025a1d12df8715.jpg'
                              : 'https://i.pinimg.com/736x/f3/1f/3d/f31f3dbb229686dee4ed693fbbdf3e7d.jpg',
                    autor: item.autor
                        ? typeof item.autor === 'string'
                            ? item.autor
                            : item.autor.nome
                        : item.autores && item.autores.length > 0
                          ? item.autores[0].nome
                          : 'Autor Desconhecido',
                }));
            }

            // Requisição do novo livro (Readflow)
            const API_KEY_READFLOW = 'projetoamods';
            const headersReadflow = {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY_READFLOW,
            };

            const readflowResp = await fetch('https://readflow-m8o6.onrender.com/api/livros', {
                method: 'GET',
                headers: headersReadflow,
            });

            let livrosReadflow = [];

            if (readflowResp.ok) {
                const jsonReadflow = await readflowResp.json();

                let listaReadflow = [];

                if (Array.isArray(jsonReadflow)) {
                    listaReadflow = jsonReadflow;
                } else if (jsonReadflow.livros && Array.isArray(jsonReadflow.livros)) {
                    listaReadflow = jsonReadflow.livros;
                } else if (jsonReadflow.livro) {
                    listaReadflow = [jsonReadflow.livro];
                } else {
                    listaReadflow = [jsonReadflow];
                }

                livrosReadflow = listaReadflow.map((item) => ({
                    id: item.id,
                    titulo:
                        idioma === 'en'
                            ? 'Captains of the Sands' || 'Untitled'
                            : item.titulo || 'Sem Título',
                    capa:
                        (item.capa_url && item.capa_url.trim() !== '') ||
                        (item.capaURL && item.capaURL.trim() !== '') ||
                        (item.capa && item.capa.trim() !== '')
                            ? item.capa_url || item.capaURL || item.capa
                            : idioma === 'en'
                              ? 'https://i.pinimg.com/736x/94/d8/43/94d843e8a5152bbf5a025a1d12df8715.jpg'
                              : 'https://i.pinimg.com/736x/f3/1f/3d/f31f3dbb229686dee4ed693fbbdf3e7d.jpg',
                    autor: item.autor
                        ? typeof item.autor === 'string'
                            ? item.autor
                            : item.autor.nome
                        : item.autores && item.autores.length > 0
                          ? item.autores[0].nome
                          : item.author || 'Autor Desconhecido',
                }));
            }

            // Requisição do livro Memórias Póstumas de Brás Cubas
            const API_KEY_MEMORIAS = 'Clubyx_dev';
            const headersMemorias = {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY_MEMORIAS,
            };

            const memoriasResp = await fetch('https://projeto-clubyx.onrender.com/livros', {
                method: 'GET',
                headers: headersMemorias,
            });

            let livrosMemorias = [];

            if (memoriasResp.ok) {
                const jsonMemorias = await memoriasResp.json();

                let listaMemorias = [];

                if (Array.isArray(jsonMemorias)) {
                    listaMemorias = jsonMemorias;
                } else if (jsonMemorias.livros && Array.isArray(jsonMemorias.livros)) {
                    listaMemorias = jsonMemorias.livros;
                } else if (jsonMemorias.livro) {
                    listaMemorias = [jsonMemorias.livro];
                } else {
                    listaMemorias = [jsonMemorias];
                }

                livrosMemorias = listaMemorias.map((item) => ({
                    id: item.id,
                    titulo:
                        idioma === 'en'
                            ? 'The Posthumous Memoirs of Brás Cubas' || 'Untitled'
                            : item.nome || 'Sem Título',
                    capa:
                        idioma === 'en'
                            ? item.foto ||
                              'https://i.pinimg.com/736x/94/d8/43/94d843e8a5152bbf5a025a1d12df8715.jpg'
                            : item.foto ||
                              'https://i.pinimg.com/736x/f3/1f/3d/f31f3dbb229686dee4ed693fbbdf3e7d.jpg',
                    autor:
                        idioma === 'en'
                            ? item.autor || 'Unknown Author'
                            : item.autor || 'Autor Desconhecido',
                }));
            }

            // Requisição do livro Quarto de Despejo
            const API_KEY_QUARTO = 'amods';
            const headersQuarto = {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY_QUARTO,
            };

            const quartoResp = await fetch(
                'https://backend-projeto-integrador-rana.onrender.com/api/livro',
                {
                    method: 'GET',
                    headers: headersQuarto,
                },
            );

            let livrosQuartos = [];

            if (quartoResp.ok) {
                const jsonQuartos = await quartoResp.json();

                let listaQuartos = [];

                if (Array.isArray(jsonQuartos)) {
                    listaQuartos = jsonQuartos;
                } else if (jsonQuartos.livros && Array.isArray(jsonQuartos.livros)) {
                    listaQuartos = jsonQuartos.livros;
                } else if (jsonQuartos.livro) {
                    listaQuartos = [jsonQuartos.livro];
                } else {
                    listaQuartos = [jsonQuartos];
                }

                livrosQuartos = listaQuartos.map((item) => ({
                    id: item.id,
                    titulo:
                        idioma === 'en'
                            ? item.tituloEN || 'Untitled'
                            : item.tituloPT || 'Sem Título',
                    capa:
                        idioma === 'en'
                            ? item.capaURl ||
                              'https://i.pinimg.com/736x/94/d8/43/94d843e8a5152bbf5a025a1d12df8715.jpg'
                            : item.capaURl ||
                              'https://i.pinimg.com/736x/f3/1f/3d/f31f3dbb229686dee4ed693fbbdf3e7d.jpg',
                    autor:
                        idioma === 'en'
                            ? item.autor || 'Unknown Author'
                            : item.autor || 'Autor Desconhecido',
                }));
            }

            const listaLivros = [
                ...(livrosVidasSecas || []),
                ...(livrosReadflow || []),
                ...(livrosGuarani || []),
                ...(livrosMemorias || []),
                ...(livrosQuartos || []),
            ];

            setOutrosLivros(listaLivros);
        } catch (error) {
            console.error('Erro ao buscar os livros: ' + error.message);
            setOutrosLivros([]);
        } finally {
            setLoading(false);
        }
    };

    const getProjeto = async () => {
        try {
            const API_KEY = 'bookpedia-backend-2026';

            const response = await fetch('https://bookpedia-backend-4ab3.onrender.com/projetos', {
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

            let projeto = null;

            if (Array.isArray(json) && json.length > 0) {
                projeto = json[0];
            } else if (json.projetos && Array.isArray(json.projetos) && json.projetos.length > 0) {
                projeto = json.projetos[0];
            } else if (json.projeto) {
                projeto = json.projeto;
            } else if (!Array.isArray(json)) {
                projeto = json;
            }

            setProjeto(projeto);
        } catch (error) {
            console.error('Erro ao buscar projeto: ' + error.message);
            setProjeto(null);
        }
    };

    const getEquipe = async () => {
        try {
            const API_KEY = 'bookpedia-backend-2026';

            const response = await fetch('https://bookpedia-backend-4ab3.onrender.com/membros', {
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
            } else if (json.membros && Array.isArray(json.membros)) {
                setData(json.membros);
            } else if (json.membro) {
                setData([json.membro]);
            } else {
                setData([json]);
            }
        } catch (error) {
            console.error('Erro ao buscar membros: ' + error.message);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        Promise.all([
            getLivroDestaque(),
            carregarTodosOsLivros(),
            getProjeto(),
            getEquipe(),
        ]).finally(() => setLoading(false));
    }, [idioma]);

    return (
        <ScrollView style={styles.background} contentContainerStyle={styles.container}>
            <View style={styles.tituloSection}>
                <View style={styles.tituloDiv}>
                    <FontAwesome5 name="home" size={24} color="black" />
                    <Text style={styles.titulo}>{idioma === 'en' ? 'Home' : 'Início'}</Text>
                </View>
                <View style={styles.linha}></View>
            </View>

            <View style={[styles.intro, { backgroundColor: '#C2E799', marginBottom: 10 }]}>
                <Text style={[styles.introTexto, { color: '#2B431E', fontSize: 16 }]}>
                    {idioma === 'en' ? 'Discover the featured book!' : 'Conheça o livro destaque!'}
                </Text>
            </View>

            <View style={styles.main}>
                {isLoading && !livroDestaque ? (
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color="#453E34" />
                    </View>
                ) : (
                    livroDestaque && (
                        <View style={styles.livroDestaque}>
                            <ImageBackground
                                source={{ uri: livroDestaque.capaURL }}
                                style={styles.imageBackground}
                                resizeMode="cover">
                                <View style={styles.overlay}>
                                    <Text style={[styles.textoOverlay, { fontSize: 16 }]}>
                                        {idioma === 'en'
                                            ? livroDestaque.tituloDoLivroEn ||
                                              livroDestaque.tituloDoLivro
                                            : livroDestaque.tituloDoLivro}
                                    </Text>
                                    <Text style={styles.textoOverlay}>
                                        {idioma === 'en'
                                            ? livroDestaque.descricaoEn || livroDestaque.descricao
                                            : livroDestaque.descricao}
                                    </Text>
                                </View>
                            </ImageBackground>
                        </View>
                    )
                )}

                <View
                    style={[
                        styles.tituloSection,
                        {
                            marginTop: 20,
                            justifyContent: 'flex-start',
                            alignSelf: 'flex-start',
                        },
                    ]}>
                    <View style={styles.tituloDiv}>
                        <FontAwesome name="book" size={24} color="#1E1E1E" />
                        <Text style={styles.titulo}>
                            {idioma === 'en' ? 'Library' : 'Biblioteca'}
                        </Text>
                    </View>
                </View>

                {isLoading ? (
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color="#453E34" />
                    </View>
                ) : (
                    <FlatList
                        data={outrosLivros}
                        renderItem={({ item: livro, index }) => (
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('Biblioteca');
                                }}
                                activeOpacity={0.7}>
                                <View style={styles.livroCard}>
                                    <Image
                                        source={{ uri: livro.capa }}
                                        style={styles.capaImage}
                                        resizeMode="cover"
                                    />
                                    <View style={styles.infoCard}>
                                        <Text style={styles.tituloLivro} numberOfLines={2}>
                                            {idioma === 'en'
                                                ? livro.tituloEn || livro.titulo
                                                : livro.titulo}
                                        </Text>
                                        <Text style={styles.autorLivro} numberOfLines={1}>
                                            {livro.autor}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => `${item.origem}-${item.id}-${index}`}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        scrollEventThrottle={16}
                        contentContainerStyle={styles.flatListContent}
                        snapToInterval={162}
                        decelerationRate="fast"
                    />
                )}

                <View
                    style={[
                        styles.tituloSection,
                        {
                            marginTop: 20,
                            justifyContent: 'flex-start',
                            alignSelf: 'flex-start',
                        },
                    ]}>
                    <View style={styles.tituloDiv}>
                        <FontAwesome6 name="circle-info" size={22} color="#1E1E1E" />
                        <Text style={styles.titulo}>
                            {idioma === 'en'
                                ? 'About the project and team'
                                : 'Sobre o Projeto e Equipe'}
                        </Text>
                    </View>
                </View>

                <View style={styles.projetosColuna}>
                    {isLoading ? (
                        <View style={styles.loaderContainer}>
                            <ActivityIndicator size="large" color="#453E34" />
                        </View>
                    ) : (
                        <>
                            {projeto && (
                                <View style={styles.dadosContainer}>
                                    <View style={styles.card}>
                                        <View
                                            style={[
                                                styles.cardHeader,
                                                { backgroundColor: '#C2A88D' },
                                            ]}>
                                            <Text style={styles.cardHeaderTextoBranco}>
                                                {idioma === 'en' ? 'Introduction' : 'Introdução'}
                                            </Text>
                                        </View>
                                        <View
                                            style={[
                                                styles.cardBody,
                                                { backgroundColor: '#E1D3C1' },
                                            ]}>
                                            <TextoProjeto
                                                idioma={idioma}
                                                style={styles.textoBege}
                                                texto={
                                                    idioma === 'en'
                                                        ? projeto.introducaoEn || projeto.introducao
                                                        : projeto.introducao
                                                }
                                            />
                                        </View>
                                    </View>

                                    <View style={styles.card}>
                                        <View
                                            style={[
                                                styles.cardHeader,
                                                { backgroundColor: '#7A8C66' },
                                            ]}>
                                            <Text style={styles.cardHeaderTextoBranco}>
                                                {idioma === 'en'
                                                    ? 'Project Objective'
                                                    : 'Objetivo do Projeto'}
                                            </Text>
                                        </View>
                                        <View
                                            style={[
                                                styles.cardBody,
                                                { backgroundColor: '#D1E6BA' },
                                            ]}>
                                            <TextoProjeto
                                                idioma={idioma}
                                                style={styles.textoVerde}
                                                texto={
                                                    idioma === 'en'
                                                        ? projeto.objetivoProjetoEn ||
                                                          projeto.objetivoProjeto
                                                        : projeto.objetivoProjeto
                                                }
                                            />
                                        </View>
                                    </View>

                                    <View style={styles.card}>
                                        <View
                                            style={[
                                                styles.cardHeader,
                                                { backgroundColor: 'rgba(158, 133, 105, 0.85)' },
                                            ]}>
                                            <Text style={styles.cardHeaderTextoBranco}>
                                                {idioma === 'en'
                                                    ? 'About The Team'
                                                    : 'Sobre A Equipe'}
                                            </Text>
                                        </View>
                                        <View
                                            style={[
                                                styles.cardBody,
                                                { backgroundColor: '#E1D3C1' },
                                            ]}>
                                            <TextoProjeto
                                                idioma={idioma}
                                                style={styles.textoBege}
                                                texto={
                                                    idioma === 'en'
                                                        ? projeto.sobreAEquipeEn ||
                                                          projeto.sobreAEquipe
                                                        : projeto.sobreAEquipe
                                                }
                                            />
                                        </View>
                                    </View>
                                </View>
                            )}
                        </>
                    )}
                </View>

                <View
                    style={[
                        styles.tituloSection,
                        {
                            marginTop: 20,
                            justifyContent: 'flex-start',
                            alignSelf: 'flex-start',
                        },
                    ]}>
                    <View style={styles.tituloDiv}>
                        <FontAwesome name="users" size={24} color="#1E1E1E" />
                        <Text style={styles.titulo}>{idioma === 'en' ? 'Team' : 'Equipe'}</Text>
                    </View>
                </View>

                {/* Fotos dos Membros */}
                <View style={styles.membros}>
                    {data.map((membro, index) => (
                        <View key={membro.id || index.toString()} style={styles.membroFotoCard}>
                            <Image
                                source={{ uri: membro.fotoURL || membro.foto }}
                                style={styles.membroFoto}
                                resizeMode="cover"
                            />
                        </View>
                    ))}
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
        marginBottom: 10,
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
        marginBottom: 10,
    },
    main: {
        flex: 1,
        width: '100%',
        marginTop: 20,
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
    },
    introTexto: {
        color: '#3A4A28',
        fontSize: 16.5,
        fontWeight: '700',
        textAlign: 'center',
    },
    livroDestaque: {
        width: '100%',
        height: 320,
        borderRadius: 15,
        overflow: 'hidden',
        marginTop: 5,
        marginBottom: 30,
        alignSelf: 'center',
    },
    imageBackground: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 20,
    },
    textoOverlay: {
        fontWeight: 'bold',
        color: '#ffffff',
    },
    secaoOutrosLivros: {
        width: '100%',
        marginBottom: 15,
        paddingHorizontal: 20,
    },
    tituloOutrosLivros: {
        fontWeight: 'bold',
        fontSize: 17,
        fontWeight: '500',
        color: '#453E34',
    },
    flatListContent: {
        paddingHorizontal: 15,
        paddingRight: 20,
    },
    livrosContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        width: '100%',
        paddingHorizontal: 5,
    },
    livroCard: {
        width: 150,
        height: 250,
        backgroundColor: '#D4EBBA',
        borderRadius: 12,
        overflow: 'hidden',
        marginRight: 10,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#C0DE9E',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    capaImage: {
        width: '100%',
        height: 150,
    },
    infoCard: {
        flex: 1,
        padding: 8,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    tituloLivro: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#2B431E',
        marginBottom: 3,
        width: '100%',
    },
    autorLivro: {
        fontSize: 14,
        fontWeight: '500',
        color: '#555555',
        marginTop: 'auto',
        width: '100%',
    },
    membros: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        width: '100%',
        marginTop: 20,
        justifyContent: 'space-around',
    },
    projetosColuna: {
        flex: 1,
        flexDirection: 'column',
        gap: 15,
    },
    membroFotoCard: {
        width: 90,
        height: 80,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 4,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    membroFoto: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
    },
    projetoTextoCard: {
        backgroundColor: '#E1D3C1',
        borderRadius: 12,
        padding: 12,
        justifyContent: 'center',
        marginBottom: 15,
        marginTop: 15,
    },
    projetoTexto: {
        fontSize: 16,
        fontWeight: '500',
        color: '#453E34',
        lineHeight: 22,
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
    dadosContainer: {
        gap: 10,
        marginBottom: 20,
    },
    card: {
        marginTop: 10,
        borderRadius: 12,
        width: '100%',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
    },
    cardHeader: {
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 15,
        flexDirection: 'row',
        gap: 10,
    },
    cardHeaderTextoBranco: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cardBody: {
        padding: 15,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },
    textoVerde: {
        fontSize: 16,
        color: '#3A4A28',
        fontWeight: '500',
        lineHeight: 20,
    },
    textoBege: {
        fontSize: 16,
        color: '#453E34',
        fontWeight: '500',
        lineHeight: 20,
    },
});
