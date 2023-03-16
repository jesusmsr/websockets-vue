import * as Vue from 'vue';
import * as VueRouter from 'vue-router';

import App from './App.vue'
import ChatComponent from './components/ChatComponent.vue';
import UserAuth from './components/UserAuth.vue';
import LoginComponent from './components/LoginComponent.vue';


import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"


const routes = [
    {
        path: '/chats',
        name: 'Chat',
        component: ChatComponent
    },

    {
        path: '/auth',
        name: 'UserAuth',
        component: UserAuth
    },
    {
        path: '/login',
        name: 'LoginComponent',
        component: LoginComponent
    }
]

const router = new VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes
});

router.beforeEach(async (to) => {
    const publicPages = ['/login', '/auth'];
    const authRequired = !publicPages.includes(to.path);
    const isAuth = localStorage.getItem('authToken');

    console.log(authRequired);
    if (authRequired && !isAuth) {
        return '/login'
    }

});

Vue.createApp(App).use(router).mount('#app');

