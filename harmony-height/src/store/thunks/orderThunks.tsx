import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosUserInstance from "../api/axiosUserInstance";

export const getSellerOrdersAsync = createAsyncThunk('orders/getSellerOrders',
    async (credientials: {
        page: number, pageSize: number, type: string
    }, { rejectWithValue }) => {
        try {
            const response = await axiosUserInstance.get(`/orders/sold?page=${credientials.page}&pageSize=${credientials.pageSize}`);
            return {
                orders: response.data?.docs,
                pagination: {
                    totalDocs: response.data?.totalDocs,
                    limit: response.data?.limit,
                    totalPages: response.data?.totalPages,
                    page: response.data?.page,
                    pagingCounter: response.data?.pagingCounter,
                    hasPrevPage: response.data?.hasPrevPage,
                    hasNextPage: response.data?.hasNextPage,
                    prevPage: response.data?.prevPage,
                    nextPage: response.data?.nextPage,
                },
            };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error);
        }
    })    
