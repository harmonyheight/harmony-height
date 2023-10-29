import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
export const userLoginAsync = createAsyncThunk(
    'auth/login',
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:8080/api/login', credentials);
            toast.success(response.data?.message)
            localStorage.setItem("userToken", response.data?.token)
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message)
            return rejectWithValue(error.response?.data?.message);
        }
    }
);
export const userRegisterAsync = createAsyncThunk(
    'auth/register',
    async (credentials: { name: string, email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:8080/api/register', credentials);
            toast.success(response.data?.message)
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.errors)
            return rejectWithValue(error.response?.data?.errors);
        }
    }
);

export const emailVerifyAsync = createAsyncThunk(
    'auth/verification',
    async (credentials: { email: any; code: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:8080/api/emailverify', credentials);
            toast.success(response.data?.message)
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message)
            return rejectWithValue(error.response?.data?.errors);
        }
    }
);