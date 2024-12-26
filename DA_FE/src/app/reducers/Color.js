import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import http from '~/services/apiSevices';

export const getAllColor = createAsyncThunk('color/getAllColor', () => {
    return http.httpGet('admin/color');
});

export const CreateColor = createAsyncThunk('color/CreateColor', (data) => {
    return http.httpPost('admin/color', data);
});

export const UpdateColor = createAsyncThunk('color/UpdateColor', (data) => {
    return http.httpPut(`admin/color/${data.id}`, data);
});

export const getByIdColor = createAsyncThunk('color/getByIdColor', (id) => {
    return http.httpGet(`admin/category/${id}`);
});

export const addColorDetails = createAsyncThunk('color/addColorDetails', () => {
    return http.httpGet('product');
});


const slice = createSlice({
    name: 'color',
    initialState: {
        colors: [],
        color: {},
        error: '',
        loading: false,
    },
    extraReducers: (builder) => {
        //Get color
        builder.addCase(getAllColor.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllColor.fulfilled, (state, action) => {
            state.loading = false;
            state.colors = action.payload;
            state.error = '';
        });
        builder.addCase(getAllColor.rejected, (state, action) => {
            state.loading = false;
            state.colors = [];
            state.error = action.error.message;
        });

        //Add color
        builder.addCase(CreateColor.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(CreateColor.fulfilled, (state, action) => {
            state.loading = false;
            state.colors.push(action.payload);
        });
        builder.addCase(CreateColor.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        //Update category
        builder.addCase(UpdateColor.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(UpdateColor.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.id) {
                state.colors = state.colors.map((item) =>
                    item.id === action.payload.id ? action.payload : item,
                );
            }
            // state.rooms = state.rooms.filter((x) => x.status === 1);
        });
        builder.addCase(UpdateColor.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        // getById
        builder.addCase(getByIdColor.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getByIdColor.fulfilled, (state, action) => {
            state.loading = false;
            state.color = action.payload;
            state.error = '';
        });
        builder.addCase(getByIdColor.rejected, (state, action) => {
            state.loading = false;
            state.color = {};
            state.error = action.error.message;
        });

    },
});
export default slice.reducer;