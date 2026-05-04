import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, Image, useWindowDimensions, Platform } from 'react-native';

export default function PaginaInicial() {
    const { width } = useWindowDimensions();

    return (
        <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator
            nestedScrollEnabled
            bounces={false}>
            <View style={styles.titulos}>
                <Text style={styles.titulo}>Já explorou a literatura hoje?</Text>

                <View style={styles.intro}>
                    <Text style={styles.introTexto}>
                        Bem-vindo ao BookPedia! Aqui você descobre, explora e mergulha nos melhores
                        títulos da literatura brasileira e mundial. Encontre sua próxima leitura
                        favorita e expanda seu universo literário.
                    </Text>
                </View>
            </View>
            <View style={styles.intro}>
                <Text style={styles.introTexto}>
                    Introdução ao projeto: Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat.
                </Text>
                <Text style={styles.introTexto}>
                    Introdução ao projeto: Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat.
                </Text>
                <Text style={styles.introTexto}>
                    Introdução ao projeto: Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat.
                </Text>
                <Text style={styles.introTexto}>
                    Introdução ao projeto: Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat.
                </Text>
                <Text style={styles.introTexto}>
                    Introdução ao projeto: Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat.
                </Text>
            </View>

                <View style={styles.livroDestaque}>
                    <Text style={styles.tituloLivro}>O Guarani, de José de Alencar</Text>
                    <Image
                        source={{
                            uri: 'https://s5.static.brasilescola.uol.com.br/be/2023/07/indigena-guarani.jpg',
                        }}
                        style={[styles.imagemLivroDestaque, { width: width - 50 }]}
                        resizeMode="cover"
                    />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#E7F0DB',
        ...(Platform.OS === 'web'
            ? {
                  height: '100%',
                  overflowY: 'auto',
              }
            : null),
    },
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingBottom: 32,
        ...(Platform.OS === 'web'
            ? {
                  minHeight: '100%',
              }
            : null),
    },
    titulos: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        gap: 5,
    },
    titulo: {
        color: '#453E34',
        fontSize: 20,
        fontWeight: '500',
    },
    subtitulo: {
        backgroundColor: '#E0D5C4',
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 15,
        marginVertical: 10,
        marginHorizontal: 20,
    },
    subtituloTexto: {
        color: '#453E34',
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
    },
    intro: {
        backgroundColor: '#caad92',
        padding: 10,
        paddingHorizontal: 20,
        marginHorizontal: 20,
        borderRadius: 15,
        margin: 10,
    },
    introTexto: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: '500',
    },
    livroDestaque: {
        margin: 10,
        gap: 20,
        alignItems: 'center',
    },
    tituloLivro: {
        fontWeight: '600',
        fontSize: 20,
        textAlign: 'center',
        color: '#453E34',
    },
    imagemLivroDestaque: {
        height: 500,
        borderRadius: 15,
        borderColor: '#fff',
        borderWidth: 10,
    },
});
