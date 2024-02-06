import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import axios,{isAxiosError} from "axios";
import '../axios'
import { useDispatch,useSelector } from 'react-redux';
import { getAllJobsFailure, getAllJobsRequest, getAllJobsSuccess } from '../reducers/jobReducer';
import { RootState } from '../store';
import AddJob from '../components/AddJob';
import JobCard from '../components/JobCard';
import Loader from '../components/Loader';

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
        if(error.response?.data.message)
          dispatch(getAllJobsFailure(error.response?.data.message))
        else
          dispatch(getAllJobsFailure(error.message))
      }
    }
  }
      
  useEffect(()=>{
    getJobs()
  },[])

  if(isLoading)
    return <Loader loaderText='Fetching jobs'/>
  else
    return (
    <View style={styles.screenContainer}>
      <AddJob/>
      <View>
        {jobs.length==0 && <Text style={styles.emptyText}>No jobs being tracked</Text>}
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
  },
  emptyText:{
    color:'#000',
    fontSize:26,
    marginTop:20,
    fontWeight:"bold"
  }
});