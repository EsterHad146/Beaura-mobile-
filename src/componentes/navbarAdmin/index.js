import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//Pages
import Cadastro from "../../pages/MeuCadastro"
import Historico from "../../pages/Historico"
import PainelAdmin from "../../pages/PainelAdmin"
import Solicitacoes from "../../pages/Solicitacoes"

//Icons
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function NavbarAdmin() {
    const Tab = createBottomTabNavigator();

    return (
        <NavigationContainer>
            <Tab.Navigator
                //Configuração do menu de opções
                screenOptions={{
                    headerShown: false, //cabeçalho
                    tabBarHideOnKeyboard: true, //esconder menu quando o teclado estiver ativado
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: '#FFF',

                    tabBarStyle: {
                        backgroundColor: '#202225',
                        borderTopWidth: 0
                    }
                }}
            >
                <Tab.Screen
                    name='Cadastro'
                    component={Cadastro}
                    options={{
                        tabBarIcon: ({ color, size }) => {
                            return <MaterialIcons
                                name="view-agenda"
                                size={size}
                                color={color}
                            />
                        }
                    }}
                />
                <Tab.Screen
                    name='Historico'
                    component={Historico}
                    options={{
                        tabBarIcon: ({ color, size }) => {
                            return <FontAwesome
                                name="history"
                                size={size}
                                color={color}
                            />
                        }
                    }}
                />
                <Tab.Screen
                    name='PainelAdmin'
                    component={PainelAdmin}
                    options={{
                        tabBarIcon: ({ color, size }) => {
                            return <MaterialIcons
                                name="admin-panel-settings"
                                size={size}
                                color={color}
                            />
                        }
                    }}
                />
                <Tab.Screen
                    name='Solicitacoes'
                    component={Solicitacoes}
                    options={{
                        tabBarIcon: ({ color, size }) => {
                            return <MaterialCommunityIcons
                                name="order-bool-descending"
                                size={size}
                                color={color}
                            />
                        }
                    }}
                />

            </Tab.Navigator>
        </NavigationContainer>
    )
}