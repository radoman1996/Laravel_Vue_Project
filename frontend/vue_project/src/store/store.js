import Vue from 'vue';
import Vuex from 'vuex';

import UserData from './modules/UserData';
import CheckUserLoggedIn from './modules/CheckUserLoggedIn';
import Product from './modules/Product';
import Products from './modules/Products';
import Brands from './modules/Brands';
import Categories from './modules/Categories';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: [
        UserData,
        CheckUserLoggedIn,
        Product,
        Products,
        Brands,
        Categories
    ]
});