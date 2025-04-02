import React, { useState } from 'react'
import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Feather from "@expo/vector-icons/Feather";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";

export default function Solicitacoes() {
    const navigation = useNavigation();

    const [modalVisible, setModalVisible] = useState(false);
    const [solicitacao, setSolicitacao] = useState('');
    const [selectedOption, setSelectedOption] = useState(null); // Estado para armazenar a opção selecionada

    function abrirModal() {
        setModalVisible(true);
    }

    function fecharModal() {
        setModalVisible(false);
    }

    function navegaSobre() {
        navigation.navigate('Sobre');
    }

    return (
        <ScrollView>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Minhas Solicitações</Text>
            </View>
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={abrirModal}>
                    <Feather style={styles.icon} name="plus-circle" color={'white'} size={25} />
                    <Text style={styles.buttonText}>Nova Solicitação</Text>
                </TouchableOpacity>
            </View>

            {/* Modal de Solicitação */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={fecharModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Nova Solicitação</Text>

                        {/* Botões de rádio com ícones */}
                        <View style={styles.radioContainer}>
                            <TouchableOpacity
                                style={styles.radioOption}
                                onPress={() => setSelectedOption('option1')}
                            >
                                <Feather name="smile" size={30} color={selectedOption === 'option1' ? '#6E22AC' : '#ddd'} />
                                <Text style={styles.radioText}>Facial</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.radioOption}
                                onPress={() => setSelectedOption('option2')}
                            >
                                <Ionicons name="body" size={30} color={selectedOption === 'option2' ? '#6E22AC' : '#ddd'} />
                                <Text style={styles.radioText}>Corporal</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Campo de Descrição */}
                        <TextInput
                            style={styles.input}
                            placeholder="Descreva sua solicitação"
                            value={solicitacao}
                            onChangeText={setSolicitacao}
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.cancelModal} onPress={fecharModal}>
                                <Text style={styles.buttonTextModal}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonModal} onPress={() => {
                                console.log('Solicitação:', solicitacao);
                                console.log('Opção Selecionada:', selectedOption);
                                fecharModal();
                            }}>
                                <Text style={styles.buttonTextModal}>Enviar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        padding: 5
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#800080',
        paddingTop: 20
    },
    button: {
        width: '90%',
        height: 45,
        backgroundColor: '#6E22AC',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 20,
        flexDirection: 'row',
    },
    icon: {
        marginRight: 10, // Espaço entre o ícone e o texto
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },

    // Estilos do modal
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Cor do fundo transparente
    },
    modalContainer: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        paddingBottom: 15
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingLeft: 10,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    buttonModal: {
        width: '45%',
        height: 40,
        backgroundColor: '#6E22AC',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    cancelModal: {
        width: '45%',
        height: 40,
        backgroundColor: '#FF0000',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonTextModal: {
        color: 'white',
        fontWeight: 'bold',
    },

    // Estilos para os botões de opção (radios)
    radioContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 15,
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    radioText: {
        marginLeft: 10,
        fontSize: 16,
    }
});
