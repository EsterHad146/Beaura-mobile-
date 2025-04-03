import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity, View, Text } from "react-native";

// Pages
import MeuCadastro from "./src/pages/MeuCadastro";
import Historico from "./src/pages/Historico";
import PainelAdmin from "./src/pages/PainelAdmin";
import Solicitacoes from "./src/pages/Solicitacoes";

// Icons
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from "@expo/vector-icons/Feather";

const LogoutScreen = ({ navigation }) => {
  const handleLogout = async () => {
    // Remover informações da sessão
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("userType");
    await AsyncStorage.removeItem("menuType");
    await AsyncStorage.removeItem("id");

    // Redirecionar para a tela de login
    navigation.navigate("Login"); // Navega para a tela de login
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity onPress={handleLogout}>
        <Feather name="log-out" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#FFF',
          tabBarStyle: {
            backgroundColor: '#202225',
            borderTopWidth: 0
          }
        }}
      >
        <Tab.Screen
          name='MeuCadastro'
          component={MeuCadastro}
          options={{
            tabBarIcon: ({ color, size }) => {
              return <MaterialIcons name="view-agenda" size={size} color={color} />;
            }
          }}
        />
        <Tab.Screen
          name='Historico'
          component={Historico}
          options={{
            tabBarIcon: ({ color, size }) => {
              return <FontAwesome name="history" size={size} color={color} />;
            }
          }}
        />
        <Tab.Screen
          name='PainelAdmin'
          component={PainelAdmin}
          options={{
            tabBarIcon: ({ color, size }) => {
              return <MaterialIcons name="admin-panel-settings" size={size} color={color} />;
            }
          }}
        />
        <Tab.Screen
          name='Solicitacoes'
          component={Solicitacoes}
          options={{
            tabBarIcon: ({ color, size }) => {
              return <MaterialCommunityIcons name="order-bool-descending" size={size} color={color} />;
            }
          }}
        />
        {/* Tela de logout */}
        <Tab.Screen
          name="Sair"
          component={LogoutScreen} // A tela de logout que criamos
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="log-out" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
