import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store";
import Signup from '../views/Auth/Signup.vue'
import Login from '../views/Auth/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import("../views/Home/Index.vue"),
    meta: {requiresAuth: true}
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { guest: true },
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
    meta: { guest: true },
  },
  {
    path: '/account',
    name: 'account',
    component: ()=> import("../views/Account/Index.vue"),
    meta: {requiresAuth: true}
  },
  {
    path: '/trainings',
    name: 'Trainings',
    component: () => import("../views/Trainings/Index.vue"),
    meta: {requiresAuth: true}
  },
  {
    path: '/messenger',
    name: 'Messenger',
    component: () => import("../views/Messenger/Index.vue"),
    meta: {requiresAuth: true}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.guest)) {
    if (store.getters.isAuthenticated) {
      next("/home");
      return;
    }
    next();
  } else {
    next();
  }
});

export default router
