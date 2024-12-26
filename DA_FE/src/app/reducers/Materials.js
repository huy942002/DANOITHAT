import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import http from '~/services/apiSevices';

export const getAllMaterial = createAsyncThunk('material/getAllMaterial', () => {
    return http.httpGet('admin/material');
});


const slice = createSlice({
    name: 'material',
    initialState: {
        materials: [],
        material: {},
        error: '',
        loading: false,
    },
    extraReducers: (builder) => {
        builder.addCase(getAllMaterial.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllMaterial.fulfilled, (state, action) => {
            state.loading = false;
            state.materials = action.payload;
            state.error = '';
        });
        builder.addCase(getAllMaterial.rejected, (state, action) => {
            state.loading = false;
            state.materials = [];
            state.error = action.error.message;
        });

    },
});
export default slice.reducer;