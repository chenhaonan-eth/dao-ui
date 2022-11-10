import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './sidebar/sidebarSlice';
import customizationReducer from './customization/customizationSlice';
import sitesReducer from './site/sitesSlice';

// ############################# REDUX STORE TOOLKIT#############################################

const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        customization: customizationReducer,
        sites: sitesReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});

export default store;
