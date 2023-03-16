<script>
export default {
    name: 'LoginComponent',
    data: function () {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        goToSignup() {
            this.$router.push('/auth')
        },
        login() {
            fetch('http://127.0.0.1:8000/auth/token/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'username': this.username,
                    'password': this.password
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    localStorage.setItem('authToken', data.auth_token);
                    localStorage.setItem('username', this.username);
                    this.$router.push('/chats')
                })
        }
    }
}
</script>

<template>
    <div class="container">
        <div class="card">
            <h5 class="card-header">Log in</h5>
            <div class="card-body">
                <form @submit.prevent="login">
                    <div class="mb-3">
                        <label for="username" class="form-label">Username</label>
                        <input v-model="username" type="text" class="form-control" id="username" placeholder="Username">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input v-model="password" class="form-control" id="password" type="password">
                    </div>
                    <button class="btn btn-primary" type="submit">Submit</button>
                </form>
            </div>
        </div>
        <span class="login-link" @click="goToSignup">Sign up</span>
    </div>
</template>

<style scoped>
.card {
    margin-top: 15vh;
}

.login-link:hover {
    color: #4c5d93;
    cursor: pointer;
}
</style>