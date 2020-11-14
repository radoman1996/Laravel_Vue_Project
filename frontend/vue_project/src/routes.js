import Home from './components/Home/Home.vue';

const Login = resolve => {
    require.ensure(['./components/Login/Login.vue'], () => {
        resolve(require('./components/Login/Login.vue'));
    });
};

const Signup = resolve => {
    require.ensure(['./components/Signup/Signup.vue'], () => {
        resolve(require('./components/Signup/Signup.vue'));
    });
};

const Brand = resolve => {
    require.ensure(['./components/Products/New_Brand/Brand.vue'], () => {
        resolve(require('./components/Products/New_Brand/Brand.vue'));
    });
};

const Category = resolve => {
    require.ensure(['./components/Products/New_Category/Category.vue'], () => {
        resolve(require('./components/Products/New_Category/Category.vue'));
    });
};

const NewProduct = resolve => {
    require.ensure(['./components/Products/New_Product/NewProduct.vue'], () => {
        resolve(require('./components/Products/New_Product/NewProduct.vue'));
    });
};

const ProductDetails = resolve => {
    require.ensure(['./components/Products/All_Products/Product/ProductDetails.vue'], () => {
        resolve(require('./components/Products/All_Products/Product/ProductDetails.vue'));
    });
};

export const routes = [
    { path: '', component: Home, name: 'home' },
    { path: '/login', component: Login, name: 'login' },
    { path: '/signup', component: Signup, name: 'signup' },
    { path: '/brand', component: Brand, name: 'brand' },
    { path: '/category', component: Category, name: 'category' },
    { path: '/new_product', component: NewProduct, name: 'new_product' },
    { path: '/details', component: ProductDetails, name: 'details' }
];