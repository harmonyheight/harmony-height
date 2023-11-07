import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../api/axiosInstance";
import { toast } from "react-toastify";

export const getPaginationBuyFilterListings = createAsyncThunk('buyfilter/paginationbuyfilter',
    async (data: {
        page: number,
        limit: number,
        minPrice?: number,
        maxPrice?: number
    }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/buy/listings/filterdata', {
                params: {
                    page: data.page,
                    limit: data.limit, // Adjust the limit as needed
                    minPrice: data.minPrice,
                    maxPrice: data.maxPrice
                }
            });
            toast.success(response.data?.message)
            return response.data?.listings;
        } catch (error: any) {
            toast.error(error.response?.data?.error)

            return rejectWithValue(error.response?.data?.error);
        }
    })
