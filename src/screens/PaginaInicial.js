import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Menu, Languages } from 'lucide-react-native';

export default function PaginaInicial() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity activeOpacity={0.8}>
                    <Menu color="#111" size={26} />
                </TouchableOpacity>

                <Text style={styles.logoText}>BookPedia</Text>

                <TouchableOpacity activeOpacity={0.8}>
                    <Languages color="#111" size={24} />
                </TouchableOpacity>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}>
                <Text style={styles.headline}>Já explorou a literatura hoje?</Text>

                <View style={styles.highlightTag}>
                    <Text style={styles.subHeadline}>O BookPedia pode te ajudar nisso!</Text>
                </View>

                <View style={styles.introBox}>
                    <Text style={styles.introText}>
                        Introdução do projeto: Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                        enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat.
                    </Text>
                </View>

                <Text style={styles.bookTitle}>O Guarani, de José de Alencar</Text>

                <View style={styles.imageWrapper}>
                    <View style={styles.imagePlaceholder}>
                        <Text style={styles.imagePlaceholderText}>Espaço para foto</Text>
                        <Text style={styles.imagePlaceholderHint}>
                            Substitua este bloco por `Image` depois
                        </Text>
                    </View>
                </View>

                <View style={styles.footer}>
                    <View style={styles.footerColumn}>
                        <Text style={styles.footerTitle}>SOBRE NÓS</Text>
                        <TouchableOpacity activeOpacity={0.8}>
                            <Text style={styles.footerLink}>Sobre Nós</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8}>
                            <Text style={styles.footerLink}>Política de Privacidade</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8}>
                            <Text style={styles.footerLink}>Termos de Uso</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.footerColumn}>
                        <Text style={styles.footerTitle}>CONTEÚDO</Text>
                        <TouchableOpacity activeOpacity={0.8}>
                            <Text style={styles.footerLink}>Direitos autorais</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8}>
                            <Text style={styles.footerLink}>Sobre BookPedia</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E6ECDC',
    },
    header: {
        height: 82,
        paddingHorizontal: 22,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#B7D98D',
    },
    logoText: {
        fontSize: 34,
        fontWeight: '700',
        color: '#101010',
        letterSpacing: 0.3,
    },
    scrollContent: {
        paddingTop: 18,
        paddingHorizontal: 18,
        paddingBottom: 26,
    },
    headline: {
        fontSize: 42,
        fontWeight: '700',
        color: '#1B1B1B',
        textAlign: 'center',
        marginBottom: 14,
    },
    highlightTag: {
        alignSelf: 'center',
        backgroundColor: '#AFD989',
        borderRadius: 14,
        paddingHorizontal: 18,
        paddingVertical: 10,
        marginBottom: 20,
    },
    subHeadline: {
        fontSize: 34,
        fontWeight: '700',
        color: '#111',
        textAlign: 'center',
    },
    introBox: {
        width: '100%',
        backgroundColor: '#BCA98A',
        borderRadius: 14,
        padding: 16,
        marginBottom: 18,
    },
    introText: {
        fontSize: 34,
        lineHeight: 46,
        color: '#F4F4F4',
        fontWeight: '600',
    },
    bookTitle: {
        fontSize: 44,
        fontWeight: '700',
        color: '#171717',
        marginBottom: 10,
    },
    imageWrapper: {
        borderRadius: 16,
        backgroundColor: '#B6DA8E',
        padding: 10,
        marginBottom: 22,
    },
    imagePlaceholder: {
        width: '100%',
        height: 230,
        borderRadius: 10,
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: '#5A6C49',
        backgroundColor: '#E7F3DA',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 18,
    },
    imagePlaceholderText: {
        fontSize: 24,
        fontWeight: '700',
        color: '#3C4B2F',
        marginBottom: 6,
    },
    imagePlaceholderHint: {
        fontSize: 16,
        color: '#556649',
        textAlign: 'center',
    },
    footer: {
        marginHorizontal: -18,
        backgroundColor: '#BCA98A',
        paddingHorizontal: 20,
        paddingVertical: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 18,
    },
    footerColumn: {
        flex: 1,
    },
    footerTitle: {
        fontSize: 38,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 8,
    },
    footerLink: {
        fontSize: 28,
        color: '#FFFFFF',
        marginBottom: 4,
        fontWeight: '500',
    },
});
