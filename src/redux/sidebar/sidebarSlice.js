import { createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';

// project imports
// import dashboard from './dashboard';
import brokers from './brokers';
import consumers from './consumers';
import topics from './topics';
import utilit from './utilities';
import dashboard from './dashboard';

// ==============================|| SIDEBAR SLICE ||============================== //

const sidebarAdapter = createEntityAdapter();

const initialState = sidebarAdapter.getInitialState({
    status: 'idle',
    entities: [dashboard, topics, brokers, consumers, utilit]
});

// ==============================|| Consumers Thunk Functions ||============================== //

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        // ... other reducers ...
        sidebarUpdate(state, { payload }) {
            const { brokers, consumers, topics } = payload;
            const brokerSidebar = state.entities.find((e) => e.id === 'brokers');
            const topicsSidebar = state.entities.find((e) => e.id === 'topics');
            const consumersSidebar = state.entities.find((e) => e.id === 'consumers');
            brokerSidebar.children = brokers.map((child) => ({
                id: child.Host,
                title: child.Host,
                type: 'item',
                url: `/brokers/${child.Host}`
            }));
            topicsSidebar.children[0].children = topics.map((child) => ({
                id: child.Name,
                title: child.Name,
                type: 'collapse',
                url: `/topics/${child.Name}`,
                children: child.Partitions.map((partition) => ({
                    id: `${child.Name}-partition-${partition.ID}`,
                    title: `partition-${partition.ID}`,
                    type: 'item',
                    url: `/topics/${child.Name}/${partition.ID}`
                }))
            }));
            consumersSidebar.caption = `Total ${consumers?.length}`;
            consumersSidebar.children = consumers?.map((child) => ({
                id: child,
                title: child,
                type: 'item',
                url: `/consumers/${child}`
            }));
        }
    }
});

export default sidebarSlice.reducer;

export const { sidebarUpdate } = sidebarSlice.actions;

// ==============================|| Selectors ||============================== //
export const { selectEntities: selectEntitiesSidebar } = sidebarAdapter.getSelectors((state) => state.sidebar);

export const selectAllsidebarEntities = (state) => state.sidebar.entities;

export const selectTodoIds = createSelector(
    // First, pass one or more "input selector" functions:
    selectEntitiesSidebar,
    // Then, an "output selector" that receives all the input results as arguments
    // and returns a final result value
    (state) => state.map((i) => i.id)
);
