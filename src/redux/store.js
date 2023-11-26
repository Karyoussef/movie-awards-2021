import { configureStore } from "@reduxjs/toolkit";
import { awardsApi } from "../services/awards";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        [awardsApi.reducerPath]: awardsApi.reducer
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(awardsApi.middleware),
})

setupListeners(store.dispatch)