import React from "react";
import { ScrollView, View, Text, StyleSheet, Button } from 'react-native';

export default function Agenda(){
    return(
        <ScrollView>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Minha Agenda</Text>
            </View>
            <View style={styles.container}></View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
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
    titleContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})