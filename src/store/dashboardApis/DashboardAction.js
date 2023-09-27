import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getDashboard = createAsyncThunk("user/getDashboard", async (reqData, { rejectWithValue }) => {
  try {
    const { data } = await axios.get("http://localhost:3001/dashboard", {
      withCredentials: true,
    });

    console.log("dashboard data", data);

    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});
