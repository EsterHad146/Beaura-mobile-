import React from "react";
import { ScrollView, View, Text, StyleSheet, Button, TextInput } from 'react-native';

import { useNavigation } from "@react-navigation/native";

export default function Cadastro(){

    return(
        <ScrollView>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Meu Cadastro</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.textForm}>Nome:</Text>
                <TextInput style={styles.input} underlineColorAndroid='transparent' /*value={nome} onChangeText={}*//>
                <Text style={styles.textForm}>Sobrenome:</Text>
                <TextInput style={styles.input} underlineColorAndroid='transparent' /*value={nome} onChangeText={}*//>
                <Text style={styles.textForm}>RG:</Text>
                <TextInput style={styles.input} underlineColorAndroid='transparent' /*value={nome} onChangeText={}*//>
                <Text style={styles.textForm}>CPF:</Text>
                <TextInput style={styles.input} underlineColorAndroid='transparent' /*value={nome} onChangeText={}*//>
                <Text style={styles.textForm}>Data de Nascimento:</Text>
                <TextInput style={styles.input} underlineColorAndroid='transparent' /*value={nome} onChangeText={}*//>
                <Text style={styles.textForm}>Idade:</Text>
                <TextInput style={styles.input} underlineColorAndroid='transparent' /*value={nome} onChangeText={}*//>
                <Text style={styles.textForm}>Sexo:</Text>
                <TextInput style={styles.input} underlineColorAndroid='transparent' /*value={nome} onChangeText={}*//>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#800080',
        margin: 10,
        padding: 5
    },
    titleContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#800080',
        paddingTop: 20
    },
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
    }
})