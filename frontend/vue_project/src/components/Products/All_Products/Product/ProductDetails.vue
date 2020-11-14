<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div>
                    <img 
                        :src="'http://127.0.0.1:8000/storage/images/' + product.image" 
                        alt="image" 
                        class="img-responsive">
                </div>
                <div>
                    <table class="table table-bordered">
                        <tr class="text-center">
                            <td><h4>Kategorija:</h4></td>
                            <td><h4>{{ product.c_name }}</h4></td>
                        </tr>
                        <tr class="text-center">
                            <td><h4>Marka:</h4></td>
                            <td><h4>{{ product.b_name }}</h4></td>
                        </tr>
                        <tr class="text-center">
                            <td><h4>Naziv:</h4></td>
                            <td><h4>{{ product.name }}</h4></td>
                        </tr>
                        <tr class="text-center">
                            <td><h4>Cijena:</h4></td>
                            <td><h4>{{ product.price }} €</h4></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <h4>
                    <strong>Detaljniji opis proizvoda:</strong>
                </h4>
                <h5 v-if="product.description != ''"> {{ product.description }} </h5>
                <h5 v-else>Nema opisa za ovaj proizvod</h5>
                <br>
            </div>
        </div>
    </div>
</template>

<script>
    import * as types from '../../../../store/types';

    export default {
        computed: {
            product() {
                return this.$store.getters[types.PRODUCT];
            }
        },
    }
</script>

<style scoped>
    img {
        height: 300px;
        object-fit: contain;
    }
</style>