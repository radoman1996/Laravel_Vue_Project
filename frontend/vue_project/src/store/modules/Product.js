import * as types from '../types';

const state = {
    product: '',
    editProduct: false
};

const getters = {
    [types.PRODUCT]: state => {
        return state.product;
    },
    [types.EDIT_PRODUCT]: state => {
        return state.editProduct;
    }
};

const mutations = {
    [types.MUTATE_CHANGE_PRODUCT]: (state, value) => {
        state.product = value;
    },
    [types.MUTATE_CHANGE_EDIT_PRODUCT]: (state, value) => {
        state.editProduct = value;
    }
};

const actions = {
    [types.CHANGE_PRODUCT]: ({commit}, value) => {
        commit(types.MUTATE_CHANGE_PRODUCT, value);
    },
    [types.CHANGE_EDIT_PRODUCT]: ({commit}, value) => {
        commit(types.MUTATE_CHANGE_EDIT_PRODUCT, value);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}