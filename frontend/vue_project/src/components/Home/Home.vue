<template>
    <div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-2">
                    <div class="panel-group" id="accordion">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h4 class="panel-title">
                                    <a 
                                        class="titleLink" 
                                        @click.prevent="changeBody('category')"
                                        >Kategorija</a>
                                </h4>
                            </div>
                            <div class="panel-collapse collapse" :class="{in: categoryBody}">
                                <div class="panel-body">
                                    <div class="checkbox" v-for="item in categories">
                                        <label>
                                            <input 
                                                type="checkbox"
                                                :name="item.name"
                                                :value="item.id"
                                                v-model="filterData.selectedCategories"
                                                @change="filterProducts"
                                                > {{ item.name }}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h4 class="panel-title">
                                    <a 
                                        class="titleLink"
                                        @click.prevent="changeBody('brand')"
                                        >Model</a>
                                </h4>
                            </div>
                            <div class="panel-collapse collapse" :class="{in: brandBody}">
                                <div class="panel-body">
                                    <div class="checkbox" v-for="item in brands">
                                        <label>
                                            <input 
                                                type="checkbox"
                                                :name="item.name"
                                                :value="item.id"
                                                v-model="filterData.selectedBrands"
                                                @change="filterProducts"
                                                > {{ item.name }}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-10">
                    <app-all-products></app-all-products>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import * as types from '../../store/types';
    import AllProducts from '../Products/All_Products/AllProducts.vue'
    import axios from 'axios';

    export default {
        data() {
            return {
                categoryBody: false,
                brandBody: false,
                filterData: {
                    selectedCategories: [],
                    selectedBrands: []
                }
            }
        },
        methods: {
            changeBody(value) {
                if(value == 'category') {
                    this.categoryBody = !this.categoryBody;
                    this.brandBody = false;
                } else {
                    this.brandBody = !this.brandBody;
                    this.categoryBody = false;
                }
            },
            filterProducts() {
                this.$store.dispatch(types.FILTER_PRODUCTS, this.filterData);
            }
        },
        computed: {
            categories() {
                return this.$store.getters[types.CATEGORIES];
            },
            brands() {
                return this.$store.getters[types.BRANDS];
            }
        },
        beforeCreate() {
            const products = 'http://127.0.0.1:8000/api/products';
            const category = 'http://127.0.0.1:8000/api/categories';
            const brand = 'http://127.0.0.1:8000/api/brands';

            const request1 = axios.get(products);
            const request2 = axios.get(category);
            const request3 = axios.get(brand);

            axios.all([request1, request2, request3])
            .then(axios.spread((...responses) => {
                this.$store.dispatch(types.FILL_PRODUCTS_ARRAY, responses[0].data);
                this.$store.dispatch(types.FILL_CATEGORIES, responses[1].data);
                this.$store.dispatch(types.FILL_BRANDS, responses[2].data);
            }))
            .catch(errors => {
                console.log(error);
            });
        },
        components: {
            appAllProducts: AllProducts
        }
    }
</script>

<style scoped>

    .titleLink {
        cursor: pointer;
    }

</style>