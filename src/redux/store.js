import { configureStore } from '@reduxjs/toolkit';
import customizationReducer from './customization/customizationSlice';

// ############################# REDUX STORE TOOLKIT#############################################

const store = configureStore({
    reducer: {
        customization: customizationReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});

export default store;
