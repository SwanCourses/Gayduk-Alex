/**
 * Created by ankain on 01.10.16.
 */

import { ADD_PRODUCT, ADD_PRODUCTS, SET_SEARCH_QUERY, APPLY_GROUP_FILTER } from './ProductActions';

// Initial State
const initialState = { data: [], searchQuery: '', groupFilter: '' };

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {

    case ADD_PRODUCTS:
      return {
        ...state,
        data: action.products,
      };

    case ADD_PRODUCT:
      return {
        ...state,
        data: [action.product, ...state.data],
      };

    case SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.searchQuery
      };

    case APPLY_GROUP_FILTER:
      return {
        ...state,
        groupFilter: action.groupFilter
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all products
export const getProducts = (state, filters = {name: '', group: ''}) => {
  let result = state.products.data;
  let appliedFilters = filters;

  if(!!appliedFilters.name)
    result = result.filter(product => `${product.name} ${product.price}`.indexOf(appliedFilters.name.trim()) > -1);
  if(!!appliedFilters.group)
    result = result.filter(product => `${product.group}`.indexOf(appliedFilters.group) > -1);

  return result;
};

// Get product by cuid
export const getProduct = (state, cuid) => state.products.data.filter(product => product.cuid === cuid)[0];

// Export Reducer
export default ProductReducer;
