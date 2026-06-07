import { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { useIdioma } from '../IdiomaContext.js';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Simulado() {
    const [questoes, setQuestoes] = useState([]);
    const [loading, setLoading] = useState(true);

    const [respostasVisiveis, setRespostasVisiveis] = useState({});

    const { idioma } = useIdioma();

    const getQuestoes = async () => {
        try {
            const API_KEY = 'bookpedia-backend-2026';

            const response = await fetch('https://bookpedia-backend-4ab3.onrender.com/questoes', {
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
                setQuestoes(json);
            } else if (json.questoes && Array.isArray(json.questoes)) {
                setQuestoes(json.questoes);
            } else if (json.questao) {
                setQuestoes([json.questao]);
            } else {
                setQuestoes([json]);
            }
        } catch (error) {
            console.error('Erro ao buscar as questões: ' + error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getQuestoes();
    }, []);

    // Função para alternar a exibição da resposta por ID
    const toggleResposta = (id) => {
        setRespostasVisiveis((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return (
        <ScrollView style={styles.background} contentContainerStyle={styles.container}>
            <View style={styles.tituloSection}>
                <View style={styles.tituloDiv}>
                    <FontAwesome name="check-square" size={24} color="#1E1E1E" />
                    <Text style={styles.titulo}>{idioma === 'en' ? 'Quizzes' : 'Simulado'}</Text>
                </View>
                <View style={styles.linha}></View>
            </View>

            <View style={styles.subtituloContainer}>
                <Text style={styles.subtituloTexto}>
                    {idioma === 'en'
                        ? 'Have you practiced today? BookPedia can help you with exam questions!'
                        : 'Já praticou hoje? O BookPedia pode te ajudar com questões de vestibular!'}
                </Text>
            </View>

            {loading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#453E34" />
                </View>
            ) : (
                questoes.map((questao) => {
                    const isOpen = !!respostasVisiveis[questao.id];
                    const alts = questao.alternativas || {};

                    return (
                        <View key={questao.id} style={styles.cardGeral}>
                            <View style={styles.questaoBox}>
                                <View style={styles.cabecalhoQuestao}>
                                    <Text style={styles.vestibularTexto}>{questao.vestibular}</Text>
                                    <Text style={styles.vestibularTexto}>
                                        {questao.anoVestibular
                                            ? questao.anoVestibular
                                            : 'Fase Única'}
                                    </Text>
                                </View>

                                {/* Enunciado e Alternativas */}
                                <View style={styles.corpoQuestao}>
                                    <Text style={styles.enunciadoTexto}>
                                        {idioma === 'en' ? questao.enunciadoEn : questao.enunciado}
                                    </Text>

                                    {/* Alternativa A */}
                                    <View style={styles.alternativaItem}>
                                        <Text style={styles.alternativaTexto}>
                                            a){' '}
                                            {idioma === 'en'
                                                ? alts.alternativaAEn
                                                : alts.alternativaA}
                                        </Text>
                                    </View>

                                    {/* Alternativa B */}
                                    <View style={styles.alternativaItem}>
                                        <Text style={styles.alternativaTexto}>
                                            b){' '}
                                            {idioma === 'en'
                                                ? alts.alternativaBEn
                                                : alts.alternativaB}
                                        </Text>
                                    </View>

                                    {/* Alternativa C */}
                                    <View style={styles.alternativaItem}>
                                        <Text style={styles.alternativaTexto}>
                                            c){' '}
                                            {idioma === 'en'
                                                ? alts.alternativaCEn
                                                : alts.alternativaC}
                                        </Text>
                                    </View>

                                    {/* Alternativa D */}
                                    <View style={styles.alternativaItem}>
                                        <Text style={styles.alternativaTexto}>
                                            d){' '}
                                            {idioma === 'en'
                                                ? alts.alternativaDEn
                                                : alts.alternativaD}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            {/* Botão de Revelar/Esconder Resposta */}
                            <TouchableOpacity
                                style={styles.botaoResposta}
                                activeOpacity={0.8}
                                onPress={() => toggleResposta(questao.id)}>
                                <Text style={styles.botaoRespostaTexto}>
                                    {isOpen
                                        ? idioma === 'en'
                                            ? 'Hide Answer'
                                            : 'Esconder Resposta'
                                        : idioma === 'en'
                                          ? 'Discover the Answer by clicking here!'
                                          : 'Descubra a Resposta clicando aqui!'}
                                </Text>
                                <FontAwesome
                                    name={isOpen ? 'chevron-up' : 'chevron-down'}
                                    size={22}
                                    color="white"
                                />
                            </TouchableOpacity>

                            {/* Seção com a Justificativa */}
                            {isOpen && (
                                <View style={styles.justificativaBox}>
                                    <Text style={styles.justificativaTitulo}>
                                        {idioma === 'en'
                                            ? 'Correct Alternative:'
                                            : 'Alternativa Correta:'}{' '}
                                        {alts.respostaCorreta}
                                    </Text>
                                    <Text style={styles.justificativaTexto}>
                                        {idioma === 'en'
                                            ? alts.justificativaEn
                                            : alts.justificativa}
                                    </Text>
                                </View>
                            )}
                        </View>
                    );
                })
            )}
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
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subtituloContainer: {
        backgroundColor: '#C0DE9E',
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
        color: '#3A4A28',
        fontSize: 16.5,
        fontWeight: '700',
        textAlign: 'center',
    },
    cardGeral: {
        width: '100%',
        marginBottom: 25,
        alignItems: 'center',
    },
    questaoBox: {
        width: '100%',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        overflow: 'hidden',
    },
    cabecalhoQuestao: {
        backgroundColor: '#9e8569',
        paddingVertical: 12,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    vestibularTexto: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    corpoQuestao: {
        padding: 18,
        gap: 12,
        backgroundColor: '#E1D3C1',
    },
    enunciadoTexto: {
        fontSize: 16,
        color: '#453E34',
        lineHeight: 22,
        fontWeight: '600',
        marginBottom: 6,
    },
    alternativaItem: {
        backgroundColor: '#C2A88D',
        borderRadius: 18,
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    alternativaTexto: {
        color: '#FFFFFF',
        fontSize: 15.5,
        fontWeight: '500',
        lineHeight: 20,
    },
    botaoResposta: {
        width: '100%',
        backgroundColor: '#9e8569',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    botaoRespostaTexto: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '500',
        maxWidth: '80%',
    },
    justificativaBox: {
        backgroundColor: '#D4EBBA',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 20,
        gap: 10,
    },
    justificativaTitulo: {
        fontWeight: 'bold',
        color: '#2B431E',
    },
    justificativaTexto: {
        color: '#2B431E',
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 20,
    },
});
