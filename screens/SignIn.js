import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios';


const SignIn = ({navigation}) => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    // const handleSubmit = async () => {
    //     if ( username === '' || password === '') {
    //         alert("All fields are required");
    //         return;
    //     }
    //     const resp = await axios.post("address", { email, password });
    //     if (resp.data.error)
    //         alert(resp.data.error)
    //     else {
    //         // 인증 코드
    //         alert("Sign in successful");
    //     }


    // };
    return (
        <View style={styles.container}>
            <View style={{ marginVertical: 100 }}>
                <Text style={styles.signupText}>Sign In</Text>
                <View style={{ marginHorizontal: 24 }}>
                    <Text style={{ fontSize: 16, color: '#8e93a1' }}>USERNAME</Text>
                    <TextInput style={styles.signupInput} value={username} onChangeText={text => setUserName(text)} autoComplete="off"/>
                </View>
                <View style={{ marginHorizontal: 24 }}>
                    <Text style={{ fontSize: 16, color: '#8e93a1' }}>PASSWORD</Text>
                    <TextInput style={styles.signupInput} value={password} onChangeText={text => setPassword(text)} secureTextEntry={true} autoComplete="password" />
                </View>
                <TouchableOpacity
                    // onPress={handleSubmit}
                    style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 12, textAlign: 'center' }}>
                    Not yet registered? {" "}
                    <Text style={{color: 'darkred', fontWeight: 'bold'}}
                        onPress={() => navigation.navigate("SignUp")}>
                        Sign Up
                    </Text>
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    signupText: {
        fontSize: 30,
        textAlign: 'center'
    },
    signupInput: {
        borderBottomWidth: 0.5,
        height: 48,
        borderBottomColor: "#8e93a1",
        marginBottom: 30,
    },
    buttonStyle: {
        backgroundColor: "darkmagenta",
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        marginHorizontal: 15,
        borderRadius: 15,
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center',
        color: '#fff',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    imageContainer: { justifyContent: "center", alignItems: "center" },
    imageStyles: { width: 100, height: 100, marginVertical: 20 }
})

export default SignIn