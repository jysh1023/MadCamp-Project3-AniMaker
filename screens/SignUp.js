import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import axios from "axios";

const SignUp = ({navigation}) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async() => {
    if (username === '' || password === '') {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    try {
      const resp = await axios.post("http://172.10.9.14:80/signup/", {user_name: username, password: password});
      if (resp.data.status === "User created") {
        alert("Signup Successful");
        navigation.navigate('SignIn')
      } else {
        alert(resp.data.detail);
      }
    } catch(error) {
      console.error(error);
    }
  }


  return (
    <View style={styles.container}>
      <View style={{marginVertical: 100}}>
        <View style={styles.imageContainer}>
            <Image source={require('../assets/AniMaker_logo.png')} style={styles.imageStyles}/>
        </View>
        {/* <Text style = {styles.signupText}>Sign Up</Text> */}
        <View style = {{marginHorizontal: 24}}>
          <Text style={{fontSize: 16, color: '#8e93a1', fontFamily: 'SCDream3'}}>USERNAME</Text>
          <TextInput style={styles.signupInput} value={username} onChangeText={text => setUserName(text)} autoComplete="off"/>
        </View>
        <View style = {{marginHorizontal: 24}}>
          <Text style={{fontSize: 16, color: '#8e93a1', fontFamily: 'SCDream3'}}>PASSWORD</Text>
          <TextInput style={styles.signupInput} value={password} onChangeText={text => setPassword(text)} secureTextEntry={true} autoComplete="new-password"/>
        </View>
        <TouchableOpacity
          onPress={handleSubmit}
          style={styles.buttonStyle}>
          <Text style={styles.buttonText}>회원가입</Text>
        </TouchableOpacity>
        <Text style={{fontSize: 12, textAlign: 'center'}}>이미 회원이신가요? {" "}
          <Text style={{color: 'darkred', fontWeight: 'bold'}}
            onPress={() => navigation.navigate("SignIn")}>
              로그인
          </Text>
        </Text>
      </View>
    </ View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  signupText: {
    fontSize : 30,
    fontFamily: 'SCDream6',
    textAlign: 'center',
    marginBottom: 50,
  },
  signupInput: {
    borderBottomWidth: 0.5,
    height: 48,
    borderBottomColor: '#8e93a1',
    marginBottom: 30
  },
  buttonStyle: {
    backgroundColor: "darkmagenta",
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    marginHorizontal: 15,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#ffffff',
    textTransform: 'uppercase',
    fontFamily: 'SCDream6'
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyles: {
    width: 150,
    height: 150,
    marginVertical: 20
  }
})

export default SignUp