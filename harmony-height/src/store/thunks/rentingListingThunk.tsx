import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../api/axiosInstance";
import { toast } from "react-toastify";

export const getRentPopularListings = createAsyncThunk('rent/getpopularlisting',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/rent/listings/popular');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error);
        }
    })

export const getRentLatestListings = createAsyncThunk('rent/getlatestlisting',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/rent/listings/latest');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error);
        }
    })    
