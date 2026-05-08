import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity, Text, Platform, useWindowDimensions } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

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

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const screenOptionsHeader = ({ navigation }) => ({
    headerStyle: {
        backgroundColor: '#C2E799',
        height: 100,
        elevation: 0,
        borderBottomWidth: 0,
        boxShadow: 'none',
    },
    headerTintColor: '#000',
    headerTitle: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Início')} activeOpacity={0.85}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#1E1E1E' }}>BookPedia</Text>
        </TouchableOpacity>
    ),
    headerTitleAlign: 'center',
    headerTitleStyle: {
        fontWeight: 'bold',
    },
    headerLeft: () => (
        <TouchableOpacity
            style={{ marginLeft: 15, width: 40, alignItems: 'center' }}
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <FontAwesome6 name='bars' size={24} color='black' />
        </TouchableOpacity>
    ),
    headerRight: () => (
        <TouchableOpacity style={{ marginRight: 15, width: 40, alignItems: 'center' }}>
            <FontAwesome5 name='language' size={30} color='black' />
        </TouchableOpacity>
    ),
});

function InitialStack({ navigation }) {
    return (
        <Stack.Navigator screenOptions={screenOptionsHeader}>
            <Stack.Screen name='Home' component={PaginaInicial}></Stack.Screen>
        </Stack.Navigator>
    );
}

function CuriosidadesStack() {
    return (
        <Stack.Navigator screenOptions={screenOptionsHeader}>
            <Stack.Screen name='CuriosidadesScreen' component={Curiosidades} />
        </Stack.Navigator>
    );
}

function SobreStack() {
    return (
        <Stack.Navigator screenOptions={screenOptionsHeader}>
            <Stack.Screen name='SobreScreen' component={Sobre} />
        </Stack.Navigator>
    );
}

function SimuladoStack() {
    return (
        <Stack.Navigator screenOptions={screenOptionsHeader}>
            <Stack.Screen name='SimuladoScreen' component={Simulado} />
        </Stack.Navigator>
    );
}

function EnredoStack() {
    return (
        <Stack.Navigator screenOptions={screenOptionsHeader}>
            <Stack.Screen name='EnredoScreen' component={Enredo} />
        </Stack.Navigator>
    );
}

function VideoAulaStack() {
    return (
        <Stack.Navigator screenOptions={screenOptionsHeader}>
            <Stack.Screen name='VideoAulaScreen' component={VideoAula} />
        </Stack.Navigator>
    );
}

function DicasVestibularStack() {
    return (
        <Stack.Navigator screenOptions={screenOptionsHeader}>
            <Stack.Screen name='DicasVestibularScreen' component={DicasVestibular} />
        </Stack.Navigator>
    );
}

function LivroDestaqueStack() {
    return (
        <Stack.Navigator screenOptions={screenOptionsHeader}>
            <Stack.Screen name='LivroDestaqueScreen' component={LivroDestaque} />
        </Stack.Navigator>
    );
}

function AutorStack() {
    return (
        <Stack.Navigator screenOptions={screenOptionsHeader}>
            <Stack.Screen name='AutorScreen' component={Autor} />
        </Stack.Navigator>
    );
}

function PersonagensStack() {
    return (
        <Stack.Navigator screenOptions={screenOptionsHeader}>
            <Stack.Screen name='PersonagensScreen' component={Personagens} />
        </Stack.Navigator>
    );
}

function BibliotecaStack() {
    return (
        <Stack.Navigator screenOptions={screenOptionsHeader}>
            <Stack.Screen name='BibliotecaScreen' component={Biblioteca} />
        </Stack.Navigator>
    );
}

function VocabularioStack() {
    return (
        <Stack.Navigator screenOptions={screenOptionsHeader}>
            <Stack.Screen name='VocabularioScreen' component={Vocabulario} />
        </Stack.Navigator>
    );
}

export default function App() {
    const { width } = useWindowDimensions();
    const drawerWidth = Platform.OS === 'web' ? Math.min(380, width * 0.88) : '100%';

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
                <Drawer.Navigator
                    initialRouteName='Início'
                    screenOptions={{
                        headerShown: false,
                        swipeEnabled: Platform.OS !== 'web',
                        drawerStyle: {
                            width: drawerWidth,
                        },
                    }}
                    drawerContent={(props) => <TelaMenu {...props}></TelaMenu>}>
                    <Drawer.Screen name='Início' component={InitialStack}></Drawer.Screen>
                    <Drawer.Screen
                        name='Curiosidades'
                        component={CuriosidadesStack}></Drawer.Screen>
                    <Drawer.Screen name='Biblioteca' component={BibliotecaStack}></Drawer.Screen>
                    <Drawer.Screen name='Sobre' component={SobreStack}></Drawer.Screen>
                    <Drawer.Screen name='Vocabulario' component={VocabularioStack}></Drawer.Screen>
                    <Drawer.Screen name='Autor' component={AutorStack}></Drawer.Screen>
                    <Drawer.Screen name='Personagens' component={PersonagensStack}></Drawer.Screen>
                    <Drawer.Screen
                        name='LivroDestaque'
                        component={LivroDestaqueStack}></Drawer.Screen>
                    <Drawer.Screen name='Simulado' component={SimuladoStack}></Drawer.Screen>
                    <Drawer.Screen name='VideoAula' component={VideoAulaStack}></Drawer.Screen>
                    <Drawer.Screen name='Enredo' component={EnredoStack}></Drawer.Screen>
                    <Drawer.Screen
                        name='DicasVestibular'
                        component={DicasVestibularStack}></Drawer.Screen>
                </Drawer.Navigator>
            </NavigationContainer>
        </GestureHandlerRootView>
    );
}
