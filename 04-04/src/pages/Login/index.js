import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const handleSubmit = async () => {
        setLoading(true);
        try {
          const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/api/auth/login`, {
            cli_email: email,
            cli_senha: senha,
          });
    
          console.log(response.data);
          await AsyncStorage.setItem('token', response.data.token);
          await AsyncStorage.setItem('id', String(response.data.result.cli_id));
          await AsyncStorage.setItem('userType', response.data.result.userType);
    
          // Ajusta o menuType conforme o tipo de usuário
          const userType = response.data.result.userType;
          const menuType =
            userType === 'Cliente' ? 'Navbar' :
            userType === 'Tecnico' ? 'NavbarTec' :
            'NavbarAdmin';
    
          await AsyncStorage.setItem('menuType', menuType);
    
          navigation.navigate('Home');
        } catch (error) {
          console.error('Erro ao fazer login:', error.response?.data || error.message);
          Alert.alert('Erro', 'Credenciais inválidas');
        } finally {
          setLoading(false);
        }
    };

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

            <TouchableOpacity 
                style={styles.loginButton} 
                onPress={handleSubmit}
                disabled={loading}>
                     {loading ? (
                <ActivityIndicator color="#FFF" />
                ) : (
                    <Text style={styles.loginButtonText}>Entrar</Text>
                )}
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
        color: '#6E22AC',
    },
    label: {
        alignSelf: 'flex-start',
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#6E22AC',
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
        color: '#6E22AC',
        fontWeight: 'bold',
    },
    loginButton: {
        backgroundColor: '#6E22AC',
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
        color: '#6E22AC',
        marginTop: 5,
    },
});
