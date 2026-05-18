import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { useIdioma } from '../IdiomaContext.js';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function Vocabularios() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const { idioma } = useIdioma();

    const getVocabulario = async () => {
        try {
            const response = await fetch('https://bookpedia-backend-4ab3.onrender.com/vocabulario');
            const json = await response.json();

            if (Array.isArray(json)) {
                setData(json);
            } else if (json.vocabularios && Array.isArray(json.vocabularios)) {
                setData(json.vocabularios);
            } else if (json.vocabulario) {
                setData([json.vocabulario]);
            } else {
                setData([json]);
            }
        } catch (error) {
            console.error('Erro ao buscar lista de vocabulários: ' + error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getVocabulario();
    }, []);

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: '#E7F0DB' }}
            contentContainerStyle={styles.container}>
            <View style={styles.tituloSection}>
                <View style={styles.tituloDiv}>
                    <FontAwesome5 name="list-alt" size={18} color="#1E1E1E" />
                    <Text style={styles.titulo}>
                        {idioma === 'en' ? 'Vocabularies' : 'Vocabulário'}
                    </Text>
                </View>
                <View style={styles.linha}></View>
            </View>

            <View style={styles.vocabularioConteiner}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#caad92" />
                ) : (
                    data?.map((vocabulario) => (
                        <View
                            key={vocabulario.id || vocabulario._id }
                            style={styles.tituloDiv}>
                            <Text style={styles.palavraTitulo}>
                                {idioma === 'en'
                                    ? vocabulario.palavraEn || vocabulario.palavra
                                    : vocabulario.palavra}
                            </Text>
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
    },
    tituloSection: {
        gap: 5,
        marginTop: 30,
    },
    tituloDiv: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    titulo: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#453E34',
    },
    linha: {
        width: 300,
        height: 1,
        backgroundColor: '#9B6737',
    },
    vocabularioConteiner: {
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: '#94B979',
        padding: 10,
        margin: 20,
    },
});
