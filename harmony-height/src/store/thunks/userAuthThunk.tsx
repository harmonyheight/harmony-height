import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const userLoginAsync = createAsyncThunk(
    'auth/login',
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:8080/api/login', credentials);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);
export const userRegisterAsync = createAsyncThunk(
    'auth/register',
    async (credentials: { name: string, email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:8080/api/register', credentials);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);