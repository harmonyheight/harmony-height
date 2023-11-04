import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../api/axiosInstance";
import { toast } from "react-toastify";

export const getBuyPopularListings = createAsyncThunk('buy/getpopularlisting',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/buy/listings/popular');
            toast.success(response.data?.message)
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.error)

            return rejectWithValue(error.response?.data?.error);
        }
    })
