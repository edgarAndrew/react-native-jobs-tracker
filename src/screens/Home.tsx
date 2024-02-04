import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import axios,{isAxiosError} from "axios";
import '../axios'
import { useDispatch,useSelector } from 'react-redux';
import { getAllJobsFailure, getAllJobsRequest, getAllJobsSuccess } from '../reducers/jobReducer';
import { RootState } from '../store';
import AddJob from '../components/AddJob';
import Snackbar from 'react-native-snackbar';
import { DATA } from '../constants';
import JobCard from '../components/JobCard';

export default function Home() {
  const dispatch = useDispatch()
  const {isLoading,error,jobs,message} = useSelector((state: RootState) => state.jobs)

  const getJobs = async()=>{
    try{
        dispatch(getAllJobsRequest())
        const {data} = await axios.get("/jobs")
        dispatch(getAllJobsSuccess(data.jobs))
    }catch(error){
      if(isAxiosError(error)){
        dispatch(getAllJobsFailure(error.message))
      }else{
        dispatch(getAllJobsFailure("Something went wrong"))
      }
    }
  }
      
  useEffect(()=>{
    getJobs()
  },[])

  useEffect(()=>{
    if(error !== ''){
      Snackbar.show({
        text: error,
        duration: Snackbar.LENGTH_SHORT
      })
    }
    if(message){
      Snackbar.show({
        text: message,
        duration: Snackbar.LENGTH_LONG
      })
      getJobs()
    }
  },[error,message])

  return (
    <View style={styles.screenContainer}>
      <AddJob/>
      <View>
        <FlatList 
          data={jobs}
          keyExtractor={item => item._id}
          renderItem={({item})=>(
            <JobCard {...item}/>
          )}  
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems:'center',
    padding: 16,
    backgroundColor:"#e6ffe6"
  }
});