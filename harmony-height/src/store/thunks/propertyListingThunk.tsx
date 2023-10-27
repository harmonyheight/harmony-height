import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
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