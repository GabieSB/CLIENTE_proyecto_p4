<template>
  <div class="container-fluid">
    <h1>Datos de cliente</h1>
    <form class="row" v-on:submit.prevent="saveData">
      <div class="col-sm-8" style="background-color: #f5f5f5">
        <div class="desc_form" style="background-color: #f5f5f5">
          <div>
            <label class="inputLabel" for="cod_postal">Código postal</label>
          </div>
          <input
            id="cod_postal"
            type="text"
            placeholder="Digita aquí tu código postal"
            v-model="codigoPostal"
          />

          <div><label class="inputLabel" for="casillero">Casillero</label></div>
          <input
            id="casillero"
            type="text"
            placeholder="Digita aquí tu asillero"
            v-model="casillero"
          />

          <div>
            <label class="inputLabel" for="observaciones">Detalles</label>
          </div>
          <b-textarea
            id="observaciones"
            type="text"
            placeholder="Detalles adicionales de tu dirección"
            maxlength="512"
            v-model="observaciones"
          ></b-textarea>

          <b-button class="submit-btn btn-success" type="submit"
            >Finzalizar y guardar</b-button
          >
        </div>
      </div>
      <div class="col-sm-4" style="background-color: #f5f5f5">
        <img
          class="profile-pic"
          src="https://xn--diseoscreativos-1qb.com/wp-content/uploads/2018/06/Imagenes-de-gatos-www.dise%C3%B1oscreativos.com-portada-3-1.jpg"
          alt="foto de perfil"
        />
        <input id="picSelector" type="file" accept=".png, .jpg, .jpge" v-on:change="chargeProfilePic"/>
      </div>
    </form>
  </div>
</template>


<script>
import axios from "axios";
import { main } from "../main.js";

export default {
  setup() {},

  name: "DatosCliente",

  data: () => ({
    codigoPostal: "",
    casillero: "",
    observaciones: "",
    fotoPerfil: null,
  }),

  methods: {
    buildUserData() {
      let lastData = main.AppContext["userData"];
      lastData["envio_cod_postal"] = this.codigoPostal;
      lastData["envio_casillero"] = this.casillero;
      lastData["envio_observaciones"] = this.observaciones;
      return lastData;
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

    insertData(formData) {
      axios
        .post(
          process.env.VUE_APP_API_URL + "/create_usuario",
          JSON.stringify(formData)
        )
        .then((response) => {
          this.$router.push("/");
          this.$alertify.success(response.data);
          main.AppContext['userData'] = undefined;           //Se limpia entrada de datos "userData" del AppContext
        })
        .catch((error) => {
          this.proccessAxiosError(error);
        });
    },

    saveData() {
      let allData = this.buildUserData();
      this.insertData(allData);
    },

    chargeProfilePic(){

    }
  },
};
</script>


<style scoped>
.container-fluid {
  padding: 50px;
}

.desc_form {
  padding: 50px;
}

input {
  border-bottom-color: #b0bec5;
  background: white;
}

.profile-pic {
  position: relative;
  border-radius: 100px;
  height: 150px;
  width: 150px;
  top: 25%;
  left: 33%;
}

#picSelector {
  position: relative;
  top: 45%;
  width: 70%;
}

.submit-btn {
  margin-top: 50px;
}

.inputLabel {
  padding-top: 25px;
  font-weight: bold;
}
</style>