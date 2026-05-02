import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export function TelaMenu(props) {
    return (
        <DrawerContentScrollView {...props} style={styles.container}>
            <TouchableOpacity
                style={styles.botaoFechar}
                onPress={() => props.navigation.closeDrawer()}>
                <Text style={{ fontWeight: 'bold', fontSize: 23 }}>X</Text>
            </TouchableOpacity>

            <View style={styles.section}>
                <DrawerItem
                    label="Livro Destaque"
                    labelStyle={{ fontSize: 18, fontWeight: 500, marginLeft: 10, color: '#000' }}
                    icon={() => (
                        <FontAwesome
                            name="bookmark"
                            size={24}
                            color="black"
                            style={{ marginTop: 2 }}
                        />
                    )}
                    onPress={() => props.navigation.navigate('LivroDestaque')}></DrawerItem>

                <View style={styles.ramoContainer}>
                    <View style={styles.linhaVestical}></View>

                    <View style={styles.subItems}>
                        <View style={styles.subItemsContainer}>
                            <View style={styles.tracinho}></View>
                            <DrawerItem
                                label="Enredo"
                                labelStyle={{ fontWeight: 500, fontSize: 16, color: '#000' }}
                                icon={() => (
                                    <FontAwesome5 name="book-open" size={24} color="black" />
                                )}
                                onPress={() => props.navigation.navigate('Enredo')}></DrawerItem>
                        </View>

                        <View style={styles.subItemsContainer}>
                            <View style={styles.tracinho}></View>
                            <DrawerItem
                                label="Autor"
                                labelStyle={{ fontWeight: 500, fontSize: 16, color: '#000' }}
                                icon={() => (
                                    <FontAwesome5 name="user-alt" size={24} color="black" />
                                )}
                                onPress={() => props.navigation.navigate('Autor')}></DrawerItem>
                        </View>

                        <View style={styles.subItemsContainer}>
                            <View style={styles.tracinho}></View>
                            <DrawerItem
                                label="Personagens"
                                labelStyle={{ fontWeight: 500, fontSize: 16, color: '#000' }}
                                icon={() => <FontAwesome name="users" size={24} color="black" />}
                                onPress={() =>
                                    props.navigation.navigate('Personagens')
                                }></DrawerItem>
                        </View>

                        <View style={styles.subItemsContainer}>
                            <View style={styles.tracinho}></View>
                            <DrawerItem
                                label="Simulado"
                                labelStyle={{ fontWeight: 500, fontSize: 16, color: '#000' }}
                                icon={() => (
                                    <FontAwesome name="check-square" size={24} color="black" />
                                )}
                                onPress={() => props.navigation.navigate('Simulado')}></DrawerItem>
                        </View>

                        <View style={styles.subItemsContainer}>
                            <View style={styles.tracinho}></View>
                            <DrawerItem
                                label="Videoaulas"
                                labelStyle={{ fontWeight: 500, fontSize: 16, color: '#000' }}
                                icon={() => (
                                    <FontAwesome name="video-camera" size={24} color="black" />
                                )}
                                onPress={() => props.navigation.navigate('VideoAula')}></DrawerItem>
                        </View>
                        <View style={styles.subItemsContainer}>
                            <View style={styles.tracinho}></View>
                            <DrawerItem
                                label="Vocabulario"
                                labelStyle={{ fontWeight: 500, fontSize: 16, color: '#000' }}
                                icon={() => (
                                    <FontAwesome5 name="list-alt" size={24} color="black" />
                                )}
                                onPress={() =>
                                    props.navigation.navigate('Vocabulario')
                                }></DrawerItem>
                        </View>

                        <View style={styles.subItemsContainer}>
                            <View style={styles.tracinho}></View>
                            <DrawerItem
                                label="Curiosidades"
                                labelStyle={{ fontWeight: 500, fontSize: 16, color: '#000' }}
                                icon={() => (
                                    <FontAwesome5 name="lightbulb" size={24} color="black" />
                                )}
                                onPress={() =>
                                    props.navigation.navigate('Curiosidades')
                                }></DrawerItem>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.itemRow}>
                <DrawerItem
                    label="Dicas de Vestibular"
                    labelStyle={{ fontWeight: 500, fontSize: 18, color: '#000' }}
                    icon={() => <FontAwesome5 name="graduation-cap" size={24} color="black" />}
                    onPress={() => props.navigation.navigate('DicasVestibular')}></DrawerItem>
            </View>

            <View style={styles.itemRow}>
                <DrawerItem
                    label="Biblioteca"
                    labelStyle={{ fontWeight: 500, fontSize: 18, color: '#000' }}
                    icon={() => <FontAwesome name="book" size={24} color="black" />}
                    onPress={() => props.navigation.navigate('Biblioteca')}></DrawerItem>
            </View>

            <View style={styles.itemRow}>
                <DrawerItem
                    label="Sobre"
                    labelStyle={{ fontWeight: 500, fontSize: 18, color: '#000' }}
                    icon={() => <FontAwesome6 name="circle-info" size={24} color="black" />}
                    onPress={() => props.navigation.navigate('Sobre')}></DrawerItem>
            </View>
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E7F0DB',
    },
    botaoFechar: {
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 20,
    },
    section: {
        paddingHorizontal: 15,
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ramoContainer: {
        flexDirection: 'row',
        marginLeft: 35,
        marginBottom: 15,
    },
    linhaVestical: {
        width: 1,
        backgroundColor: '#000000',
    },
    subItems: {
        flex: 1,
        marginLeft: 0,
        gap: 25,
    },
    subItemsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 30,
    },
    tracinho: {
        width: 15,
        height: 1,
        backgroundColor: '#000',
    },
});
