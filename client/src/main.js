import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import './style.css';

import HomeView from './views/HomeView.vue';
import BookView from './views/BookView.vue';
import AboutView from './views/AboutView.vue';
import DriveView from './views/DriveView.vue';
import LoginView from './views/LoginView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView, meta: { title: 'PrimeRide — Ride in Style' } },
    { path: '/book', component: BookView, meta: { title: 'Book a Ride — PrimeRide' } },
    { path: '/about', component: AboutView, meta: { title: 'About Us — PrimeRide' } },
    { path: '/drive', component: DriveView, meta: { title: 'Drive with Us — PrimeRide' } },
    { path: '/login', component: LoginView, meta: { title: 'Sign In — PrimeRide' } }
  ],
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' };
  }
});

router.afterEach((to) => {
  document.title = to.meta.title || 'PrimeRide';
});

createApp(App).use(router).mount('#app');
