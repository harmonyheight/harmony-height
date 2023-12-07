import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import { UserAuthState, User } from "@/schema/types/userAuth/userAuth";
import { userLoginAsync, userRegisterAsync } from "../thunks/userAuthThunk";

const initialState: UserAuthState = {
    user: null,
    loading: false,
    error: null,
};
const userAuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            // Reset the authentication state to its initial values
            state.user = null;
            state.loading = false;
            state.error = null;
            localStorage.removeItem("userToken")
        },
        updateStripeAccount: (state, action) => {
            if (state.user) {
                state.user.stripeAccountId = action.payload?.id
            }
        }
    },
    extraReducers(builder) {
        builder.addCase(userLoginAsync.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        builder.addCase(userLoginAsync.fulfilled, (state, action) => {
            state.loading = false,
                state.error = null,
                state.user = action.payload?.user
        }).addCase(userLoginAsync.rejected, (state, action: any) => {
            state.loading = false,
                state.user = null,
                state.error = action.payload
        })
        builder.addCase(userRegisterAsync.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        builder.addCase(userRegisterAsync.fulfilled, (state, action) => {
            state.loading = false,
                state.error = null
            // state.user = action.payload?.user
        }).addCase(userRegisterAsync.rejected, (state, action: any) => {
            state.loading = false,
                state.user = null,
                state.error = action.payload
        })
    },
});

const rootPersistConfig = {
    key: 'root',
    storage: storage,
    blacklist: ['auth', 'navigation']
}
export const { logout, updateStripeAccount } = userAuthSlice.actions;
export default persistReducer(rootPersistConfig, userAuthSlice.reducer);