import { Button, KeyboardAvoidingView, TextInput, View, Text } from "react-native"
import Styles from '../assets/Style.js'; 
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState , useEffect } from "react";
import axios from "axios";


const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
     axios.get('https://projet-e-commerce-temp-default-rtdb.europe-west1.firebasedatabase.app', 
     {
        auth :{
            username:'fringilla.euismod@icloud.edu',
            password:'testtest',
        }
     }).then(({data}) => { console.log(data+'lala') } )
     .catch((err) => {
        console.log(err.message+'lala');
      })
    }, []);

    return (
        <KeyboardAvoidingView
        style={[Styles.container, Styles.centered]}
        behavior="padding">
            <View style={ Styles.inputContainer}>
                <TextInput
                    placeholder="Email"
                    value={ email }
                    onChangeText={ text => setEmail(text)}
                    style={Styles.input}>
                    
                </TextInput>
                <TextInput
                    placeholder="Password"
                    value={ password}
                    onChangeText={ text => setPassword(text)}
                    style={Styles.input}
                    secureTextEntry>
                    
                </TextInput>
            </View>
            <View style={ Styles.buttonContainer }>
                <TouchableOpacity
                    onPress={ () => { } }
                    style={Styles.button}>
                    <Text style={ Styles.buttonText }>Login</Text>
                </TouchableOpacity>   
            </View>
    
        </KeyboardAvoidingView>
    )
}

export default LoginScreen;