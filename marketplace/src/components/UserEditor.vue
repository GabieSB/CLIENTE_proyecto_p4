<template>
  <div class="container-fluid">
    <h1>Datos de usario</h1>
    <form class="row" v-on:submit.prevent='saveData'>
      <div class="col-sm-6" style="background-color: #f5f5f5">
        <div>
          <label class="inputLabel" for="cedula"
            >Cédula física o juridica</label
          >
        </div>
        <input
          id="cedula"
          type="text"
          placeholder="Ingresa tu cédula física o jurídica"
          required
          v-model="cedula"
          maxlength="64"
        />

        <div>
          <label class="inputLabel" for="nombreCompleto"
            >Nombre completo o de tu tienda</label
          >
        </div>
        <input
          id="nombreCompleto"
          type="text"
          placeholder="Ingresa tu nombre o el de tu tienda"
          required
          v-model="nombreCompleto"
          maxlength="128"
        />

        <div>
          <label class="inputLabel" for="correo">Correo electrónico</label>
        </div>
        <input
          id="correo"
          type="text"
          placeholder="Ingresa tu nombre o el de tu tienda"
          required
          v-model="email"
          maxlength="32"
        />

        <div><label class="inputLabel" for="telefono">Teléfono</label></div>
        <input
          id="telefono"
          type="text"
          placeholder="Ingresa tu nombre o el de tu tienda"
          required
          v-model="telefono"
          maxlength="16"
        />
      </div>
      <div class="col-sm-4" style="background-color: #f5f5f5">
        <div>
          <label class="inputLabel" for="usuario">Nombre de usuario</label>
        </div>
        <input
          id="usuario"
          type="text"
          placeholder="Ingresa una contraseña segura"
          required
          v-model="usuario"
          maxlength="32"
        />

        <div><label class="inputLabel" for="password">Contraseña</label></div>
        <input
          class="passwordInput"
          id="password"
          type="password"
          placeholder="Ingresa una contraseña segura"
          required
          v-model="password"
          maxlength="24"
        />
        <div><label class="inputLabel">Dirección</label></div>
        <div class="form-row" style="background-color: #f5f5f5">
          <input
            maxlength="32"
            class="sr-only"
            id="pais"
            type="text"
            placeholder="País"
            required
            v-model="pais"
          />
          <input
            maxlength="32"
            id="provincia"
            type="text"
            placeholder="Provincia"
            required
            v-model="provincia"
          />
          <input
            maxlength="32"
            id="canton"
            type="text"
            placeholder="Cantón"
            required
            v-model="canton"
          />
        </div>
      </div>
      <div class="col-sm-2" style="background-color: #f5f5f5">
        <div id="tipe_select">
          <h4>Tipo de usuario</h4>
          <label class="r_type" for="tienda">Tienda</label>
          <input
            name="type"
            id="tienda"
            type="radio"
            value="T"
            required
            v-model="tipoUsario"
          />

          <label class="r_type" for="cliente">Cliente</label>
          <input
            name="type"
            id="cliente"
            type="radio"
            value="C"
            required
            v-model="tipoUsario"
          />
        </div>
      </div>
      <div class="form-group" style="background-color: #f5f5f5">
        <button class="btn act_btn btn-success btn-lg" type="submit">
          Siguiente
        </button>
      </div>
    </form>
  </div>
</template>


<script>
import axios from "axios";
import {main} from '../main.js'

export default {
  setup() {},

  name: "UserEditor",

  data: () => ({
    usuario: "",
    password: "",
    nombreCompleto: "",
    cedula: "",
    email: "",
    telefono: "",
    pais: "",
    provincia: "",
    canton: "",
    tipoUsario: "",
  }),

  methods: {
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
          this.$router.push('/');
          this.$alertify.success(response.data);
        })
        .catch((error) => {
          this.proccessAxiosError(error);
        });
    },

    saveData() {
      main.AppContext['userData'] = this.buildFormData();
      if(this.tipoUsario == 'T'){
        this.$router.push('crudTienda');
      }else{
        this.$router.push('crudComprador');
      }
      
    },

    buildFormData() {
      return {
        usuario_nom_urs: this.usuario,
        usuario_contrasena: this.password,
        usuario_email: this.email,
        usuario_telefono: this.telefono,
        usuario_cedula: this.cedula,
        usuario_nombre_compl: this.nombreCompleto,
        usuario_tipo: this.tipoUsario,
        direcciion_pais: this.pais,
        direccion_provincia: this.provincia,
        direccion_canton: this.canton,
      };
    },
  },
};
</script>


<style scoped>
.container-fluid {
  padding-left: 50px;
  padding-right: 50px;
}

.row {
  padding-top: 50px;
}

.inputLabel {
  padding-top: 25px;
  font-weight: bold;
}

input {
  border-bottom-color: #b0bec5;
  background: white;
}

.passwordInput {
  background: white;
  border: none;
  border-radius: 3px;
  height: 55px;
  width: 85%;
  border-bottom: #bdbdbd 2px solid;
  margin-top: 1%;
  margin-left: 1%;
}

.passwordInput:focus {
  border-bottom: #8bc34a 2px solid;
}

#tipe_select {
  position: relative;
  margin-left: 1%;
  padding-left: 5px;
  background: #90caf9;
  border-radius: 4px;
  height: 80px;
  top: 40%;
  -webkit-box-shadow: -2px 3px 28px -8px rgba(77, 169, 240, 1);
  -moz-box-shadow: -2px 3px 28px -8px rgba(77, 169, 240, 1);
  box-shadow: -2px 3px 28px -8px rgba(77, 169, 240, 1);
}

.r_type {
  margin-left: 10px;
}

.col-sm-12 {
  padding-top: 25px;
}

.act_btn {
  position: relative;
  margin: 25px;
  left: 40%;
}

</style>
