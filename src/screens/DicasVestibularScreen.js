import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function DicasVestibular() {
    return (
        <View style={styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
            <StatusBar style='auto' />
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
