import { createSlice } from "@reduxjs/toolkit";
import { HomeListingsState } from "@/schema/types/properties/properties";
import { gethomeLatestListings } from "../thunks/homeListingThunk";

const initialState: HomeListingsState = {
    latestListings: [],
    loading: false,
    error: null,
};
const homeListingSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(gethomeLatestListings.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        builder.addCase(gethomeLatestListings.fulfilled, (state, action) => {
            state.loading = false,
                state.error = null,
                state.latestListings = action.payload?.listings
        }).addCase(gethomeLatestListings.rejected, (state, action: any) => {
            state.loading = false,
                state.latestListings = [],
                state.error = action.payload
        })
    },
});

export const { } = homeListingSlice.actions;
export default homeListingSlice.reducer;