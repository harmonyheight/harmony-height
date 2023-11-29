import { BuyListingsState } from "@/schema/types/properties/properties";
import { createSlice } from "@reduxjs/toolkit";
import { getBuyLatestListings, getBuyPopularListings, getBuyistingsDetail } from "../thunks/buyListingThunk";
const initialState: BuyListingsState = {
    popularListings: [],
    latestListings: [],
    propertyDetail: null,
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
        builder.addCase(getBuyistingsDetail.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        builder.addCase(getBuyistingsDetail.fulfilled, (state, action) => {
            state.loading = false,
                state.error = null,
                state.propertyDetail = action.payload?.property
        }).addCase(getBuyistingsDetail.rejected, (state, action: any) => {
            state.loading = false,
                state.latestListings = [],
                state.error = action.payload?.error
        })
    },
});

export const { } = buyListingSlice.actions;
export default buyListingSlice.reducer;