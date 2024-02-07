import { FlatList, StyleSheet, Text, TouchableOpacity, View,ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import axios,{isAxiosError} from "axios";
import '../axios'
import { useDispatch,useSelector } from 'react-redux';
import { getAllJobsFailure, getAllJobsRequest, getAllJobsSuccess } from '../reducers/jobReducer';
import { RootState } from '../store';
import {RootStackParamList} from '../App'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import AddJob from '../components/AddJob';
import JobCard from '../components/JobCard';
import Loader from '../components/Loader';
import Header from '../components/Header';

type HomeProps = NativeStackScreenProps<RootStackParamList,'Home'>

export default function Home({navigation}:HomeProps) {
  const dispatch = useDispatch()
  const {isLoading,error,jobs,message} = useSelector((state: RootState) => state.jobs)
  const {isAuthenticated} = useSelector((state: RootState) => state.auth)

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

  useEffect(()=>{
    if(!isAuthenticated){
      navigation.navigate("Login")
    }
  },[isAuthenticated])

  if(isLoading)
    return <Loader loaderText='Fetching jobs'/>
  else
    return (
    <View style={styles.screenContainer}>
      <Header/>
      <AddJob/>
      {/* <View style={{flex:1}}>
        {jobs.length==0 && <Text style={styles.emptyText}>No jobs being tracked</Text>}
        <FlatList 
          data={jobs}
          keyExtractor={item => item._id}
          renderItem={({item})=>(
            <JobCard {...item}/>
          )}
        />
      </View> */}

      {/*NOTE to MYSELF: I know FlatList is better than scrollview but whats happening here is, for the udpate job
        job modal to work properly, the entire job card must be fully visible (lazy rendering) or the update modal
        closes as soon as you interact with text input. But Scrollview works fine as all job cards are
        rendered together. Since the jobs for a user will be few, performance overhead will be negligible
      */}

       <ScrollView>
          <View style={{ flex: 1 }}>
            {jobs.length === 0 && <Text style={styles.emptyText}>No jobs being tracked</Text>}
            {jobs.map(job => (
              <JobCard key={job._id} {...job} />
            ))}
          </View>
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems:'center',
    backgroundColor:"#e6ffe6"
  },
  emptyText:{
    color:'#000',
    fontSize:26,
    marginTop:20,
    fontWeight:"bold"
  }
});