import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

// project imports
import config from 'config';

// ==============================|| CUSTOMIZATION SLICE ||============================== //

const customizationAdapter = createEntityAdapter();

export const initialState = {
    isOpen: [], // for active default menu
    fontFamily: config.fontFamily,
    borderRadius: config.borderRadius,
    opened: true
};

const customizationSlice = createSlice({
    name: 'customization',
    initialState,
    reducers: {
        // ... other reducers ...
        menuOpen: (state, action) => {
            state.isOpen = [action.payload];
        },
        setCustomizationMenu: (state, action) => {
            state.opened = action.payload;
        },
        setFontFamily: (state, action) => {
            state.fontFamily = action.payload;
        },
        setBorderRadius: (state, action) => {
            state.borderRadius = action.payload;
        }
    }
});

export default customizationSlice.reducer;

export const { menuOpen, setCustomizationMenu, setFontFamily, setBorderRadius } = customizationSlice.actions;
export const { selectAll: selectAllCustomization } = customizationAdapter.getSelectors((state) => state.customization);

export const customizationOpenedSelector = (state) => state.customization.opened;
