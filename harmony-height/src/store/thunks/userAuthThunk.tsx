import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { axiosInstance } from "../api/axiosInstance";
import { encrypt } from "@/utils/utils";
export const userLoginAsync = createAsyncThunk(
    'auth/login',
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const encryptedpassword = encrypt(credentials.password)
            const response = await axiosInstance.post('/login', {
                ...credentials,
                password: encryptedpassword
            });
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
            const encryptedpassword = encrypt(credentials.password)
            const response = await axiosInstance.post('/register', {
                ...credentials,
                password: encryptedpassword
            });
            toast.success(response.data?.message)
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message)
            return rejectWithValue(error.response?.data?.errors);
        }
    }
);

export const emailVerifyAsync = createAsyncThunk(
    'auth/verification',
    async (credentials: { email: any; code: string }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/emailverify', credentials);
            toast.success(response.data?.message)
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message)
            return rejectWithValue(error.response?.data?.errors);
        }
    }
);