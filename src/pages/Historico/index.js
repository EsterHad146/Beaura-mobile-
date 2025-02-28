import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default function Historico(){
    return(
        <View style={style.container}>
            <Text>Página Historico</Text>
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