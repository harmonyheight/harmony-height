import { createSlice } from "@reduxjs/toolkit";
import { getUserCountlistingByMonthAsync, getUserListingTypeCountAsync, getUserListings } from "../thunks/propertyListingThunk";
import { UserListingsState } from "@/schema/types/properties/properties";

const initialState: UserListingsState = {
    userListings: [],
    userListingTypeCount: null,
    countListingByMonth: [],
    loading: false,
    error: null,
};
const propertyListingSlice = createSlice({
    name: 'listing',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getUserListings.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        builder.addCase(getUserListings.fulfilled, (state, action) => {
            state.loading = false,
                state.error = null,
                state.userListings = action.payload?.listings
        }).addCase(getUserListings.rejected, (state, action: any) => {
            state.loading = false,
                state.error = action.payload
        })
        builder.addCase(getUserListingTypeCountAsync.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        builder.addCase(getUserListingTypeCountAsync.fulfilled, (state, action) => {
            state.loading = false,
                state.error = null,
                state.userListingTypeCount = action.payload
        }).addCase(getUserListingTypeCountAsync.rejected, (state, action: any) => {
            state.loading = false,
                state.userListingTypeCount = null,
                state.error = action.payload
        })

        builder.addCase(getUserCountlistingByMonthAsync.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        builder.addCase(getUserCountlistingByMonthAsync.fulfilled, (state, action) => {
            state.loading = false,
                state.error = null,
                state.countListingByMonth = action.payload
        }).addCase(getUserCountlistingByMonthAsync.rejected, (state, action: any) => {
            state.loading = false,
                state.countListingByMonth = [],
                state.error = action.payload
        })
    },
});
//getUserListingTypeCountAsync
export const { } = propertyListingSlice.actions;
export default propertyListingSlice.reducer;