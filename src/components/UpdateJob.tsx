import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { PropsWithChildren,useState } from 'react'
import { updateJobRequest,updateJobSuccess,updateJobFailure,getAllJobsRequest,getAllJobsSuccess,getAllJobsFailure} from '../reducers/jobReducer';
import { useDispatch,useSelector } from 'react-redux';
import axios,{isAxiosError} from "axios";
import '../axios'
import { Dropdown } from 'react-native-element-dropdown';
import Snackbar from 'react-native-snackbar';


type UpdateJobProps = PropsWithChildren<{
    toggleUpdateModal:Function;
    item:Job
}>

const dropdown_options = [
    { label: 'Pending', value: 'pending' },
    { label: 'Interview', value: 'interview' },
    { label: 'Declined', value: 'declined' }
];

export default function UpdateJob(props:UpdateJobProps) {
    const [company,setCompany] = useState(props.item.company)
    const [status,setStatus] = useState(props.item.status)
    const [position,setPosition] = useState(props.item.position)
    
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

    const handleUpdate = async () =>{
        props.toggleUpdateModal()
        dispatch(updateJobRequest())
        try{
            const { data } = await axios.patch(`/jobs/${props.item._id}`, {company,position,status})
            dispatch(updateJobSuccess("Job has been updated"))
            Snackbar.show({
                text:"Job has been updated",
                duration:Snackbar.LENGTH_SHORT
            })
            getJobs()
          }catch(error){
            if(isAxiosError(error)){
              if(error.response?.data){
                dispatch(updateJobFailure(error.response?.data))
                Snackbar.show({
                    text:error.response?.data,
                    duration:Snackbar.LENGTH_SHORT
                })
              }
            else
                dispatch(updateJobFailure(error.message))
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
                    style={styles.input}
                    onChangeText={text=>setCompany(text)}
                />
            </View>
            <View style={styles.cont3}>
                <Text style={styles.grayText}>Position   : </Text>
                <TextInput
                    value={position}
                    style={styles.input}
                    onChangeText={text => setPosition(text)}
                />
            </View>
            <View style={styles.cont3}>
                <Text style={styles.grayText}>Status      : </Text>
                <Dropdown
                    style={{...styles.input,paddingVertical:4}}
                    selectedTextStyle={styles.selectedTextStyle}
                    containerStyle={{backgroundColor:"#fff",borderRadius:4}}
                    itemTextStyle={{fontSize:18,color:"#000"}}
                    data={dropdown_options}
                    labelField="label"
                    valueField="value"
                    value={status}
                    onChange={item => {
                        setStatus(item.value);
                    }}
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
        height:450,
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
        marginVertical:18
    },
    cont3:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        marginVertical:15,
        width:300,
        columnGap:15
    },
    grayText:{
        fontSize:20,
        color:"#006600",
    },
    input: {
        elevation: 3,
        backgroundColor: "#fff",
        borderRadius: 5,
        paddingVertical: 7,
        paddingHorizontal: 15,
        width:190,
        fontSize:20,
        color:'#000'
    },
    headingText:{
        fontSize:28,
        fontWeight:"bold",
        color:'#000',
        marginBottom:10,
    },
    selectedTextStyle: {
        fontSize: 20,
        color:"#000"
    }
})