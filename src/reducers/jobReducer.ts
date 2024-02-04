import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface JobState {
  isLoading:boolean,
  jobs:Job[],
  error:string,
  message:string
}

const initialState: JobState = {
    isLoading:false,
    jobs:[],
    error:'',
    message:''
}

export const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    getAllJobsRequest: (state) => {
      state.isLoading = true
    },
    getAllJobsSuccess: (state,action: PayloadAction<Job[]>) => {
        state.isLoading = false,
        state.jobs = action.payload,
        state.error = ''
    },
    getAllJobsFailure: (state,action: PayloadAction<string>) => {
        state.isLoading = false,
        state.error = action.payload
    },

    addJobRequest: (state) => {
        state.isLoading = true
        state.message = ''
    },
    addJobSuccess: (state,action: PayloadAction<string>) => {
        state.isLoading = false,
        state.message = action.payload,
        state.error = ''
    },
    addJobFailure: (state,action: PayloadAction<string>) => {
        state.isLoading = false,
        state.error = action.payload
    },

    updateJobRequest: (state) => {
        state.isLoading = true
        state.message = ''
    },
    updateJobSuccess: (state,action: PayloadAction<string>) => {
        state.isLoading = false,
        state.message = action.payload
    },
    updateJobFailure: (state,action: PayloadAction<string>) => {
        state.isLoading = false,
        state.error = action.payload
    },

    deleteJobRequest: (state) => {
      state.isLoading = true
      state.message = ''
    },
    deleteJobSuccess: (state,action: PayloadAction<string>) => {
      state.isLoading = false,
      state.message = action.payload,
      state.error = ''
    },
    deleteJobFailure: (state,action: PayloadAction<string>) => {
        state.isLoading = false,
        state.error = action.payload
    },

  },
})

// Action creators are generated for each case reducer function
export const { getAllJobsRequest,getAllJobsSuccess,getAllJobsFailure,
    addJobRequest,addJobSuccess,addJobFailure,updateJobRequest,
    updateJobFailure,updateJobSuccess,deleteJobRequest,deleteJobSuccess,
  deleteJobFailure } = jobSlice.actions

export default jobSlice.reducer