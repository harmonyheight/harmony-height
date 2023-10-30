import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { persistStore } from "redux-persist"
import userAuthSlice from './reducers/userAuthSlice'
import propertyListingSlice from './reducers/propertyListingSlice'
import homeListingSlice from './reducers/homeListingSlice'
const store = configureStore({
    reducer: {
        auth: userAuthSlice,
        userlistings: propertyListingSlice,
        homelisting: homeListingSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(thunk, logger),
})


const persistor = persistStore(store);

export { store, persistor };
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch