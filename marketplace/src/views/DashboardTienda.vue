<template>
  <div>
    <HeaderTienda></HeaderTienda>
    <SidebarComponent></SidebarComponent>

    <div class="container-fluid">
      <div class="row encabezado">
        <h1>Bienvenido: {{ this.nombreTienda }}</h1>
        <div class="info">
          <span><b>Usted tiene: </b></span>
          <span> ❤ {{subscripciones}} subscriptores </span>
          <span> 👎 {{denuncias}} denuncias  </span>
           <span>  Calificación :  {{calificacion}} ⭐</span>

          <span class="baneo" v-if="denuncias > 10"> <b>Su tienda fue baneada por tener más de 10 denuncias, los usuarios no podran ver más su tienda.</b>  </span>
        </div>
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
          img-src="https://www.iconbunny.com/icons/media/catalog/product/3/1/3142.9-files-drawer-icon-iconbunny.jpg"
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
          img-src="https://www.iconbunny.com/icons/media/catalog/product/1/5/1543.9-clients-icon-iconbunny.jpg"
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
          img-src="https://www.iconbunny.com/icons/media/catalog/product/1/6/169.9-single-message-bubble-icon-iconbunny.jpg"
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
          img-src="https://www.iconbunny.com/icons/media/catalog/product/6/0/605.9-sales-icon-iconbunny.jpg"
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
import HeaderTienda from "@/components/HeaderTienda.vue";
import ModalSeleccionarFechas from "@/components/ModalSeleccionarFechas.vue";
import SidebarComponent from "@/components/SidebarComponent.vue";

import axios from "axios";

export default {
  name: "Dashboard",
  components: {
    HeaderTienda,
    ModalSeleccionarFechas,
    SidebarComponent,
  },
  data: () => ({
    nombreTienda: "",
    name: "",
    nameState: "",
    showModal: false,
    tienda_id: "",
    denuncias: "",
    subscripciones: "",
    calificacion: "",
  }),
  mounted() {
    
    this.getDataTienda();
    this.getDenuncias()
    this.getSubscripciones()
    this.getCalificacionTienda()
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
    //se obtiene la información de la tienda usando el id_user que fue almacenado en locar storage al iniciar sesión
    getDataTienda() {
      const id_user = localStorage.getItem("id_user");

      axios
        .get(process.env.VUE_APP_API_URL + "getTiendaByUserId/" + id_user)
        .then((response) => {
          if (response.statusText == "OK") {
            localStorage.setItem("id_tienda", response.data.tienda_id);
            console.log(response.data.tienda_id)
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
    //obtiene la cantidad de denuncias de la tienda 
     getDenuncias() {
       console.log(process.env.VUE_APP_API_URL + "get_denuncias_by_id/" +  localStorage.getItem("id_tienda"))
        axios
        .get(process.env.VUE_APP_API_URL + "get_denuncias_by_id/" +  localStorage.getItem("id_tienda"))
        .then((response) => {
          this.denuncias = response.data[0]
          
        })
        .catch((error) => {
          
          this.$alertify.error(error.response.data);
        });

    },
     getCalificacionTienda() {
       console.log(process.env.VUE_APP_API_URL + "get_calificacion_by_tienda_id/" +  localStorage.getItem("id_tienda"))
        axios
        .get(process.env.VUE_APP_API_URL + "get_calificacion_by_tienda_id/" +  localStorage.getItem("id_tienda"))
        .then((response) => {
          this.calificacion = response.data 
          console.log(this.calificacion)
          
        })
        .catch((error) => {
          
          this.$alertify.error(error.response.data);
        });

    },
    //obtiene la cantidad subscripciones de la tienda 
    getSubscripciones() {
      var url =
        process.env.VUE_APP_API_URL +
        "get_subscripciones_by_id/" +
         localStorage.getItem("id_tienda")
        console.log(url)
      axios
        .get(url)
        .then((response) => {
          this.subscripciones = response.data.length
        })
        .catch((error) => {});
    },
  },
};
</script>

<style scoped>
.encabezado{
  border: solid 2px rgb(5, 155, 255);
  margin:  10px 0;
  border-radius: 15px;
  padding: 5px;
}
.info{
  display: flex;
  flex-direction: column;
  margin-left:10px ;
}
.baneo{
  color: red;

}

</style>