import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

// reducers
import totalCategory from './reducers/TotalCategory'
import productCategory from './reducers/ProductCategory'
import customer from './reducers/customer';
import product from './reducers/Product';
import material from './reducers/Materials'
import color from './reducers/Color'
import colorDetail from './reducers/ColorDetail'
import dimension from './reducers/Dimension'
import dimensionDetail from './reducers/DimensionDetail'


const reducer = combineReducers({
    // here we will be adding reducers
    dimensionDetail:dimensionDetail,
    dimension: dimension,
    colorDetail:colorDetail,
    color: color,
    product: product,
    productCategory: productCategory,
    totalCategory: totalCategory,
    customer: customer,
    material:material,
});
const store = configureStore({
    reducer,
});
export default store;
