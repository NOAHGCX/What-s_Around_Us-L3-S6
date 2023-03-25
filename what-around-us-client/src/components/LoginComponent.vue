<template>
    <div class="container-fluid connection">
        <div class="row">
            <div class="col-md-6 mx-auto">
                <div class="card mt-5 Login">
                    <div class="card-header">
                        <h3 class="text-center">Login</h3>
                    </div>
                    <div class="card-body">
                        <form>
                            <div class="form-group">
                                <label for="email">Email address</label>
                                <input type="email" class="form-control" id="email" v-model="email">
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" class="form-control" id="password" v-model="password">
                            </div>
                            <button type="submit" class="btn btn-primary btn-block" @click="login()">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LoginComponent",
        methods: {
            login() {
                var component = this
                let options = {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        mail: component.email,
                        password: component.password,
                    })
                }
                fetch('/api/auth', options)
                    .then((response) => {
                        return response.json()
                    })
                    .then((data) => {
                        if (data.error == "Invalid credentials") {
                            alert("User doesn't exist or wrong password")
                        } else {
                            component.isLoggedIn = true
                            component.token = data.token
                            localStorage.setItem('token', component.token);
                            window.location.reload();
                        }
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