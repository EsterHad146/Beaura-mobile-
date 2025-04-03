import React from "react";
import { ScrollView, View, Text, StyleSheet, Button } from 'react-native';
import styles from "./styles";

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