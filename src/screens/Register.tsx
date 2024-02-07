import React, { useState,useEffect } from 'react';
import { View, TextInput, Button, StyleSheet,TouchableOpacity,Text} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import {RootStackParamList} from '../App'
import { useDispatch,useSelector } from 'react-redux'
import { CommonActions } from '@react-navigation/native';
import { RootState } from '../store';
import { registerRequest,registerSuccess,registerFailure } from '../reducers/authReducer';
import axios,{isAxiosError} from "axios";
import '../axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';

type RegisterProps = NativeStackScreenProps<RootStackParamList,'Register'>

const Register = ({navigation}:RegisterProps) => {
  const [name, setUsername] = useState('');
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const {isLoading,error,isAuthenticated} = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()

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

  const handleRegister = async() => {
    if(!password || !confirmPassword || !email || !name){
      Snackbar.show({
        text: "Fill all the fields !",
        duration: Snackbar.LENGTH_SHORT,
      })
      return
    }
    if(password !== confirmPassword){
      Snackbar.show({
        text: "Password does not match",
        duration: Snackbar.LENGTH_SHORT
      })
      return
    }

    dispatch(registerRequest())
    try{
      const {data} = await axios.post("/auth/register",{name,email,password})
      AsyncStorage.setItem("token",data.token)
      AsyncStorage.setItem("user",data.user.name)
      dispatch(registerSuccess())
    }
    catch(error){
      if(isAxiosError(error)){
        if(error.response?.data.message)
          dispatch(registerFailure(error.response?.data.message))
        else if(error.response?.data)
          dispatch(registerFailure(error.response?.data))
        else
          dispatch(registerFailure(error.message))
      }
    }
  };

  return (
    <View style={styles.container}>
        <View style={styles.cont}>
          <Text style={styles.headerText}>JobPulse</Text>
          <View style={styles.cont2}>
            <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#000"
                onChangeText={text => setUsername(text)}
                value={name}
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
          </View>
          <View style={styles.cont2}>
            <TouchableOpacity onPress={handleRegister} disabled={isLoading} style={styles.appButtonContainer}>
                <Text style={styles.btnText}>Register</Text>
            </TouchableOpacity>
            <View style={styles.cont3}>
                <Text style={styles.blackText}>Already have an account? </Text>
                <TouchableOpacity onPress={()=>{navigation.goBack()}} disabled={isLoading}>
                  <Text style={styles.greenText}>Login</Text>
                </TouchableOpacity>
            </View>
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
    backgroundColor:"#f6ffe6"
  },
  cont:{
    justifyContent: 'center',
    alignItems: 'center',
    width:350,
    height:620,
    elevation: 6,
    backgroundColor: "#ccffcc",
    borderRadius: 6,
    paddingHorizontal: 15,
  },
  cont2:{
    rowGap:15,
    marginVertical:25
  },
  cont3:{
    flexDirection:"row"
  },
  input: {
    elevation: 3,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 9,
    paddingHorizontal: 15,
    width:280,
    marginVertical:5,
    fontSize:20,
    color:'#000'
  },
  appButtonContainer: {
    elevation: 7,
    backgroundColor: "#009688",
    borderRadius: 19,
    paddingVertical: 6,
    paddingHorizontal: 5,
    width:170,
    marginVertical:5,
    alignSelf:"center",
    marginBottom:30
  },
  btnText:{
      fontSize:18,
      fontWeight:"600",
      textTransform:"uppercase",
      color:'#fff',
      alignSelf:"center",
      paddingVertical:3
  },
  headerText:{
    fontSize:34,
    fontWeight:"bold",
    color:"#009688",
    marginBottom:20
  },
  greenText:{
    fontSize:18,
      fontWeight:"600",
      textTransform:"uppercase",
      color:'#009688'
  },
  blackText:{
    fontSize:18,
    color:'#000'
  }
});

export default Register;
