import { Pressable, StyleSheet, Text, View,TouchableOpacity, Image,Button } from 'react-native'
import React, { PropsWithChildren,useState } from 'react'
import Modal from "react-native-modal";
import UpdateJob from './UpdateJob';
import { deleteJobFailure, deleteJobRequest, deleteJobSuccess,getAllJobsRequest,getAllJobsSuccess,getAllJobsFailure } from '../reducers/jobReducer';
import { useDispatch} from 'react-redux';
import axios,{isAxiosError} from "axios";
import '../axios'
import Snackbar from 'react-native-snackbar';

type JobCardProps = PropsWithChildren<Job>

export default function JobCard(props:JobCardProps):JSX.Element {
   const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);
   const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
   const dispatch = useDispatch()

   const getJobs = async()=>{
    try{
        dispatch(getAllJobsRequest())
        const {data} = await axios.get("/jobs")
        dispatch(getAllJobsSuccess(data.jobs))
    }catch(error){
      if(isAxiosError(error)){
        if(error.response?.data.message)
          dispatch(getAllJobsFailure(error.response?.data.message))
        else
          dispatch(getAllJobsFailure(error.message))
      }
    }
    }
   
   const toggleUpdateModal = () => {
        setUpdateModalVisible(!isUpdateModalVisible);
    };
    const toggleDeleteModal = () => {
        setDeleteModalVisible(!isDeleteModalVisible);
    };

    const handleDelete = async(id:string) =>{
        toggleDeleteModal()
        dispatch(deleteJobRequest())
        try{
            const { data } = await axios.delete(`/jobs/${id}`)
            dispatch(deleteJobSuccess("Job has been deleted"))
            Snackbar.show({
                text:"Job has been deleted",
                duration:Snackbar.LENGTH_SHORT
            })
            getJobs()
          }catch(error){
            if(isAxiosError(error)){
              dispatch(deleteJobFailure(error.message))
            }else{
              dispatch(deleteJobFailure("Something went wrong"))
            }
          }
    }

  return (
    <View style={styles.container}>
         <Modal isVisible={isDeleteModalVisible} animationInTiming={500} animationOutTiming={500} animationIn={"bounceInUp"} animationOut={"bounceOutDown"}>
            <View style={styles.modal}>
                <Text style={styles.confirmText}>Are you sure ?</Text>
                <View style={styles.cont2}>
                    <TouchableOpacity onPress={()=>handleDelete(props._id)}><Text style={styles.btnText}>Yes</Text></TouchableOpacity>
                    <TouchableOpacity onPress={toggleDeleteModal}><Text style={styles.btnText}>No</Text></TouchableOpacity>
                </View>
            </View>
        </Modal>
        <Modal isVisible={isUpdateModalVisible} animationInTiming={500} animationOutTiming={500} animationIn={"bounceInUp"} animationOut={"bounceOutDown"}>
            <UpdateJob toggleUpdateModal={toggleUpdateModal} item={props}/>
        </Modal>
        <View style={{...styles.cont2,marginBottom:13}}>
            <Text style={styles.companyText}>{props.company}</Text>
            <View style={styles.cont3}>
                <Pressable onPress={toggleUpdateModal}>
                    <Image source={require('../assets/modify.png')} style={styles.img}/>
                </Pressable>
                <Pressable onPress={toggleDeleteModal}>
                    <Image source={require('../assets/bin.png')} style={styles.img}/>
                </Pressable>
            </View>
        </View>
        <View style={styles.cont2}>
            <View style={styles.cont3}>
                <Text style={styles.greyText}>Position: </Text>
                <Text style={styles.positionText}>{props.position}</Text>
            </View>
        </View>
        <View style={styles.cont2}>
            <View style={styles.cont3}>
                <Text style={styles.greyText}>Created : </Text>
                <Text style={styles.dateText}>{props.createdAt.substring(0,10).split('-').reverse().join('/')}</Text>
            </View>
        </View>
        <View style={styles.cont2}>
            <View style={styles.cont3}>
                <Text style={styles.greyText}>Status: </Text>
                <Text style={styles.statusText}>{props.status}</Text>
            </View>
            <View style={styles.cont3}>
                <Text style={styles.greyText}>Updated: </Text>
                <Text style={styles.dateText}>{props.updatedAt.substring(0,10).split('-').reverse().join('/')}</Text>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:30,
        elevation: 5,
        backgroundColor: "#ccffcc",
        borderRadius: 6,
        paddingVertical: 10,
        paddingHorizontal: 12,
        width:350
    },
    cont2:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginVertical:5
    },
    cont3:{
        flexDirection:"row",
        justifyContent:"flex-start",
    },
    cont4:{
        flexDirection:"row",
        justifyContent:"space-evenly",
        marginVertical:6
    },
    companyText:{
        fontSize:26,
        fontWeight:"bold",
        textTransform:"uppercase",
        color:'#000'
    },
    positionText:{
        color:'#000',
        fontSize:18,
        textTransform:"capitalize"
    },
    statusText:{
        color:'#000',
        fontSize:18,
        fontWeight:"500",
        textTransform:"capitalize"
    },
    dateText:{
        color:'#000',
        fontSize:17,
    },
    greyText:{
        color:"#006600",
        fontSize:18,
        textTransform:"capitalize",
        fontWeight:"400"
    },
    btn:{
        elevation: 6,
        backgroundColor: "#e6ffe6",
        borderRadius: 4,
        paddingVertical: 6,
        paddingHorizontal: 10,
        width:60,
        marginVertical:6,
        marginHorizontal:8
    },
    btnText:{
        fontSize:24,
        fontWeight:"800",
        textTransform:"uppercase",
        color:'#009688',
        marginHorizontal:24,
        marginTop:22
    },
    confirmText:{
        fontSize:22,
        fontWeight:"500",
        color:'#000'
    },
    img:{
        height:35,
        width:35,
        marginHorizontal:8,
    },
    modal:{
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
        height:150,
        width:280,
        backgroundColor:"#ecffcc",
        borderRadius:6
    }
})