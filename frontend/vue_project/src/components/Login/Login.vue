<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12 col-md-8 col-md-offset-2">
                <div class="jumbotron">
                    <h2 class="text-center">Prijavite se</h2>
                </div>
                <form @submit.prevent="loginAction">
                    <div class="form-group">
                        <label for="username">Vaš korisnički nalog</label>
                        <input 
                            type="text" 
                            class="form-control" 
                            id="username" 
                            name="username" 
                            v-model="user.username">
                        <small> {{ usernameErrorMessage }} </small>
                    </div>
                    <div class="form-group">
                        <label for="password1">Vaša šifra</label>
                        <input 
                            type="password" 
                            class="form-control" 
                            id="password" 
                            name="password" 
                            v-model="user.password">
                        <small> {{ passwordErrorMessage }} </small>
                        <br>
                        <small v-if="!$v.user.password.minLen">Potrebno je najmanje {{ $v.user.password.$params.minLen.min }} karaktera</small>
                    </div>
                    <!--<button 
                        class="btn btn-primary btn-block" 
                        @click.prevent="loginAction"
                    >Prijavite se</button>-->
                    <button 
                        class="btn btn-primary btn-block" 
                        type="submit"
                        :disabled="$v.$invalid"
                    >Prijavite se</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import * as types from '../../store/types';
    import axios from 'axios';
    import { required, minLength } from 'vuelidate/lib/validators/'

    export default {
        data() {
            return {
                user: {
                    username: '',
                    password: ''
                },
                usernameErrorMessage: '',
                passwordErrorMessage: ''
            }
        },
        validations: {
            user: {
                username: {
                    required
                },
                password: {
                    required,
                    minLen: minLength(6)
                }
            }
        },
        computed: {
            value: {
                get() {
                    return this.$store.getters[types.USER];
                },
                set(value) {
                    this.$store.dispatch(types.CHANGE_USER, value);
                }
            }
        },
        methods: {
            loginAction() {
                this.usernameErrorMessage = '';
                this.passwordErrorMessage = '';
                axios.post('http://127.0.0.1:8000/api/login_user', this.user)
                .then(response => {
                    console.log(response);
                    if(response.data[0].type == "success") {
                        let data = {
                            name: response.data[0].name,
                            username: response.data[0].username,
                            password: response.data[0].password,
                            gender: response.data[0].gender,
                            admin: response.data[0].admin
                        };
                        this.value = data;
                        this.$store.dispatch(types.CHANGE_LOGGED_IN_STATUS, true);
                        this.$router.push({name: 'home'});
                    } else {
                        if(response.data[0].problem == "username") {
                            this.usernameErrorMessage = response.data[0].msg;
                        } else {
                            this.passwordErrorMessage = response.data[0].msg;
                        }
                    }
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