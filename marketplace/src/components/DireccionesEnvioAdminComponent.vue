<template>
  <div id="base">
    <h3>Direcciones de envío</h3>
    <div class="text-right m-2">
      <b-button class="main-btn" variant="success" v-b-modal.modal>
        <img
          height="25"
          width="25"
          src="https://img.icons8.com/fluent/48/000000/map.png"
        />Nueva dirección de envío
      </b-button>
      <b-button class="main-btn" @click="exit()">
        <img
          height="25"
          width="25"
          src="https://img.icons8.com/flat-round/50/000000/back--v1.png"
        />Salir</b-button
      >
    </div>
    <b-table striped hover :items="direcciones" :fields="fields_direcciones">
      <template #cell(Acciones)="row">
        <!-- row para obtener datos de fila -->
        <b-button
          size="sm"
          variant="danger"
          @click="safeDelete(row.item.envio_id)">Eliminar
        </b-button>
      </template>
    </b-table>

    <b-modal id="modal" ref="modal" @hidden="refresh" @ok="save">
      <template slot="modal-header">
        <h3>Ingresa tu dirección de envío</h3>
      </template>
      <b-form @submit="save" @reset="refresh">
        <b-form-group id="input-taj" label="País" label-for="pais">
          <b-form-input
            id="pais"
            type="text"
            required
            v-model="pais"
            placeholder="Digita el nombr del país"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-text" label="Provicia" label-for="provincia">
          <b-form-input
            id="provincia"
            type="text"
            required
            v-model="provincia"
            placeholder="Digita el nombr de la provincia"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-text" label="Cantón" label-for="canton">
          <b-form-input
            id="canton"
            type="text"
            required
            placeholder="Digita el nombre del cantón"
            v-model="canton"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-text" label="Código postal" label-for="cod_post">
          <b-form-input
            id="cod_post"
            type="number"
            required
            v-model="cod_post"
            placeholder="Digita el código postal"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-text" label="Casillero" label-for="casillero">
          <b-form-input
            id="casillero"
            type="text"
            required
            v-model="casillero"
            placeholder="Digita nombre de casillero"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-text" label="Observaciones" label-for="observ">
          <b-form-textarea
            id="observ"
            type="text"
            required
            v-model="observ"
            placeholder="Digita las observaciones"
          ></b-form-textarea>
        </b-form-group>
      </b-form>
      <template slot="modal-footer" slot-scope="{ ok, cancel }">
        <b-button size="sm" variant="danger" @click="cancel()">Cancelar</b-button>
        <b-button size="sm" variant="success" @click="ok()">Guardar</b-button>
      </template>
    </b-modal>
  </div>
</template>


<script>
import axios from "axios";
import { main } from "../main.js";

export default {
  setup() {},

  name: "DireccionesEnvioAdminComponent",

  data: () => ({
    user_id: "",
    pais: '',
    provincia: '',
    canton: '',
    cod_post: '',
    casillero: '',
    observ: '',
    fields_direcciones: ["país", "provincia", "cantón", 'cod postal','casillero', "Acciones"],
    direcciones: [],
  }),

  mounted() {
    this.user_id = localStorage.getItem("userId");
    this.getDireccionesEnvio();
  },

  methods: {
    refresh() {
      this.pais = '',
      this.provincia = '',
      this.canton = '',
      this.cod_post = '',
      this.casillero = '',
      this.observ = '',
      this.direcciones = [];
      this.getDireccionesEnvio();
    },

    getDireccionesEnvio() {
      axios
        .get(
        process.env.VUE_APP_API_URL +"get_direcciones_envio_by_user_id/" + this.user_id)
        .then((response) => {
            this.direcciones = response.data;
        })
        .catch((error) => {
            this.proccessAxiosError(error);
        });
    },

    proccessAxiosError(error) {
      if (error.response) {
        if (error.response.status == 500 || error.response.status == 404) {
          this.$alertify.error(
            "Han surgido problemas para conectarse con el servidor. Inténtelo más tarde."
          );
        } else {
          this.$alertify.error(error.response.data);
        }
      } else {
        this.$alertify.error(
          "No se ha podido establecer conexión con el servidor."
        );
      }
    },

    exit() {
      this.$router.back();
    },

    safeDelete(id) {
      self = this;
      this.$alertify.confirm('¿Desea eliminar esta dirección de envio?',
        function(){
          self.delete(id);
        },
        function(){}
      );
    },

    save() {
      let data = {usuario_id: this.user_id,
        direcciion_pais: this.pais,
        direccion_provincia: this.provincia,
        direccion_canton: this.canton,
        envio_cod_postal: this.cod_post,
        envio_casillero: this.casillero,
        envio_observaciones: this.observ
      }
      this.insert(data);
      this.refresh();
    },

    delete(id){
      axios
        .put(process.env.VUE_APP_API_URL + "/hide_direccion_envio_by_id", {envio_id: id})
        .then((response) => {
          this.$alertify.success(response.data);
          this.refresh();
        })
        .catch((error) => {
          this.proccessAxiosError(error);
        }); 
    },


    insert(json) {
       axios
         .post(process.env.VUE_APP_API_URL + "/create_direccion_envio", json)
         .then((response) => {
           this.$alertify.success(response.data);
         })
         .catch((error) => {
           this.proccessAxiosError(error);
         });
    },
  },
};
</script>

<style scoped>
.main-btn {
  margin-right: 20px;
}
</style>