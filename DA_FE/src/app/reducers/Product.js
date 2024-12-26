import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import http from '~/services/apiSevices';

export const getAllProduct = createAsyncThunk('product/getAllProduct', () => {
    return http.httpGet('admin/product');
});

export const getByIdProduct = createAsyncThunk('product/getByIdProduct', (id) => {
    return http.httpGet(`admin/product/${id}`);
});

export const UpdateProduct= createAsyncThunk('product/UpdateProduct', (data) => {
    return http.httpPut(`admin/product/${data.id}`, data);
});


const slice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        product: {},
        error: '',
        loading: false,
    },
    extraReducers: (builder) => {

        builder.addCase(getAllProduct.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
            state.error = '';
        });
        builder.addCase(getAllProduct.rejected, (state, action) => {
            state.loading = false;
            state.products = [];
            state.error = action.error.message;
        });

        builder.addCase(UpdateProduct.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(UpdateProduct.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.id) {
                state.products = state.products.map((item) =>
                    item.id === action.payload.id ? action.payload : item,
                );
            }
            // state.rooms = state.rooms.filter((x) => x.status === 1);
        });
        builder.addCase(UpdateProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });


        builder.addCase(getByIdProduct.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getByIdProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.product = action.payload;
            state.error = '';
        });
        builder.addCase(getByIdProduct.rejected, (state, action) => {
            state.loading = false;
            state.product = {};
            state.error = action.error.message;
        });
        

    },
});
export default slice.reducer;