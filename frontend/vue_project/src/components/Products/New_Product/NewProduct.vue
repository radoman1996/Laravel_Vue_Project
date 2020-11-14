<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12 col-md-8 col-md-offset-2">
                <div class="jumbotron">
                    <h2 class="text-center"> {{ editProduct ? "Izmjena" : "Kreiranje" }} proizvoda </h2>
                </div>
                <form @submit.prevent="createProduct">
                    <div class="form-group">
                        <select name="category" id="category" class="form-control" v-model="product.category">
                            <option 
                                v-for="item in categories"
                                :value="item.id"> {{ item.name }} </option>
                        </select>
                    </div>
                    <div class="form-group">
                        <select name="brand" id="brand" class="form-control" v-model="product.brand">
                            <option 
                                v-for="item in brands"
                                :value="item.id"> {{ item.name }} </option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="name">Naziv proizvoda</label>
                        <input type="text" class="form-control" id="name" name="name" v-model="product.name">
                    </div>
                    <div class="form-group">
                        <label for="price">Cijena proizvoda</label>
                        <input type="text" class="form-control" id="price" name="price" v-model="product.price">
                    </div>
                    <div class="form-group">
                        <label for="name">Opis proizvoda</label>
                        <textarea 
                            name="description" 
                            id="description" 
                            cols="30" rows="10" 
                            class="form-control"
                            v-model="product.description"></textarea>
                    </div>
                    <div class="form-group">
                        <input type="file" id="file" name="file" class="form-control" ref="file">
                        <small> {{ fileErrorMessage }} </small>
                    </div>
                    <button 
                        class="btn btn-primary btn-block" 
                        :disabled="$v.$invalid"
                    > {{ editProduct ? "Izmjeni proizvod" : "Kreiraj proizvod" }} </button>
                    <br>
                    <div class="alert alert-success" v-if="successMsg">
                        <p>
                            {{ editProduct ? "Uspjesno je izmjenjen proizvod" : "Uspjesno je kreiran proizvod" }}
                        </p>
                    </div>
                    <br>
                    <br>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import * as types from '../../../store/types';
    import axios from 'axios';
    import { required, decimal, minValue } from 'vuelidate/lib/validators';

    export default {
        data() {
            return {
                product: {
                    category: 1,
                    brand: 1,
                    name: '',
                    price: 0.0,
                    description: ''
                },
                fileErrorMessage: '',
                successMsg: false
            }
        },
        validations: {
            product: {
                name: {
                    required
                },
                price: {
                    required,
                    decimal,
                    minVal: minValue(0)
                }
            }
        },
        computed: {
            categories() {
                return this.$store.getters[types.CATEGORIES];
            },
            brands() {
                return this.$store.getters[types.BRANDS];
            },
            editProduct() {
                let edit = this.$store.getters[types.EDIT_PRODUCT];
                if(!edit) {
                    this.product = {
                        category: 1,
                        brand: 1,
                        name: '',
                        price: 0.0,
                        description: ''
                    }
                } else {
                    let temp_product = this.$store.getters[types.PRODUCT];
                    this.product = {
                        id: temp_product.id,
                        category: temp_product.category_id,
                        brand: temp_product.brand_id,
                        name: temp_product.name,
                        price: temp_product.price,
                        description: temp_product.description
                    };
                }
                return edit;
            },

        },
        /*beforeRouteEnter (to, from, next) {
            next(vm => {
                const category = 'http://127.0.0.1:8000/api/categories';
                const brand = 'http://127.0.0.1:8000/api/brands';

                const request1 = axios.get(category);
                const request2 = axios.get(brand);
                axios.all([request1, request2])
                .then(axios.spread((...responses) => {
                    vm.categories = responses[0].data;
                    vm.brands = responses[1].data
                }))
                .catch(errors => {
                    console.log(error);
                });
            });
        },*/
        methods: {
            createProduct() {
                this.fileErrorMessage = '';
                let file = this.$refs.file.files[0];
                if(file == undefined){
                    if(!this.editProduct){
                        this.fileErrorMessage = "Potrebno je izabrati fajl";
                        return;
                    }
                }
                let formData = new FormData();
                formData.append('product', JSON.stringify(this.product));
                formData.append('file', file);
                let url = '';
                if(this.editProduct) {
                    url = 'http://127.0.0.1:8000/api/update_product';
                } else {
                    url = 'http://127.0.0.1:8000/api/create_product';
                }
                axios.post(url, formData)
                .then(response => {
                    this.successMsg = true;
                    setTimeout(() => {
                        this.successMsg = false;
                        this.product = {
                            category: 1,
                            brand: 1,
                            name: '',
                            price: 0.0,
                            description: ''
                        };
                        this.$refs.file.value = null;
                        this.$store.dispatch(types.CHANGE_EDIT_PRODUCT, false);
                    }, 2000)
                })
                .catch(error => {
                    console.log('error post');
                    console.log(error.response);
                });
            }
        },
    }
</script>

<style scoped>
    .jumbotron {
        padding-top: 10px;
        padding-bottom: 10px;
        margin-bottom: 10px;
        background-color: transparent;
    }
</style>