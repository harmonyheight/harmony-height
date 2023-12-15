import { OrderDocument, PaginatedOrderResponse, PaginationInfo } from "@/schema/types/orders/order";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getSellerOrdersAsync } from "../thunks/orderThunks";

// Define the state interface
export interface OrderState {
    orders: OrderDocument[];
    pagination: PaginationInfo;
    loading: boolean;
    error: string | null;
}

// Initial state
const initialState: OrderState = {
    orders: [],
    pagination: {
        totalDocs: 0,
        limit: 10, // Set your default limit
        totalPages: 0,
        page: 1, // Set your default page
        pagingCounter: 1,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: null,
        nextPage: null,
    },
    loading: false,
    error: null,
};

// Create the order slice
const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        // Action to start loading
        startLoading: (state) => {
            state.loading = true;
            state.error = null;
        },
        // Action to handle successful fetching of orders
        ordersReceived: (state, action: PayloadAction<{ orders: OrderDocument[]; pagination: PaginationInfo }>) => {
            state.orders = action.payload.orders;
            state.pagination = action.payload.pagination;
            state.loading = false;
            state.error = null;
        },
        // Action to handle errors during fetching
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
    extraReducers(builder) {
        builder.addCase(getSellerOrdersAsync.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        builder.addCase(getSellerOrdersAsync.fulfilled, (state, action: PayloadAction<{ orders: OrderDocument[]; pagination: PaginationInfo }>) => {
            state.loading = false,
                state.error = null,
                state.orders = action.payload.orders,
                state.pagination = action.payload.pagination
        }).addCase(getSellerOrdersAsync.rejected, (state, action: any) => {
            state.loading = false,
                state.error = action.payload
        })
    }
});


export default orderSlice.reducer;