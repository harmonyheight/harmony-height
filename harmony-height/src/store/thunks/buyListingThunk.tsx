import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../api/axiosInstance";
import { toast } from "react-toastify";

export const getBuyPopularListings = createAsyncThunk('buy/getpopularlisting',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/buy/listings/popular');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error);
        }
    })

export const getBuyLatestListings = createAsyncThunk('buy/getlatestlisting',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/buy/listings/latest');
            return response.data;
        } catch (error: any) {

            return rejectWithValue(error.response?.data?.error);
        }
    })    
