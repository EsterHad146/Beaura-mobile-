import axios from "axios";
import API_URL from "../../../service/serviceApi";
import { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';


export default function TabelaProcedimento(){
    const [nome, setNome] = useState('');
    const [loading, setLoading] = useState(false); // Para controle de estado de carregamento
    const [error, setError] = useState(null); // Para armazenar erros
    const [sucesso, setSucesso] = useState(null); // Para armazenar sucesso
    const [procedimento, setProcedimento] = useState([]);
    const [editando, setEditando] = useState(null); 
    const [paginatedProcedimento, setPaginatedProcedimento] = useState([]); 
    const [currentPage, setCurrentPage] = useState(1); // Página atual
    const [totalPages, setTotalPages] = useState(1); // Total de páginas

    const itemsPerPage = 5; // Quantidade de procedimentos por página (pode ser ajustado)

    const fetchProcedimento = async (searchTerm = '') => {
        setLoading(true);
        try {
          const url = (`${API_URL}/api/procedimento`);
          const resposta = await axios.get(url);
    
          if (Array.isArray(resposta.data)) {
            setProcedimento(resposta.data);
            setTotalPages(Math.ceil(resposta.data.length / itemsPerPage));
          } else if (resposta.data) {
            setProcedimento([resposta.data]);
            setTotalPages(1);
          } else {
            setProcedimento([]);
            setTotalPages(0);
          }
    
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.error('Erro ao buscar os procedimentos:', error);
          setError('Erro ao buscar os procedimentos. Tente novamente.');
        }
      };
    
      const paginateProcedimento = (page) => {
        setCurrentPage(page);
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setPaginatedProcedimento(procedimento.slice(startIndex, endIndex));
      };
    
      useEffect(() => {
        fetchProcedimento();
      }, []);
    
      useEffect(() => {
        paginateProcedimento(currentPage);
      }, [procedimento, currentPage]);
    
      const handleSubmit = async (e) => {
        setLoading(true);
        setError(null);
        setSucesso(null);
    
        try {
            if (editando) {
              const resposta = await axios.patch(`${API_URL}/api/procedimento/${editando}`, {
                pro_nome: nome,
              });
              setSucesso('Procedimento atualizado com sucesso!');
            } else {
              const resposta = await axios.post(`${API_URL}/api/procedimento`, {
                pro_nome: nome,
              });
              setSucesso('Procedimento criado com sucesso!');
            }
    
          setLoading(false);
          setNome('');
          setEditando(null);
          fetchProcedimento();
        } catch (error) {
          console.error(error);
          setLoading(false);
          setError('Ocorreu um erro. Tente novamente.');
        }
      };
      const handleDelete = async (id) => {
        Alert.alert(
          'Confirmar Exclusão',
          'Tem certeza que deseja excluir esse procedimento?',
          [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Excluir', onPress: async () => {
                try {
                  await axios.delete(`${API_URL}/api/procedimento/${id}`);
                  setSucesso('Procedimento excluído com sucesso!');
                  fetchProcedimento();
                } catch (error) {
                  console.error(error);
                  setError('Erro ao excluir a procedimento. Tente novamente.');
                }
            }},
          ]
        );
      };
    
      const handleEdit = (id, nomeProcedimento) => {
        setEditando(id);
        setNome(nomeProcedimento);
      };
    
      const renderProcedimento = ({ item }) => (
        <View style={styles.procedimentoItem}>
          <Text style={styles.procedimentoText}>{item.pro_nome}</Text>
          <View style={styles.buttonContainer}>
            <Button title="Editar" onPress={() => handleEdit(item.pro_id, item.pro_nome)} />
            <Button title="Excluir" color="red" onPress={() => handleDelete(item.pro_id)} />
          </View>
        </View>
      );
    
    return(
        <View style={styles.container}>
        <Text style={styles.title}>Procedimentos</Text>
  
        <View style={styles.form}>
          <TextInput
            value={nome}
            onChangeText={setNome}
            style={styles.input}
            placeholder="Nome do Procedimento"
            required
          />
          {sucesso && <Text style={styles.successMessage}>{sucesso}</Text>}
          {error && <Text style={styles.errorMessage}>{error}</Text>}
          <Button title={loading ? 'Carregando...' : editando ? 'Atualizar' : 'Salvar'} onPress={handleSubmit} disabled={loading} />
        </View>
  
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <FlatList
              data={paginatedProcedimento}
              renderItem={renderProcedimento}
              keyExtractor={(item) => item.id.toString()}
            />
  
            <View style={styles.pagination}>
              {Array.from({ length: totalPages }, (_, index) => (
                <TouchableOpacity key={index + 1} onPress={() => setCurrentPage(index + 1)}>
                  <Text style={[styles.pageButton, currentPage === index + 1 && styles.activePage]}>
                    {index + 1}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
      </View>
    )
}

const styles = {
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', color: '#4B0082', textAlign: 'center', marginVertical: 20 },
    form: { marginBottom: 20 },
    input: { height: 40, borderColor: '#4B0082', borderWidth: 1, marginBottom: 10, paddingLeft: 10, borderRadius: 5 },
    successMessage: { color: 'green', marginBottom: 10 },
    errorMessage: { color: 'red', marginBottom: 10 },
    procedimentoItem: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#f5f5f5', padding: 10, borderRadius: 5, marginBottom: 10 },
    procedimentoText: { fontSize: 16, fontWeight: 'bold', color: '#4B0082' },
    buttonContainer: { flexDirection: 'row', justifyContent: 'space-around' },
    pagination: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
    pageButton: { fontSize: 18, padding: 10, color: '#4B0082' },
    activePage: { fontWeight: 'bold', color: '#fff', backgroundColor: '#4B0082', borderRadius: 5 },
  };