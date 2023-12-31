import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import axiosUserInstance from "../api/axiosUserInstance";
export const getAuthAccessTokenAsync = createAsyncThunk(
    'listing/accesstoken',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('https://www.universal-tutorial.com/api/getaccesstoken', {
                headers: {
                    "Accept": "application/json",
                    "api-token": "SGRvwGIJ-Llz1-PKFbpR45TKZYXA507PYcv1I1WSGrB0XpyOSumOGzsz-JuwX9lw4jU",
                    "user-email": "heightharmony@gmail.com"
                }
            });
            sessionStorage.setItem('api-token', response.data?.auth_token);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const fetchCountryStatesAsync = createAsyncThunk(
    'listing/states',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('https://www.universal-tutorial.com/api/states/Canada', {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem('api-token')}`,
                    "Accept": "application/json"
                }
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const fetchStateCitiesAsync = createAsyncThunk(
    'listing/cities',
    async (credentials: { state: string; }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`https://www.universal-tutorial.com/api/cities/${credentials.state}`, {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem('api-token')}`,
                    "Accept": "application/json"
                }
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);


export const getUserListings = createAsyncThunk('listing/getuserlisting',
    async (credentials: {
        page: number,
        itemsPerPage: number
    }, { rejectWithValue }) => {
        try {
            const response = await axiosUserInstance.get(`/user-listings?page=${credentials.page}&itemsPerPage=${credentials.itemsPerPage}`);
            return response.data;
        } catch (error: any) {

            return rejectWithValue(error.response?.data?.error);
        }
    })


export const deleteUserListing = createAsyncThunk('listing/deleteUserListing',
    async (credentials: { listingId: string, images: string[] }, { rejectWithValue }) => {
        try {
            const response = await axiosUserInstance.post('/listings/deletebyid', credentials);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error);
        }
    })

export const getUserListingTypeCountAsync = createAsyncThunk('listing/listingTypeCount',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosUserInstance.get('/listings/typecount');
            toast.success(response.data?.message)
            return response.data?.typeCount;
        } catch (error: any) {
            toast.error(error.response?.data?.error)

            return rejectWithValue(error.response?.data?.error);
        }
    })
///listings/countlistingbymonth

export const getUserCountlistingByMonthAsync = createAsyncThunk('listing/listingcountbymonth',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosUserInstance.get('/listings/countlistingbymonth');
            toast.success(response.data?.message)
            return response.data?.countsArray;
        } catch (error: any) {
            toast.error(error.response?.data?.error)
            return rejectWithValue(error.response?.data?.error);
        }
    })