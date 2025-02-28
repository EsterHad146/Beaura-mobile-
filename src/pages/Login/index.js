import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput} from "react-native";
import { useNavigation } from "@react-navigation/native";


export default function Login() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo(a)!</Text>

            <Text style={styles.label}>E-mail</Text>
            <TextInput
                style={styles.textInput}
                value={email}
                onChangeText={setEmail}
                placeholder="Digite seu e-mail"
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <Text style={styles.label}>Senha</Text>
            <TextInput
                style={styles.textInput}
                value={senha}
                onChangeText={setSenha}
                placeholder="Digite sua senha"
                secureTextEntry={!mostrarSenha} // Mantém oculta por padrão
            />

            <TouchableOpacity 
                style={styles.toggleButton}
                onPress={() => setMostrarSenha(!mostrarSenha)}
            >
                <Text style={styles.toggleButtonText}>
                    {mostrarSenha ? "Ocultar Senha" : "Mostrar Senha"}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton}>
                <Text style={styles.loginButtonText}>Entrar</Text>
            </TouchableOpacity>

            <Text style={styles.footerText}>Sua primeira vez por aqui?</Text>
            <TouchableOpacity
                onPress={()=> navigation.navigate('Cadastro')}
            >
                <Text style={styles.registerText}>Cadastre-se agora</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5', // Cor de fundo suave
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    label: {
        alignSelf: 'flex-start',
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
    },
    textInput: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    toggleButton: {
        marginBottom: 10,
    },
    toggleButtonText: {
        color: '#007bff',
        fontWeight: 'bold',
    },
    loginButton: {
        backgroundColor: '#007bff',
        width: '100%',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footerText: {
        marginTop: 20,
        fontSize: 14,
        color: '#555',
    },
    registerText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007bff',
        marginTop: 5,
    },
});
