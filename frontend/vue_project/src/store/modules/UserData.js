//podaci o korisniku
import * as types from '../types';

const state = {
    user: {
        name: '',
        username: '',
        password: '',
        gender: '',
        admin: 0
    }
};

const getters = {
    [types.USER]: state => {
        return state.user;
    }
};

const mutations = {
    [types.MUTATE_CHANGE_USER]: (state, value) => {
        state.user = value;
    }
};

const actions = {
    [types.CHANGE_USER]: ({commit}, value) => {
        commit(types.MUTATE_CHANGE_USER, value);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}