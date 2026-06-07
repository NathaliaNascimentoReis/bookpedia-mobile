import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
    Image,
    Touchable,
} from 'react-native';
import { useIdioma } from '../IdiomaContext.js';
import { useState, useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

export default function Biblioteca() {
    const navigation = useNavigation();

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const { idioma } = useIdioma();

    const carregarTodosOsLivros = async () => {
        try {
            setLoading(true);

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
                    tituloEn: item.tituloDoLivroEn || 'Untitled',
                    capa:
                        item.capaURL && item.capaURL.trim() !== ''
                            ? item.capaURL
                            : idioma === 'en'
                              ? 'https://i.pinimg.com/736x/94/d8/43/94d843e8a5152bbf5a025a1d12df8715.jpg'
                              : 'https://i.pinimg.com/736x/f3/1f/3d/f31f3dbb229686dee4ed693fbbdf3e7d.jpg',
                    ano: item.anoDeLancamento || 'Ano de lançamento desconhecido',
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
                    titulo: item.titulo || 'Sem título',
                    tituloEn: 'Barren Lives' || 'Untitled',
                    capa:
                        item.capa_url && item.capa_url.trim() !== ''
                            ? item.capa_url
                            : idioma === 'en'
                              ? 'https://i.pinimg.com/736x/94/d8/43/94d843e8a5152bbf5a025a1d12df8715.jpg'
                              : 'https://i.pinimg.com/736x/f3/1f/3d/f31f3dbb229686dee4ed693fbbdf3e7d.jpg',
                    ano: item.ano || 'Ano de lançamento desconhecido',
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
                            ? 'Captains of the Sands' || 'Untitled'
                            : item.titulo || 'Sem título',
                    capa:
                        idioma === 'en'
                            ? item.capa_url ||
                              'https://i.pinimg.com/736x/94/d8/43/94d843e8a5152bbf5a025a1d12df8715.jpg'
                            : item.capa_url ||
                              'https://i.pinimg.com/736x/f3/1f/3d/f31f3dbb229686dee4ed693fbbdf3e7d.jpg',
                    ano:
                        idioma === 'en'
                            ? item.anoPublicacao || 'Unknown Year'
                            : item.anoPublicacao || 'Ano Desconhecido',
                    genero: item.genero_pt || 'Gênero Desconhecido',
                    generoEn: item.genero_en || 'Unknown Genre',
                    descricao: item.descricao_pt || 'Descrição Desconhecida',
                    descricaoEn: item.descricao_en || 'Unknown Description',
                    sinopse: item.sinopse || 'Sinopse Desconhecida',
                    contextoHistorico: item.contexto_pt || 'Contexto Histórico Desconhecido',
                    contextoHistoricoEn: item.contexto_en || 'Unknown Historical Context',
                    verossimilhanca: item.verossimilhanca_pt || 'Verossimilhança Desconhecida',
                    verossimilhancaEn: item.verossimilhanca_en || 'Unknown Verisimilitude',
                    autor: item.autor
                        ? typeof item.autor === 'string'
                            ? item.autor
                            : item.autor.nome
                        : item.autores && item.autores.length > 0
                          ? item.autores[0].nome
                          : item.author || 'Autor Desconhecido',
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
                    titulo: item.nome || 'Sem Título',
                    tituloEn: item.nomeIng || 'Untitled',
                    autor:
                        idioma === 'en'
                            ? item.autor || 'Unknown Author'
                            : item.autor || 'Autor Desconhecido',
                    capa:
                        idioma === 'en'
                            ? item.foto ||
                              'https://i.pinimg.com/736x/94/d8/43/94d843e8a5152bbf5a025a1d12df8715.jpg'
                            : item.foto ||
                              'https://i.pinimg.com/736x/f3/1f/3d/f31f3dbb229686dee4ed693fbbdf3e7d.jpg',
                    ano: item.publicacao || 'Unknown Year',
                    resumo: item.resumo || 'Resumo Desconhecido',
                    resumoEn: item.resumoIng || 'Unknown Summary',
                    contextoHistorico: item.contextoHist || 'Contexto Histórico Desconhecido',
                    contextoHistoricoEn: item.contextoHistIng || 'Unknown Historical Context',
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
                    titulo: item.tituloPT || 'Sem Título',
                    tituloEn: item.tituloEN || 'Untitled',
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
                    ano: item.anoPublicacao || 'Unknown Year',
                    genero: item.generoPT || 'Gênero Desconhecido',
                    generoEn: item.generoEN || 'Unknown Genre',
                    descricao: item.descricaoPT || 'Descrição Desconhecida',
                    descricaoEn: item.descricaoEN || 'Unknown Description',
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

            setData(listaLivros);
        } catch (error) {
            console.error('Erro ao buscar os livros: ' + error.message);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarTodosOsLivros();
    }, [idioma]);

    return (
        <ScrollView style={styles.background} contentContainerStyle={styles.container}>
            <View style={styles.tituloSection}>
                <View style={styles.tituloDiv}>
                    <FontAwesome name="book" size={24} color="#1E1E1E" />
                    <Text style={styles.titulo}>{idioma === 'en' ? 'Library' : 'Biblioteca'}</Text>
                </View>
                <View style={styles.linha}></View>
            </View>

            <View style={styles.subtituloContainer}>
                <Text style={styles.subtituloTexto}>
                    {idioma === 'en'
                        ? 'Want to discover more books? Explore literature on BookPedia!'
                        : 'Deseja conhecer outros livros? Explore a literatura no BookPedia!'}
                </Text>
            </View>

            <View style={styles.main}>
                {isLoading ? (
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color="#453E34" />
                    </View>
                ) : (
                    <View style={styles.livros}>
                        {data?.map((livro, index) => (
                            <View
                                key={`${livro.origem}-${livro.id}-${index}`}
                                style={styles.livroContainer}>
                                <View style={styles.cardLivro}>
                                    <Image source={{ uri: livro.capa }} style={styles.capa} />
                                    <View style={styles.infoLivro}>
                                        <Text style={styles.livroTexto} numberOfLines={2}>
                                            {idioma === 'en'
                                                ? livro.tituloEn || livro.titulo
                                                : livro.titulo}
                                        </Text>
                                        <Text style={styles.autorTexto} numberOfLines={1}>
                                            {livro.autor}
                                        </Text>
                                    </View>
                                    <View style={styles.botao}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                if (livro.origem === 'vidasSecas') {
                                                    navigation.navigate('VidasSecas', {
                                                        screen: 'VidasSecasScreen',
                                                        params: { livroVidasSecas: livro },
                                                    });
                                                } else if (livro.origem === 'capitaes de areia') {
                                                    navigation.navigate('CapitaesDeAreia', {
                                                        screen: 'CapitaesDeAreiaScreen',
                                                        params: { livroCapitaesDeAreia: livro },
                                                    });
                                                } else if (livro.origem === 'Quarto de Despejo') {
                                                    navigation.navigate('QuartoDespejo', {
                                                        screen: 'QuartoDespejoScreen',
                                                        params: { livroQuartoDeDespejo: livro },
                                                    });
                                                } else if (
                                                    livro.origem ===
                                                    'Memórias Póstumas de Brás Cubas'
                                                ) {
                                                    navigation.navigate('MemoriasPostumas', {
                                                        screen: 'MemoriasPostumasScreen',
                                                        params: { livroMemoriasPostumas: livro },
                                                    });
                                                } else {
                                                    navigation.navigate('LivroDestaque', {
                                                        screen: 'LivroDestaqueScreen',
                                                        params: { livroOGuarani: livro },
                                                    });
                                                }
                                            }}
                                            activeOpacity={0.7}>
                                            <FontAwesome
                                                name="external-link"
                                                size={24}
                                                color="black"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                )}
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
    subtituloContainer: {
        backgroundColor: '#C2A88D',
        width: '100%',
        paddingVertical: 14,
        paddingHorizontal: 15,
        borderRadius: 12,
        marginBottom: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    subtituloTexto: {
        color: '#ffffff',
        fontSize: 16.5,
        fontWeight: '700',
        textAlign: 'center',
    },
    main: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    livros: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
    },
    livroContainer: {
        width: '48%',
        height: 270,
        marginBottom: 15,
    },
    cardLivro: {
        backgroundColor: '#D4EBBA',
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 3,
        borderColor: '#C0DE9E',
        flex: 1,
        padding: 10,
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    capa: {
        width: '100%',
        height: 120,
        borderRadius: 12,
        resizeMode: 'cover',
    },
    infoLivro: {
        alignItems: 'flex-start',
        marginVertical: 5,
        flex: 1,
    },
    livroTexto: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2B431E',
        flexWrap: 'wrap',
    },
    autorTexto: {
        fontSize: 14,
        fontWeight: '500',
        color: '#2B431E',
        flexWrap: 'wrap',
    },
    botao: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginTop: 10,
    },
});
