<template>
    <div class="container-fluid connection">
        <div class="row">
            <div class="col-md-6 mx-auto">
                <div class="card mt-5">
                    <div class="card-header">
                        <h3 class="text-center">Create Account</h3>
                    </div>
                    <div class="card-body">
                        <form>
                            <div class="form-group">
                                <label for="Username">Username</label>
                                <input type="text" class="form-control" id="Username" v-model="Username">
                            </div>
                            <div class="form-group">
                                <label for="First">First name</label>
                                <input type="text" class="form-control" id="First" v-model="First">
                            </div>
                            <div class="form-group">
                                <label for="Last">Last name</label>
                                <input type="text" class="form-control" id="Last" v-model="Last">
                            </div>
                            <div class="form-group">
                                <label for="Address">Address</label>
                                <input type="text" class="form-control" id="Address" v-model="Address">
                            </div>
                            <div class="form-group">
                                <label for="email">Email address</label>
                                <input type="email" class="form-control" id="email" v-model="email">
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" class="form-control" id="password" v-model="password">
                            </div>
                            <button type="submit" class="btn btn-primary btn-block" @click="signup()">Create
                                Account</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SignUpComponent",
        methods: {
            signup() {
                var component = this
                let options = {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: component.Username,
                        password: component.password,
                        mail: component.email,
                        first_name: component.First,
                        last_name: component.Last,
                        adress: component.Address,
                    })
                }
                fetch('/api/auth/signup', options)
                    .then((response) => {
                        return response.json()
                    })
                    .then((data) => {
                        component.isLoggedIn = true
                        component.token = data.token
                        localStorage.setItem('token', component.token);
                        window.location.reload();
                    })
                    .catch((error) => {
                        console.log(error)
                        component.isLoggedIn = false
                    })
            },
        },
        data() {
            return {
                email: "",
                password: "",
                Username: "",
                First: "",
                Last: "",
                Address: "",
                isLoggedIn: false,
                token: ""
            };
        },
    };
</script>

<style>
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