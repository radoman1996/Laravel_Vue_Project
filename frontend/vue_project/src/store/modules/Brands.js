import * as types from '../types';

const state = {
    brands: []
};

const getters = {
    [types.BRANDS]: state => {
        return state.brands;
    }
};

const mutations = {
    [types.MUTATE_FILL_BRANDS]: (state, value) => {
        state.brands = value;
    }
};

const actions = {
    [types.FILL_BRANDS]: ({commit}, value) => {
        commit(types.MUTATE_FILL_BRANDS, value);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}