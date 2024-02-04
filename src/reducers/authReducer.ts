import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  isLoading:boolean,
  isAuthenticated:boolean,
  error:string,
  user:string
}

const initialState: AuthState = {
    isLoading:false,
    isAuthenticated:false,
    error:'',
    user:''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.isLoading = true,
      state.isAuthenticated = false,
      state.error = ''
    },
    loginSuccess: (state,action: PayloadAction<string>) => {
        state.isLoading = false,
        state.isAuthenticated = true,
        state.error = ''
        state.user = action.payload
    },
    loginFailure: (state,action: PayloadAction<string>) => {
        state.isLoading = false,
        state.isAuthenticated = false,
        state.error = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { loginRequest,loginSuccess,loginFailure } = authSlice.actions

export default authSlice.reducer