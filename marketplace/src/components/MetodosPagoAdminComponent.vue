<template>
  <div id="base">
    <h3>Métodos de pago</h3>
    <div class="text-right m-2">
      <b-button class="main-btn" variant="success" v-b-modal.modal>
        <img
          height="25"
          width="25"
          src="https://img.icons8.com/dusk/64/000000/bank-card-back-side.png"
        />Nuevo Método de pago
      </b-button>
      <b-button class="main-btn" @click="exit()">
        <img
          height="25"
          width="25"
          src="https://img.icons8.com/flat-round/50/000000/back--v1.png"
        />Salir</b-button
      >
    </div>
    <b-table striped hover :items="metodos" :fields="fields_metodos">
      <template #cell(Acciones)="row">
        <!-- row para obtener datos de fila -->
        <b-button
          size="sm"
          variant="danger"
          @click="safeDelete(row.item.pago_id)">Eliminar
        </b-button>
      </template>
    </b-table>

    <b-modal id="modal" ref="modal" @hidden="refresh" @ok="save">
      <template slot="modal-header">
        <h3>Ingresa tu método de pago</h3>
      </template>
      <b-form @submit="save" @reset="refresh">
        <b-form-group id="input-taj" label="Número de tarjeta" label-for="numTarj">
          <b-form-input
            min="0"
            id="numTarj"
            type="number"
            required
            v-model="tarjeta"
            placeholder="Número que aparece al frente de su tarjeta"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-text" label="Nombre" label-for="nombre">
          <b-form-input
            id="nombre"
            type="text"
            required
            placeholder="Dueño de tarjeta"
            v-model="nombre"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-text" label="CVV" label-for="cvv">
          <b-form-input
            min="0"
            id="cvv"
            type="number"
            required
            v-model="cvv"
            placeholder="Código al dorso de su tarjeta"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-text" label="Vencimiento" label-for="vence">
          <b-form-input
            id="vence"
            type="date"
            required
            v-model="vencimiento"
            placeholder="Fecha de vencimiento"
          ></b-form-input>
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

  name: "MetodosPagoAdminComponent",

  data: () => ({
    user_id: "",
    vencimiento: "",
    nombre: "",
    cvv: "",
    tarjeta: "",
    fields_metodos: ["tarjeta", "propietario", "vencimiento", "Acciones"],
    metodos: [],
  }),

  mounted() {
    this.user_id = localStorage.getItem("userId");
    this.getMetodosPago();
  },

  methods: {
    refresh() {
      this.metodos = [];
      this.vencimiento = '';
      this.tarjeta = '';
      this.nombre = '';
      this.cvv = '';
      this.getMetodosPago();
    },
    getMetodosPago() {
      axios
        .get(
          process.env.VUE_APP_API_URL +
            "get_formas_pago_by_user_id/" +
            this.user_id
        )
        .then((response) => {
          this.metodos = response.data;
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
      this.$alertify.confirm('¿Desea eliminar esta forma de pago?',
        function(){
          self.delete(id);
        },
        function(){}
      );
    },

    save() {
      let data = {usuario_id: this.user_id,
          pago_nomb_duenno: this.nombre,
          pago_numero_tarjeta: this.tarjeta,
          pago_cvv: this.cvv,
          pago_vencimiento: this.vencimiento
        }
       this.insert(data);
       this.refresh();
    },

    delete(id){
      axios
        .put(process.env.VUE_APP_API_URL + "/hide_forma_pago_by_id", {pago_id: id})
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
        .post(process.env.VUE_APP_API_URL + "/create_forma_pago", json)
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
