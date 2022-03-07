import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacityBase, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Register({ navigation }) {
  const [name, _name] = useState('');
  const [email, _email] = useState('');
  const [password, _password] = useState('');
  const [confPassword, _confPassword] = useState('');
  const [errorMsg, _errorMsg] = useState('');

  const handleRegister = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (!name) {
      _errorMsg('Please Enter Name');
      return false;
    } else if (reg.test(email) === false) {
      _errorMsg('Email is Not Correct');
      return false;
    } else if (password !== confPassword) {
      _errorMsg('Password Not Match');
      return false;
    } else {
      try {
        storeData();
      } catch (e) {
        _errorMsg('Something went wrong');
      }
    }
  };

  useEffect(async () => {
    const userDetail = await AsyncStorage.getItem('userDetail');
    if (userDetail) {
      navigation.navigate('Login', JSON.parse(userDetail));
    }
  }, []);

  const storeData = async (value) => {
    try {
      const userDetail = { name: name, email: email, password: password };
      await AsyncStorage.setItem('userDetail', JSON.stringify(userDetail));
      navigation.navigate('Login');
    } catch (e) {
      _errorMsg('Something Went Wrong')
    }
  };

  return (
    <View style={styles.container}>
      {errorMsg ? (
        <Text
          style={{ backgroundColor: 'tomato', padding: 15, fontSize: 18, color: 'white', borderRadius: 10 }}
        >
          X {errorMsg}
        </Text>
      ) : null}
      <Text style={styles.headingTitle}>Register</Text>
      <View>
        <TextInput style={styles.input} placeholder='Name' onChangeText={(text) => _name(text)} />
        <TextInput style={styles.input} placeholder='Email' onChangeText={(value) => _email(value)} />
        <TextInput style={styles.input} placeholder='Password' onChangeText={(value) => _password(value)} />
        <TextInput
          style={styles.input}
          placeholder='Confirm Password'
          onChangeText={(value) => _confPassword(value)}
        />
        <View>
          <TouchableOpacity style={styles.submitBtn} onPress={handleRegister}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  headingTitle: {
    fontSize: 32,
    textAlign: 'left',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
  },
  submitBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    marginTop: 10,
  },
  submitText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
