import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { MaterialCommunityIcons } from '@expo/vector-icons'; // Ícones do Expo

// Importando componentes de tabelas
import TabelaPrincipal from '../../components/tabelas/TabelaAbas';
import TabelaCliente from '../../components/tabelas/TabelaCliente';
import TabelaTecnico from '../../components/tabelas/TabelaTecnico';

const TopTab = createMaterialTopTabNavigator();

export default function PainelAdmin() {
  return (
    <View style={styles.container}>
      <TopTab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: styles.tabBar,
          tabBarIndicatorStyle: styles.tabBarIndicator,
          tabBarShowLabel: false, // Esconde os nomes das abas
          tabBarIcon: ({ color, focused }) => {
            let iconName;
            switch (route.name) {
              case 'Clientes':
                iconName = focused ? 'account-group' : 'account-group-outline';
                break;
              case 'Técnicos':
                iconName = focused ? 'account-switch-outline' : 'account-switch-outline';
                break;
              case 'Principal':
                iconName = focused ? 'school' : 'school-outline';
                break;
              default:
                iconName = 'help-circle-outline';
            }
            return <MaterialCommunityIcons name={iconName} size={24} color={color} />;
          },
        })}
      >
        <TopTab.Screen name="Clientes" component={TabelaCliente} />
        <TopTab.Screen name="Técnicos" component={TabelaTecnico} />
        <TopTab.Screen name="Principal" component={TabelaPrincipal} />
      </TopTab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40, // Ajusta a distância do topo
    backgroundColor: '#f4f4f4', // Cor de fundo neutra para melhor contraste
  },
  tabBar: {
    backgroundColor: '#6200ee',
    height: 55, // Ajuste da altura para melhor espaçamento
    elevation: 4, // Sombra no Android para efeito elevado
    shadowOpacity: 0.2, // Sombra no iOS
  },
  tabBarIndicator: {
    backgroundColor: 'white',
    height: 4, // Torna o indicador mais visível
    borderRadius: 2, // Bordas arredondadas para um visual mais elegante
  },
  tabBarLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'uppercase', // Padroniza os textos em maiúsculas
    marginBottom: 5, // Ajuste fino para evitar que o texto fique muito colado na borda
  },
});
