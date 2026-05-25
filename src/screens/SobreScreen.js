import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useIdioma } from '../IdiomaContext.js';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function Sobre() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const { idioma } = useIdioma();

    const navigation = useNavigation();

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
        getEquipe();
    }, []);

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: '#E7F0DB' }}
            contentContainerStyle={styles.container}>
            <View style={styles.tituloSection}>
                <View style={styles.tituloDiv}>
                    <FontAwesome6 name="circle-info" size={22} color="#1E1E1E" />
                    <Text style={styles.titulo}>
                        {idioma === 'en'
                            ? 'About the project and team'
                            : 'Sobre o Projeto e Equipe'}
                    </Text>
                </View>
                <View style={styles.linha}></View>
            </View>

            <View style={[styles.intro, { backgroundColor: '#C2E799', marginBottom: 10 }]}>
                <Text style={[styles.introTexto, { color: '#2B431E', fontSize: 16 }]}>
                    {idioma === 'en' ? 'Get to know the team too!' : 'Conheça a equipe também!'}
                </Text>
            </View>

            <View style={[styles.intro, { backgroundColor: '#839c73', marginBottom: 10 }]}>
                <Text style={[styles.introTexto, { color: '#ffffff', fontSize: 14 }]}>
                    {idioma === 'en'
                        ? "Learn more about the team's individual reflections about the main work by clicking on their cards"
                        : 'Saiba mais sobre a reflexão individual da equipe acerca da obra principal clicando em seus cards!'}
                </Text>
            </View>

            <View style={styles.main}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#caad92" />
                ) : (
                    data?.map((membro, index) => (
                        <View key={membro.id || index} style={styles.membroCard}>
                            <View style={styles.cardTituloContainer}>
                                <View style={styles.infoDiv}>
                                    {membro.curso !== 'Desenvolvimento de Sistemas' ? (
                                        <FontAwesome6 name="puzzle-piece" size={22} color="white" />
                                    ) : (
                                        <FontAwesome5 name="code" size={22} color="white" />
                                    )}
                                    <Text style={styles.cardTitulo}>{membro.nome}</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate('EquipeAvaliacao', {
                                            screen: 'EquipeAvaliacaoScreen',
                                            params: { membro: membro },
                                        })
                                    }
                                    activeOpacity={0.7}>
                                    <FontAwesome name="external-link" size={24} color="white" />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.infoMembro}>
                                {/* Idade */}
                                <View style={styles.div}>
                                    <Text style={styles.infoTexto}>
                                        <Text style={styles.boldText}>
                                            {idioma === 'en' ? 'Age: ' : 'Idade: '}
                                        </Text>
                                        {membro.idade}
                                    </Text>
                                </View>

                                {/* Curso */}
                                <View style={styles.div}>
                                    <Text style={styles.infoTexto}>
                                        <Text style={styles.boldText}>
                                            {idioma === 'en' ? 'Course: ' : 'Curso: '}
                                        </Text>
                                        {idioma === 'en'
                                            ? membro.cursoEn || membro.curso
                                            : membro.curso}
                                    </Text>
                                </View>

                                {/* Cargo */}
                                <View style={styles.div}>
                                    <Text style={styles.infoTexto}>
                                        <Text style={styles.boldText}>
                                            {idioma === 'en' ? 'Role: ' : 'Cargo: '}
                                        </Text>
                                        {idioma === 'en'
                                            ? membro.cargoEn || membro.cargo
                                            : membro.cargo}
                                    </Text>
                                </View>

                                {/* Descrição */}
                                <View style={styles.div}>
                                    <Text style={styles.infoTexto}>
                                        <Text style={styles.boldText}>
                                            {idioma === 'en' ? 'Description: ' : 'Descrição: '}
                                        </Text>
                                        {idioma === 'en'
                                            ? membro.descricaoEn || membro.descricao
                                            : membro.descricao}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    ))
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexGrow: 1,
        paddingVertical: 20,
        paddingBottom: 30,
        paddingHorizontal: 20,
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
        marginBottom: 15,
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
        marginBottom: 20,
    },
    membroCard: {
        marginTop: 4,
        borderRadius: 12,
        marginBottom: 16,
        width: '100%',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
    },
    cardTituloContainer: {
        backgroundColor: '#C2A88D',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    infoDiv: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    cardTitulo: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#ffffff',
    },
    infoMembro: {
        backgroundColor: '#E1D3C1',
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },
    div: {
        marginBottom: 10,
    },
    infoTexto: {
        color: '#453E34',
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 20,
    },
    boldText: {
        fontWeight: 'bold',
        color: '#332C24',
    },
});
