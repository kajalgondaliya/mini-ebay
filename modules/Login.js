import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacityBase, TouchableOpacity } from 'react-native';

export default function Login({ route, navigation }) {
  const [email, _email] = useState('');
  const [password, _password] = useState('');
  const [userCred, _userCred] = useState({});
  const [errorMsg, _errorMsg] = useState('');

  const userDetail = route.params;

  useEffect(() => {
    if (userDetail) {
      console.log("🚀 ~ file: Login.js ~ line 14 ~ useEffect ~ userDetail", userDetail)
      _userCred(userDetail);
    }
  }, []);

  const handleLogin = () => {
    if (email === userCred.email && password === userCred.password) {
      navigation.navigate('PostProducts');
    } else {
      _errorMsg('Email or password is Wrong');
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
      <Text style={styles.headingTitle}>Login</Text>
      <View>
        <TextInput style={styles.input} placeholder='Email' onChangeText={(value) => _email(value)} />
        <TextInput style={styles.input} placeholder='Password' onChangeText={(value) => _password(value)} />
        <View>
          <TouchableOpacity style={styles.submitBtn} onPress={handleLogin}>
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
