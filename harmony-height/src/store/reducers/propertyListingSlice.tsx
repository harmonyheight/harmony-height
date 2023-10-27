import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { UserAuthState, User } from "@/schema/types/userAuth/userAuth";
import { userLoginAsync, userRegisterAsync } from "../thunks/userAuthThunk";

const initialState = {
    countryStates: [],
    loading: false,
    error: null,
};
const propertyListingSlice = createSlice({
    name: 'listing',
    initialState,
    reducers: {

    },
});

export const { } = propertyListingSlice.actions;
export default propertyListingSlice.reducer;