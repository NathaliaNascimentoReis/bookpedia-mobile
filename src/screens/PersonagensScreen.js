import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
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

            const response = await fetch(
                'https://bookpedia-backend-4ab3.onrender.com/personagens',
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
                setData(json);
            } else if (json.personagens && Array.isArray(json.personagens)) {
                setData(json.personagens); // Corrigido de json.personagem para json.personagens
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
                                {/* Mudança dinâmica de borderRadius acontecendo aqui através do array de estilos */}
                                <TouchableOpacity
                                    style={[
                                        styles.personagemBox,
                                        isOpen ? styles.boxAberto : styles.boxFechado,
                                    ]}
                                    activeOpacity={0.7}
                                    onPress={() => togglePersonagem(personagem.id)}>
                                    <View style={styles.tituloPersonagem}>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                gap: 10,
                                                alignItems: 'center',
                                            }}>
                                            <Text style={styles.characterTexto}>
                                                {personagem.nome}
                                            </Text>
                                            <Text style={styles.characterTexto}>
                                                ({personagem.idade}{' '}
                                                {idioma === 'en' ? 'years old' : 'anos'})
                                            </Text>
                                        </View>
                                        <FontAwesome
                                            name={isOpen ? 'chevron-up' : 'chevron-down'}
                                            size={18}
                                            color="#ffffff"
                                            style={{ alignSelf: 'center', marginRight: 10 }}
                                        />
                                    </View>
                                </TouchableOpacity>

                                {isOpen && (
                                    <View style={styles.dropdownConteudo}>
                                        {/* Seção da Descrição */}
                                        <View style={styles.corpoDescricao}>
                                            <Text style={styles.descricaoTexto}>
                                                {idioma === 'en'
                                                    ? personagem.descricaoEn
                                                    : personagem.descricao}
                                            </Text>
                                        </View>

                                        {/* Seção da História */}
                                        <View style={styles.historiaBox}>
                                            <Text style={styles.historiaTitulo}>
                                                {idioma === 'en'
                                                    ? personagem.historiaEn
                                                    : undefined}
                                            </Text>
                                            <Text style={styles.historiaTextoEstilizado}>
                                                {idioma === 'en' ? undefined : personagem.historia}
                                            </Text>
                                        </View>
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
        overflow: 'hidden',
    },
    boxAberto: {
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    boxFechado: {
        borderRadius: 12,
    },
    tituloPersonagem: {
        backgroundColor: '#C2A88D',
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
        backgroundColor: '#E1D3C1',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        marginBottom: 20,
    },
    descricaoTexto: {
        fontSize: 16,
        color: '#453E34',
        lineHeight: 22,
        fontWeight: '600',
    },
    historiaBox: {
        backgroundColor: '#C2E799',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 12,
        alignItems: 'center',
    },
    historiaTitulo: {
        fontWeight: 'bold',
        color: '#2B431E',
    },
    historiaTextoEstilizado: {
        fontSize: 16,
        color: '#2B431E',
        lineHeight: 22,
        fontWeight: '600',
    },
    dropdownConteudo: {
        width: '100%',
    },
});
