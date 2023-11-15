import { RentListingsState } from "@/schema/types/properties/properties";
import { createSlice } from "@reduxjs/toolkit";
import { getRentLatestListings, getRentPopularListings } from "../thunks/rentingListingThunk";
const initialState: RentListingsState = {
    popularListings: [],
    latestListings: [],
    loading: false,
    error: null,
};
const rentingListingSlice = createSlice({
    name: 'rent',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getRentPopularListings.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        builder.addCase(getRentPopularListings.fulfilled, (state, action) => {
            state.loading = false,
                state.error = null,
                state.popularListings = action.payload?.listings
        }).addCase(getRentPopularListings.rejected, (state, action: any) => {
            state.loading = false,
                state.popularListings = [],
                state.error = action.payload
        })
        builder.addCase(getRentLatestListings.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        builder.addCase(getRentLatestListings.fulfilled, (state, action) => {
            state.loading = false,
                state.error = null,
                state.latestListings = action.payload?.listings
        }).addCase(getRentLatestListings.rejected, (state, action: any) => {
            state.loading = false,
                state.latestListings = [],
                state.error = action.payload
        })
    },
});

export const { } = rentingListingSlice.actions;
export default rentingListingSlice.reducer;