import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper'; // Botões estilizados
import { createStackNavigator } from '@react-navigation/stack';

// Importando suas telas
import TabelaTurmas from './TabelaTurmas';
import TabelaProcedimento from './TabelaProcedimento';
import TabelaEspecialidade from './TabelaEspecialidade';

const Stack = createStackNavigator();

function TabelaPrincipal() {
  const navigation = useNavigation(); // Usando o hook de navegação

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Escolha uma categoria</Text>
      
      {/* Botões para navegação direta para as telas */}
      <Button
        mode="contained"
        onPress={() => navigation.navigate('TabelaTurmas')} // Navega diretamente para TabelaTurmas
        style={{ marginBottom: 10 }}
      >
        Turmas
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('TabelaProcedimento')} // Navega diretamente para TabelaProcedimento
        style={{ marginBottom: 10 }}
      >
        Procedimentos
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('TabelaEspecialidade')} // Navega diretamente para TabelaEspecialidade
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
      <Stack.Screen name="Menu Administrador" component={TabelaPrincipal} />
      <Stack.Screen name="TabelaTurmas" component={TabelaTurmas} />
      <Stack.Screen name="TabelaProcedimento" component={TabelaProcedimento} />
      <Stack.Screen name="TabelaEspecialidade" component={TabelaEspecialidade} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
