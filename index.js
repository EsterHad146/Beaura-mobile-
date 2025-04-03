import { useState, React} from "react";
import { Image, View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import api from "./api";
import styles from "./styles";

export default function App(){
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [auth, setAuth] = useState(null)

  const router = useRouter();

  async function realizarLogin(){
    try {
      const response = await api.post('/api/auth/login', {
        cli_email: email,
        cli_senha: senha
      })
      console.log(response.data)
      let {result, token} = response.data
      setAuth({
        id:result.cli_id,
        token:token
      })
      alert('Usuario autenticado com sucesso!')
    } catch (error) {
      console.log(`Erro de autenticação
              ${error}
      `)
    }
  }


  return(
      <ScrollView>
        <LinearGradient 
          style={{
          height: 175, 
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}

        start={{x:0,y:1}}
        end={{x:1.25,y:0}}
        colors={['#6E22AC','#30DCC9']}>
          <Image style={{ width: 200, height: 100, marginTop: 25 }} source={require('../assets/images/logosenac.png')} resizeMode="contain"/>
      </LinearGradient>
        <View style={styles.containerLogin}>
            <Text style={styles.titleLogin}>Bem-vindo(a)!</Text>

            <Text style={styles.labelLogin}>E-mail</Text>
            <TextInput
                style={styles.textInputLogin}
                value={email}
                onChangeText={setEmail}
                placeholder="Digite seu e-mail"
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <Text style={styles.labelLogin}>Senha</Text>
            <TextInput
                style={styles.textInputLogin}
                value={senha}
                onChangeText={setSenha}
                placeholder="Digite sua senha"
                secureTextEntry={!mostrarSenha} // Mantém oculta por padrão
            />
            <TouchableOpacity 
                style={styles.toggleButtonLogin}
                onPress={() => setMostrarSenha(!mostrarSenha)}
            >
                <Text style={styles.toggleButtonTextLogin}>
                    {mostrarSenha ? "Ocultar Senha" : "Mostrar Senha"}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginButtonLogin} onPress={realizarLogin}>
                <Text style={styles.loginButtonTextLogin}>Entrar</Text>
            </TouchableOpacity>
            <Text style={styles.footerTextLogin}>Sua primeira vez por aqui?</Text>
            <TouchableOpacity onPress={() => router.push('/cadastro')}>
              <Text style={styles.registerTextLogin}>Cadastre-se agora</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
  )
}