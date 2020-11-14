<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12 col-md-8 col-md-offset-2">
                <div class="jumbotron">
                    <h2 class="text-center">Kreiranje nove marke</h2>
                </div>
                <div class="alert alert-success" v-if="successMsg">
                    <p>
                        Marka je uspješno kreirana
                    </p>
                </div>
                <form>
                    <div class="form-group">
                        <label for="name">Naziv marke uređaja</label>
                        <input type="text" class="form-control" id="name" name="name" v-model="brandName">
                    </div>
                    <button 
                        class="btn btn-primary btn-block" 
                        @click.prevent="createBrand"
                        :disabled="$v.$invalid"
                    >Kreiraj marku</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import * as types from '../../../store/types';
    import axios from 'axios';
    import { required } from 'vuelidate/lib/validators';

    export default {
        data() {
            return {
                brandName: '',
                successMsg: false
            }
        },
        validations: {
            brandName: {
                required
            }
        },
        methods: {
            createBrand() {
                let data = {
                    "name": this.brandName
                };
                axios.post('http://127.0.0.1:8000/api/create_brand', data)
                .then(response => {
                    this.successMsg = true;
                    setTimeout(() => {
                        this.successMsg = false
                    }, 2000);
                    this.brandName = '';
                })
                .catch(error => {
                    console.log('error post');
                    console.log(error);
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