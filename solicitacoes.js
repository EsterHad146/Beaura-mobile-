import React, { useState } from 'react'
import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Feather from "@expo/vector-icons/Feather";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import styles from './styles';

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
        setSolicitacao('');
        setSelectedOption(null);
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
                            style={styles.inputModal}
                            placeholder="Descreva sua solicitação"
                            value={solicitacao}
                            onChangeText={setSolicitacao}
                            multiline
                            numberOfLines={5}
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
