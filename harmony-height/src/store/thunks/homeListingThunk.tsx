import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../api/axiosInstance";
import { toast } from "react-toastify";

export const gethomeLatestListings = createAsyncThunk('home/getlatestlisting',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/listings/latest');
            toast.success(response.data?.message)
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.error)

            return rejectWithValue(error.response?.data?.error);
        }
    })
