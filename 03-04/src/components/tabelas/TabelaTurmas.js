import axios from "axios";
import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, StyleSheet, ActivityIndicator } from 'react-native';

export default function TabelaTurmas() {
    const [nome, setNome] = useState('');
    const [busca, setBusca] = useState(''); // Estado para armazenar o valor da busca
    const [loading, setLoading] = useState(false); // Para controle de estado de carregamento
    const [error, setError] = useState(null); // Para armazenar erros
    const [sucesso, setSucesso] = useState(null); // Para armazenar sucesso
    const [turmas, setTurmas] = useState([]); // Estado para armazenar as turmas cadastradas
    const [novaEspecialidade, setNovaEspecialidade] = useState(''); // Para criar uma nova especialidade
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
                ? `${process.env.NEXT_PUBLIC_API_URL}/api/turma/nome/${searchTerm}` // Requisição de busca
                : `${process.env.NEXT_PUBLIC_API_URL}/api/turma`; // Requisição para pegar todas as turmas

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
                const resposta = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/turma/${editando}`, {
                    tur_nome: nome,
                });
                setSucesso('Turma atualizada com sucesso!');
            } else {
                // Criar nova turma
                const resposta = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/turma`, {
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
                await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/turma/${id}`);
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
        <View style={styles.container}>
            <Text style={styles.header}>Turmas</Text>

            {/* Campo de busca */}
            <TextInput
                style={styles.input}
                placeholder="Buscar turma por nome"
                value={busca}
                onChangeText={setBusca}
                onEndEditing={() => fetchTurmas(busca)}
            />

            {/* Formulário para criar ou editar turma */}
            <View style={styles.form}>
                <Text style={styles.label}>Nome da Turma</Text>
                <TextInput
                    style={styles.input}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f4f4f4',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
    },
    input: {
        width: '100%',
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 16,
        backgroundColor: '#fff',
    },
    form: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonEnabled: {
        backgroundColor: '#4CAF50',
    },
    buttonDisabled: {
        backgroundColor: '#A5D6A7',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    turmaItem: {
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 12,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    turmaText: {
        fontSize: 18,
        marginBottom: 8,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    editButton: {
        backgroundColor: '#FFC107',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    deleteButton: {
        backgroundColor: '#F44336',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    successText: {
        color: 'green',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 16,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 16,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 16,
    },
    pageButton: {
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#E0E0E0',
        margin: 4,
    },
    activePageButton: {
        backgroundColor: '#4CAF50',
    },
    pageButtonText: {
        fontSize: 16,
        color: '#fff',
    },
});

