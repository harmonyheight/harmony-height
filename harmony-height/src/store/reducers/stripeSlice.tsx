import { createSlice } from "@reduxjs/toolkit";
import { getStripeBalanceAsync } from "../thunks/stripeThunk";

const initialState: {
    balance: any,
    payouts: any,
    transactions: any,
    refundResult: any,
    paymentsIntents: any,
    loading: boolean,
    error: any,
} = {
    balance: null,
    payouts: null,
    transactions: null,
    refundResult: null,
    paymentsIntents: null,
    loading: false,
    error: null,
};

const stripeSlice = createSlice({
    name: 'stripe',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getStripeBalanceAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(getStripeBalanceAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.balance = action.payload.balance;
            })
            .addCase(getStripeBalanceAsync.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.error?.message;
            });

        // Add similar cases for other async operations
    },
});

export default stripeSlice.reducer;