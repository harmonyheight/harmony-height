import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosUserInstance from "../api/axiosUserInstance";

export const getStripeBalanceAsync = createAsyncThunk(
    'stripe/balance',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosUserInstance.get('/get-account-balance');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);