import { configureStore } from '@reduxjs/toolkit'
import UserSlice from './store/userDetails/UserSlice'

export const store = configureStore({
  reducer: {
    user: UserSlice,
  },
})