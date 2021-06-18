<template>
  <div>
    <Header></Header>
    <SidebarComponent></SidebarComponent>

    <div class="container-fluid">
      <div class="row">
        <h1>Bienvenido: {{ this.nombreTienda }}</h1>
      </div>
      <div class="row m-5">
        <b-card
          img-src="https://booster.io/wp-content/uploads/product-add-to-cart-e1438362099361.png"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem"
          class="m-2"
        >
          <b-button href="#" @click.prevent="goTienda" variant="primary"
            >Agregar Producto</b-button
          >
        </b-card>

          <b-card
          img-src="https://booster.io/wp-content/uploads/product-add-to-cart-e1438362099361.png"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem"
          class="m-2"
        >
          <b-button href="#" @click.prevent="goInventario" variant="primary"
            >Ver Productos</b-button
          >
        </b-card>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import SidebarComponent from "@/components/SidebarComponent.vue";

import axios from "axios";
export default {
  name: "Dashboard",
  components: {
    Header,
    SidebarComponent,
  },
  data: () => ({
    nombreTienda: "",
  }),
  mounted() {
    this.getDataTienda();
  },
  methods: {
    goTienda() {
      this.$router.push("productosCRUD");
    },
    goInventario(){
      this.$router.push('inventarioProductos');
    },
    getDataTienda() {
      const id_user = localStorage.getItem("id_user");

      axios
        .get(process.env.VUE_APP_API_URL + "getTiendaByUserId/" + id_user)
        .then((response) => {
          if (response.statusText == "OK") {
            localStorage.setItem("id_tienda", response.data.tienda_id); //aqui iria guardado el token, si tuvieramos una papa de Timmy.jpg
            this.nombreTienda = response.data.usuario_nombre_completo;
            console.log(
              "Se ha obtenido los datos de la tienda ID: " +
                localStorage.getItem("id_tienda")
            );
          }
        })
        .catch((error) => {
          if (error.response.status == 500 || error.response.status == 404) {
            this.$alertify.error(
              "Han surgido problemas para conectarse con el servidor. Inténtelo más tarde."
            );
          } else {
            this.$alertify.error(error.response.data);
          }
        });
    },
  },
};
</script>
