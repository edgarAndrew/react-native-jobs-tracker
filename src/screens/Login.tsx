import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { CommonActions } from '@react-navigation/native';
import {RootStackParamList} from '../App'
import { useDispatch,useSelector } from 'react-redux'
import { RootState } from '../store';
import { loginRequest,loginSuccess,loginFailure } from '../reducers/authReducer';
import axios,{isAxiosError} from "axios";
import '../axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';

type LoginProps = NativeStackScreenProps<RootStackParamList,'Login'>

const Login = ({navigation}: LoginProps) => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  
  const {isAuthenticated,isLoading,error,user} = useSelector((state: RootState) => state.auth)

  useEffect(()=>{
    if(isAuthenticated){
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        })
      );
    }
    if(error !== ''){
      Snackbar.show({
        text: error,
        duration: Snackbar.LENGTH_SHORT
      })
    }
  },[isAuthenticated,error])

  const handleLogin = async() => {
    dispatch(loginRequest())
    try{
      const { data } = await axios.post(`/auth/login`, {email,password})
      AsyncStorage.setItem("token",data.token)
      dispatch(loginSuccess(data.user.name))
      
    }catch(error){
      if(isAxiosError(error)){
        dispatch(loginFailure(error.message))
      }else{
        dispatch(loginFailure("Something went wrong"))
      }
     
    }
  };

  return (
    <View style={styles.container}>
        <View style={styles.cont}>
                <TextInput
                style={styles.input}
                placeholder="Email..."
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
            <View style={styles.cont2}>
              <Button title="Login" onPress={handleLogin} disabled={isLoading}/>
              <Button title="Register" onPress={()=>{navigation.navigate("Register")}} />
            </View>
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
    padding:20,
    borderRadius:10
  },
  cont2:{
    rowGap:15,
    marginTop:25,
  },
  input: {
    width: '100%',
    marginBottom: 20,
    marginLeft:5,
    marginRight:5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    color:"#000"
  },
});

export default Login;
