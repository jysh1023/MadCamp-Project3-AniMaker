import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios';

const SignIn = ({navigation}) => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        if ( username === '' || password === '') {
            alert("모든 필드를 입력해주세요.");
            return;
        }
        try {
            console.log('서버에 로그인 요청을 보냅니다...');
            const resp = await axios.post("http://172.10.9.14:80/login/",
                                          { user_name: username, password: password },
                                          { headers: { 'Content-Type': 'application/json' } });
            console.log('서버로부터의 응답:', resp.data);
            if (resp.data.status === "Login successful") {
                alert("Login Successful");
                navigation.navigate('Home')
            } else {
                alert("Login Failed");
            }
        } catch(error) {
            console.log('서버 요청 중 오류가 발생했습니다:', error);
        }
    };
    return (
        <View style={styles.container}>
            <View style={{ marginVertical: 100 }}>
                <Text style={styles.signupText}>Sign In</Text>
                <View style={{ marginHorizontal: 24 }}>
                    <Text style={{ fontSize: 16, color: '#8e93a1', fontFamily: 'SCDream3' }}>USERNAME</Text>
                    <TextInput style={styles.signupInput} value={username} onChangeText={text => setUserName(text)} autoComplete="off"/>
                </View>
                <View style={{ marginHorizontal: 24 }}>
                    <Text style={{ fontSize: 16, color: '#8e93a1', fontFamily: 'SCDream3' }}>PASSWORD</Text>
                    <TextInput style={styles.signupInput} value={password} onChangeText={text => setPassword(text)} secureTextEntry={true} autoComplete="password" />
                </View>
                <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>로그인</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 12, textAlign: 'center' }}>
                    첫 방문이신가요? {" "}
                    <Text style={{color: 'darkred', fontWeight: 'bold'}}
                        onPress={() => navigation.navigate("SignUp")}>
                        회원가입
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
        fontFamily: 'SCDream6',
        textAlign: 'center',
        marginBottom: 50,
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
        fontFamily: 'SCDream6',
        fontSize: 20,
        textAlign: 'center',
        color: '#fff',
        textTransform: 'uppercase',
    },
    imageContainer: { justifyContent: "center", alignItems: "center" },
    imageStyles: { width: 100, height: 100, marginVertical: 20 }
})

export default SignIn