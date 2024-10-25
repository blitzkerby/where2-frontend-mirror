import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config";
import { setTotalPage } from "./paginationSlice";

/**
 * Fetch all accommodations with pagination.
 * @route GET /api/list/accommodation/
 * @param {Object} param - The pagination parameters.
 * @param {number} param.page - The current page number.
 * @access Public
 */
export const fetchAccommodations = createAsyncThunk(
    'accommodation/fetchAccommodations',
    async ({ page }, { dispatch }) => {
        try {
            const response = await axios.get(`${config.accommodation.getAllAccommodation}?page=${page}`);

            dispatch(setTotalPage(response.data.pagination.setTotalPage || 1))
            return response.data.oneAccommodation;
        } catch (error) {
            return []
        }
    }
);

/**
 * Fetch a specific accommodation by ID.
 * @route GET /api/list/accommodation/:id
 * @param {number} id - The ID of the accommodation to fetch.
 * @access Public
 */
export const fetchAccommodation = createAsyncThunk(
    'accommodation/fetchAccommodation',
    async (id) => {
        const response = await axios.get(`${ config.accommodation.getAccommodationById }/${ id }`);
        return response.data.oneAccommodation;
    }
);

const accommodationSlice = createSlice({
    name: 'accommodation',
    initialState: {
        loading: true,
        error: null,
        accommodation: {},
    },
    reducers: {
        /**
         * Set the current accommodation data.
         * @param {Object} state - The current state.
         * @param {Object} action - The action payload.
         */
        setAccommodation: (state, action) => {
            state.accommodation = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch accommodation by ID
            .addCase(fetchAccommodation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAccommodation.fulfilled, (state, action) => {
                state.loading = false;
                state.accommodation = action.payload;
            })
            .addCase(fetchAccommodation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            });
    }
});

export const { setAccommodation } = accommodationSlice.actions;
export default accommodationSlice.reducer;
