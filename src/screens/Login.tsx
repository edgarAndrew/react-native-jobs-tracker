import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { CommonActions } from '@react-navigation/native';
import {RootStackParamList} from '../App'
import { useDispatch,useSelector } from 'react-redux'
import { RootState } from '../store';
import { loginRequest,loginSuccess,loginFailure, loadUserSuccess, loadUserRequest, loadUserFailure } from '../reducers/authReducer';
import axios,{isAxiosError} from "axios";
import '../axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';
import Loader from '../components/Loader';

type LoginProps = NativeStackScreenProps<RootStackParamList,'Login'>

const Login = ({navigation}: LoginProps) => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  
  const {isAuthenticated,isLoading,error} = useSelector((state: RootState) => state.auth)

  const checkJWTToken = async() =>{
    try{
      dispatch(loadUserRequest())
      const {data} = await axios.get("/jobs")
      dispatch(loadUserSuccess())
    }catch(error){
      dispatch(loadUserFailure("JWT token missing/expired , please login"))
    }
  }

  useEffect(()=>{
    checkJWTToken()
  },[])

  useEffect(()=>{
    if(isAuthenticated){
      // navigation.dispatch(
      //   CommonActions.reset({
      //     index: 0,
      //     routes: [{ name: 'Home' }],
      //   })
      // );
      navigation.navigate("Home")
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
      AsyncStorage.setItem("user",data.user.name)
      dispatch(loginSuccess())
      
    }catch(error){
      if(isAxiosError(error)){
        if(error.response?.data.message)
          dispatch(loginFailure(error.response?.data.message))
        else
          dispatch(loginFailure(error.message))
      }
    }
  };
  if(isLoading)
    return <Loader loaderText='Authenticating'/>
  else
    return (
    <View style={styles.container}>
        <View style={styles.cont}>
          <Text style={styles.headerText}>Job Tracker</Text>
            <View style={styles.cont2}>
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
            </View> 
            <View style={styles.cont2}>
              <TouchableOpacity onPress={handleLogin} disabled={isLoading} style={styles.appButtonContainer}>
                <Text style={styles.btnText}>Login</Text>
              </TouchableOpacity>
              <View style={styles.cont3}>
                <Text style={styles.blackText}>No Account yet ? </Text>
                <TouchableOpacity onPress={()=>{navigation.navigate("Register")}} disabled={isLoading}>
                  <Text style={styles.greenText}>Register</Text>
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
    height:500,
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

export default Login;
