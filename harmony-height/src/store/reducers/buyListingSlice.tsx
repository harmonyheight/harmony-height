import { BuyListingsState } from "@/schema/types/properties/properties";
import { createSlice } from "@reduxjs/toolkit";
import { getBuyLatestListings, getBuyPopularListings } from "../thunks/buyListingThunk";
const initialState: BuyListingsState = {
    popularListings: [],
    latestListings: [],
    loading: false,
    error: null,
};
const buyListingSlice = createSlice({
    name: 'buy',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getBuyPopularListings.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        builder.addCase(getBuyPopularListings.fulfilled, (state, action) => {
            state.loading = false,
                state.error = null,
                state.popularListings = action.payload?.listings
        }).addCase(getBuyPopularListings.rejected, (state, action: any) => {
            state.loading = false,
                state.popularListings = [],
                state.error = action.payload
        })
        builder.addCase(getBuyLatestListings.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        builder.addCase(getBuyLatestListings.fulfilled, (state, action) => {
            state.loading = false,
                state.error = null,
                state.latestListings = action.payload?.listings
        }).addCase(getBuyLatestListings.rejected, (state, action: any) => {
            state.loading = false,
                state.latestListings = [],
                state.error = action.payload
        })
    },
});

export const { } = buyListingSlice.actions;
export default buyListingSlice.reducer;