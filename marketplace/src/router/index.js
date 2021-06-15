import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Dashboard from '../views/DashboardTienda.vue'
import ProductosCRUD from '../views/ProductosCRUD.vue'

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
    path: '/productosCRUD',
    name: 'ProductosCRUD', 

    component: () => import(/* webpackChunkName: "ProductosCRUD" */ '../views/ProductosCRUD.vue')
  },
  {
    path: '/tiendas',
    name: 'Tiendas', 
    component: () => import(/* webpackChunkName: "DashboardComprador" */ '../views/Tiendas.vue')
  },
  {
    path: '/productosDescripcion',
    name:'ProductosDescripcion',
    component: () => import(/* webpackChunkName: "DashboardComprador" */ '../views/ProductosDescripcion.vue')

  },
  {
    path: '/inventarioProductos',
    name:'InventarioProductos',
    component: () => import(/* webpackChunkName: "DashboardComprador" */ '../views/InventarioProductos.vue')

  },
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
