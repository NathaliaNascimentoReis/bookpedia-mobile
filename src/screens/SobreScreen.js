import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useIdioma } from '../IdiomaContext.js';
import { useState, useEffect } from 'react';

export default function Sobre() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const { idioma } = useIdioma();

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

            <View style={[styles.intro, { backgroundColor: '#C2E799' }]}>
                <Text style={[styles.introTexto, { color: '#2B431E', fontSize: 15 }]}>
                    {idioma === 'en' ? 'Get to know the team too!' : 'Conheça a equipe também!'}
                </Text>
            </View>

            <View style={[styles.intro, { backgroundColor: '#839c73', marginTop: 20 }]}>
                <Text style={[styles.introTexto, { color: '#ffffff', fontSize: 13 }]}>
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
                        <View key={membro.id || index} style={styles.membro}>
                            <View style={styles.cardSection}>
                                <View style={styles.cardMembro}>
                                    <Text style={styles.cardTitulo}>{membro.nome}</Text>
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
        padding: 10,
        paddingHorizontal: 20,
        marginHorizontal: 20,
        borderRadius: 15,
    },
    introTexto: {
        fontWeight: '500',
    },
    main: {
        backgroundColor: '#F7F3E8',
        padding: 14,
        borderRadius: 12,
    },
});
