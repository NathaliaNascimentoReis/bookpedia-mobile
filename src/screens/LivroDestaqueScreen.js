import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useIdioma } from '../IdiomaContext.js';
import { useState } from 'react';

export default function LivroDestaque() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    
    return (
        <View style={styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E7F0DB',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
