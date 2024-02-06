import { StyleSheet, Text, View,ActivityIndicator } from 'react-native'
import React,{PropsWithChildren} from 'react'

type LoaderProps = PropsWithChildren<{
    loaderText:string
}>


export default function Loader(props:LoaderProps) {
  return (
    <View style={styles.container}>
        <ActivityIndicator size={150} color="#40bf40"/>
        <Text style={styles.loadingText}>{props.loaderText}</Text>
  </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems:"center",
      rowGap:40,
      backgroundColor:"#f6ffe6"
    },
    loadingText:{
        color:"#009688",
        fontSize:26,
        fontWeight:"500"
    }
  });