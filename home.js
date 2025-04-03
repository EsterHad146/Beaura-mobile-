import React from "react";
import { Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MeuCadastro from "./meuCadastro";
import Agenda from "./agenda";
import Solicitacoes from "./solicitacoes";
import Feather from "@expo/vector-icons/Feather";

const Tab = createBottomTabNavigator();

export default function App(){
  return(
    <NavigationContainer>
      <LinearGradient 
        style={{
        height: 175, 
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}

        start={{x:0,y:1}}
        end={{x:1.25,y:0}}
        colors={['#6E22AC','#30DCC9']}>
          <Image style={{ width: 200, height: 100, marginTop: 25 }} source={require('../assets/images/logosenac.png')} resizeMode="contain"/>
      </LinearGradient>
      <Tab.Navigator screenOptions={{headerShown: false, tabBarHideOnKeyboard: true, tabBarShowLabel: false, tabBarActiveTintColor: '#30DCC9', tabBarStyle:{backgroundColor: '#6E22AC', borderWidth: 0}}}>
        <Tab.Screen name="MeuCadastro" component={MeuCadastro} options={{tabBarIcon: ({color, size}) =>{
          return <Feather name="user" color={color} size={size}/>
        },}}/>
        <Tab.Screen name="Solicitações" component={Solicitacoes} options={{tabBarIcon: ({color, size}) =>{
          return <Feather name="inbox" color={color} size={size}/>
        },}}/>
        <Tab.Screen name="Agenda" component={Agenda} options={{tabBarIcon: ({color, size}) =>{
          return <Feather name="calendar" color={color} size={size}/>
        },}}/>
        <Tab.Screen name="Cadastro" component={Login} options={{tabBarIcon: ({color, size}) =>{
          return <Feather name="log-out" color={color} size={size}/>
        },}}/>
      </Tab.Navigator>
    </NavigationContainer>
  )
}