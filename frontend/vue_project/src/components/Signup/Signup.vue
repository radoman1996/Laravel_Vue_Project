<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12 col-md-8 col-md-offset-2">
                <div class="jumbotron">
                    <h2 class="text-center">Kreiranje naloga</h2>
                </div>
                <form @submit.prevent="createAccount">
                    <div class="form-group">
                        <label for="name">Vaše ime</label>
                        <input type="text" class="form-control" id="name" v-model="user.name">
                    </div>
                    <div class="form-group">
                        <label for="username">Vaš korisnički nalog</label>
                        <input type="text" class="form-control" id="username" v-model="user.username">
                        <small> {{ usernameErrorMessage }} </small>
                    </div>
                    <div class="form-group">
                        <label for="password1">Vaša šifra</label>
                        <input type="password" class="form-control" id="password1" v-model="user.password">
                        <small v-if="!$v.user.password.minLen">Potrebno je najmanje {{ $v.user.password.$params.minLen.min }} karaktera</small>
                    </div>
                    <div class="form-group">
                        <label for="password2">Ponovite šifru</label>
                        <input type="password" class="form-control" id="password2" v-model="user.password2">
                        <small v-if="!$v.user.password2.sameAs">Šifre se ne poklapaju</small>
                    </div>
                    <div class="radio">
                        <label>
                            <input type="radio" id="male" name="male" v-model="user.gender" value="male"> Muško
                        </label>
                    </div>
                    <div class="radio">
                        <label>
                            <input type="radio" id="female" name="female" v-model="user.gender" value="female"> Žensko
                        </label>
                    </div>
                    <button 
                        class="btn btn-primary btn-block" 
                        type="submit"
                        :disabled="$v.$invalid"
                    >Registrujte se</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import * as types from '../../store/types';
    import axios from 'axios';
    import { required, minLength, sameAs } from 'vuelidate/lib/validators';

    export default {
        data() {
            return {
                user: {
                    name: '',
                    username: '',
                    password: '',
                    password2: '',
                    gender: 'male'
                },
                usernameErrorMessage: ''
            }
        },
        validations: {
            user: {
                name: {
                    required
                },
                username: {
                    required
                },
                password: {
                    required,
                    minLen: minLength(6)
                },
                password2: {
                    sameAs: sameAs('password')
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
            createAccount() {
                this.usernameErrorMessage = '';
                axios.post('http://127.0.0.1:8000/api/create_user', this.user)
                .then(response => {
                    if(response.data.type == "success") {
                        let data = {
                            name: response.data.name,
                            username: response.data.username,
                            password: response.data.password,
                            gender: response.data.gender,
                            admin: response.data.admin
                        };
                        this.value = data;
                        this.$store.dispatch(types.CHANGE_LOGGED_IN_STATUS, true);
                        this.$router.push({name: 'home'});
                    } else {
                        if(response.data.problem == "username") {
                            this.usernameErrorMessage = response.data.msg;
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