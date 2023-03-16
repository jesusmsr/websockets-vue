<template>
    <div class="container">
        <div class="card">
            <h5 class="card-header">Sign up</h5>
            <div class="card-body">
                <form @submit.prevent="signUp">
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
        <span class="login-link" @click="goToLogin">Already have an account?</span>
    </div>
</template>
  
<script>
import { routerKey } from 'vue-router';

export default {

    data() {
        return {
            email: '', username: '', password: ''
        }
    },
    methods: {
        signUp() {
            console.log(this.password);
            fetch('http://127.0.0.1:8000/auth/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'username': this.username,
                    'password': this.password
                })
            })
        },
        goToLogin() {
            this.$router.push({ path: '/login' })
        }
    }

}
</script>
  
<style scoped>
.card {
    margin-top: 15vh;
}

.login-link:hover {
    color: #4c5d93;
    cursor: pointer;
}
</style>