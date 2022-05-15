import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
const backImage = require('../assets/backGround.png');

export default function Login ({ navigation }) {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onHandleSingup = () => {
    if (email !== "" && password !== "") {
      createUserWithEmailAndPassword (auth, email, password)
      .then(() => console.log("Cuenta creada"))
      .catch((err) => Alert.alert("Error al crear cuenta", err.message));
    }
  }
  return(
    <View style={styles.container}>
      <Image source={backImage} style={styles.backImage} />
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Registrate</Text>
        <TextInput
          style={styles.input}
          placeholder='Ingresa tu e-mail'
          autoCapitalize='none'
          keyboardType='email-address'
          textContentType='emailAddress'
          autoFocus={true}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder='Ingresa tu contraseña'
          autoCapitalize='none'
          autoCorrect={false}
          secureTextEntry={true}
          textContentType='password'
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.button} onPress={onHandleSingup}>
          <Text style={styles.text}>Registrar</Text>
        </TouchableOpacity>
        <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
          <Text style={{ color: '#fff', fontWeight: '600', fontSize: 14, textAlign: 'center'}}>¿Ya tienes una cuenta? </Text>
          <TouchableOpacity onPress={()=> navigation.navigate("LoginEmail")}>
            <Text style={{color: '#7b61ff', fontWeight: '600', fontSize: 14}}>inicia sesión.</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000"
  },

  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#7b61ff",
    alignSelf: "center",
    paddingBottom: 30,
    top:-20
  },

  input: {
    backgroundColor: "#ddd",
    height: 58,
    marginBottom: 10,
    borderRadius: 10,
    padding: 10
  },

  backImage: {
    width: "100%",
    height: 310,
    position: "absolute",
    top: 0,
    resizeMode: 'cover'
  },

  whiteSheet: {
    width: "100%",
    height: "75%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#202020",
    borderTopLeftRadius: 60
  },

  form: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 50,
    top: 90
  },
  
  button: {
    backgroundColor: "#7b61ff",
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5
  },

  text: {
    fontWeight: '600',
    color: '#fff',  
    fontSize: 18
  }
});