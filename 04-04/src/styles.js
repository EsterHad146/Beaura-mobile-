import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    //*******CONFIGURAÇÕES DE TELA */
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    },
    containerCadastro: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#800080',
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
        paddingTop: 15,
        paddingBottom: 10
    },

    // ****BOTÕES****
    input: {
        height: 60,
        borderWidth: 2,
        borderColor: '#800080',
        marginTop: 5,
        marginBottom: 10,
        fontSize: 15,
        padding: 15,
        width: '90%',
        backgroundColor: '#E6E6FA',
        borderRadius: 10,
    },
    textForm: {
        fontSize: 16,
        fontWeight: "bold",
        color: '#800080',
        marginTop: 5,
        textAlign: 'left', // Alinha o texto à esquerda
        width: '90%', // Garante que o texto não ultrapasse a largura do input
    },
    pickerWrapper: {
        width: '90%',
        borderWidth: 2,
        borderColor: '#800080',
        marginTop: 5,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: '#E6E6FA',
        paddingLeft: 15,
        paddingRight: 15,
    },
    pickerInput: {
        height: 50,
        fontSize: 15,
        padding: 10,
        width: '100%',
    },
    containerBotao: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    },
    button: {
        width: '90%',
        height: 45,
        backgroundColor: '#6E22AC',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: 'row',
    },
    icon: {
        marginRight: 10, // Espaço entre o ícone e o texto
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Cor do fundo transparente
    },
    modalContainer: {
        width: '90%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        paddingBottom: 15
    },
    inputModal: {
        width: '100%',
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingLeft: 10,
        height: 100,
        textAlignVertical: 'top',
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
    radioContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 15,
        padding: 10
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    radioText: {
        marginLeft: 10,
        fontSize: 16,
    },
    containerLogin: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5', // Cor de fundo suave
    },

    //***** TELA LOGIN ******
    titleLogin: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#6E22AC',
    },
    labelLogin: {
        alignSelf: 'flex-start',
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#6E22AC',
    },
    textInputLogin: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    toggleButtonLogin: {
        marginBottom: 10,
    },
    toggleButtonTextLogin: {
        color: '#6E22AC',
        fontWeight: 'bold',
    },
    loginButtonLogin: {
        backgroundColor: '#6E22AC',
        width: '100%',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    loginButtonTextLogin: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footerTextLogin: {
        marginTop: 20,
        fontSize: 14,
        color: '#555',
    },
    registerTextLogin: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#6E22AC',
        marginTop: 5,
    },

    //*********Alterações Rosi**************

    //*******CONFIGURAÇÕES DE TELA OPÇÃO 2 */
    container2: {
        flex: 1,
        padding: 20,
    },

    //*******BOTÕES OPÇÃO 2 */
    input2: {
        borderColor: '#800080',
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        fontSize: 14,
    },
    buttonEnabled: {
        backgroundColor: '#6A0DAD',
    },
    buttonDisabled: {
        backgroundColor: '#A9A9A9',
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

    //*****TELA TÉCNICOS */
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

    //******TELA PROCEDIMENTO */
    procedimentoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10
    },
    procedimentoText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4B0082'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20
    },
    pageButton: {
        fontSize: 18,
        padding: 10,
        color: '#4B0082'
    },
    activePage: {
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#4B0082',
        borderRadius: 5
    },
})

export default styles;