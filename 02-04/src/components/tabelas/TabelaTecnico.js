import axios from "axios";
import { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';


export default function TabelaTecnico() {
    const [turmas, setTurmas] = useState([]);  // Lista de turmas disponíveis
    const [especialidades, setEspecialidades] = useState([]);  // Lista de especialidades disponíveis
    const [turmaSelecionada, setTurmaSelecionada] = useState(null);
    const [especialidadeSelecionada, setEspecialidadeSelecionada] = useState(null);
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [tecnicos, setTecnicos] = useState([]); // Todos os tecnicos
    const [paginatedTecnicos, setPaginatedTecnicos] = useState([]); // Técnicos da página atual
    const [currentPage, setCurrentPage] = useState(1); // Página atual
    const [totalPages, setTotalPages] = useState(1); // Total de páginas
    const [editando, setEditando] = useState(null); // Estado de edição

    const itemsPerPage = 5; // Quantidade de nomes por página (pode ser ajustado)

    // Buscar todas os técnicos cadastrados
    const fetchTecnicos = async () => {
        try {
            // Buscar técnicos
            const respostaTecnicos = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/tecnicos`);
            setTecnicos(respostaTecnicos.data); // Atualiza o estado com todos os registros
            setTotalPages(Math.ceil(respostaTecnicos.data.length / itemsPerPage)); // Calcula o total de páginas

            // Buscar turmas
            const respostaTurmas = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/turma`);
            setTurmas(respostaTurmas.data);

            // Buscar especialidades
            const respostaEspecialidades = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/especialidade`);
            setEspecialidades(respostaEspecialidades.data);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    };

    // Função para paginar as listas de nomes
    const paginateTecnicos = (page) => {
        setCurrentPage(page);
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setPaginatedTecnicos(tecnicos.slice(startIndex, endIndex)); // Exibe os registros da página atual
    };


    // Carregar os registros ao montar o componente
    useEffect(() => {
        fetchTecnicos();
    }, []);

    // Chama a função de paginação sempre que os técnicos mudarem ou a página atual for alterada
    useEffect(() => {
        paginateTecnicos(currentPage);
    }, [tecnicos, currentPage]);

    // Enviar os dados do formulário
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const tecnicoData = {
                tec_nome: nome,
                tec_sobrenome: sobrenome,
                tec_email: email,
                tec_senha: senha,
                tur_id: turmaSelecionada, // Envia o ID da turma
                esp_id: especialidadeSelecionada, // Envia o ID da especialidade
            };

            if (editando) {
                // Atualizar técnico
                const resposta = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/tecnicos/${editando}`, tecnicoData);
                setSuccess('Técnico atualizado com sucesso!');
            } else {
                // Criar novo técnico
                const resposta = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/tecnicos`, tecnicoData);
                setSuccess('Técnico criado com sucesso!');
            }

            setLoading(false);
            setNome('');
            setSobrenome('');
            setEmail('');
            setSenha('');
            setTurmaSelecionada(null); // Limpar seleção de turma
            setEspecialidadeSelecionada(null); // Limpar seleção de especialidade
            setEditando(null); // Limpar estado de edição
            fetchTecnicos(); // Atualiza a lista de técnicos
        } catch (error) {
            console.error(error);
            setLoading(false);
            setError('Ocorreu um erro. Tente novamente.');
        }
    };


    // Excluir tecnicos
    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir esse profissional?')) {
            try {
                await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/tecnicos/${id}`);
                setSuccess('Técnico excluída com sucesso!');
                fetchTecnicos(); // Atualiza a lista
            } catch (error) {
                console.error(error);
                setError('Erro ao excluir a técnico. Tente novamente.');
            }
        }
    };

    // Editar tecnicos
    const handleEdit = (id, nomeTecnico, sobrenomeTecnico, emailTecnico, senhaTecnico, especialidadeTecnico, turmaTecnico) => {
        setEditando(id); // Define que estamos editando esta tecnico
        setNome(nomeTecnico); // Preenche o campo de nome
        setSobrenome(sobrenomeTecnico); // Preenche o campo de sobrenome
        setEmail(emailTecnico); // Preenche o campo de email
        setSenha(senhaTecnico); // Preenche o campo de senha
        setEspecialidadeSelecionada(especialidadeTecnico);
        setTurmaSelecionada(turmaTecnico)
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Técnicos</Text>

            {/* Formulário para criar ou editar técnicos */}
            <View style={styles.form}>
                <Text style={styles.label}>Nome</Text>
                <TextInput
                    style={styles.input}
                    value={nome}
                    onChangeText={setNome}
                    placeholder="Digite o nome"
                    required
                />

                <Text style={styles.label}>Sobrenome</Text>
                <TextInput
                    style={styles.input}
                    value={sobrenome}
                    onChangeText={setSobrenome}
                    placeholder="Digite o sobrenome"
                    required
                />

                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Digite o email"
                    required
                />

                <Text style={styles.label}>Senha</Text>
                <TextInput
                    style={styles.input}
                    value={senha}
                    onChangeText={setSenha}
                    placeholder="Digite a senha"
                    secureTextEntry
                    required
                />

                {/* Campo de Turma */}
                <Text style={styles.label}>Turma</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={turmaSelecionada}
                        onValueChange={setTurmaSelecionada}
                        style={styles.picker}
                        mode="dropdown" // Mostra como um dropdown (em dispositivos Android)
                    >
                        <Picker.Item label="Selecione uma turma" value={null} />
                        {turmas.map((turma) => (
                            <Picker.Item key={turma.tur_id} label={turma.tur_nome} value={turma.tur_id} />
                        ))}
                    </Picker>
                </View>

                {/* Campo de Especialidade */}
                <Text style={styles.label}>Especialidade</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={especialidadeSelecionada}
                        onValueChange={setEspecialidadeSelecionada}
                        style={styles.picker}
                        mode="dropdown" // Mostra como um dropdown (em dispositivos Android)
                    >
                        <Picker.Item label="Selecione uma especialidade" value={null} />
                        {especialidades.map((especialidade) => (
                            <Picker.Item key={especialidade.esp_id} label={especialidade.esp_nome} value={especialidade.esp_id} />
                        ))}
                    </Picker>
                </View>

                {/* Exibir sucesso e erro */}
                {success && <Text style={styles.successText}>{success}</Text>}
                {error && <Text style={styles.errorText}>{error}</Text>}

                <TouchableOpacity
                    style={[styles.button, loading ? styles.buttonDisabled : styles.buttonEnabled]}
                    onPress={handleSubmit}
                    disabled={loading}
                >
                    <Text style={styles.buttonText}>{loading ? 'Carregando...' : 'Salvar'}</Text>
                </TouchableOpacity>
            </View>

            {/* Exibir lista de técnicos */}
            <View style={styles.tecnicosList}>
                <Text style={styles.tecnicosHeader}>Técnicos Cadastrados</Text>
                {/* Aqui você deve ter a lógica para exibir os técnicos cadastrados */}
                <Text style={styles.tecnicoItem}>Exemplo de Técnico</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#6A0DAD', // Cor roxa
        textAlign: 'center',
        marginBottom: 20,
    },
    form: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#6A0DAD', // Cor roxa
        marginBottom: 5,
    },
    input: {
        borderColor: '#6A0DAD', // Cor roxa
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        fontSize: 14,
    },
    button: {
        marginTop: 20,
        padding: 15,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonEnabled: {
        backgroundColor: '#6A0DAD',
    },
    buttonDisabled: {
        backgroundColor: '#A9A9A9',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#4B0082',
        borderRadius: 8,
        marginBottom: 15,
        overflow: 'hidden',
        backgroundColor: '#FFF',
    },
    picker: {
        height: 50,
        color: '#4B0082',
        paddingHorizontal: 10,
    },
    successText: {
        color: 'green',
        fontWeight: 'bold',
        marginVertical: 10,
    },
    errorText: {
        color: 'red',
        fontWeight: 'bold',
        marginVertical: 10,
    },
    tecnicosList: {
        marginTop: 30,
    },
    tecnicosHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#6A0DAD',
        marginBottom: 10,
    },
    tecnicoItem: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
    },
});