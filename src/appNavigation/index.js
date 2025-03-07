import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import Home from "../pages/Home"; // A tela Home

export default function AppNavigation() {
    const Stack = createStackNavigator();
    
    // Estado para verificar se o usuário está autenticado
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Função de login (simulada)
    const handleLogin = () => {
        setIsAuthenticated(true); // Define que o usuário está autenticado
    };

    // Função de logout (simulada)
    const handleLogout = () => {
        setIsAuthenticated(false); // Define que o usuário não está mais autenticado
    };

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ headerShown: false }}>
                {isAuthenticated ? (
                    // Se o usuário estiver autenticado, redirecionamos para a Home
                    <Stack.Screen name="Home" component={Home} />
                ) : (
                    // Se o usuário não estiver autenticado, mostramos a tela de Login e Cadastro
                    <>
                        <Stack.Screen name="Login">
                            {props => <Login {...props} onLogin={handleLogin} />}
                        </Stack.Screen>
                        <Stack.Screen name="Cadastro" component={Cadastro} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
