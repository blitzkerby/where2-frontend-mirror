// src/features/slices/searchbarSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/** Enable for debugging */
const isDebug = true;

/**
 * search - Fetches data based on the query, page, and category parameters.
 *
 * @param {Object} param - The search parameters.
 * @param {string} param.query - The search query string used to filter results.
 * @param {number} param.page - The page number to fetch from the API endpoint.
 * @param {string} param.category - The category to filter results.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the search results.
 * @throws {Error} - Throws an error if the request fails.
 */
export const search = createAsyncThunk(
    'searchbar/search',
    async ({ query, page, category }) => {
        try {
            const url = `http://127.0.0.1:4000/api/list/${category}/search?q=${query}&page=${page}`;

            if (isDebug) {
                console.log(`search: Attempting to GET ${url}`);
            }

            const response = await axios.get(url);

            if (isDebug) {
                console.log("search: Received response", response);
            }

            return response.data;
        } catch (error) {
            if (isDebug) {
                console.error('search: Error fetching data:', error);
            }
            return [];
        }
    }
);

const searchbarSlice = createSlice({
    name: 'searchbar',
    initialState: {
        results: [],
        loading: false,
        error: null,
    },
    reducers: {
        /**
         * Reset search results to initial state.
         * @param {Object} state - The current state of the slice.
         */
        resetSearchResults: (state) => {
            state.results = [];
        }
    },
    extraReducers: (builder) => {
        builder
            /**
             * Handle pending state of search.
             * @route GET /list/:category/search
             * @access Public
             */
            .addCase(search.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(search.fulfilled, (state, action) => {
                state.loading = false;
                state.results = action.payload;
            })
            .addCase(search.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });    
    },
});

export const { resetSearchResults } = searchbarSlice.actions;
export default searchbarSlice.reducer;
