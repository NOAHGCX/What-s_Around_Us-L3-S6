<template>
    <div class="position-absolute end-0">
        <router-link to="/about">
            <button class="btn btn-warning">Home</button>
        </router-link>
    </div>
    <div>
        <div v-if="isLoggedIn">
            <div class="container-fluid connection">
                <div class="row">
                    <div class="col-md-6 mx-auto">
                        <div class="card mt-5 Login">
                            <div class="card-header">
                                <h3 class="text-center">You are logged</h3>
                            </div>
                            <div class="card-body text-center">
                                <router-link to="/profil">
                                    <button class="btn btn-warning ">Profil</button>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <SignUpComponent v-if="create" />
            <LoginComponent v-else />
        </div>
    </div>
    <div class="position-absolute sticky-top">
        <button class="btn btn-primary btn-block" @click="this.create=true">SignUp</button>
        <button class="btn btn-primary btn-block" @click="this.create=false">Login</button>
        <button class="btn btn-primary btn-block" @click="logOut">LogOut</button>
    </div>
</template>

<script>
    import SignUpComponent from '@/components/SignUpComponent.vue';
    import LoginComponent from '@/components/LoginComponent.vue';

    export default {
        name: "ConnectionView",
        components: {
            SignUpComponent,
            LoginComponent,
        },
        methods: {
            logOut() {
                localStorage.removeItem('token');
                this.isLoggedIn = false;
            }
        },
        beforeMount() {
            if (localStorage.getItem('token')) {
                this.isLoggedIn = true;
            }
        },
        data() {
            return {
                email: "",
                password: "",
                name: "",
                terms: false,
                create: false,
                isLoggedIn: false,
            };
        },
    };
</script>

<style>
    .connection {
        background-image: url("../assets/img/New-York-City.jpg");
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        height: 100vh;
    }

    .card {
        animation: slide-up 0.5s ease-in-out;
        background-color: rgba(255, 255, 255, 0.795);
        backdrop-filter: blur(5px);
    }

    @keyframes slide-up {
        0% {
            transform: translateY(50px);
            opacity: 0;
        }

        100% {
            transform: translateY(0);
            opacity: 1;
        }
    }
</style>