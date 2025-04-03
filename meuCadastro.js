import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Button, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";
import MaskInput from 'react-native-mask-input';
import axios from "axios";
import styles from "./styles";
import api from './api';
import * as SecureStore from 'expo-secure-store';

export default function MeuCadastro(){ 
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [rg, setRg] = useState('');
    const [cpf, setCpf] = useState('');
    const [data, setData] = useState('');
    const [idade, setIdade] = useState('');
    const [sexo, setSexo] = useState('');
    const [escolaridade, setEscolaridade] = useState('');
    const [profissao, setProfissao] = useState('');
    const [estadoCivil, setEstadoCivil] = useState('');
    const [filhos, setFilhos] = useState('');
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [celular, setCelular] = useState('');
    const [residencial, setResidencial] = useState('');
    const [emergencia, setEmergencia] = useState('');
    const [contato, setContato] = useState('');
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUserId = async () => {
          try {
            const id = await SecureStore.getItemAsync('user_id');
            if (id) {
              setUserId(id); // Recuperando o ID do usuário armazenado
              console.log('ID recuperado: ', id);
            } else {
              console.log('Nenhum ID encontrado');
            }
          } catch (error) {
            console.error('Erro ao recuperar o ID', error);
          }
        };
    
        fetchUserId();
    }, []); // Executa uma vez, ao montar o componente
    
    // Novo useEffect para buscar os dados do cadastro, agora dependendo do userId
    useEffect(() => {
      const fetchCadastroData = async () => {
        if (userId) {
          try {
            const response = await api.get(`/api/cadastro/cliId/${userId}`);
            const dadosUsuario = response.data.cadastro;
            console.log('Dados do usuário:', dadosUsuario);
            
            // Agora você pode preencher os campos do formulário com os dados
            setNome(dadosUsuario.cad_nome || '');
            setSobrenome(dadosUsuario.cad_sobrenome || '');
            // Continue preenchendo os campos conforme necessário...
            
          } catch (error) {
            console.error('Erro ao buscar os dados do cadastro:', error);
          }
        }
      };
    
      if (userId) {
        fetchCadastroData(); // Chama a função quando o userId estiver disponível
      }
    }, [userId]); // Esse effect depende do userId    

    let timeout;

    const formatarData = (data) => {
        if (!data || data.split('/').length !== 3) {
          console.error('Data inválida:', data); // Exibe no console se a data for inválida
          return ''; // Retorna uma string vazia ou um valor de fallback se a data for inválida
        }
      
        const partes = data.split('/'); // Divide a data em dia, mês e ano
        const dia = partes[0];
        const mes = partes[1];
        const ano = partes[2];
      
        // Verifica se algum valor é inválido ou indefinido
        if (!dia || !mes || !ano) {
          console.error('Data mal formatada:', data);
          return ''; // Retorna uma string vazia em caso de dados faltando
        }
      
        const diaFormatado = dia.padStart(2, '0'); // Garante que o dia tenha 2 dígitos
        const mesFormatado = mes.padStart(2, '0'); // Garante que o mês tenha 2 dígitos
        const anoFormatado = ano.padStart(4, '0'); // Garante que o ano tenha 4 dígitos
      
        return `${anoFormatado}-${mesFormatado}-${diaFormatado}T00:00:00.000Z`; // Retorna no formato esperado pela API
      };
      
      const formatarDataParaInput = (data) => {
        if (!data) return ''; // Caso a data seja nula ou indefinida, retorna uma string vazia
        
        const partes = data.split('T')[0].split('-'); // Divide a data no formato 'yyyy-mm-dd'
        const dia = partes[2];
        const mes = partes[1];
        const ano = partes[0];
        
        return `${dia}/${mes}/${ano}`; // Retorna a data no formato 'dd/mm/yyyy'
      };
      

    async function cadastrarDados(){
        try {
            const dataFormatada = formatarData(data)
          const response = await api.post('/api/cadastro', {
            cad_nome: nome,
            cad_sobrenome: sobrenome,
            cad_rg: rg,
            cad_cpf: cpf,
            cad_rua: rua,
            cad_numero: numero,
            cad_bairro: bairro,
            cad_cep: cep,
            cad_cidade: cidade,
            cad_uf: uf,
            cad_celular: celular,
            cad_telefone: residencial,
            cad_emergencia: emergencia,
            cad_contato: contato,
            cad_idade: idade,
            cad_sexo: sexo,
            cad_escolaridade: escolaridade,
            cad_profissao: profissao,
            cad_estadoCivil: estadoCivil,
            cad_filhos: filhos,
            cad_complemento: complemento,
            cad_dataNascimento: dataFormatada,
            cliId: parseInt(userId)
          })
          console.log('Usuário criado:', response.data)
          alert('Cadastro efetuado com sucesso!')
        } catch (error) {
          // Verifica se a resposta de erro contém a propriedade `message` para exibir uma mensagem personalizada
          if (error.response && error.response.data && error.response.data.message) {
            const errorMessage = error.response.data.message.join(' '); // Se `message` for um array, podemos juntar as mensagens
            alert(`Erro ao efetuar cadastro: ${errorMessage}`);
          } else {
            // Caso não tenha a estrutura de erro esperada, exibe uma mensagem genérica
            alert('Erro ao cadastrar o novo usuário. Tente novamente mais tarde.');
          }
      
          console.log('Erro:', error);
        }
      }

    const handleCep = (value) => {
        setCep(value); // Atualiza o valor do CEP no estado com o valor não mascarado
    
        // Limpa o timeout anterior, caso haja
        clearTimeout(timeout);
    
        // Define um novo timeout para a requisição após 1 segundo de inatividade
        timeout = setTimeout(() => {
            if (value.length === 8) { // Verifica se o CEP tem 8 caracteres (sem o traço)
                buscarCep(value);  // Chama a função para buscar o CEP
            }
        }, 1000);  // 1000ms de espera após o último caractere digitado
    };    

    const buscarCep = async (cep) => {
        try {
            if (cep.length === 8) { // Verifica se o CEP tem 8 caracteres
                const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
                console.log(response.data);
                if (response.data.erro) {
                    console.log("CEP não encontrado!");
                    // Aqui você pode tratar de outra maneira, como exibir um alerta
                } else {
                    // Caso encontre o endereço, você pode preencher os campos automaticamente
                    setRua(response.data.logradouro);
                    setBairro(response.data.bairro);
                    setCidade(response.data.localidade);
                    setUf(response.data.uf);
                }
            } else {
                console.log("CEP inválido");
            }
        } catch (error) {
            console.error("Erro ao buscar CEP:", error);
        } 
    };
    

    return(
        <ScrollView>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Meu Cadastro</Text>
            </View>
            <View style={styles.containerCadastro}>
                <Text style={styles.textForm}>Nome:</Text>
                <TextInput style={styles.input} underlineColorAndroid='transparent' value={nome} onChangeText={setNome}/>
                <Text style={styles.textForm}>Sobrenome:</Text>
                <TextInput style={styles.input} underlineColorAndroid='transparent' value={sobrenome} onChangeText={setSobrenome}/>
                <Text style={styles.textForm}>RG:</Text>
                <TextInput style={styles.input} underlineColorAndroid='transparent' value={rg} onChangeText={setRg}/>
                <Text style={styles.textForm}>CPF:</Text>
                <MaskInput style={styles.input} underlineColorAndroid='transparent'
                    value={cpf}
                    onChangeText={(masked, unmasked) => {
                        setCpf(masked); 
                        console.log(masked);
                        console.log(unmasked); 
                    }}
                        mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/,'-', /\d/,/\d/]}
                />
                <Text style={styles.textForm}>Data de Nascimento:</Text>
                <MaskInput style={styles.input} underlineColorAndroid='transparent'
                    value={data}
                    onChangeText={(masked, unmasked) => {
                        setData(masked); 
                        console.log(masked);
                        console.log(unmasked); 
                    }}
                        mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                />
                <Text style={styles.textForm}>Idade:</Text>
                <TextInput style={styles.input} underlineColorAndroid='transparent' value={idade} onChangeText={setIdade}/>
                <Text style={styles.textForm}>Sexo:</Text>
                <View style={styles.pickerWrapper}>
                    <Picker selectedValue={sexo} style={styles.pickerInput} onValueChange={(itemValue) => setSexo(itemValue)}>
                        <Picker.Item label="-- SELECIONE --" value=""/>
                        <Picker.Item label="Feminino" value="F"/>
                        <Picker.Item label="Masculino" value="M"/>
                        <Picker.Item label="Prefiro não informar" value="N"/>
                    </Picker>
                </View>
                <Text style={styles.textForm}>Escolaridade:</Text>
                <View style={styles.pickerWrapper}>
                    <Picker selectedValue={escolaridade} style={styles.pickerInput} onValueChange={(itemValue) => setEscolaridade(itemValue)}>
                        <Picker.Item label="-- SELECIONE --" value=""/>
                        <Picker.Item label="ENSINO FUNDAMENTAL" value="ENSINO FUNDAMENTAL"/>
                        <Picker.Item label="ENSINO MÉDIO" value="ENSINO MÉDIO"/>
                        <Picker.Item label="ENSINO SUPERIOR" value="ENSINO SUPERIOR"/>
                        <Picker.Item label="ENSINO FUNDAMENTAL INCOMPLETO" value="ENSINO FUNDAMENTAL INCOMPLETO"/>
                        <Picker.Item label="ENSINO MÉDIO INCOMPLETO" value="ENSINO MÉDIO INCOMPLETO"/>
                        <Picker.Item label="ENSINO SUPERIOR INCOMPLETO" value="ENSINO SUPERIOR INCOMPLETO"/>
                    </Picker>
                </View>
                <Text style={styles.textForm}>Profissão:</Text>
                <TextInput style={styles.input} underlineColorAndroid='transparent' value={profissao} onChangeText={setProfissao}/>
                <Text style={styles.textForm}>Estado Civil:</Text>
                <View style={styles.pickerWrapper}>
                    <Picker selectedValue={estadoCivil} style={styles.pickerInput} onValueChange={(itemValue) => setEstadoCivil(itemValue)}>
                        <Picker.Item label="-- SELECIONE --" value=""/>
                        <Picker.Item label="SOLTEIRO" value="SOLTEIRO"/>
                        <Picker.Item label="CASADO" value="CASADO"/>
                        <Picker.Item label="SEPARADO" value="SEPARADO"/>
                        <Picker.Item label="DIVORCIADO" value="DIVORCIADO"/>
                        <Picker.Item label="VIÚVO" value="VIÚVO"/>
                        <Picker.Item label="AMASIADO" value="AMASIADO"/>
                    </Picker>
                </View>
                <Text style={styles.textForm}>Filhos:</Text>
                <View style={styles.pickerWrapper}>
                    <Picker selectedValue={filhos} style={styles.pickerInput} onValueChange={(itemValue) => setFilhos(itemValue)}>
                        <Picker.Item label="-- SELECIONE --" value=""/>
                        <Picker.Item label="SIM" value="S"/>
                        <Picker.Item label="NÃO" value="N"/>
                    </Picker>
                </View>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Endereço</Text>
            </View>
            <View style={styles.containerCadastro}>
                <Text style={styles.textForm}>CEP:</Text>
                <MaskInput
                    style={styles.input}
                    value={cep}
                    onChangeText={(masked, unmasked) => {
                        setCep(masked);  // Atualiza o valor mascarado com o traço
                        console.log(masked);  // Exibe o valor com a máscara (com o traço)
                        console.log(unmasked); // Exibe o valor sem a máscara (apenas números)

                        // Chama a função handleCep com o valor não mascarado
                        handleCep(unmasked);  // Passando o valor "cru" (sem a máscara) para buscar o CEP
                    }}
                    mask={[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]} // Máscara de CEP com traço
                    keyboardType="numeric"
                    maxLength={9}  // Alterado para 9, porque a máscara inclui o traço
                />
                <Text style={styles.textForm}>Rua:</Text>
                <TextInput style={styles.input} underlineColorAndroid='transparent' value={rua} onChangeText={setRua}/>
                <Text style={styles.textForm}>Bairro:</Text>
                <TextInput style={styles.input} underlineColorAndroid='transparent' value={bairro} onChangeText={setBairro}/>
                <Text style={styles.textForm}>Cidade:</Text>
                <TextInput style={styles.input} underlineColorAndroid='transparent' value={cidade} onChangeText={setCidade}/>
                <Text style={styles.textForm}>UF:</Text>
                <TextInput style={styles.input} underlineColorAndroid='transparent' value={uf} onChangeText={setUf}/>
                <Text style={styles.textForm}>Número:</Text>
                <TextInput style={styles.input} underlineColorAndroid='transparent' value={numero} onChangeText={setNumero}/>
                <Text style={styles.textForm}>Complemento:</Text>
                <TextInput style={styles.input} underlineColorAndroid='transparent' alue={complemento} onChangeText={setComplemento}/>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Contato</Text>
            </View>
            <View style={styles.containerCadastro}>
                <Text style={styles.textForm}>Celular:</Text>
                <MaskInput style={styles.input} underlineColorAndroid='transparent'
                    value={celular}
                    onChangeText={(masked, unmasked) => {
                        setCelular(masked); 
                        console.log(masked);
                        console.log(unmasked); 
                    }}
                        mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                />
                <Text style={styles.textForm}>Telefone Residencial:</Text>
                <MaskInput style={styles.input} underlineColorAndroid='transparent'
                    value={residencial}
                    onChangeText={(masked, unmasked) => {
                        setResidencial(masked); 
                        console.log(masked);
                        console.log(unmasked); 
                    }}
                        mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                />
                <Text style={styles.textForm}>Contato de Emergência:</Text>
                <MaskInput style={styles.input} underlineColorAndroid='transparent'
                    value={emergencia}
                    onChangeText={(masked, unmasked) => {
                        setEmergencia(masked); 
                        console.log(masked);
                        console.log(unmasked); 
                    }}
                        mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                />
                <Text style={styles.textForm}>Nome do Contato:</Text>
                <TextInput style={styles.input} underlineColorAndroid='transparent' value={contato} onChangeText={setContato}/>
            </View>
            <View style={styles.containerBotao}>
                <TouchableOpacity style={styles.button} onPress={cadastrarDados}>
                    <Feather style={styles.icon} name="check" color={'white'} size={25} />
                    <Text style={styles.buttonText}>Salvar Dados</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}