import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import http from '~/services/apiSevices';

export const getAllTotalCategory = createAsyncThunk('totalCategory/getAllTotalCategory', () => {
    return http.httpGet('admin/total-category');
});



const slice = createSlice({
    name: 'totalCategory',
    initialState: {
        totalCategorys: [],
        error: '',
        loading: false,
    },
    extraReducers: (builder) => {
        builder.addCase(getAllTotalCategory.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllTotalCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.totalCategorys = action.payload;
            state.error = '';
        });
        builder.addCase(getAllTotalCategory.rejected, (state, action) => {
            state.loading = false;
            state.totalCategorys = [];
            state.error = action.error.message;
        });

    },
});
export default slice.reducer;