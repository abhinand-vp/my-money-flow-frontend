import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getUser = createAsyncThunk("user/getUser", async (reqData,{ rejectWithValue }) => {
  try {
    let params = {
        email : reqData.email,
        password : reqData.password
    }
    const { data } = await axios.post("http://localhost:3001/login", params );

    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

