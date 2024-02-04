import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Pressable} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import {RootStackParamList} from '../App'
import { useSelector, useDispatch } from 'react-redux'
import { decrement,increment, incrementByAmount } from '../features/counter/counterSlice';
import { RootState } from '../store';

type DummyProps = NativeStackScreenProps<RootStackParamList,'Dummy'>

const Dummy = ({navigation}: DummyProps) => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  const handleIncrement = () => {
    dispatch(increment())
  };
  const handleDecrement = () =>{
    dispatch(decrement())
  }

  return (
    <View style={styles.container}>
        <View style={styles.cont}>
            <Text style={styles.input}>{count}</Text>
            <View style={styles.cont2}>
                <Button title="Increment" onPress={handleIncrement} />
                <Button title="Decrement" onPress={handleDecrement} />
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
    padding:8,
    borderRadius:10
  },
  cont2:{
    rowGap:15,
    marginTop:25,
  },
  input: {
    marginBottom:10,
    fontSize:26,
    fontWeight:"600",
    color:'#000'
  },
});

export default Dummy;
