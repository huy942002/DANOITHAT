import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import http from '~/services/apiSevices';

export const getAllProductCategory = createAsyncThunk('productCategory/getAllProductCategory', () => {
    return http.httpGet('admin/category');
});

export const CreateProductCategory = createAsyncThunk('productCategory/CreateProductCategory', (data) => {
    return http.httpPost('admin/category',data);
});

export const UpdateProductCategory = createAsyncThunk('productCategory/UpdateProductCategory', (data) => {
    return http.httpPut(`admin/category/${data.id}`, data);
});

export const getByIdProductCategory = createAsyncThunk('productCategory/getByIdProductCategory', (id) => {
    return http.httpGet(`admin/category/${id}`);
});


const slice = createSlice({
    name: 'productCategory',
    initialState: {
        productCategorys: [],
        productCategory: {},
        error: '',
        loading: false,
    },
    extraReducers: (builder) => {
        builder.addCase(getAllProductCategory.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllProductCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.productCategorys = action.payload;
            state.error = '';
        });
        builder.addCase(getAllProductCategory.rejected, (state, action) => {
            state.loading = false;
            state.productCategorys = [];
            state.error = action.error.message;
        });

        //Add category
        builder.addCase(CreateProductCategory.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(CreateProductCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.productCategorys.push(action.payload);
        });
        builder.addCase(CreateProductCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        //Update category
        builder.addCase(UpdateProductCategory.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(UpdateProductCategory.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.id) {
                state.productCategorys = state.productCategorys.map((item) =>
                    item.id === action.payload.id ? action.payload : item,
                );
            }
            // state.rooms = state.rooms.filter((x) => x.status === 1);
        });
        builder.addCase(UpdateProductCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        // getById
        builder.addCase(getByIdProductCategory.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getByIdProductCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.productCategory = action.payload;
            state.error = '';
        });
        builder.addCase(getByIdProductCategory.rejected, (state, action) => {
            state.loading = false;
            state.productCategory = {};
            state.error = action.error.message;
        });

    },
});
export default slice.reducer;