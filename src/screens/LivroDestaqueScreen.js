import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useIdioma } from '../IdiomaContext.js';
import { useState } from 'react';

export default function LivroDestaque() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    
const { idioma } = useIdioma();

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: '#E7F0DB' }}
            contentContainerStyle={styles.container}>
            <View style={styles.tituloSection}>
                <View style={styles.tituloDiv}>
                    <FontAwesome name='bookmark' size={22} color='#1E1E1E' />
                    <Text style={styles.titulo}>{idioma === 'en' ? 'Featured Book' : 'Livro Destaque'}</Text>
                </View>
                <View style={styles.linha}></View>
            </View>
            </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E7F0DB',
        alignItems: 'center',
        justifyContent: 'center',
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
});
