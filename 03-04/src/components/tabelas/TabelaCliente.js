import axios from "axios";
import API_URL from "../../../service/serviceApi";
import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, StyleSheet, ActivityIndicator, Button } from 'react-native';

export default function TabelaCliente(){
    const [activeTab, setActiveTab] = useState("profile");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sucesso, setSucesso] = useState(null);
    const [clienteSelecionado, setClienteSelecionado] = useState(null);
    const [clientesCompletos, setClientesCompletos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    
    const itemsPerPage = 5;

  

    return(
        <View style={styles.container}>
        <Text style={styles.title}>Tabela de Clientes</Text>

        {/* Mensagens de sucesso e erro */}
        {sucesso && <Text style={styles.successMessage}>{sucesso}</Text>}
        {error && <Text style={styles.errorMessage}>{error}</Text>}

        {/* Lista de clientes */}
        {loading ? (
            <ActivityIndicator size="large" color="#6200EE" />
        ) : (
            <FlatList
                // data={paginateClientes()}
                keyExtractor={(item) => item.clienteId.toString()}
                renderItem={({ item }) => (
                    <View style={styles.clientCard}>
                        <Text style={styles.clientInfo}>ID: {item.clienteId}</Text>
                        <Text style={styles.clientInfo}>Email: {item.clienteEmail}</Text>
                        <Text style={styles.clientInfo}>Nome: {item.cadastroNome}</Text>
                        <Text style={styles.clientInfo}>Sobrenome: {item.cadastroSobrenome}</Text>

                        {/* Ações */}
                        <View style={styles.actionButtons}>
                            <Button
                                title="Ver Detalhes"
                                onPress={() => { /* Navegar para a tela de detalhes */ }}
                                color="#6200EE"
                            />
                            <Button
                                title="Excluir"
                                onPress={() => handleDelete(item.clienteId)}
                                color="#D32F2F"
                            />
                        </View>
                    </View>
                )}
            />
        )}

        {/* Paginação */}
        <View style={styles.paginationButtons}>
            <Button
                title="Anterior"
                onPress={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
            />
            <Button
                title="Próximo"
                onPress={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
            />
        </View>

        {/* Paginação numérica */}
        <View style={styles.paginationNumbers}>
            {Array.from({ length: totalPages }, (_, index) => (
                <Button
                    key={index + 1}
                    title={(index + 1).toString()}
                    onPress={() => setCurrentPage(index + 1)}
                    color={currentPage === index + 1 ? '#6200EE' : '#C1C1C1'}
                />
            ))}
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#6200EE',
    },
    successMessage: {
        color: 'green',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    errorMessage: {
        color: 'red',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    clientCard: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
    },
    clientInfo: {
        fontSize: 14,
        color: '#6200EE',
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    paginationButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    paginationNumbers: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
});