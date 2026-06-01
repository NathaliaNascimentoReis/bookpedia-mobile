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
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useIdioma } from '../IdiomaContext.js';
import { useNavigation } from '@react-navigation/native';

export default function PaginaInicial() {
    const { width } = useWindowDimensions();
    const navigation = useNavigation();

    const [isLoading, setLoading] = useState(true);
    const [livroDestaque, setLivroDestaque] = useState(null);
    const [outrosLivros, setOutrosLivros] = useState([]);

    const { idioma } = useIdioma();

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
                    tituloEn: item.tituloDoLivroEn,
                    capa:
                        item.capaURL && item.capaURL.trim() !== ''
                            ? item.capaURL
                            : idioma === 'en'
                              ? 'https://i.pinimg.com/736x/94/d8/43/94d843e8a5152bbf5a025a1d12df8715.jpg'
                              : 'https://i.pinimg.com/736x/f3/1f/3d/f31f3dbb229686dee4ed693fbbdf3e7d.jpg',
                    ano: item.anoDeLancamento,
                    autor:
                        item.autores && item.autores.length > 0
                            ? item.autores[0].nome
                            : 'Autor Desconhecido',
                    descricao: item.descricao || 'Descrição Indisponível',
                    descricaoEn: item.descricaoEn || 'Unavailable Description',
                    resumo: item.resumo || 'Resumo da obra indisponível',
                    resumoEn: item.resumoEn || 'Unavailable Summary',
                    analise: item.analise || 'Análise Desconhecida',
                    analiseEn: item.analiseEn || 'Unavailable Analysis',
                    contextoHistorico: item.contextoHistorico || 'Contexto Histórico Desconhecido',
                    contextoHistoricoEn: item.contextoHistoricoEn || 'Unknown Historical Context',
                    rating: Math.floor(Math.random() * 5) + 1,
                    origem: 'oGuarani',
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
                    titulo: item.titulo,
                    capa:
                        item.capa_url && item.capa_url.trim() !== ''
                            ? item.capa_url
                            : idioma === 'en'
                              ? 'https://i.pinimg.com/736x/94/d8/43/94d843e8a5152bbf5a025a1d12df8715.jpg'
                              : 'https://i.pinimg.com/736x/f3/1f/3d/f31f3dbb229686dee4ed693fbbdf3e7d.jpg',
                    ano: item.ano,
                    genero: item.genero_pt || 'Gênero Desconhecido',
                    generoEn: item.genero_en || 'Unknown Genre',
                    descricao: item.descricao_pt || 'Descrição Desconhecida',
                    descricaoEn: item.descricao_en || 'Unknown Description',
                    enredo: item.enredo_pt || 'Enredo Desconhecido',
                    enredoEn: item.enredo_en || 'Unknown Story',
                    movimento: item.movimento_pt || 'Movimento Desconhecido',
                    movimentoEn: item.movimento_en || 'Unknown Movement',
                    contextoHistorico:
                        item.contexto_historico_pt || 'Contexto Histórico Desconhecido',
                    contextoHistoricoEn: item.contexto_historico_en || 'Unknown Historical Context',
                    autor: item.autor
                        ? typeof item.autor === 'string'
                            ? item.autor
                            : item.autor.nome
                        : item.autores && item.autores.length > 0
                          ? item.autores[0].nome
                          : 'Autor Desconhecido',
                    rating: Math.floor(Math.random() * 5) + 1,
                    origem: 'vidasSecas',
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
                            ? item.titulo || 'Untitled'
                            : 'Captains of the Sands' || 'Sem Título',
                    capa:
                        (item.capa_url && item.capa_url.trim() !== '') ||
                        (item.capaURL && item.capaURL.trim() !== '') ||
                        (item.capa && item.capa.trim() !== '')
                            ? item.capa_url || item.capaURL || item.capa
                            : idioma === 'en'
                              ? 'https://i.pinimg.com/736x/94/d8/43/94d843e8a5152bbf5a025a1d12df8715.jpg'
                              : 'https://i.pinimg.com/736x/f3/1f/3d/f31f3dbb229686dee4ed693fbbdf3e7d.jpg',
                    ano:
                        idioma === 'en'
                            ? item.anoPublicacao || 'Unknown Year'
                            : item.anoPublicacao || 'Ano Desconhecido',
                    genero:
                        idioma === 'en'
                            ? item.genero_en || item.genero || 'Unknown Genre'
                            : item.genero_pt || item.genero || 'Gênero Desconhecido',
                    descricao:
                        idioma === 'en'
                            ? item.descricao_en || item.descricao || 'Unknown Description'
                            : item.descricao_pt || item.descricao || 'Descrição Desconhecida',
                    enredo:
                        idioma === 'en'
                            ? item.enredo_en || item.enredo || 'Unknown Story'
                            : item.enredo_pt || item.enredo || 'Enredo Desconhecido',
                    movimento:
                        idioma === 'en'
                            ? item.movimento_en || item.movimento || 'Unknown Movement'
                            : item.movimento_pt || item.movimento || 'Movimento Desconhecido',
                    contextoHistorico:
                        idioma === 'en'
                            ? item.contexto_historico_en ||
                              item.contexto_historico ||
                              'Unknown Historical Context'
                            : item.contexto_historico_pt ||
                              item.contexto_historico ||
                              'Contexto Histórico Desconhecido',
                    autor: item.autor
                        ? typeof item.autor === 'string'
                            ? item.autor
                            : item.autor.nome
                        : item.autores && item.autores.length > 0
                          ? item.autores[0].nome
                          : item.author || 'Autor Desconhecido',
                    rating: Math.floor(Math.random() * 5) + 1,
                    origem: 'capitaes de areia',
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
                    ano: item.publicacao || 'Unknown Year',
                    resumo: item.resumo,
                    contextoHistorico: item.contextoHist,
                    rating: Math.floor(Math.random() * 5) + 1,
                    origem: 'Memórias Póstumas de Brás Cubas',
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
                    autor: item.autor || 'Unknown Author',
                    ano: item.anoPublicacao || 'Unknown Year',
                    genero: item.generoPT || 'Gênero Desconhecido',
                    generoEn: item.generoEN || 'Unknown Genre',
                    descricao: item.descricaoPT || 'Descrição Desconhecida',
                    descricaoEn: item.descricaoEN || 'Unknown Description',
                    rating: Math.floor(Math.random() * 5) + 1,
                    origem: 'Quarto de Despejo',
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

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <FontAwesome
                    key={i}
                    name={i <= rating ? 'star' : 'star-o'}
                    size={14}
                    color="#FFD700"
                    style={{ marginRight: 3 }}
                />,
            );
        }
        return stars;
    };

    useEffect(() => {
        getLivroDestaque();
        carregarTodosOsLivros();
    }, [idioma]);

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
                    <Text style={styles.titulo}>{idioma === 'en' ? 'Home' : 'Início'}</Text>
                </View>
                <View style={styles.linha}></View>
            </View>

            <View style={styles.intro}>
                <Text style={styles.introTexto}>
                    {idioma === 'en' ? 'Discover the featured book!' : 'Conheça o livro destaque!'}
                </Text>
            </View>

            {isLoading && !livroDestaque ? (
                <ActivityIndicator size="large" color="#caad92" />
            ) : (
                livroDestaque && (
                    <View style={styles.livroDestaque}>
                        <ImageBackground
                            source={{ uri: livroDestaque.capaURL }}
                            style={styles.imageBackground}
                            resizeMode="cover">
                            <View style={styles.overlay}>
                                <Text style={styles.textoOverlay}>
                                    {idioma === 'en'
                                        ? livroDestaque.tituloEn || livroDestaque.titulo
                                        : livroDestaque.titulo}
                                    {idioma === 'en'
                                        ? livroDestaque.descricaoEn || livroDestaque.descricao
                                        : livroDestaque.descricao}
                                </Text>
                            </View>
                        </ImageBackground>
                    </View>
                )
            )}

            <View style={styles.secaoOutrosLivros}>
                <Text style={styles.tituloOutrosLivros}>
                    {idioma === 'en' ? 'More Books' : 'Mais Livros'}
                </Text>
            </View>

            {isLoading ? (
                <ActivityIndicator size="large" color="#caad92" />
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
                                        {livro.titulo}
                                    </Text>
                                    <Text style={styles.autorLivro} numberOfLines={1}>
                                        {livro.autor}
                                    </Text>
                                    <View style={styles.starsContainer}>
                                        {renderStars(livro.rating)}
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => `${item.origem}-${item.id}-${index}`}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                    contentContainerStyle={styles.flatListContent}
                    snapToInterval={180}
                    decelerationRate="fast"
                />
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
        paddingVertical: 20,
        paddingBottom: 32,
        paddingHorizontal: 10,
        ...(Platform.OS === 'web'
            ? {
                  minHeight: '100%',
              }
            : null),
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
    intro: {
        backgroundColor: '#839c73',
        padding: 10,
        paddingHorizontal: 20,
        marginHorizontal: 20,
        marginBottom: 15,
        borderRadius: 15,
    },
    introTexto: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center',
    },
    livroDestaque: {
        width: 280,
        height: 300,
        borderRadius: 15,
        overflow: 'hidden',
        marginTop: 5,
        marginBottom: 30,
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
        fontSize: 16,
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
        backgroundColor: '#D4EBBA',
        borderRadius: 12,
        overflow: 'hidden',
        marginRight: 12,
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
        height: 120,
    },
    infoCard: {
        padding: 8,
        alignItems: 'flex-start',
    },
    tituloLivro: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#2B431E',
        marginBottom: 3,
        width: '100%',
    },
    autorLivro: {
        fontSize: 10,
        fontWeight: '500',
        color: '#555555',
        marginBottom: 5,
        width: '100%',
    },
    starsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
});
