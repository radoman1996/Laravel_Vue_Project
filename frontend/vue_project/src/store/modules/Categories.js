import * as types from '../types';

const state = {
    categories: []
};

const getters = {
    [types.CATEGORIES]: state => {
        return state.categories;
    }
};

const mutations = {
    [types.MUTATE_FILL_CATEGORIES]: (state, value) => {
        state.categories = value;
    }
};

const actions = {
    [types.FILL_CATEGORIES]: ({commit}, value) => {
        commit(types.MUTATE_FILL_CATEGORIES, value);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}