import React, { useState } from "react";
import { useRouter } from 'expo-router';
import api from './api'
import { View, Text, StyleSheet, TextInput, TouchableOpacity} from "react-native";

export default function Cadastro() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
    const router = useRouter();

    async function cadastrarUsuario(){
        try {
          const response = await api.post('/api/cliente', {
            cli_email: email,
            cli_senha: senha
          })
          console.log('Usuário criado:', response.data)
          alert('Usuário criado com sucesso!')
          router.push('/')
        } catch (error) {
          // Verifica se a resposta de erro contém a propriedade `message` para exibir uma mensagem personalizada
          if (error.response && error.response.data && error.response.data.message) {
            const errorMessage = error.response.data.message.join(' '); // Se `message` for um array, podemos juntar as mensagens
            alert(`Erro ao cadastrar o novo usuário: ${errorMessage}`);
          } else {
            // Caso não tenha a estrutura de erro esperada, exibe uma mensagem genérica
            alert('Erro ao cadastrar o novo usuário. Tente novamente mais tarde.');
          }
      
          console.log('Erro:', error);
        }
      }
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Criar Conta</Text>

            <Text style={styles.label}>Informe o seu E-mail:</Text>
            <TextInput
                style={styles.textInput}
                value={email}
                onChangeText={setEmail}
                placeholder="Digite seu e-mail"
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <Text style={styles.label}>Informe a sua Senha:</Text>
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.textInputSenha}
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
                        {mostrarSenha ? "Ocultar" : "Mostrar"}
                    </Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.label}>Confirme a sua Senha:</Text>
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.textInputSenha}
                    value={confirmarSenha}
                    onChangeText={setConfirmarSenha}
                    placeholder="Confirme sua senha"
                    secureTextEntry={!mostrarConfirmarSenha}
                />
                <TouchableOpacity
                    style={styles.toggleButton}
                    onPress={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                >
                    <Text style={styles.toggleButtonText}>
                        {mostrarConfirmarSenha ? "Ocultar" : "Mostrar"}
                    </Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.registerButton} onPress={cadastrarUsuario}>
                <Text style={styles.registerButtonText}>Cadastrar</Text>
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
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#6E22AC',
        paddingBottom: 15
    },
    label: {
        alignSelf: 'flex-start',
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#6E22AC',
        marginTop: 10,
    },
    textInput: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#fff',
        marginTop: 5,
    },
    textInputSenha: {
        flex: 1,
        height: 50,
        paddingHorizontal: 15,
    },
    toggleButton: {
        padding: 10,
    },
    toggleButtonText: {
        color: '#6E22AC',
        fontWeight: 'bold',
    },
    registerButton: {
        backgroundColor: '#6E22AC',
        width: '100%',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    registerButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
