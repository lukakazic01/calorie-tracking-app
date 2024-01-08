import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from "@/views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";
import DailiyIntakesView from "@/views/DailiyIntakesView.vue";
import ReportView from "@/views/admin/ReportView.vue";
import AdminView from "@/views/admin/AdminView.vue";
import {useUserStore} from "@/stores/user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/intakes',
      name: 'intakes',
      component: DailiyIntakesView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      beforeEnter: (): boolean => useUserStore().role === 'admin',
      children: [
        {
          path: 'report',
          name: 'report',
          component: ReportView
        }
      ]
    }
  ]
})

export default router
