import * as types from '../types';

const state = {
    products: [],
    tempProducts: []
};

const getters = {
    [types.PRODUCTS]: state => {
        return state.products
    }
};

const mutations = {
    [types.MUTATE_FILL_PRODUCTS_ARRAY]: (state, value) => {
        state.products = value;
        state.tempProducts = value;
    },
    [types.MUTATE_DELETE_ELEMENT_FROM_PRODUCTS]: (state, value) => {
        let index = state.tempProducts.findIndex(elem => {
            return elem.id == value.id;
        });
        state.tempProducts.splice(index, 1);
        state.products = state.tempProducts;
    },
    [types.MUTATE_FILTER_PRODUCTS]: (state, value) => {
        let categoriesLength = value.selectedCategories.length;
        let brandsLength = value.selectedBrands.length;
        
        if(categoriesLength == 0 && brandsLength == 0) {
            state.products = state.tempProducts;
            return;
        }
        if(categoriesLength != 0 && brandsLength == 0) {
            let temp = [];
            state.tempProducts.forEach(elem => {
                if(value.selectedCategories.includes(elem.category_id)) {
                    temp.push(elem);
                }
            });
            state.products = temp;
            return;
        }
        if(categoriesLength == 0 && brandsLength != 0) {
            let temp = [];
            state.tempProducts.forEach(elem => {
                if(value.selectedBrands.includes(elem.brand_id)) {
                    temp.push(elem);
                }
            });
            state.products = temp;
            return;
        }
        let temp = [];
        state.tempProducts.forEach(elem => {
            if(value.selectedCategories.includes(elem.category_id) && value.selectedBrands.includes(elem.brand_id)) {
                temp.push(elem);
            }
        });
        state.products = temp;
    }
};

const actions = {
    [types.FILL_PRODUCTS_ARRAY]: ({commit}, value) => {
        commit(types.MUTATE_FILL_PRODUCTS_ARRAY, value);
    },
    [types.DELETE_ELEMENT_FROM_PRODUCTS]: ({commit}, value) => {
        commit(types.MUTATE_DELETE_ELEMENT_FROM_PRODUCTS, value);
    },
    [types.FILTER_PRODUCTS]: ({commit}, value) => {
        commit(types.MUTATE_FILTER_PRODUCTS, value);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}