import { StyleSheet, Text, View,TouchableOpacity,Button,TextInput } from 'react-native'
import React,{useState} from 'react'
import Modal from "react-native-modal";
import { useDispatch,useSelector } from 'react-redux';
import { RootState } from '../store';
import { addJobFailure, addJobRequest, addJobSuccess } from '../reducers/jobReducer';
import axios,{isAxiosError} from "axios";
import '../axios'

export default function AddJob() {
    const [isModalVisible, setModalVisible] = useState(false);
    const [company,setCompany] = useState('')
    const [position,setPosition] = useState('')
    
    const dispatch = useDispatch()
    const {isLoading,error} = useSelector((state: RootState) => state.jobs)

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSubmit = async() =>{
    toggleModal()
    dispatch(addJobRequest())
    try{
      const { data } = await axios.post(`/jobs`, {company,position})
      dispatch(addJobSuccess("Job has been added"))
      
    }catch(error){
      if(isAxiosError(error)){
        dispatch(addJobFailure(error.message))
      }else{
        dispatch(addJobFailure("Something went wrong"))
      }
    }
  }

  return (
    <View>
        <TouchableOpacity style={styles.appButtonContainer} onPress={toggleModal}>
          <Text style={styles.appButtonText}>Add a Job</Text>
        </TouchableOpacity>
        <Modal isVisible={isModalVisible} animationInTiming={500} animationOutTiming={500} animationIn={"bounceInLeft"} animationOut={"bounceOutRight"}>
            <View style={styles.cont}>
                <TextInput
                style={styles.input}
                placeholder="Company"
                placeholderTextColor="#000"
                onChangeText={text => setCompany(text)}
                value={company}
              />
              <TextInput
                  style={styles.input}
                  placeholder="Position"
                  placeholderTextColor="#000"
                  onChangeText={text => setPosition(text)}
                  value={position}
              />
              <Button title="Done" onPress={handleSubmit} />
              <Button title="Cancel" onPress={toggleModal} />
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
      marginTop:50,
    },
    appButtonText: {
      fontSize: 16,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    },
    cont:{
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:"#ffffab",
      width:350,
      height:400,
      padding:20,
      borderRadius:10,
      rowGap:20
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