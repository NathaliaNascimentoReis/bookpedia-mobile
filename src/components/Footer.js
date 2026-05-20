import { StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { useState } from 'react';
import { useIdioma } from '../IdiomaContext.js';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

export default function Footer() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const { idioma } = useIdioma();

    const { width } = useWindowDimensions();
    const isMobile = width < 760;

    const navigation = useNavigation();

    const navegarPara = (nomeDaTela) => {
        navigation.navigate(nomeDaTela);
    };

    const infosFooter = () => (
        <View style={isMobile ? styles.sectionMobile : styles.sectionDesktop}>
            <View style={styles.socialmedia}>
                <Text style={styles.sectionTitle}>
                    {idioma === 'en' ? 'CONNECT WITH US' : 'CONECTE-SE CONOSCO'}
                </Text>
                <View style={styles.icones}>
                    <TouchableOpacity>
                        <FontAwesome name="instagram" size={32} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesome name="facebook-square" size={32} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesome name="twitter-square" size={32} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.div}>
                <Text style={styles.sectionTitle}>{idioma === 'en' ? 'DISCOVER' : 'DESCUBRA'}</Text>
                <View style={styles.textos}>
                    <TouchableOpacity onPress={() => navegarPara('Início')}>
                        <Text style={styles.text}>{idioma === 'en' ? 'Home' : 'Início'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navegarPara('LivroDestaque')}>
                        <Text style={styles.text}>
                            {idioma === 'en' ? 'Featured Book' : 'Livro Destaque'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navegarPara('Biblioteca')}>
                        <Text style={styles.text}>
                            {idioma === 'en' ? 'Library' : 'Biblioteca'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.div}>
                <Text style={styles.sectionTitle}>
                    {idioma === 'en' ? 'ABOUT US' : 'SOBRE NÓS'}
                </Text>
                <View style={styles.textos}>
                    <TouchableOpacity onPress={() => navegarPara('Sobre')}>
                        <Text style={styles.text}>
                            {idioma === 'en' ? 'About Us' : 'Sobre nós'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.text}>
                            {idioma === 'en' ? 'Privacy policy' : 'Política de Privacidade'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.text}>
                            {idioma === 'en' ? 'Terms of use' : 'Termos de uso'}
                        </Text>
                    </TouchableOpacity>
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
        gap: 8,
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
        maxWidth: 200,
        flexWrap: 'wrap',
    },
    textos: {
        gap: 3,
    },
    text: {
        color: '#fff',
        fontSize: 14,
    },
});
