import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    filterQuery: {
        min: 100000,
        max: 500000,
        rating: 0,
    },
};

const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        filterPrice: (state, action) => {
            state.filterQuery = {
                ...state.filterQuery,
                min: action.payload[0],
                max: action.payload[1],
            };
        },
        filterRating: (state, action) => {
            state.filterQuery = {
                ...state.filterQuery,
                rating: action.payload,
            };
        },
    },
});

export const { filterPrice, filterRating } = shopSlice.actions;
export default shopSlice.reducer;
