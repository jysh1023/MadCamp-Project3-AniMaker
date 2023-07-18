import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

const SignUp = ({navigation}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async() => {
    if (name === '' || email === '' || password === '') {
      alert("All fields are required");
      return
    }
    const resp = await axios.post("http://143.248.229.159:8000/api/signup", {name, email, password});
    if (resp.data.error)
      alert(resp.data.error)
    else {
      await AsyncStorage.setItem("auth-rn", JSON.stringify(data))
      alert("Sign up successful");
    }
  }


  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={require('./assets/temp_logo.png')} style={styles.imageStyles}/>
        </View>
        <Text style = {styles.signupText}></Text>
        <View style = {{marginHorizontal: 24}}>
          <Text style={{fontSize: 16, color: '#8e93a1'}}>NAME</Text>
          <TextInput style={styles.signupInput} value={name} onChangeText={text => setName(text)} autoCapitalize="words" autoComplete="off" multiline/>
        </View>
        <View style = {{marginHorizontal: 24}}>
          <Text style={{fontSize: 16, color: '#8e93a1'}}>EMAIL</Text>
          <TextInput style={styles.signupInput} value={email} onChangeText={text => setEmail(text)} autoComplete="email" keyboardType="email-address"/>
        </View>
        <View style = {{marginHorizontal: 24}}>
          <Text style={{fontSize: 16, color: '#8e93a1'}}>PASSWORD</Text>
          <TextInput style={styles.signupInput} value={password} onChangeText={text => setPassword(text)} secureTextEntry={true} autoComplete="new-password"/>N
        </View>
        <TouchableOpacity onPress={handleSubmit} style={styles.buttonStyle}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <Text style={{fontSize: 12, textAlign: 'center'}}>Already Joined? {" "}
          <Text style={{color: 'darkred', fontWeight: 'bold'}}
            onPress={() => navigation.navigate("SignIn")}>
              Sign In
          </Text>
        </Text>

      </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  signupText: {
    fontSize : 30,
    textAlign: 'center'
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
    fontWeight: 'bold'
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyles: {
    width: 100,
    height: 100,
    marginVertical: 20
  }
})

export default SignUp