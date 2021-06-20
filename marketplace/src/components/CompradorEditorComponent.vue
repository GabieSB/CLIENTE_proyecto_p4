<template>
    <form class="container-fluid" v-on:submit.prevent="saveChanges">
    <h1 class="main-tittle">
      Tus datos generales
      <div class="main-button-container">
        <b-button class="action-buttons" variant="success" type="submit">Guardar cambios</b-button>
        <b-button class="action-buttons" @click="exit()">Cancelar</b-button>
        <b-button class="action-buttons" variant="danger">Eliminar mi cuenta</b-button>
      </div>
    </h1>
    <div class="row" v-on:submit.prevent="saveData">
      <div class="col-sm-7" style="background-color: #f5f5f5">
        <div>
          <label class="inputLabel" for="cedula"
            >Número de cédula</label
          >
        </div>
        <input
          id="cedula"
          class="form-control input-sm"
          type="text"
          placeholder="Ingresa la cédula jurídica de ti tienda"
          required
          v-model="cedula"
          maxlength="64"
        />

        <div>
          <label class="inputLabel" for="nombreCompleto"
            >Nombre comleto</label
          >
        </div>
        <input
          id="nombreCompleto"
          type="text"
          placeholder="Ingresael de tu tienda"
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
          placeholder="Ingresa el correo electrónico de tu tienda"
          required
          v-model="email"
          maxlength="32"
        />

        <div><label class="inputLabel" for="telefono">Teléfono</label></div>
        <input
          id="telefono"
          type="text"
          placeholder="Ingresa el teléfono tu tienda"
          required
          v-model="telefono"
          maxlength="16"
        />

        <div>
          <label class="inputLabel" for="usuario">Nombre de usuario</label>
        </div>
        <input
          id="usuario"
          type="text"
          placeholder="Ingresa aquí el nombre de usuario"
          required
          v-model="usuario"
          maxlength="32"
        />

        <div>
          <label class="inputLabel" for="password"
            >Cambiar contraseña
            <input
              ref="passwCKB"
              type="checkbox"
              checked
              @change="changePasswState()"
            />
          </label>
        </div>
        <input
          class="passwordInput"
          ref="passwordInput"
          id="password"
          type="password"
          placeholder="Ingresa una contraseña segura"
          required
          v-model="password"
          maxlength="24"
        />
      </div>
      
      <div class="col-sm-5" style="background-color: #f5f5f5">
        <div class="sub-group">
          <h4>Foto de perfil</h4>
          <img class="profile-pic" ref="profPic" alt="foto de perfil" />
          <input
            id="picSelector"
            type="file"
            accept=".png, .jpg, .jpge"
            v-on:change="chargeProfilePic"
            ref="profilePic"
          />
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import axios from "axios";
import { main } from "../main.js";

export default {
  setup() {},

  name: "CompradorEditorComponent",

  mounted() {
    this.getEditionData(localStorage.getItem("userId"));
  },

  data: () => ({
    usuario_id: "",
    usuario: "",
    password: "",
    nombreCompleto: "",
    cedula: "",
    email: "",
    telefono: "",
    nombreFoto: "",
    fotoPerfil: undefined,
  }),

  methods: {
    getEditionData(id) {
      axios
        .get(process.env.VUE_APP_API_URL + "get_userdata_by_id/" + id)
        .then((response) => {
          let userData = response.data;
          this.$refs.profPic.src =
            process.env.VUE_APP_API_URL +
            "/get_foto/profiles/" +
            userData["usuario_foto"];
          this.deployEditableData(userData);
        })
        .catch((error) => {
          this.proccessAxiosError(error);
        });
    },

    deployEditableData(responseData) {
      this.usuario_id = responseData['usuario_id'];
      this.email = responseData["usuario_email"];
      this.telefono = responseData["usuario_telefono"];
      this.cedula = responseData["usuario_cedula"];
      this.usuario = responseData["nombre_usuario"];
      this.nombreCompleto = responseData["usuario_nombre_compl"];
      this.tipoUsario = responseData["usuario_tipo"];
      this.nombreFoto = responseData["usuario_foto"];
      this.usuario = responseData["usuario_nom_usr"];
    },

    saveChanges() {
      let form = new FormData();
      form.append("string_data", JSON.stringify(this.buildTiendaData()));
      form.append("file", this.fotoPerfil ? this.fotoPerfil : null);
      this.updateData(form);
    },

    updateData(formData) {
      axios
        .put(process.env.VUE_APP_API_URL + "/edit_comprador", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.exit();
          this.$alertify.success(response.data);
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

    buildTiendaData() {
      let chagPassw = this.$refs.passwCKB.checked;
      return {
        usuario_id: this.usuario_id, usuario_email: this.email,
        usuario_telefono: this.telefono, usuario_cedula: this.cedula,
        usuario_nom_usr: this.usuario, usuario_nombre_compl: this.nombreCompleto,
        usuario_tipo: this.tipoUsario, usuario_foto: this.nombreFoto,
        usuario_contrasenna: chagPassw ? this.$refs.passwordInput.value : null,
      };
    },

    chargeProfilePic() {
      this.fotoPerfil = this.$refs.profilePic.files[0];
    },

    changePasswState() {
      this.$refs.passwordInput.disabled = !this.$refs.passwCKB.checked;
      if (this.$refs.passwCKB.checked == true) {
        this.$refs.passwordInput.value = "";
      }
    },

    exit() {
      localStorage.removeItem("userId");
      this.$router.back();
    },
  },
};
</script>
<style scoped>

.container-fluid {
  padding-left: 50px;
  padding-right: 50px;
}

.inputLabel {
  padding-top: 25px;
  font-weight: bold;
}

input {
  border-bottom-color: #546e7a;
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

.passwordInput:disabled {
  border-bottom: #8bc34a 2px solid;
  background: #546e7a50;
}

.sub-group {
  color: #fff;
  padding-left: 10%;
  margin-top: 25px;
  padding-bottom: 10px;
  border-radius: 5px;
  background-color: #455a64;
  transform: translateY(75%);
}

.profile-pic {
  position: relative;
  border-radius: 100px;
  height: 150px;
  width: 150px;
  top: 25%;
  left: 33%;
}

.action-buttons {
  margin-left: 10px;
}

.main-button-container {
  transform: translateX(60%);
}

.main-tittle {
  width: 100%;
}
</style>