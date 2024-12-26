import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import http from '~/services/apiSevices';

export const getAllDimensionDetail = createAsyncThunk('dimensionDetail/getAllDimensionDetail', () => {
    return http.httpGet('admin/dimensionDetail');
});

export const CreateDimensionDetail = createAsyncThunk('dimensionDetail/CreateDimensionDetail', (data) => {
    return http.httpPost(`admin/dimensionDetail`, data);
});

export const UpdateDimensionDetail = createAsyncThunk('dimensionDetail/UpdateDimensionDetail', (data) => {
    return http.httpPut(`admin/dimensionDetail/${data.id}`, data);
});

export const getByIdDimensionDetail = createAsyncThunk('dimensionDetail/getByIdDimensionDetail', (id) => {
    return http.httpGet(`admin/dimensionDetail/${id}`);
});

export const getDimensionDetailByproductId = createAsyncThunk('dimensionDetail/getDimensionDetailByproductId', (id) => {
    return http.httpGet(`admin/product/dimensionDetail/${id}`);
});

const slice = createSlice({
    name: 'dimensionDetail',
    initialState: {
        dimensionDetails: [],
        dimensionDetail:{},
        error: '',
        loading: false,
    },
    extraReducers: (builder) => {

        //Get color
        builder.addCase(getAllDimensionDetail.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllDimensionDetail.fulfilled, (state, action) => {
            state.loading = false;
            state.dimensionDetails = action.payload;
            state.error = '';
        });
        builder.addCase(getAllDimensionDetail.rejected, (state, action) => {
            state.loading = false;
            state.dimensionDetails = [];
            state.error = action.error.message;
        });

        //Add color
        builder.addCase(CreateDimensionDetail.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(CreateDimensionDetail.fulfilled, (state, action) => {
            state.loading = false;
            state.dimensionDetails.push(action.payload);
        });
        builder.addCase(CreateDimensionDetail.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        //Update category
        builder.addCase(UpdateDimensionDetail.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(UpdateDimensionDetail.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.id) {
                state.dimensionDetails = state.dimensionDetails.map((item) =>
                    item.id === action.payload.id ? action.payload : item,
                );
            }
            // state.rooms = state.rooms.filter((x) => x.status === 1);
        });
        builder.addCase(UpdateDimensionDetail.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        // getById
        builder.addCase(getByIdDimensionDetail.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getByIdDimensionDetail.fulfilled, (state, action) => {
            state.loading = false;
            state.dimensionDetail = action.payload;
            state.error = '';
        });
        builder.addCase(getByIdDimensionDetail.rejected, (state, action) => {
            state.loading = false;
            state.dimensionDetail = {};
            state.error = action.error.message;
        });

        // getByProductId
        builder.addCase(getDimensionDetailByproductId.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getDimensionDetailByproductId.fulfilled, (state, action) => {
            state.loading = false;
            state.dimensionDetails = action.payload;
            state.error = '';
        });
        builder.addCase(getDimensionDetailByproductId.rejected, (state, action) => {
            state.loading = false;
            state.dimensionDetails = {};
            state.error = action.error.message;
        });

    },
});
export default slice.reducer;