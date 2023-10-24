import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue'
import ConferenceDetail from '../components/ConferenceDetail.vue';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/conference/:id',
    name: 'ConferenceDetail',
    component: ConferenceDetail,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;