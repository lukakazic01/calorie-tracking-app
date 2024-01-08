import {createRouter, createWebHistory, type NavigationFailure} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from "@/views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";
import DailiyIntakesView from "@/views/DailiyIntakesView.vue";
import ReportView from "@/views/admin/ReportView.vue";
import AdminView from "@/views/admin/AdminView.vue";
import {useUserStore} from "@/stores/user";
import NotAuthorizedView from "@/views/NotAuthorizedView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/notAuthorized',
      name: 'notAuthorized',
      component: NotAuthorizedView
    },
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
      beforeEnter: async (): Promise<boolean | NavigationFailure | void> => {
        if(useUserStore().role === 'admin') {
          return true
        } else {
          return await router.push('/notAuthorized')

        }
      },
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
