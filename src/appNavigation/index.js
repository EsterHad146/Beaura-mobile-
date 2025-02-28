import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";

const Stack = createStackNavigator();

export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    name="Login"
                    component={Login} />
                <Stack.Screen
                    name="Cadastro"
                    component={Cadastro} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
