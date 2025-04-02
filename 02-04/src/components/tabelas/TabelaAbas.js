import React from 'react';
import { View, Button, Text } from 'react-native';

export default function TabelaPrincipal({ navigation }) {
  return (
    <View>
      <Text>Bem-vindo à Tabela Principal!</Text>
      
      {/* Botões para navegar para as outras telas */}
      <Button
        title="Ir para Turmas"
        onPress={() => navigation.navigate('Turmas')}
      />
      
      <Button
        title="Ir para Especialidade"
        onPress={() => navigation.navigate('Especialidade')}
      />
      
      <Button
        title="Ir para Tabela de Procedimentos"
        onPress={() => navigation.navigate('TabelaProcedimento')}
      />
    </View>
  );
}
