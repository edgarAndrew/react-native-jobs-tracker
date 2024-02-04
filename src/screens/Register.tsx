import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import {RootStackParamList} from '../App'

type RegisterProps = NativeStackScreenProps<RootStackParamList,'Register'>

const Register = ({navigation}:RegisterProps) => {
  const [username, setUsername] = useState('');
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    console.log(username,email,password,confirmPassword)
  };

  return (
    <View style={styles.container}>
        <View style={styles.cont}>
            <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor="#000"
                onChangeText={text => setUsername(text)}
                value={username}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#000"
                onChangeText={text => setemail(text)}
                value={email}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#000"
                onChangeText={text => setPassword(text)}
                value={password}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm password"
                placeholderTextColor="#000"
                onChangeText={text => setConfirmPassword(text)}
                value={confirmPassword}
                secureTextEntry
            />
            <Button title="Register" onPress={handleRegister} />
            <Button title="Already have an account ?" onPress={()=>{navigation.goBack()}} />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  cont:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"#ffffab",
    width:300,
    height:400,
    padding:8,
    borderRadius:10
  },
  input: {
    width: '100%',
    marginBottom: 20,
    marginLeft:5,
    marginRight:5,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    color:"#000"
  },
});

export default Register;
