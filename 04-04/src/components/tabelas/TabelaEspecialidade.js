import axios from "axios";
import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import styles from "../../styles";

export default function TabelaEspecialidade() {
    const [nome, setNome] = useState('');
    const [novaEspecialidade, setNovaEspecialidade] = useState(''); // Para criar uma nova especialidade
    const [especialidades, setEspecialidades] = useState([]);  // Lista de especialidades disponíveis
    const [descricao, setDescricao] = useState('');
    const [paginatedEspecialidade, setPaginatedEspecialidade] = useState([]); // Especialidades da página atual

    const [editando, setEditando] = useState(null); // Identifica se está editando
    const [loading, setLoading] = useState(false); // Para controle de estado de carregamento
    const [error, setError] = useState(null); // Para armazenar erros
    const [sucesso, setSucesso] = useState(null); // Para armazenar sucesso
    const [currentPage, setCurrentPage] = useState(1); // Página atual
    const [totalPages, setTotalPages] = useState(1); // Total de páginas

    const itemsPerPage = 5; // Quantidade de especialidades por página (pode ser ajustado)

    // Criar uma nova especialidade
    const handleCreateEspecialidade = async () => {
        if (novaEspecialidade.trim() === "") {
            setError("O nome da especialidade não pode estar vazio.");
            return;
        }

        setLoading(true);
        setError(null);
        setSucesso(null);

        try {
            const especialidadeData = {
                esp_nome: novaEspecialidade,
                esp_descricao: descricao,
            };

            // Enviar requisição para criar uma nova especialidade
            await axios.post(`${API_URL}/api/especialidade`, especialidadeData);

            setSucesso("Especialidade criada com sucesso!");
            setNovaEspecialidade(''); // Limpa o campo de nova especialidade
        } catch (error) {
            console.error("Erro ao criar especialidade:", error);
            setError("Ocorreu um erro ao criar a especialidade. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    //chamada para carregar as especialidades quando o componente for montado
    const fetchEspecialidade = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/api/especialidade`);
            setEspecialidades(response.data); // Atualiza a lista de especialidades
            setTotalPages(Math.ceil(response.data.length / itemsPerPage)); // Define o total de páginas
        } catch (error) {
            console.error("Erro ao carregar especialidades:", error);
            setError("Erro ao carregar especialidades. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    // Função para paginar as especialidades
    const paginateEspecialidade = (page) => {
        setCurrentPage(page);
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setPaginatedEspecialidade(especialidades.slice(startIndex, endIndex)); // Exibe as especialidades da página atual
    };

    // Carregar as especialidades ao montar o componente
    useEffect(() => {
        fetchEspecialidade();
    }, []);

    // Chama a função de paginação sempre que as especialidades mudarem ou a página atual for alterada
    useEffect(() => {
        paginateEspecialidade(currentPage);
    }, [especialidades, currentPage]);


    // Enviar os dados do formulário
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSucesso(null);
    
        try {
            if (editando) {
                // Atualizar especialidade
                await axios.patch(`${API_URL}/api/especialidade/${editando}`, {
                    esp_nome: nome,
                    esp_descricao: descricao,
                });
                setSucesso('Especialidade atualizada com sucesso!');
            } else {
                // Criar nova especialidade
                await axios.post(`${API_URL}/api/especialidade`, {
                    esp_nome: nome,
                    esp_descricao: descricao,
                });
                setSucesso('Especialidade criada com sucesso!');
            }
        } catch (error) {
            console.error(error);
            setError('Ocorreu um erro. Tente novamente.');
        } finally {
            setLoading(false);
            setNome('');  // Limpar o campo de nome após o envio
            setDescricao('');  // Limpar o campo de descrição após o envio
            setEditando(null); // Limpar o estado de ediçã
            fetchEspecialidade(); // Atualiza a lista de especialidades após a operação
        }
    };
    
    // Excluir especialidade
    const handleDelete = async (id) => {
        Alert.alert(
            "Confirmar Exclusão",
            "Tem certeza que deseja excluir essa especialidade?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                { 
                    text: "Excluir", 
                    onPress: async () => {
                        try {
                            await axios.delete(`${API_URL}/api/especialidade/${id}`);
                            setSucesso('Especialidade excluída com sucesso!');
                            fetchEspecialidade(); // Atualiza a lista de especialidades
                        } catch (error) {
                            console.error(error);
                            setError('Erro ao excluir a especialidade. Tente novamente.');
                        }
                    }
                }
            ]
        );
    };

    // Editar especialidade
    const handleEdit = (id, nomeEspecialidade) => {
        setEditando(id); // Define que estamos editando esta especialidade
        setNome(nomeEspecialidade); // Preenche o campo de nome com o nome da especialidade
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Especialidade</Text>

            {/* Formulário para criar ou editar especialidade */}
            <View style={styles.form}>
                <Text style={styles.textForm}>Nome da Especialidade</Text>
                <TextInput
                    style={styles.input2}
                    value={nome}
                    onChangeText={setNome}
                    placeholder="Digite o nome da especialidade"
                />
                <Text style={styles.textForm}>Descrição da especialidade</Text>
                <TextInput
                    style={styles.input2}
                    value={descricao}
                    onChangeText={setDescricao}
                    placeholder="Digite a descrição da especialidade"
                />
                <TouchableOpacity
                    style={[styles.button, loading ? styles.buttonDisabled : styles.buttonEnabled]}
                    onPress={handleSubmit}
                    disabled={loading}
                >
                    <Text style={styles.buttonText}>
                        {loading ? 'Carregando...' : editando ? 'Atualizar' : 'Salvar'}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Mensagens de sucesso e erro */}
            {sucesso && <Text style={styles.successText}>{sucesso}</Text>}
            {error && <Text style={styles.errorText}>{error}</Text>}
            
            {/* Lista de especialidades */}
            <FlatList
                data={especialidades}
                renderItem={({ item }) => (
                    <View style={styles.especialidadeItem}>
                        <Text style={styles.especialidadeText}>{item.esp_nome}</Text>
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity
                                style={styles.editButton}
                                onPress={() => handleEdit(item.esp_id, item.esp_nome)}
                            >
                                <Text style={styles.buttonText}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => handleDelete(item.esp_id)}
                            >
                                <Text style={styles.buttonText}>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                keyExtractor={(item) => item.esp_id.toString()} // Garante que a chave está correta
            />

            {/* Paginação */}
            <View style={styles.pagination}>
                {Array.from({ length: totalPages }, (_, index) => (
                    <TouchableOpacity
                        key={index + 1}
                        style={[
                            styles.pageButton,
                            currentPage === index + 1 && styles.activePageButton,
                        ]}
                        onPress={() => setCurrentPage(index + 1)}
                    >
                        <Text style={styles.pageButtonText}>{index + 1}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}

