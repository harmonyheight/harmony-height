import { BuyFilterListingsState } from "@/schema/types/properties/properties";
import { createSlice } from "@reduxjs/toolkit";
import { getPaginationBuyFilterListings } from "../thunks/buyFilterListingThunk";
import { getPaginationRentFilterListings } from "../thunks/rentFilterListingThunk";
const initialState: BuyFilterListingsState = {
    listings: {
        listings: [],
        currentPage: 0,
        totalListings: 0,
        totalPages: 0,
    },
    loading: false,
    error: null,
};
const buyFilterSlice = createSlice({
    name: 'buyfilter',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getPaginationBuyFilterListings.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        builder.addCase(getPaginationBuyFilterListings.fulfilled, (state, action) => {
            state.loading = false,
                state.error = null,
                state.listings = action.payload
        }).addCase(getPaginationBuyFilterListings.rejected, (state, action: any) => {
            state.loading = false,
                state.listings = initialState.listings,
                state.error = action.payload
        })
        builder.addCase(getPaginationRentFilterListings.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        builder.addCase(getPaginationRentFilterListings.fulfilled, (state, action) => {
            state.loading = false,
                state.error = null,
                state.listings = action.payload
        }).addCase(getPaginationRentFilterListings.rejected, (state, action: any) => {
            state.loading = false,
                state.listings = initialState.listings,
                state.error = action.payload
        })
    },
});

export const { } = buyFilterSlice.actions;
export default buyFilterSlice.reducer;