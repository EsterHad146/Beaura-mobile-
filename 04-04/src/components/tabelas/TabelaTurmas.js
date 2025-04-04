import axios from "axios";
import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import styles from "../../styles";

export default function TabelaTurmas() {
    const [nome, setNome] = useState('');
    const [busca, setBusca] = useState(''); // Estado para armazenar o valor da busca
    const [loading, setLoading] = useState(false); // Para controle de estado de carregamento
    const [error, setError] = useState(null); // Para armazenar erros
    const [sucesso, setSucesso] = useState(null); // Para armazenar sucesso
    const [turmas, setTurmas] = useState([]); // Estado para armazenar as turmas cadastradas
    const [editando, setEditando] = useState(null); // Estado para identificar se estamos editando uma turma
    const [paginatedTurmas, setPaginatedTurmas] = useState([]); // Turmas da página atual
    const [currentPage, setCurrentPage] = useState(1); // Página atual
    const [totalPages, setTotalPages] = useState(1); // Total de páginas

    const itemsPerPage = 5; // Quantidade de turmas por página (pode ser ajustado)

    // Buscar todas as turmas ou buscar por nome
    const fetchTurmas = async (searchTerm = '') => {
        setLoading(true);
        try {
            const url = searchTerm
                ? `${API_URL}/api/turma/nome/${searchTerm}` // Requisição de busca
                : `${URL}/api/turma`; // Requisição para pegar todas as turmas

            const resposta = await axios.get(url);
            
            if (Array.isArray(resposta.data)) {
                setTurmas(resposta.data); // Se a resposta for uma lista, guarda todas as turmas
                setTotalPages(Math.ceil(resposta.data.length / itemsPerPage)); // Calcula o total de páginas
            } else if (resposta.data) {
                setTurmas([resposta.data]); // Se a resposta for uma única turma, coloca ela dentro de um array
                setTotalPages(1); // Só tem uma página se encontrar uma turma
            } else {
                setTurmas([]); // Se não encontrar nada, limpa a lista de turmas
                setTotalPages(0);
            }

            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error("Erro ao buscar turmas:", error);
            setError('Erro ao buscar turmas. Tente novamente.');
        }
    };

     // Função para paginar as turmas
     const paginateTurmas = (page) => {
        setCurrentPage(page);
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setPaginatedTurmas(turmas.slice(startIndex, endIndex)); // Exibe as turmas da página atual
    };

     // Carregar as turmas ao montar o componente
     useEffect(() => {
        fetchTurmas();
    }, []);

     // Chama a função de paginação sempre que as turmas mudarem ou a página atual for alterada
     useEffect(() => {
        paginateTurmas(currentPage);
    }, [turmas, currentPage]);

    // Enviar os dados do formulário
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSucesso(null);

        try {
            if (editando) {
                // Atualizar turma
                const resposta = await axios.patch(`${API_URL}/api/turma/${editando}`, {
                    tur_nome: nome,
                });
                setSucesso('Turma atualizada com sucesso!');
            } else {
                // Criar nova turma
                const resposta = await axios.post(`${API_URL}/api/turma`, {
                    tur_nome: nome,
                });
                setSucesso('Turma criada com sucesso!');
            }

            setLoading(false);
            setNome('');
            setEditando(null); // Limpa o estado de edição
            fetchTurmas(); // Atualiza a lista de turmas
        } catch (error) {
            console.error(error);
            setLoading(false);
            setError('Ocorreu um erro. Tente novamente.');
        }
    };

    
    // Excluir turma
    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir essa turma?')) {
            try {
                await axios.delete(`${API_URL}/api/turma/${id}`);
                setSucesso('Turma excluída com sucesso!');
                fetchTurmas(); // Atualiza a lista de turmas
            } catch (error) {
                console.error(error);
                setError('Erro ao excluir a turma. Tente novamente.');
            }
        }
    };

    // Editar turma
    const handleEdit = (id, nomeTurma) => {
        setEditando(id); // Define que estamos editando esta turma
        setNome(nomeTurma); // Preenche o campo de nome com o nome da turma
    };

    return (
        <View style={styles.container2}>
            <Text style={styles.title}>Turmas</Text>

            {/* Campo de busca
            <TextInput
                style={styles.input}
                placeholder="Buscar turma por nome"
                value={busca}
                onChangeText={setBusca}
                onEndEditing={() => fetchTurmas(busca)}
            /> */}

            {/* Formulário para criar ou editar turma */}
            <View style={styles.form}>
                <Text style={styles.textForm}>Nome da Turma</Text>
                <TextInput
                    style={styles.input2}
                    value={nome}
                    onChangeText={setNome}
                    placeholder="Digite o nome da turma"
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

            {/* Lista de turmas */}
            <FlatList
                data={turmas}
                renderItem={({ item }) => (
                    <View style={styles.turmaItem}>
                        <Text style={styles.turmaText}>{item.tur_nome}</Text>
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity
                                style={styles.editButton}
                                onPress={() => handleEdit(item.tur_id, item.tur_nome)}
                            >
                                <Text style={styles.buttonText}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => handleDelete(item.tur_id)}
                            >
                                <Text style={styles.buttonText}>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                keyExtractor={(item) => item.tur_id.toString()}
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
    );
}

