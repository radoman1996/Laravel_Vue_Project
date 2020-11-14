<template>
    <div class="row">
        <app-product v-for="product in products" :product="product"></app-product>
    </div>
</template>

<script>
    import axios from 'axios';
    import * as types from '../../../store/types';
    import Product from './Product/Product.vue';

    export default {
        computed: {
            products() {
                return this.$store.getters[types.PRODUCTS];
            }
        },
        components: {
            appProduct: Product
        }
    }
</script>

<style scoped>
    
</style>