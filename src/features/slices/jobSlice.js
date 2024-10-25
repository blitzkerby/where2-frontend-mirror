import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config";

export const fetchCompany = createAsyncThunk("jobs/associatedCompany", async (id) => {
    const response = await axios.get(config.job.getAssociatedCompany(id));

    return response.data;
})

const jobSlices = createSlice({
    name: "job",
    initialState: {
        jobs: [],
        company: {
            isLoading: true,
            data:{}
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCompany.pending, (state, action) => {
                state.company.isLoading = true
            })
            .addCase(fetchCompany.fulfilled, (state, action) => {
                state.company.isLoading = false
                state.company.data = action.payload.data.associatedCompany[0]

            })
            .addCase(fetchCompany.rejected)
    }
});

export default jobSlices.reducer;

