import { DrawerContentScrollView } from '@react-navigation/drawer';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useIdioma } from '../IdiomaContext.js';

const mainItems = [
    {
        label: 'Livro Destaque',
        labelEn: 'Featured Book',
        route: 'LivroDestaque',
        icon: () => <FontAwesome name="bookmark" size={22} color="#1E1E1E" />,
    },
];

const relatedItems = [
    {
        label: 'Enredo',
        labelEn: 'Story',
        route: 'Enredo',
        icon: () => <FontAwesome5 name="book-open" size={18} color="#1E1E1E" />,
    },
    {
        label: 'Autor',
        labelEn: 'Author',
        route: 'Autor',
        icon: () => <FontAwesome5 name="user-alt" size={18} color="#1E1E1E" />,
    },
    {
        label: 'Personagens',
        labelEn: 'Characters',
        route: 'Personagens',
        icon: () => <FontAwesome name="users" size={18} color="#1E1E1E" />,
    },
    {
        label: 'Simulado',
        labelEn: 'Quizzes',
        route: 'Simulado',
        icon: () => <FontAwesome name="check-square" size={18} color="#1E1E1E" />,
    },
    {
        label: 'Videoaulas',
        labelEn: 'Video Classes',
        route: 'VideoAula',
        icon: () => <FontAwesome name="video-camera" size={18} color="#1E1E1E" />,
    },
    {
        label: 'Vocabulário',
        labelEn: 'Vocabulary',
        route: 'Vocabulario',
        icon: () => <FontAwesome5 name="list-alt" size={18} color="#1E1E1E" />,
    },
    {
        label: 'Curiosidades',
        labelEn: 'Curiosities',
        route: 'Curiosidades',
        icon: () => <FontAwesome5 name="lightbulb" size={18} color="#1E1E1E" />,
    },
];

const secondaryItems = [
    {
        label: 'Dicas de Vestibular',
        labelEn: 'Exam Tips',
        route: 'DicasVestibular',
        icon: () => <FontAwesome5 name="graduation-cap" size={22} color="#1E1E1E" />,
    },
    {
        label: 'Biblioteca',
        labelEn: 'Library',
        route: 'Biblioteca',
        icon: () => <FontAwesome name="book" size={22} color="#1E1E1E" />,
    },
    {
        label: 'Sobre',
        labelEn: 'About',
        route: 'Sobre',
        icon: () => <FontAwesome6 name="circle-info" size={22} color="#1E1E1E" />,
    },
];

function MenuButton({ icon, label, onPress, compact = false }) {
    const Icon = icon;

    return (
        <TouchableOpacity
            style={[styles.menuButton, compact && styles.menuButtonCompact]}
            onPress={onPress}
            activeOpacity={0.85}>
            <View style={styles.iconWrap}>
                <Icon />
            </View>
            <Text style={[styles.menuLabel, compact && styles.menuLabelCompact]}>{label}</Text>
        </TouchableOpacity>
    );
}

export function TelaMenu(props) {
    const { idioma } = useIdioma();

    const navigateTo = (route) => {
        props.navigation.navigate(route);
        props.navigation.closeDrawer();
    };

    return (
        <DrawerContentScrollView
            {...props}
            style={styles.container}
            contentContainerStyle={styles.contentContainer}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => props.navigation.closeDrawer()}
                    activeOpacity={0.85}>
                    <FontAwesome6 name="xmark" size={20} color="#1E1E1E" />
                </TouchableOpacity>

                <Text style={styles.menuTitle}>
                    {idioma === 'en' ? 'Explore BookPedia' : 'Explorar o BookPedia'}
                </Text>
                <Text style={styles.menuSubtitle}>
                    {idioma === 'en'
                        ? 'Choose a section to continue'
                        : 'Escolha uma seção para continuar'}
                </Text>
            </View>

            <View style={styles.sectionCard}>
                {mainItems.map((item) => (
                    <MenuButton
                        key={item.route}
                        icon={item.icon}
                        label={idioma === 'en' ? item.labelEn : item.label}
                        onPress={() => navigateTo(item.route)}
                    />
                ))}

                <View style={styles.subSection}>
                    <Text style={styles.subSectionTitle}>
                        {idioma === 'en' ? 'Chapters and content' : 'Capítulos e conteúdos'}
                    </Text>
                    {relatedItems.map((item) => (
                        <MenuButton
                            key={item.route}
                            icon={item.icon}
                            label={idioma === 'en' ? item.labelEn : item.label}
                            compact
                            onPress={() => navigateTo(item.route)}
                        />
                    ))}
                </View>
            </View>

            <View style={styles.sectionCard}>
                {secondaryItems.map((item) => (
                    <MenuButton
                        key={item.route}
                        icon={item.icon}
                        label={idioma === 'en' ? item.labelEn : item.label}
                        onPress={() => navigateTo(item.route)}
                    />
                ))}
            </View>
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E7F0DB',
    },
    contentContainer: {
        padding: 20,
        gap: 18,
    },
    header: {
        backgroundColor: '#CFE7AF',
        borderRadius: 24,
        padding: 20,
        gap: 8,
    },
    closeButton: {
        alignSelf: 'flex-start',
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F0E5',
    },
    menuTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1E1E1E',
    },
    menuSubtitle: {
        fontSize: 15,
        color: '#46513A',
    },
    sectionCard: {
        backgroundColor: '#F7F3E8',
        borderRadius: 24,
        padding: 14,
        gap: 10,
    },
    subSection: {
        marginTop: 4,
        paddingTop: 8,
        gap: 8,
    },
    subSectionTitle: {
        fontSize: 13,
        fontWeight: '700',
        color: '#5C664F',
        textTransform: 'uppercase',
        letterSpacing: 0.6,
        paddingHorizontal: 8,
    },
    menuButton: {
        minHeight: 58,
        borderRadius: 18,
        paddingHorizontal: 14,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        backgroundColor: '#E9DFC9',
    },
    menuButtonCompact: {
        minHeight: 50,
        backgroundColor: '#EFE7D7',
    },
    iconWrap: {
        width: 34,
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuLabel: {
        flex: 1,
        fontSize: 18,
        fontWeight: '600',
        color: '#1E1E1E',
    },
    menuLabelCompact: {
        fontSize: 16,
        fontWeight: '500',
    },
});
