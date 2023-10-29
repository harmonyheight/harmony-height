import { createSlice } from "@reduxjs/toolkit";
import { getUserListings } from "../thunks/propertyListingThunk";
import { UserListingsState } from "@/schema/types/properties/properties";

const initialState: UserListingsState = {
    userListings: [],
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
                state.userListings = [],
                state.error = action.payload
        })
    },
});

export const { } = propertyListingSlice.actions;
export default propertyListingSlice.reducer;