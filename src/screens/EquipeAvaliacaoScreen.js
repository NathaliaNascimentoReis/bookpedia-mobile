import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import { useIdioma } from '../IdiomaContext.js';
import { useState, useEffect } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function EquipeAvaliacao() {
    const route = useRoute();
    const navigation = useNavigation();
    const { membro } = route.params || {};

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const { idioma } = useIdioma();

    const quantidadeEstrelas = Math.floor(Number(membro.avaliacaoDaObra || 1));

    return (
        <ScrollView style={styles.background} contentContainerStyle={styles.container}>
            <View style={styles.tituloSection}>
                <View style={styles.tituloDiv}>
                    <FontAwesome6 name="pen-to-square" size={24} color="black" />
                    <Text style={styles.titulo}>
                        {idioma === 'en'
                            ? `Evaluation by ${membro.nome}`
                            : `Avaliação de ${membro.nome}`}
                    </Text>
                </View>
                <View style={styles.linha}></View>
            </View>

            <View style={[styles.intro, { backgroundColor: '#839c73', marginBottom: 10 }]}>
                <Text style={[styles.introTexto, { color: '#ffffff', fontSize: 14 }]}>
                    {idioma === 'en'
                        ? 'Want to see the book through different eyes? Check out the unique perspectives from the BookPedia team!'
                        : 'Quer ver a obra por outros olhos? Confira as perspectivas únicas da equipe BookPedia!'}
                </Text>
            </View>

            <View style={styles.main}>
                <View style={styles.membroCard}>
                    <View style={styles.cardTituloContainer}>
                        <View style={styles.infoDiv}>
                            {membro.curso !== 'Desenvolvimento de Sistemas' ? (
                                <FontAwesome6 name="puzzle-piece" size={22} color="white" />
                            ) : (
                                <FontAwesome5 name="code" size={22} color="white" />
                            )}
                            <Text style={styles.cardTitulo}>{membro.nome}</Text>
                        </View>
                    </View>

                    <View style={styles.infoMembro}>
                        <Image source={{ uri: membro.fotoURL }} style={styles.fotoMembro} />

                        {/* Avaliação da obra */}
                        <View style={[styles.div, { alignItems: 'center', flexDirection: 'row' }]}>
                            <Text style={styles.infoTexto}>
                                <Text style={styles.boldText}>
                                    {idioma === 'en' ? 'Rating: ' : 'Avaliação: '}
                                </Text>
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginLeft: 6,
                                    alignItems: 'center',
                                }}>
                                {Array.from({ length: quantidadeEstrelas }).map((_, index) => (
                                    <FontAwesome
                                        key={index}
                                        name="star"
                                        size={18}
                                        color="black"
                                        style={{ marginRight: 3 }}
                                    />
                                ))}
                            </View>
                        </View>

                        {/* Dias de leitura */}
                        <View style={styles.div}>
                            <Text style={styles.infoTexto}>
                                <Text style={styles.boldText}>
                                    {idioma === 'en' ? 'Reading Days: ' : 'Dias de Leitura: '}
                                </Text>
                                {membro.diasDeLeitura}
                            </Text>
                        </View>

                        {/* Opinião / Reflexão */}
                        <View style={styles.div}>
                            <Text style={styles.infoTexto}>
                                <Text style={styles.boldText}>
                                    {idioma === 'en'
                                        ? 'Personal Reflection: '
                                        : 'Reflexão Individual: '}
                                </Text>
                                {idioma === 'en'
                                    ? membro.opiniaoEn || membro.opiniao
                                    : membro.opiniao}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

            <View
                style={{
                    alignSelf: 'flex-start',
                    marginTop: 20,
                }}>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 20,
                        borderRadius: 12,
                        padding: 12,
                        backgroundColor: '#C2E799',
                        shadowColor: 'rgb(0, 0, 0)',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        elevation: 3,
                    }}
                    onPress={() => navigation.navigate('Sobre')}>
                    <FontAwesome name="chevron-left" size={22} color="#000000" />
                    <Text style={{ fontSize: 16, color: '#000000', fontWeight: '500' }}>
                        {idioma === 'en' ? 'Return' : 'Voltar'}
                    </Text>
                </TouchableOpacity>
            </View>
            <StatusBar style="auto" />
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
        width: '100%',
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
    fotoMembro: {
        width: 180,
        height: 180,
        borderRadius: 12,
        marginBottom: 10,
        borderWidth: 5,
        borderColor: '#ffffff',
        alignSelf: 'center',
    },
});
