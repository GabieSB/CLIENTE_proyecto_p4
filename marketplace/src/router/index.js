import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Dashboard from '../views/DashboardTienda.vue'


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: '/dashboardTienda',
    name: 'DashboardTienda', 


    component: () => import(/* webpackChunkName: "DashboardTienda" */ '../views/DashboardTienda.vue')
  },
  {
    path: '/dashboardComprador',
    name: 'DashboardComprador', 


    component: () => import(/* webpackChunkName: "DashboardComprador" */ '../views/DashboardComprador.vue')
  },
  {
    path: '/crudUsuario',
    name: 'CrudUsuario',
    props:true,


    component: () => import('../views/CrudUsuario.vue')
  },
  {
    path: '/crudTienda',
    name: 'CrudTienda',
    props:true,


    component: () => import('../views/CrudTienda.vue')
  },
  {
    path: '/crudComprador',
    name: 'CrudComprador',
    props:true,


    component: () => import('../views/CrudComprador.vue')
  }
 
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
