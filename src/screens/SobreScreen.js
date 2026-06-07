import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
    Image,
} from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useIdioma } from '../IdiomaContext.js';
import { useState, useEffect } from 'react';
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

export default function Sobre() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [projeto, setProjeto] = useState([]);

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

    useEffect(() => {
        setLoading(true);
        Promise.all([getProjeto(), getEquipe()]).finally(() => setLoading(false));
    }, [idioma]);

    return (
        <ScrollView style={styles.background} contentContainerStyle={styles.container}>
            <View style={styles.tituloSection}>
                <View style={styles.tituloDiv}>
                    <FontAwesome6 name="circle-info" size={24} color="#1E1E1E" />
                    <Text style={styles.titulo}>
                        {idioma === 'en'
                            ? 'About the project and team'
                            : 'Sobre o Projeto e Equipe'}
                    </Text>
                </View>
                <View style={styles.linha}></View>
            </View>

            <View style={styles.main}>
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
                                        style={[styles.cardHeader, { backgroundColor: '#C2A88D' }]}>
                                        <Text style={styles.cardHeaderTextoBranco}>
                                            {idioma === 'en' ? 'Introduction' : 'Introdução'}
                                        </Text>
                                    </View>
                                    <View style={[styles.cardBody, { backgroundColor: '#E1D3C1' }]}>
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
                                        style={[styles.cardHeader, { backgroundColor: '#7A8C66' }]}>
                                        <Text style={styles.cardHeaderTextoBranco}>
                                            {idioma === 'en'
                                                ? 'Project Objective'
                                                : 'Objetivo do Projeto'}
                                        </Text>
                                    </View>
                                    <View style={[styles.cardBody, { backgroundColor: '#D1E6BA' }]}>
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
                                            {idioma === 'en' ? 'About The Team' : 'Sobre A Equipe'}
                                        </Text>
                                    </View>
                                    <View style={[styles.cardBody, { backgroundColor: '#E1D3C1' }]}>
                                        <TextoProjeto
                                            idioma={idioma}
                                            style={styles.textoBege}
                                            texto={
                                                idioma === 'en'
                                                    ? projeto.sobreAEquipeEn || projeto.sobreAEquipe
                                                    : projeto.sobreAEquipe
                                            }
                                        />
                                    </View>
                                </View>
                            </View>
                        )}

                        <View
                            style={[
                                styles.intro,
                                { backgroundColor: '#C2E799', marginBottom: 15, marginTop: 30 },
                            ]}>
                            <Text style={[styles.introTexto, { color: '#2B431E', fontSize: 16 }]}>
                                {idioma === 'en'
                                    ? 'Get to know the team too!'
                                    : 'Conheça a equipe também!'}
                            </Text>
                        </View>

                        <View style={[styles.intro, { backgroundColor: '#839c73' }]}>
                            <Text style={[styles.introTexto, { color: '#ffffff', fontSize: 14 }]}>
                                {idioma === 'en'
                                    ? "Learn more about the team's individual reflections about the main work by clicking on their cards"
                                    : 'Saiba mais sobre a reflexão individual da equipe acerca da obra principal clicando em seus cards!'}
                            </Text>
                        </View>

                        {data?.map((membro, index) => (
                            <View key={membro.id || index} style={styles.membroCard}>
                                <View style={styles.cardTituloContainer}>
                                    <View style={styles.infoDiv}>
                                        {membro.curso !== 'Desenvolvimento de Sistemas' ? (
                                            <FontAwesome6
                                                name="puzzle-piece"
                                                size={22}
                                                color="white"
                                            />
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
                                    <Image
                                        source={{ uri: membro.fotoURL }}
                                        style={styles.fotoMembro}
                                    />

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
                        ))}

                        {projeto && (
                            <View style={styles.dadosContainer}>
                                <View style={styles.card}>
                                    <View
                                        style={[styles.cardHeader, { backgroundColor: '#C2A88D' }]}>
                                        <FontAwesome6 name="code-branch" size={22} color="white" />
                                        <Text style={styles.cardHeaderTextoBranco}>
                                            {idioma === 'en'
                                                ? 'Technical Development'
                                                : 'Desenvolvimento Técnico'}
                                        </Text>
                                    </View>
                                    <View style={[styles.cardBody, { backgroundColor: '#E1D3C1' }]}>
                                        <TextoProjeto
                                            idioma={idioma}
                                            style={styles.textoBege}
                                            texto={
                                                idioma === 'en'
                                                    ? projeto.desenvolvimentoTecnicoEn ||
                                                      projeto.desenvolvimentoTecnico
                                                    : projeto.desenvolvimentoTecnico
                                            }
                                        />
                                    </View>
                                </View>

                                <View style={styles.card}>
                                    <View
                                        style={[styles.cardHeader, { backgroundColor: '#7A8C66' }]}>
                                        <FontAwesome6 name="database" size={22} color="white" />
                                        <Text style={styles.cardHeaderTextoBranco}>
                                            {idioma === 'en'
                                                ? 'API Integration'
                                                : 'Integração de APIs'}
                                        </Text>
                                    </View>
                                    <View style={[styles.cardBody, { backgroundColor: '#D1E6BA' }]}>
                                        <TextoProjeto
                                            idioma={idioma}
                                            style={styles.textoVerde}
                                            texto={
                                                idioma === 'en'
                                                    ? projeto.integracaoAPIEn ||
                                                      projeto.integracaoAPI
                                                    : projeto.integracaoAPI
                                            }
                                        />
                                    </View>
                                </View>
                            </View>
                        )}
                    </>
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
        width: '100%',
    },
    titulo: {
        flex: 1,
        flexWrap: 'wrap',
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
        flex: 1,
        width: '100%',
        marginBottom: 20,
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
        marginBottom: 30,
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
    membroCard: {
        marginTop: 20,
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
    fotoMembro: {
        width: 180,
        height: 180,
        borderRadius: 12,
        marginBottom: 10,
        borderWidth: 5,
        borderColor: '#ffffff',
        alignSelf: 'center',
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
});
