import { createSlice, createSelector, createEntityAdapter } from '@reduxjs/toolkit';

const sitesAdapter = createEntityAdapter();

const initialState = sitesAdapter.getInitialState({
    status: 'idle'
});

const sitesSlice = createSlice({
    name: 'sites',
    initialState,
    reducers: {
        sitesDelete(state, action) {
            sitesAdapter.removeOne(state, action.payload.id);
        },
        sitesAddOne(state, { payload }) {
            sitesAdapter.addOne(state, payload);
        },
        sitesUpdateOne(state, action) {
            const { id, isLogin } = action.payload;
            const existingSite = state.entities[id];
            if (existingSite && existingSite.isLogin !== isLogin) {
                existingSite.isLogin = isLogin;
                // existingSite.heartbeatTime = heartbeatTime;
            }
        }
    }
});

export default sitesSlice.reducer;
export const { sitesDelete, sitesAddOne, sitesUpdateOne } = sitesSlice.actions;

// Selectors
export const { selectAll: selectAllSites, selectIds: selectIdsSites } = sitesAdapter.getSelectors((state) => state.sites);

export const selectSiteIds = createSelector(
    // First, pass one or more "input selector" functions:
    selectAllSites,
    // Then, an "output selector" that receives all the input results as arguments
    // and returns a final result value
    (sites) => sites.map((site) => site.id)
);

export const selectFilteredConnectedSites = createSelector(selectAllSites, (sites) => {
    sites.filter((site) => site.isLogin);
});

export const selectConnected = createSelector(
    // Pass our other memoized selector as an input
    selectFilteredConnectedSites,
    // And derive data in the output selector
    (filteredsitews) => filteredsitews.map((site) => site.ip)
);
