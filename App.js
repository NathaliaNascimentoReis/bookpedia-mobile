import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity, Text, Platform, useWindowDimensions } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import { ScrollView, View } from 'react-native';

import PaginaInicial from './src/screens/PaginaInicialScreen.js';
import Curiosidades from './src/screens/CuriosidadesScreen.js';
import Biblioteca from './src/screens/BibliotecaScreen.js';
import Simulado from './src/screens/SimuladoScreen.js';
import Sobre from './src/screens/SobreScreen.js';
import Autor from './src/screens/AutorScreen.js';
import Personagens from './src/screens/PersonagensScreen.js';
import Enredo from './src/screens/EnredoScreen.js';
import LivroDestaque from './src/screens/LivroDestaqueScreen.js';
import Vocabulario from './src/screens/VocabularioScreen.js';
import VideoAula from './src/screens/VideoaulasScreen.js';
import DicasVestibular from './src/screens/DicasVestibularScreen.js';
import { TelaMenu } from './src/screens/MenuScreen.js';

import { IdiomaProvider, useIdioma } from './src/IdiomaContext.js';
import Footer from './src/components/Footer.js';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const getHeaderOptions = (navigation, idioma, alternarIdioma) => ({
    headerStyle: { backgroundColor: '#C2E799', height: 100, elevation: 0, shadowOpacity: 0 },
    headerTintColor: '#000',
    headerTitleAlign: 'center',
    headerTitle: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Início')} activeOpacity={0.85}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#1E1E1E' }}>BookPedia</Text>
        </TouchableOpacity>
    ),
    headerLeft: () => (
        <TouchableOpacity
            style={{ marginLeft: 15, width: 40, alignItems: 'center' }}
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <FontAwesome6 name="bars" size={24} color="black" />
        </TouchableOpacity>
    ),
    headerRight: () => (
        <TouchableOpacity
            style={{ marginRight: 15, width: 40, alignItems: 'center' }}
            onPress={alternarIdioma}>
            <FontAwesome5 name="language" size={30} color={idioma === 'en' ? '#2E7D32' : 'black'} />
        </TouchableOpacity>
    ),
});

function GenericStack({ navigation, component: Component, name }) {
    const { idioma, alternarIdioma } = useIdioma();

    return (
        <Stack.Navigator screenOptions={() => getHeaderOptions(navigation, idioma, alternarIdioma)}>
            <Stack.Screen name={name}>
                {(props) => (
                    <View style={{ flex: 1 }}>
                        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
                            <Component {...props} />
                            <Footer />
                        </ScrollView>
                    </View>
                )}
            </Stack.Screen>
        </Stack.Navigator>
    );
}

function AppContent() {
    const { width } = useWindowDimensions();
    const { idioma } = useIdioma();
    const drawerWidth = Platform.OS === 'web' ? Math.min(380, width * 0.88) : '100%';

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
                <Drawer.Navigator
                    initialRouteName="Início"
                    screenOptions={{
                        headerShown: false,
                        swipeEnabled: Platform.OS !== 'web',
                        drawerStyle: { width: drawerWidth },
                    }}
                    key={idioma}
                    drawerContent={(props) => <TelaMenu {...props} idioma={idioma} />}>
                    <Drawer.Screen name="Início">
                        {(props) => (
                            <GenericStack {...props} name="Home" component={PaginaInicial} />
                        )}
                    </Drawer.Screen>
                    <Drawer.Screen name="Curiosidades">
                        {(props) => (
                            <GenericStack
                                {...props}
                                name="CuriosidadesScreen"
                                component={Curiosidades}
                            />
                        )}
                    </Drawer.Screen>
                    <Drawer.Screen name="Biblioteca">
                        {(props) => (
                            <GenericStack
                                {...props}
                                name="BibliotecaScreen"
                                component={Biblioteca}
                            />
                        )}
                    </Drawer.Screen>
                    <Drawer.Screen name="Sobre">
                        {(props) => (
                            <GenericStack {...props} name="SobreScreen" component={Sobre} />
                        )}
                    </Drawer.Screen>
                    <Drawer.Screen name="Vocabulario">
                        {(props) => (
                            <GenericStack
                                {...props}
                                name="VocabularioScreen"
                                component={Vocabulario}
                            />
                        )}
                    </Drawer.Screen>
                    <Drawer.Screen name="Autor">
                        {(props) => (
                            <GenericStack {...props} name="AutorScreen" component={Autor} />
                        )}
                    </Drawer.Screen>
                    <Drawer.Screen name="Personagens">
                        {(props) => (
                            <GenericStack
                                {...props}
                                name="PersonagensScreen"
                                component={Personagens}
                            />
                        )}
                    </Drawer.Screen>
                    <Drawer.Screen name="LivroDestaque">
                        {(props) => (
                            <GenericStack
                                {...props}
                                name="LivroDestaqueScreen"
                                component={LivroDestaque}
                            />
                        )}
                    </Drawer.Screen>
                    <Drawer.Screen name="Simulado">
                        {(props) => (
                            <GenericStack {...props} name="SimuladoScreen" component={Simulado} />
                        )}
                    </Drawer.Screen>
                    <Drawer.Screen name="VideoAula">
                        {(props) => (
                            <GenericStack {...props} name="VideoAulaScreen" component={VideoAula} />
                        )}
                    </Drawer.Screen>
                    <Drawer.Screen name="Enredo">
                        {(props) => (
                            <GenericStack {...props} name="EnredoScreen" component={Enredo} />
                        )}
                    </Drawer.Screen>
                    <Drawer.Screen name="DicasVestibular">
                        {(props) => (
                            <GenericStack
                                {...props}
                                name="DicasVestibularScreen"
                                component={DicasVestibular}
                            />
                        )}
                    </Drawer.Screen>
                </Drawer.Navigator>
            </NavigationContainer>
        </GestureHandlerRootView>
    );
}

export default function App() {
    return (
        <IdiomaProvider>
            <AppContent />
        </IdiomaProvider>
    );
}
