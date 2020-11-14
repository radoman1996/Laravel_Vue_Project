<template>
    <div>
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <ul class="nav navbar-nav">
                    <router-link 
                        tag="li"
                        :to="{name: 'home'}"
                    ><a>Pocetna</a></router-link>
                </ul>
                <p class="navbar-text" v-if="adminUser == 1">|</p>
                <ul class="nav navbar-nav">
                    <router-link 
                        :to="{name: 'new_product'}"
                        @click.native="editProduct"
                        tag="li"
                        v-if="adminUser == 1"
                    ><a>Novi proizvod</a></router-link>

                    <router-link 
                        :to="{name: 'brand'}"
                        tag="li"
                        v-if="adminUser == 1"
                    ><a>Nova marka</a></router-link>

                    <router-link 
                        :to="{name: 'category'}"
                        tag="li"
                        v-if="adminUser == 1"
                    ><a>Nova kategorija</a></router-link>
                </ul>

                <form class="navbar-form navbar-right">
                    <router-link 
                        v-if="!isUserLoggedIn"
                        :to="{name: 'login'}" 
                        tag="button" 
                        class="btn btn-default"
                    >Prijavi se</router-link>
                    <router-link 
                        v-if="!isUserLoggedIn"
                        :to="{name: 'signup'}" 
                        tag="button" 
                        class="btn btn-default"
                    >Registruj se</router-link>
                    <router-link 
                        @click.native="isUserLoggedIn = false"
                        v-if="isUserLoggedIn"
                        :to="{name: 'home'}" 
                        tag="button" 
                        class="btn btn-default"
                    >Odjavi se</router-link>
                </form>
                <p class="navbar-text navbar-right" v-if="isUserLoggedIn"> {{ username }} </p>
            </div>
        </nav>
    </div>
</template>

<script>
    import * as types from '../../store/types';
    export default {
        methods: {
            editProduct() {
                this.$store.dispatch(types.CHANGE_EDIT_PRODUCT, false);
            }
        },
        computed: {
            username() {
                let user = this.$store.getters[types.USER];
                return user.username;
            },
            isUserLoggedIn: {
                get() {
                    return this.$store.getters[types.IS_USER_LOGGED_IN];
                },
                set(value) {
                    this.$store.dispatch(types.CHANGE_LOGGED_IN_STATUS, value);
                }
            },
            adminUser() {
                if(this.isUserLoggedIn == true) {
                    let user = this.$store.getters[types.USER];
                    let admin = user.admin;
                    if(admin == 0) {
                        return 0;
                    } else {
                        return 1;
                    }
                } else {
                    return -1;
                }
            }
        },
    }
</script>

<style scoped>

</style>