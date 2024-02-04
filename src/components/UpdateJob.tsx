import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { PropsWithChildren,useState } from 'react'
import { updateJobRequest,updateJobSuccess,updateJobFailure} from '../reducers/jobReducer';
import { useDispatch,useSelector } from 'react-redux';
import axios,{isAxiosError} from "axios";
import '../axios'
import Snackbar from 'react-native-snackbar';


type UpdateJobProps = PropsWithChildren<{
    toggleUpdateModal:Function;
    item:Job
}>

export default function UpdateJob(props:UpdateJobProps) {
    const [company,setCompany] = useState(props.item.company)
    const [status,setStatus] = useState(props.item.status)
    const [position,setPosition] = useState(props.item.position)
    const dispatch = useDispatch()

    const handleUpdate = async () =>{
        props.toggleUpdateModal()
        dispatch(updateJobRequest())
        try{
            const { data } = await axios.patch(`/jobs/${props.item._id}`, {company,position,status})
            dispatch(updateJobSuccess("Job has been updated"))
          }catch(error){
            if(isAxiosError(error)){
                console.log(error)
              dispatch(updateJobFailure(error.message))
            }else{
              dispatch(updateJobFailure("Something went wrong"))
            }
          }
    }


  return (
    <View style={styles.modal}>
        <Text style={styles.headingText}>Update Job</Text>
        <View style={styles.cont2}>
            <View style={styles.cont3}>
                <Text style={styles.grayText}>Company : </Text>
                <TextInput
                    value={company}
                    style={styles.text}
                    onChangeText={text=>setCompany(text)}
                />
            </View>
            <View style={styles.cont3}>
                <Text style={styles.grayText}>Position   : </Text>
                <TextInput
                    value={position}
                    style={styles.text}
                    onChangeText={text => setPosition(text)}
                />
            </View>
            <View style={styles.cont3}>
                <Text style={styles.grayText}>Status      : </Text>
                <TextInput
                    value={status}
                    style={styles.text}
                    onChangeText={text=>setStatus(text)}
                />
            </View>
        </View>
        <TouchableOpacity onPress={handleUpdate}>
            <Text style={styles.btnText}>Done</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    modal:{
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
        height:400,
        width:350,
        backgroundColor:"#ecffcc",
        borderRadius:6
    },
    btnText:{
        fontSize:24,
        fontWeight:"800",
        textTransform:"uppercase",
        color:'#009688',
        marginHorizontal:24,
        marginTop:22
    },
    cont2:{
        // flexDirection:"row",
        // justifyContent:"space-between",
        marginVertical:5
    },
    cont3:{
        flexDirection:"row",
        justifyContent:"flex-start",
        marginVertical:16,
        width:300,
        columnGap:40
    },
    grayText:{
        fontSize:20,
        color:"#006600",
    },
    text:{
        fontSize:20,
        color:"#000",
        // textTransform:'capitalize'
        backgroundColor:'#fff',
    },
    headingText:{
        fontSize:26,
        fontWeight:"bold",
        color:'#000',
        marginBottom:10,
    }
})