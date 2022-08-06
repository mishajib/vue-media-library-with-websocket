import {createRouter, createWebHistory} from "vue-router";
import AboutView from "@/views/AboutView.vue";
import {useAuthStore} from "@/store";
import {parseJwtToken} from "@/helpers";
import axios from "../Http/axios/index.js";

const routes = [
    {
        path     : '/',
        name     : 'home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/HomeView.vue'),
    },
    {
        path     : '/about',
        name     : 'about',
        component: AboutView
    },

    {
        path     : '/register',
        name     : 'register',
        component: () => import(/* webpackChunkName: "register" */ '@/views/RegisterView.vue'),
        meta     : {
            guest: true,
        }
    },

    {
        path: '/login',
        name: 'login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "login" */ '@/views/LoginView.vue'),
        meta     : {
            guest: true,
        }
    },

    {
        path     : '/dashboard',
        name     : 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/DashboardView.vue'),
        meta     : {
            requiresAuth: true
        }
    },

    {
        path     : '/images',
        name     : 'images',
        component: () => import(/* webpackChunkName: "images" */ '@/views/images/Index.vue'),
        meta     : {
            requiresAuth: true
        }
    },

    {
        path     : '/images/create',
        name     : 'images.create',
        component: () => import(/* webpackChunkName: "image-create" */ '@/views/images/Create.vue'),
        meta     : {
            requiresAuth: true
        }
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes,
});


router.beforeEach(async (to, from, next) => {
    const store         = useAuthStore();
    const token         = localStorage.getItem('accessToken');
    let isAuthenticated = false;
    if (!isAuthenticated && token) {
        let TokenDetails     = parseJwtToken(JSON.parse(token));
        let tokenExpiredAt   = TokenDetails.exp;
        let CurrentTimestamp = parseInt(Date.now()) / 1000;
        if (tokenExpiredAt < CurrentTimestamp) {
            localStorage.removeItem('accessToken');
            router.push('/login');
        } else {
            axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(token)}`;
            store.getUser();
        }
    }

    isAuthenticated = store.isAuthenticated;

    // If route is restricted and user is not authenticated
    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        localStorage.removeItem('accessToken');
        next('/login');
    }

    // If route is not restricted and user is authenticated
    if (to.matched.some(record => record.meta.guest) && isAuthenticated) {
        next('/dashboard');
    }

    // If route is not restricted and user is not authenticated
    next();
})

export default router;
