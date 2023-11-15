import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../api/axiosInstance";
import { toast } from "react-toastify";

export const getPaginationRentFilterListings = createAsyncThunk('rentfilter/paginationrentfilter',
    async (data: {
        page: number,
        limit: number,
        minPrice?: number,
        maxPrice?: number,
        search: string
    }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/rent/listings/filterdata', {
                params: {
                    page: data.page,
                    limit: data.limit, // Adjust the limit as needed
                    minPrice: data.minPrice,
                    maxPrice: data.maxPrice,
                    search: data.search
                }
            });
            return response.data?.listings;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error);
        }
    })