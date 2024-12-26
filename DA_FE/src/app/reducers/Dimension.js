import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import http from '~/services/apiSevices';

export const getAllDimension = createAsyncThunk('dimension/getAllDimension', () => {
    return http.httpGet('admin/dimension');
});

export const CreateDimension = createAsyncThunk('dimension/CreateDimension', (data) => {
    return http.httpPost('admin/dimension', data);
});

export const UpdateDimension = createAsyncThunk('dimension/UpdateDimension', (data) => {
    return http.httpPut(`admin/dimension/${data.id}`, data);
});

export const getByIdDimension = createAsyncThunk('dimension/getByIdDimension', (id) => {
    return http.httpGet(`admin/dimension/${id}`);
});



const slice = createSlice({
    name: 'dimension',
    initialState: {
        dimensions: [],
        dimension: {},
        error: '',
        loading: false,
    },
    extraReducers: (builder) => {
        //Get color
        builder.addCase(getAllDimension.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllDimension.fulfilled, (state, action) => {
            state.loading = false;
            state.dimensions = action.payload;
            state.error = '';
        });
        builder.addCase(getAllDimension.rejected, (state, action) => {
            state.loading = false;
            state.dimensions = [];
            state.error = action.error.message;
        });

        //Add color
        builder.addCase(CreateDimension.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(CreateDimension.fulfilled, (state, action) => {
            state.loading = false;
            state.dimensions.push(action.payload);
        });
        builder.addCase(CreateDimension.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        //Update category
        builder.addCase(UpdateDimension.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(UpdateDimension.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.id) {
                state.dimensions = state.dimensions.map((item) =>
                    item.id === action.payload.id ? action.payload : item,
                );
            }
        });
        builder.addCase(UpdateDimension.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        // getById
        builder.addCase(getByIdDimension.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getByIdDimension.fulfilled, (state, action) => {
            state.loading = false;
            state.dimension = action.payload;
            state.error = '';
        });
        builder.addCase(getByIdDimension.rejected, (state, action) => {
            state.loading = false;
            state.dimension = {};
            state.error = action.error.message;
        });

    },
});
export default slice.reducer;