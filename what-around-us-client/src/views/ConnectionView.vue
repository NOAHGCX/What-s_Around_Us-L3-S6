<template>
    <div class="position-absolute end-0">
        <router-link to="/about">
        <button class="btn btn-warning">Home</button></router-link>
    </div>
    <div>
        <CreateAccountComponent v-if="create"/>
        <LoginComponent v-else/>
    </div>
    <div class="position-absolute sticky-top">
        <button class="btn btn-primary btn-block" @click="this.create=true">Create Account</button>
        <button class="btn btn-primary btn-block" @click="this.create=false">Login</button>
    </div>
</template>

<script>
    import CreateAccountComponent from '@/components/CreateAccountComponent.vue';
    import LoginComponent from '@/components/LoginComponent.vue';

    export default {
        name: "ConnectionView",
        components: {
            CreateAccountComponent,
            LoginComponent,
        },
        data() {
            return {
                email: "",
                password: "",
                name: "",
                terms: false,
                create: false,
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