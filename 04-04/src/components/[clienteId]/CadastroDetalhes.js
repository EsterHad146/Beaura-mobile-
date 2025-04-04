'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InputMask from 'react-input-mask-next';

class cliente()=>{
    clienteId; // ID do cliente usado para buscar em 'cadastro'
}

export default function CadastroDetalhes({ clienteId }) {
    const [formData, setFormData] = useState({
        cad_nome: '', cad_sobrenome: '', cad_rg: '', cad_cpf: '', cad_dataNascimento: '', cad_idade: '', cad_sexo: '',
        cad_escolaridade: '', cad_profissao: '', cad_estadoCivil: '', cad_filhos: '', cad_rua: '', cad_numero: '',
        cad_complemento: '', cad_bairro: '', cad_cidade: '', cad_cep: '', cad_uf: '', cad_telefone: '', cad_celular: '',
        cad_emergencia: '', cad_contato: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Formatar data para input yyyy-mm-dd
    const formatarDataParaInput = (isoDate) => {
        const date = new Date(isoDate);
        const adjustedDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
        const year = adjustedDate.getFullYear();
        const month = String(adjustedDate.getMonth() + 1).padStart(2, '0');
        const day = String(adjustedDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Função para buscar os dados do cliente na tabela 'cadastro'
    const fetchCliente = async () => {
        if (clienteId) {
            setLoading(true);
            try {
                const response = await axios.get(`/api/cadastro/${clienteId}`);
                const data = response.data;

                setFormData({
                    cad_nome: data.cad_nome || '',
                    cad_sobrenome: data.cad_sobrenome || '',
                    cad_rg: data.cad_rg || '',
                    cad_cpf: data.cad_cpf || '',
                    cad_dataNascimento: formatarDataParaInput(data.cad_dataNascimento),
                    cad_idade: data.cad_idade || '',
                    cad_sexo: data.cad_sexo || '',
                    cad_escolaridade: data.cad_escolaridade || '',
                    cad_profissao: data.cad_profissao || '',
                    cad_estadoCivil: data.cad_estadoCivil || '',
                    cad_filhos: data.cad_filhos || '',
                    cad_rua: data.cad_rua || '',
                    cad_numero: data.cad_numero || '',
                    cad_complemento: data.cad_complemento || '',
                    cad_bairro: data.cad_bairro || '',
                    cad_cidade: data.cad_cidade || '',
                    cad_cep: data.cad_cep || '',
                    cad_uf: data.cad_uf || '',
                    cad_telefone: data.cad_telefone || '',
                    cad_celular: data.cad_celular || '',
                    cad_emergencia: data.cad_emergencia || '',
                    cad_contato: data.cad_contato || '',
                });
            } catch (error) {
                console.error('Erro ao buscar dados do cliente:', error);
                setError('Erro ao carregar os dados do cliente. Tente novamente.');
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        if (clienteId) {
            fetchCliente();
        }
    }, [clienteId]);

    // Função para lidar com mudanças nos campos do formulário
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    // Função de submit do formulário
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const cadastroData = {
            ...formData,
            cad_nome: formData.cad_nome.toUpperCase(),
            cad_sobrenome: formData.cad_sobrenome.toUpperCase(),
            cad_profissao: formData.cad_profissao.toUpperCase(),
            cad_rua: formData.cad_rua.toUpperCase(),
            cad_complemento: formData.cad_complemento.toUpperCase(),
            cad_bairro: formData.cad_bairro.toUpperCase(),
            cad_cidade: formData.cad_cidade.toUpperCase(),
            cad_uf: formData.cad_uf.toUpperCase(),
            cad_contato: formData.cad_contato.toUpperCase(),
        };

        try {
            if (clienteId) {
                await axios.patch(`/api/cadastro/${clienteId}`, cadastroData);
            } else {
                await axios.post('/api/cadastro', cadastroData);
            }
            alert('Dados salvos com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar dados do cliente:', error);
            setError('Erro ao salvar os dados. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
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
    );
}
