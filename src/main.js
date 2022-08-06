import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import {createPinia} from 'pinia'
import vuetify from './plugins/vuetify'
import {loadFonts} from './plugins/webfontloader'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'


loadFonts()

const pinia = createPinia()
const app   = createApp(App);


const accessToken = localStorage.getItem('accessToken') ? JSON.parse(localStorage.getItem('accessToken')) : null;

app.provide('pusher', Pusher)

const API_URL = import.meta.env.VITE_API_URL

const echo = new Echo({
    authEndpoint    : API_URL + '/broadcasting/auth',
    auth            : {
        headers: {
            Authorization: accessToken ? 'Bearer ' + accessToken : null,
        }
    },
    broadcaster     : 'pusher',
    key             : 'anyKey',
    wsHost          : '0.0.0.0',
    wsPort          : 6001,
    wssPort         : 6001,
    forceTLS        : false,
    disableStats    : true,
    encrypted       : true,
    enableTransports: ['ws', 'wss'],
});


app.provide('echo', echo)

app.use(pinia)
    .use(router)
    .use(vuetify)


app.mount('#app')
