import * as Vue from 'vue';
import * as VueRouter from 'vue-router';

import App from './App.vue'
import ChatComponent from './components/ChatComponent.vue';
import PlayComponent from './components/PlayComponent.vue';
import CardsComponent from './components/CardsComponent.vue';
import MainComponent from './components/MainPage.vue';


import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"


const routes = [
    {
        path: '/',
        redirect: '/main'
    },
    {
        path: '/main',
        name: 'Main',
        component: MainComponent
    },
    {
        path: '/chats',
        name: 'Chat',
        component: ChatComponent
    },
    {
        path: '/play/:code',
        name: 'MainComponent',
        component: PlayComponent
    }
]

const router = new VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes
});

const app = Vue.createApp(App);
app.use(router);

app.component('cards-component', CardsComponent);

app.mount('#app');

