import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default function Solicitacoes(){
    return(
        <View style={style.container}>
            <Text>Página Solicitacoes</Text>
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})