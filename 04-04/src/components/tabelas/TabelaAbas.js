import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper'; // Botões estilizados
import { createStackNavigator } from '@react-navigation/stack';
import styles from "../../styles";

// Importando suas telas
import TabelaTurmas from './TabelaTurmas';
import TabelaProcedimento from './TabelaProcedimento';
import TabelaEspecialidade from './TabelaEspecialidade';

const Stack = createStackNavigator();

function TabelaPrincipal() {
  const navigation = useNavigation(); // Usando o hook de navegação

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha uma categoria</Text>
      
      {/* Botões para navegação direta para as telas */}
      <Button
        mode="contained"
        onPress={() => navigation.navigate('TabelaTurmas')} // Navega diretamente para TabelaTurmas
        style={styles.button}
      >
        Turmas
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('TabelaProcedimento')} // Navega diretamente para TabelaProcedimento
        style={styles.button}
      >
        Procedimentos
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('TabelaEspecialidade')} // Navega diretamente para TabelaEspecialidade
        style={styles.button}
      >
        Especialidades
      </Button>
    </View>
  );
}

// Definindo o Stack Navigator
function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Menu Administrador" component={TabelaPrincipal} style={styles.title}/>
      <Stack.Screen name="TabelaTurmas" component={TabelaTurmas} style={styles.title}/>
      <Stack.Screen name="TabelaProcedimento" component={TabelaProcedimento} style={styles.title}/>
      <Stack.Screen name="TabelaEspecialidade" component={TabelaEspecialidade} style={styles.title}/>
    </Stack.Navigator>
  );
}

export default AppNavigator;
