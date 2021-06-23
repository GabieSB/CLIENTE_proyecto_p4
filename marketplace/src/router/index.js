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
  },
 
  {
    path: '/inventarioProductos',
    name:'InventarioProductos',
    component: () => import(/* webpackChunkName: "DashboardComprador" */ '../views/InventarioProductos.vue')

  },
  {
    path: '/compraCrud',
    name:'CompraCrud',
    component: () => import(/* webpackChunkName: "DashboardComprador" */ '../views/CompraCrud.vue')

  },
  {
  path: '/preguntaCrud',
  name:'PreguntaCrud',
  component: () => import(/* webpackChunkName: "DashboardComprador" */ '../views/PreguntaCrud')

  },
  {
    path: '/subscripciones',
    name: 'subscripciones',
    component: () => import('../views/Subscripciones.vue')
  },
  {
    path: '/comprador/:id',
    name: 'perfilPublico',
    component: () => import('../views/PerfilPublico.vue')
  },
  {
    path: '/comentarios/',
    name: 'comentarios',
    component: () => import('../views/Comentarios.vue')
  },
  {
    path: '/reporte-ventas/',
    name: 'reporteVentas',
    component: () => import('../views/ReporteVentas.vue')
  },
  {
    path: '/reporte-compras/',
    name: 'reporteCompras',
    component: () => import('../views/ReporteCompras.vue')
  },
  {
    path: '/reporte-subscripciones/',
    name: 'reporteSubscripciones',
    component: () => import('../views/ReporteSubscripciones.vue')
  },
  

  
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
