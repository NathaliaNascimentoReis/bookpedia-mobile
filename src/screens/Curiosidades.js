import React from 'react';
import { View, Text, Button } from 'react-native';

export default function Curiosidades({ navigation }) {
    return (
        // A View abaixo é a sua "div" principal
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Bem-vindo às Curiosidades!</Text>

            <Button
                title="Ir para Outros Livros"
                onPress={() => navigation.navigate('OutrosLivros')}
            />
        </View>
    );
}
