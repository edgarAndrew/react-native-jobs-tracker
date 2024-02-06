import { StyleSheet, Text, View,TouchableOpacity,Button,TextInput } from 'react-native'
import React,{useState} from 'react'
import Modal from "react-native-modal";
import { useDispatch,useSelector } from 'react-redux';
import { RootState } from '../store';
import { addJobFailure, addJobRequest, addJobSuccess,getAllJobsRequest,getAllJobsSuccess,getAllJobsFailure } from '../reducers/jobReducer';
import axios,{isAxiosError} from "axios";
import '../axios'
import Snackbar from 'react-native-snackbar';

export default function AddJob() {
    const [isModalVisible, setModalVisible] = useState(false);
    const [company,setCompany] = useState('')
    const [position,setPosition] = useState('')
    
    const dispatch = useDispatch()
    const {isLoading,error,message} = useSelector((state: RootState) => state.jobs)

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
    

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSubmit = async() =>{
    toggleModal()
    dispatch(addJobRequest())
    try{
      const { data } = await axios.post(`/jobs`, {company,position})
      dispatch(addJobSuccess("Job has been added"))
      Snackbar.show({
        text:"Job has been added",
        duration:Snackbar.LENGTH_SHORT
      })
      getJobs()  
    }catch(errors){
      if(isAxiosError(errors)){
        dispatch(addJobFailure(errors.message))
      }else{
        dispatch(addJobFailure("Something went wrong"))
      }
      Snackbar.show({
        text:error,
        duration:Snackbar.LENGTH_SHORT
      })
    }
  }

  return (
    <View>
        <TouchableOpacity style={styles.appButtonContainer} onPress={toggleModal}>
          <Text style={styles.appButtonText}>Add a Job</Text>
        </TouchableOpacity>
        <Modal isVisible={isModalVisible} animationInTiming={500} animationOutTiming={500} animationIn={"bounceInLeft"} animationOut={"bounceOutRight"}>
            <View style={styles.cont}>
            <Text style={styles.headingText}>Add Job</Text>  

              <View style={styles.cont3}>
                <Text style={styles.grayText}>Company : </Text>
                <TextInput
                    value={company}
                    style={styles.input}
                    onChangeText={text=>setCompany(text)}
                />
              </View> 
              <View style={{...styles.cont3,marginBottom:25}}>
                <Text style={styles.grayText}>Position   : </Text>
                <TextInput
                    value={position}
                    style={styles.input}
                    onChangeText={text => setPosition(text)}
                />
              </View>
              <TouchableOpacity onPress={handleSubmit} disabled={isLoading}>
                <Text style={styles.btnText}>Done</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleModal} disabled={isLoading}>
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
        </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
    appButtonContainer: {
      elevation: 8,
      backgroundColor: "#009688",
      borderRadius: 13,
      paddingVertical: 10,
      paddingHorizontal: 12,
      width:350,
      marginTop:20,
    },
    appButtonText: {
      fontSize: 16,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    },
    btnText:{
      fontSize:24,
      fontWeight:"800",
      textTransform:"uppercase",
      color:'#009688',
      // marginVertical:2
  },
    cont:{
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:"#ccffcc",
      width:350,
      height:470,
      padding:20,
      borderRadius:10,
      rowGap:30
    },
    input: {
      elevation: 3,
      backgroundColor: "#fff",
      borderRadius: 10,
      paddingVertical: 9,
      paddingHorizontal: 15,
      width:200,
      marginVertical:5,
      fontSize:20,
      color:'#000'
    },
    headingText:{
      fontSize:28,
      fontWeight:"bold",
      color:'#000',
      marginBottom:10,
  },
  cont3:{
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    columnGap:10,
    marginBottom:5
  },
  grayText:{
      fontSize:20,
      color:"#006600",
  },
  });