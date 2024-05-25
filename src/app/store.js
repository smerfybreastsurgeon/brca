import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../pages/apis/apiSlice";
import { patientsApi } from "../pages/apis/patientsApi";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [patientsApi.reducerPath]:patientsApi.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware,patientsApi.middleware),
    devTools: true
})