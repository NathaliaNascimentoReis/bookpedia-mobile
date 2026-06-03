import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useIdioma } from '../IdiomaContext.js';
import { useState, useEffect } from 'react';

export default function Personagens() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const { idioma } = useIdioma();

    const [personagemVisivel, setVisivel] = useState({});

    const getPersonagens = async () => {
        try {
            const API_KEY = 'bookpedia-backend-2026';

            const response = await fetch('https://bookpedia-backend-4ab3.onrender.com/personagens', {
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
            } else if (json.personagens && Array.isArray(json.personagens)) {
                setData(json.personagem);
            } else if (json.personagem) {
                setData([json.personagem]);
            } else {
                setData([json]);
            }
        } catch (error) {
            console.error('Erro ao buscar personagens: ' + error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPersonagens();
    }, []);

    const togglePersonagem = (id) => {
        setVisivel((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return (
        <ScrollView style={styles.background} contentContainerStyle={styles.container}>
            <View style={styles.tituloSection}>
                <View style={styles.tituloDiv}>
                    <FontAwesome name="users" size={24} color="#1E1E1E" />
                    <Text style={styles.titulo}>
                        {idioma === 'en' ? 'Characters' : 'Personagens'}
                    </Text>
                </View>
                <View style={styles.linha}></View>
            </View>

            <View style={[styles.intro, { backgroundColor: '#C2E799', marginBottom: 10 }]}>
                <Text style={[styles.introTexto, { color: '#2B431E', fontSize: 16 }]}>
                    {idioma === 'en' ? 'Get to know the team too!' : 'Conheça a equipe também!'}
                </Text>
            </View>

            <View style={styles.main}>
                {loading ? (
                    <ActivityIndicator size="large" color="#94B97B" style={{ marginTop: 20 }} />
                ) : (
                    data.map((personagem) => {
                        const isOpen = !!personagemVisivel[personagem.id];

                        return (
                            <View key={personagem.id} style={styles.cardGeral}>
                                <View style={styles.personagemBox}>
                                    <View style={styles.tituloPersonagem}>
                                        <Text style={styles.characterTexto}>{personagem.nome}</Text>
                                        <Text style={styles.characterTexto}>
                                            {personagem.idade} anos
                                        </Text>
                                    </View>

                                    <View style={styles.corpoDescricao}>
                                        <Text style={styles.descricaoTexto}>
                                            {idioma === 'en' ? personagem.descricaoEn : personagem.descricao}
                                        </Text>
                                    </View>
                                </View>

                                {/* Botão de Revelar/Esconder Personagem */}
                                <TouchableOpacity
                                    style={styles.botaoHistoria}
                                    activeOpacity={0.8}
                                    onPress={() => togglePersonagem(personagem.id)}>
                                    <Text style={styles.botaoHistoriaTexto}>
                                        {isOpen
                                            ? idioma === 'en'
                                                ? 'Hide story'
                                                : 'Esconder história'
                                            : idioma === 'en'
                                                ? 'Learn more about this character story by clicking here!'
                                                : 'Saiba mais sobre a história desse personagem clicando aqui!'}
                                    </Text>
                                    <FontAwesome
                                        name={isOpen ? 'chevron-up' : 'chevron-down'}
                                        size={22}
                                        color="white"
                                    />
                                </TouchableOpacity>

                                {/* Seção com a história */}
                                {isOpen && (
                                    <View style={styles.historiaBox}>
                                        <Text style={styles.historiaTitulo}>
                                            {idioma === 'en'
                                                ? personagem.historiaEn
                                                : personagem.historia}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        );
                    })
                )}
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
    main: {
        flex: 1,
        width: '100%',
        marginTop: 20,
    },
    cardGeral: {
        width: '100%',
        marginBottom: 25,
        alignItems: 'center',
    },
    personagemBox: {
        width: '100%',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        overflow: 'hidden',
    },
    tituloPersonagem: {
        backgroundColor: '#9e8569',
        paddingVertical: 12,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    characterTexto: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    corpoDescricao: {
        padding: 18,
        gap: 12,
        backgroundColor: '#E1D3C1',
    },
    descricaoTexto: {
        fontSize: 16,
        color: '#453E34',
        lineHeight: 22,
        fontWeight: '600',
        marginBottom: 6,
    },
    botaoHistoria: {
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
    botaoHistoriaTexto: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: '500',
        maxWidth: '80%',
    },
    historiaBox: {
        backgroundColor: '#C2E799',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 20,
        gap: 10,
    },
    historiaTitulo: {
        fontWeight: 'bold',
        color: '#2B431E',
    },
});
