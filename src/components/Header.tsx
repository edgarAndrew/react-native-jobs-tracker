import { StyleSheet, Text, View,Pressable,Image,TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from "react-native-modal";
import { useDispatch } from 'react-redux';
import { logout } from '../reducers/authReducer';


export default function Header() {
  const [username,setUsername] = useState("")
  const [modalVisible,setModalVisible] = useState(false)
  const dispatch = useDispatch()
  
  const getUsername = async()=>{
    try{
        const name = await AsyncStorage.getItem('user');
        if(name)
            setUsername(name.charAt(0).toUpperCase() + name.slice(1))
    }catch(err){
        setUsername("null");
    }
  }

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleLogout = async() =>{
    await AsyncStorage.removeItem("token")
    await AsyncStorage.removeItem("user")
    dispatch(logout())
  }

  useEffect(()=>{
    getUsername()
  },[])
  
  return (
    <View style={styles.container}>
      <View style={styles.cont3}>
        <Text style={styles.greenText}>Welcome, </Text>
        <Text style={styles.blackText}>{username}</Text>
      </View>
      <Pressable onPress={toggleModal}>
            <Image source={require('../assets/logout.png')} style={styles.img}/>
      </Pressable>
      <Modal isVisible={modalVisible} animationInTiming={500} animationOutTiming={500} animationIn={"bounceInUp"} animationOut={"bounceOutDown"}>
            <View style={styles.modal}>
                <Text style={styles.confirmText}>Are you sure you want to logout ?</Text>
                <View style={styles.cont2}>
                    <TouchableOpacity onPress={handleLogout}><Text style={styles.btnText}>Yes</Text></TouchableOpacity>
                    <TouchableOpacity onPress={toggleModal}><Text style={styles.btnText}>No</Text></TouchableOpacity>
                </View>
            </View>
        </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:"#acffcc",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    width:"100%",
    marginTop:120,
    paddingHorizontal:20,
    borderBottomLeftRadius:25,
    borderBottomRightRadius:25
  },
  greenText:{
    color:"#004d39",
    fontSize:26,
    paddingVertical:16,
    fontWeight:"600"
  },
  blackText:{
    color:"#000",
    fontSize:26,
    paddingVertical:16,
    fontWeight:"500"
  },
  img:{
      height:45,
      width:40,
    },
    modal:{
      alignItems:'center',
      justifyContent:'center',
      alignSelf:'center',
      height:200,
      width:360,
      backgroundColor:"#ecffcc",
      borderRadius:6,
  },
  confirmText:{
    fontSize:22,
    fontWeight:"500",
    color:'#000',
    alignSelf:"center"
  },
  cont2:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginVertical:5,
    columnGap:30
  },
  btnText:{
    fontSize:24,
    fontWeight:"800",
    textTransform:"uppercase",
    color:'#009688',
    marginHorizontal:24,
    marginTop:22
  },
  cont3:{
    flexDirection:"row",
    alignItems:"center"
  }
})