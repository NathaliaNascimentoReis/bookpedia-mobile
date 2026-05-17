import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useState } from 'react';
import { useIdioma } from '../IdiomaContext.js';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Footer() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const { width } = useWindowDimensions();
    const isMobile = width < 760;

    const infosFooter = () => (
        <View style={isMobile ? styles.sectionMobile : styles.sectionDesktop}>
            <View style={styles.socialmedia}>
                <Text style={styles.sectionTitle}>NOS SIGA</Text>
                <View style={styles.icones}>
                    <FontAwesome name="instagram" size={28} color="white" />
                    <FontAwesome name="facebook-square" size={28} color="white" />
                    <FontAwesome name="twitter-square" size={28} color="white" />
                </View>
            </View>

            <View style={styles.div}>
                <Text style={styles.sectionTitle}>DESCUBRA</Text>
                <View style={styles.textos}>
                    <Text style={styles.text}>Início</Text>
                    <Text style={styles.text}>Livro Destaque</Text>
                    <Text style={styles.text}>Biblioteca</Text>
                </View>
            </View>

            <View style={styles.div}>
                <Text style={styles.sectionTitle}>SOBRE NÓS</Text>
                <View style={styles.textos}>
                    <Text style={styles.text}>Sobre Nós</Text>
                    <Text style={styles.text}>Política de Privacidade</Text>
                    <Text style={styles.text}>Termos de Uso</Text>
                </View>
            </View>

            <View style={styles.div}>
                <Text style={styles.sectionTitle}>CONTEÚDO</Text>
                <View style={styles.textos}>
                    <Text style={styles.text}>Direitos autorais</Text>
                    <Text style={styles.text}>Sobre BookPedia</Text>
                    <Text style={styles.text}>Termos de Uso</Text>
                </View>
            </View>
        </View>
    );

    return <View style={styles.footer}>{infosFooter()}</View>;
}

const styles = StyleSheet.create({
    footer: {
        paddingHorizontal: 20,
        paddingVertical: 30,
        backgroundColor: '#C1AB89',
        width: '100%',
        alignSelf: 'stretch',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    socialmedia: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    icones: {
        flexDirection: 'row',
        gap: 5,
    },
    sectionMobile: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 20,
        width: '100%',
    },
    sectionDesktop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 20,
    },
    div: {
        gap: 5,
        flexGrow: 1,
        flexBasis: 120,
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    textos: {
        gap: 3,
    },
    text: {
        color: '#fff',
        fontSize: 14,
    },
});
