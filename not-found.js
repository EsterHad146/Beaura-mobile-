import React from "react"
import { View, Text, Button, Image } from "react-native"
import erro from "./images/OOPS!.png"

export default function NotFound(){

    return(
        <View>
            <Text>Estes não são os dróides que você está procurando...</Text>
            <Button><Text>Voltar ao início</Text></Button>
            <Image source={erro} style={{width:300, height: 300}}/>
        </View>
    )
}