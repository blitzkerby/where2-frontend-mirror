import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from "../../config";
import { setTotalPage } from './paginationSlice';

/**
 * Fetch all scholarships with pagination.
 * @route GET /api/list/scholarship/
 * @param {Object} param - The pagination parameters.
 * @param {number} param.page - The current page number.
 * @access Public
 */
export const fetchScholarships = createAsyncThunk(
    'scholarships/fetchScholarships',
    async ({ page }, { dispatch }) => {
        try {
            const response = await axios.get(`${config.scholarships.getAllScholarships}?page=${page}`);
            dispatch(setTotalPage(response.data.pagination.totalPages || 1));
            return response.data.list;
        } catch (error) {
            return [];
        }
    }
);

/**
 * Fetch a specific scholarship by ID.
 * @route GET /api/list/scholarship/:id
 * @param {number} id - The ID of the scholarship to fetch.
 * @access Public
 */
export const fetchScholarship = createAsyncThunk(
    'scholarships/fetchScholarship',
    async (id) => {
        const response = await axios.get(`${config.scholarships.getScholarshipById}/${id}`);
        return response.data.list;
    }
);

/**
 * Search scholarships by query.
 * @route GET /api/list/scholarship
 * @param {string} query - The search query.
 * @access Public
 */
export const searchScholarships = createAsyncThunk(
    'scholarships/searchScholarships',
    async ({ query, page }, { dispatch }) => {
        const response = await axios.get(`${config.scholarships.getAllScholarships}?q=${encodeURIComponent(query)}&page=${page}`);
        dispatch(setTotalPage(response.data.pagination.totalPages || 1));
        return response.data.list;
    }
);

const scholarshipsSlice = createSlice({
    name: 'scholarships',
    initialState: {
        scholarships: [],
        scholarship: [],
        loading: false,
        error: null,
    },
    reducers: {
        setScholarships: (state, action) => {
            state.scholarships = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            /**
             * Fetch all scholarships.
             * @route GET /api/list/scholarship/
             * @access Public
             */
            .addCase(fetchScholarships.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchScholarships.fulfilled, (state, action) => {
                state.loading = false;
                state.scholarships = action.payload;
            })
            .addCase(fetchScholarships.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            /**
             * Fetch a specific scholarship by ID.
             * @route GET /api/list/scholarship/:id
             * @access Public
             */
            .addCase(fetchScholarship.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchScholarship.fulfilled, (state, action) => {
                state.loading = false;
                state.scholarship = action.payload;
            })
            .addCase(fetchScholarship.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            /**
             * Search scholarships by query.
             * @route GET /api/list/scholarship/search
             * @access Public
             */
            .addCase(searchScholarships.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchScholarships.fulfilled, (state, action) => {
                state.loading = false;
                state.scholarships = action.payload;
            })
            .addCase(searchScholarships.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.scholarships = [];
            });
    },
});

export const { setScholarships } = scholarshipsSlice.actions;
export default scholarshipsSlice.reducer;
