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
          <b-button href="#" @click.prevent="goInventario" variant="primary"
            >Ver Productos</b-button
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
          <b-button v-b-modal.modal-prevent-closing variant="primary"
            >Agregar Categoría</b-button
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
          <b-button @click="goSubscripciones" variant="primary"
            >Subscripciones</b-button
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
          <b-button @click="goComentarios" variant="primary"
            >Comentarios</b-button
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
          <b-button @click="goReporteVentas" variant="primary"
            >Reporte Ventas</b-button
          >
        </b-card>
        <b-modal
          id="modal-prevent-closing"
          ref="modal"
          title="Agregar Categoría"
          @show="resetModal"
          @hidden="resetModal"
          @ok="handleOk"
        >
          <form ref="form" @submit.stop.prevent="handleSubmit">
            <b-form-group
              label="Nombre de categoría:"
              label-for="name-input"
              invalid-feedback="Name is required"
              :state="nameState"
            >
              <b-form-input
                id="name-input"
                v-model="name"
                :state="nameState"
                required
              ></b-form-input>
            </b-form-group>
          </form>
        </b-modal>
       
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import ModalSeleccionarFechas from "@/components/ModalSeleccionarFechas.vue";
import SidebarComponent from "@/components/SidebarComponent.vue";

import axios from "axios";

export default {
  name: "Dashboard",
  components: {
    Header,
    ModalSeleccionarFechas,
    SidebarComponent,
  },
  data: () => ({
    nombreTienda: "",
    name: "",
    nameState: "",
    showModal: false,
  }),
  mounted() {
    this.getDataTienda();
    localStorage.setItem("id_producto_edit", null);
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
    resetModal() {
      this.name = "";
      this.nameState = null;
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();

      this.handleSubmit();
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {
        return;
      }

      this.createCategoria();

      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    },
    createCategoria() {
      axios
        .post(
          process.env.VUE_APP_API_URL + "create_categoria",
          JSON.stringify(this.name)
        )
        .then((response) => {
          this.$alertify.success(response.data);
        })
        .catch((error) => {
          this.$alertify.error(`Ocurrió un problema al insertar. ${error}`);
        });
    },
    goTienda() {
      this.$router.push("productosCRUD");
    },
    goInventario() {
      this.$router.push("inventarioProductos");
    },
    goSubscripciones() {
      this.$router.push("subscripciones");
    },
    goComentarios() {
      this.$router.push("comentarios");
    },
    goReporteVentas() {
      let routeUrl = this.$router.resolve({
          path: "/reporte-ventas",
     });
     localStorage.setItem("tienda_nombre", this.nombreTienda)
     window.open(routeUrl .href, '_blank');
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
