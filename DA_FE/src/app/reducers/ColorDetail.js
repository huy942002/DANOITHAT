import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import http from '~/services/apiSevices';

export const getAllColorDetail = createAsyncThunk('colorDetail/getAllColorDetail', () => {
    return http.httpGet('admin/colorDetail');
});

export const CreateColorDetail = createAsyncThunk('colorDetail/CreateColorDetail', (data) => {
    return http.httpPost('admin/colorDetail', data);
});

export const UpdateColorDetail = createAsyncThunk('colorDetail/UpdateColorDetail', (data) => {
    return http.httpPut(`admin/colorDetail/${data.id}`, data);
});

export const getByIdColorDetail = createAsyncThunk('colorDetail/getByIdColorDetail', (id) => {
    return http.httpGet(`admin/colorDetail/${id}`);
});

export const getColorDetailByproductId = createAsyncThunk('colorDetail/getColorDetailByproductId', (id) => {
    return http.httpGet(`admin/product/colorDetail/${id}`);
});

const slice = createSlice({
    name: 'colorDetail',
    initialState: {
        colorDetails: [],
        colorDetail:{},
        error: '',
        loading: false,
    },
    extraReducers: (builder) => {

        //Get color
        builder.addCase(getAllColorDetail.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllColorDetail.fulfilled, (state, action) => {
            state.loading = false;
            state.colorDetails = action.payload;
            state.error = '';
        });
        builder.addCase(getAllColorDetail.rejected, (state, action) => {
            state.loading = false;
            state.colorDetails = [];
            state.error = action.error.message;
        });

        //Add color
        builder.addCase(CreateColorDetail.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(CreateColorDetail.fulfilled, (state, action) => {
            state.loading = false;
            state.colorDetails.push(action.payload);
        });
        builder.addCase(CreateColorDetail.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        //Update category
        builder.addCase(UpdateColorDetail.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(UpdateColorDetail.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.id) {
                state.colorDetails = state.colorDetails.map((item) =>
                    item.id === action.payload.id ? action.payload : item,
                );
            }
            // state.rooms = state.rooms.filter((x) => x.status === 1);
        });
        builder.addCase(UpdateColorDetail.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        // getById
        builder.addCase(getByIdColorDetail.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getByIdColorDetail.fulfilled, (state, action) => {
            state.loading = false;
            state.colorDetail = action.payload;
            state.error = '';
        });
        builder.addCase(getByIdColorDetail.rejected, (state, action) => {
            state.loading = false;
            state.colorDetail = {};
            state.error = action.error.message;
        });

        // getByProductId
        builder.addCase(getColorDetailByproductId.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getColorDetailByproductId.fulfilled, (state, action) => {
            state.loading = false;
            state.colorDetails = action.payload;
            state.error = '';
        });
        builder.addCase(getColorDetailByproductId.rejected, (state, action) => {
            state.loading = false;
            state.colorDetails = {};
            state.error = action.error.message;
        });

    },
});
export default slice.reducer;