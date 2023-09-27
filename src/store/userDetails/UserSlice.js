import { createSlice } from "@reduxjs/toolkit";
import { getDashboard, getUser } from "./UserActions";

const USerSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        user: [],
    },
  reducers: {},
    extraReducers: builder => {
        //get patients
        builder.addCase(getUser.pending, state => {
            state.user = [];
            state.loading = true;
        });
        builder.addCase(getUser.fulfilled, (state, actions) => {
                state.user = actions.payload;
        });
        builder.addCase(getUser.rejected, (state, { payload }) => {
            state.loading = false;
        });
    }
});

export default USerSlice.reducer;