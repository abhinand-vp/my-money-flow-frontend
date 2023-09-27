import { createSlice } from "@reduxjs/toolkit";
import { getDashboard } from "./DashboardAction";

const DashboardSlice = createSlice({
    name: "dashboard",
    initialState: {
        loading: false,
        dashboard: [],
    },
    reducers: {},
    extraReducers: builder => {
        //get dashboard
        builder.addCase(getDashboard.pending, state => {
            state.dashboard = [];
            state.loading = true;
        });
        builder.addCase(getDashboard.fulfilled, (state, actions) => {
            state.dashboard = actions.payload;
        });
        builder.addCase(getDashboard.rejected, (state, { payload }) => {
            state.loading = false;
        });
    }
});

export default DashboardSlice.reducer;