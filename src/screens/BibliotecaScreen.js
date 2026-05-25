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
                    titulo: idioma === 'en' ? item.tituloDoLivroEn : item.tituloDoLivro,
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
                    genero:
                        idioma === 'en'
                            ? item.genero_en || 'Unknown Genre'
                            : item.genero_pt || 'Gênero Desconhecido',
                    descricao:
                        idioma === 'en'
                            ? item.descricao_en || 'Unknown Description'
                            : item.descricao_pt || 'Descrição Desconhecida',
                    enredo:
                        idioma === 'en'
                            ? item.enredo_en || 'Unknown Story'
                            : item.enredo_pt || 'Enredo Desconhecido',
                    movimento:
                        idioma === 'en'
                            ? item.movimento_en || 'Unknown Movement'
                            : item.movimento_pt || 'Movimento Desconhecido',
                    contextoHistorico:
                        idioma === 'en'
                            ? item.contexto_historico_en || 'Unknown Historical Context'
                            : item.contexto_historico_pt || 'Contexto Histórico Desconhecido',
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
                            ? item.titulo_en || item.titulo || item.title || 'Untitled'
                            : item.titulo || item.title || item.titulo_pt || 'Sem Título',
                    capa:
                        (item.capa_url && item.capa_url.trim() !== '') ||
                        (item.capaURL && item.capaURL.trim() !== '') ||
                        (item.capa && item.capa.trim() !== '')
                            ? item.capa_url || item.capaURL || item.capa
                            : idioma === 'en'
                              ? 'https://i.pinimg.com/736x/94/d8/43/94d843e8a5152bbf5a025a1d12df8715.jpg'
                              : 'https://i.pinimg.com/736x/f3/1f/3d/f31f3dbb229686dee4ed693fbbdf3e7d.jpg',
                    ano: item.ano || item.anoDeLancamento || item.year,
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
                    origem: 'capitaes de areia',
                }));
            }

            // Requisição do livro Quarto de Despejo
            const API_KEY_QUARTO = 'amods';
            const headersQuarto = {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY_QUARTO,
            };

            const quartoResp = await fetch(
                'https://backend-projeto-integrador-rana.onrender.com/livros',
                {
                    method: 'GET',
                    headers: headersQuarto,
                },
            );

            let livrosQuarto = [];

            if (quartoResp.ok) {
                const jsonQuarto = await quartoResp.json();

                let listaQuarto = [];

                if (Array.isArray(jsonQuarto)) {
                    listaQuarto = jsonQuarto;
                } else if (jsonQuarto.livros && Array.isArray(jsonQuarto.livros)) {
                    listaQuarto = jsonQuarto.livros;
                } else if (jsonQuarto.livro) {
                    listaQuarto = [jsonQuarto.livro];
                } else {
                    listaQuarto = [jsonQuarto];
                }

                livrosQuarto = listaQuarto.map((item) => ({
                    id: item.id,
                    titulo:
                        idioma === 'en'
                            ? item.titulo_en || item.titulo || item.title || 'Untitled'
                            : item.titulo || item.title || 'Sem Título',
                    capa:
                        (item.capa_url && item.capa_url.trim() !== '') ||
                        (item.capaURL && item.capaURL.trim() !== '') ||
                        (item.capa && item.capa.trim() !== '')
                            ? item.capa_url || item.capaURL || item.capa
                            : idioma === 'en'
                              ? 'https://i.pinimg.com/736x/94/d8/43/94d843e8a5152bbf5a025a1d12df8715.jpg'
                              : 'https://i.pinimg.com/736x/f3/1f/3d/f31f3dbb229686dee4ed693fbbdf3e7d.jpg',
                    ano: item.ano || item.anoDeLancamento || item.year,
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
                    origem: 'quarto de despejo',
                }));
            }

            // Livro estático: Memórias Póstumas de Brás Cubas (sem requisição)
            const livrosMemoriasPostumas = [
                {
                    id: 'memorias-1',
                    titulo:
                        idioma === 'en'
                            ? 'The Posthumous Memoirs of Brás Cubas'
                            : 'Memórias Póstumas de Brás Cubas',
                    capa: 'https://i.pinimg.com/736x/0b/1d/6e/0b1d6ef7d6b2f1a6a2a0d8a0f3b9e6f9.jpg',
                    ano: '1881',
                    genero: idioma === 'en' ? 'Novel' : 'Romance',
                    descricao:
                        idioma === 'en'
                            ? 'A classic work by Machado de Assis.'
                            : 'Uma obra clássica de Machado de Assis.',
                    enredo:
                        idioma === 'en'
                            ? 'A satirical novel told from beyond the grave.'
                            : 'Um romance satírico narrado do além-túmulo.',
                    movimento: idioma === 'en' ? 'Realism' : 'Realismo',
                    contextoHistorico:
                        idioma === 'en'
                            ? 'Late 19th-century Brazilian society.'
                            : 'Sociedade brasileira do final do século XIX.',
                    autor: 'Machado de Assis',
                    origem: 'memorias de bras cubas',
                },
            ];

            const listaLivros = [
                ...(livrosVidasSecas || []),
                ...(livrosReadflow || []),
                ...(livrosGuarani || []),
                ...(livrosMemoriasPostumas || []),
                ...(livrosQuarto || [])
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
    }, []);

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
                    <ActivityIndicator size="large" color="#caad92" />
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
                                            {livro.titulo}
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
                                                } else if (livro.origem === 'quarto de despejo') {
                                                    navigation.navigate('QuartoDespejo', {
                                                        screen: 'QuartoDespejoScreen',
                                                        params: { livroQuartoDeDespejo: livro },
                                                    });
                                                } else if (
                                                    livro.origem === 'memorias de bras cubas'
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
