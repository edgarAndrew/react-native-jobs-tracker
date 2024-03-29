import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counter/counterSlice'
import authReducer from './reducers/authReducer'
import jobReducer from './reducers/jobReducer'

export const store = configureStore({
  reducer: {
    counter:counterReducer,
    auth:authReducer,
    jobs:jobReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch