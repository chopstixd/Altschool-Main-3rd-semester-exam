import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RepositoryList from '../views/RepositoryList.vue';
import RepositoryDetails from '../views/RepositoryDetails.vue';
import Loader from '../views/Loader.vue';
const routes = [
  { path: '/', component: RepositoryList },
  { path: '/repo/:id/:name', name: 'repoDetails', component: RepositoryDetails },

  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  },
  


  
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
