<template>
    <div>
        <div class="col-md-3 col-sm-6 product">
            <img :src="'http://127.0.0.1:8000/storage/images/' + product.image" alt="image" class="img-responsive">
            <br>
            <table class="table">
                <tr class="text-center">
                    <td>Kategorija:</td>
                    <td>{{ product.c_name }} </td>
                </tr>
                <tr class="text-center">
                    <td>Marka:</td>
                    <td>{{ product.b_name }}</td>
                </tr>
                <tr class="text-center">
                    <td>Naziv:</td>
                    <td>{{ product.name }}</td>
                </tr>
                <tr class="text-center">
                    <td>Cijena:</td>
                    <td>{{ product.price }} €</td>
                </tr>
            </table>
            <hr>
            <router-link 
                :to="{name: 'details'}"
                @click.native="sendProductDetails(product)"
                tag="button"
                class="btn btn-default btn-block"
            >Detalji</router-link>
            <br>
            <div class="btn-group btn-group-justified">
                <div class="btn-group">
                    <router-link 
                        :to="{name: 'new_product'}"
                        @click.native="editProduct(product)"
                        tag="button"
                        class="btn btn-default"
                        v-if="adminUser == 1">Izmjeni</router-link>
                </div>
                <div class="btn-group">
                    <button 
                        @click.prevent="deleteProduct(product.id, product.image)" 
                        class="btn btn-default"
                        v-if="adminUser == 1">Izbrisi</button>
                </div>
            </div>
            <br>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import * as types from '../../../../store/types';

    export default {
        props: ['product'],
        computed: {
            adminUser() {
                if(this.$store.getters[types.IS_USER_LOGGED_IN] == true) {
                    let user = this.$store.getters[types.USER];
                    let admin = user.admin;
                    if(admin == 0) {
                        return 0;
                    } else {
                        return 1;
                    }
                } else {
                    return 0;
                }
            }
        },
        methods: {
            deleteProduct(productId, productImage) {
                let data = {
                    "id": productId,
                    "image": productImage
                };
                axios.post('http://127.0.0.1:8000/api/delete_product', data)
                .then(response => {
                    console.log("delete element");
                    this.$store.dispatch(types.DELETE_ELEMENT_FROM_PRODUCTS, this.product);
                })
                .catch(error => {
                    console.log("error post");
                    console.log(error.response);
                })
            },
            sendProductDetails(productDetails) {
                this.$store.dispatch(types.CHANGE_PRODUCT, productDetails);
                this.$store.dispatch(types.CHANGE_EDIT_PRODUCT, false);
            },
            editProduct(productDetails) {
                this.$store.dispatch(types.CHANGE_PRODUCT, productDetails);
                this.$store.dispatch(types.CHANGE_EDIT_PRODUCT, true);
            }
        },
    }
</script>

<style scoped>
    .product {
        /*border: 1px solid black;*/
        box-shadow: 1px 1px 10px darkgray;
    }
    img {
        width: 90%;
        height: 200px;
        object-fit: contain;
        margin-top: 25px;
        margin-left: auto;
        margin-right: auto;
    }
</style>