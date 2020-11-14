//podatak da li je korisnik logovan
import * as types from '../types';

const state = {
    isUserLoggedIn: false
};

const getters = {
    [types.IS_USER_LOGGED_IN]: state => {
        return state.isUserLoggedIn;
    }
};

const mutations = {
    [types.MUTATE_CHANGE_LOGGED_IN_STATUS]: (state, value) => {
        state.isUserLoggedIn = value;
    }
};

const actions = {
    [types.CHANGE_LOGGED_IN_STATUS]: ({commit}, value) => {
        commit(types.MUTATE_CHANGE_LOGGED_IN_STATUS, value);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}