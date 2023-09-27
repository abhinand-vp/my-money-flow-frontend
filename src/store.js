import { configureStore } from '@reduxjs/toolkit'
import UserSlice from './store/userDetails/UserSlice'
import DashboardSlice from './store/dashboardApis/DashboardSlice'

export const store = configureStore({
  reducer: {
    user: UserSlice,
    dashboard : DashboardSlice,
  },
})