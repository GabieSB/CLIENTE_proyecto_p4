<template>
  <div class="container-fluid">
    <h1>Datos adicionales de la tienda</h1>
    <form class="row" v-on:submit.prevent="saveData">
      <div class="col-sm-8" style="background-color: #f5f5f5">
        <div class="desc_form" style="background-color: #f5f5f5">
          <label class="inputLabel" for="descripcion">Descripción</label>
          <b-textarea
            name="descripcion"
            id="descripc1ion"
            cols="30"
            rows="20"
            maxlength="512"
            placeholder="Ingresa aqui observaciones o detalles sobre tu tienda"
            v-model="detalles"
          ></b-textarea>
          <b-button class="submit-btn btn-success" type="submit"
            >Finzalizar y guardar</b-button
          >
        </div>
      </div>
      <div class="col-sm-4" style="background-color: #f5f5f5">
        <img
          class="profile-pic"
          alt="foto de perfil"
          ref="profPic"
        />
        <input
          id="picSelector"
          type="file"
          accept=".png, .jpg, .jpge"
          v-on:change="chargeProfilePic"
          ref="profilePic"
        />
      </div>
    </form>
  </div>
</template>


<script>
import axios from "axios";
import { main } from "../main.js";

export default {
  setup() {},

  name: "TiendaCreatorComponent",
  props: ["items"],

  data: () => ({
    detalles: "",
    fotoPerfil: undefined,
  }),

  mounted(){
    this.$refs.profPic.src = process.env.VUE_APP_API_URL + "/get_foto/profiles/unknow.jpg"
  },

  methods: {
    buildUserData() {
      let lastData = JSON.parse(localStorage.getItem('userData'));
      lastData["tienda_descripcion"] = this.detalles;
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
        .post(process.env.VUE_APP_API_URL + "/create_usuario", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.$router.push("/");
          this.$alertify.success(response.data);
          localStorage.removeItem('userData');
        })
        .catch((error) => {
          this.proccessAxiosError(error);
        });
    },

    saveData() {
      let form = new FormData();
      form.append("string_data", JSON.stringify(this.buildUserData()));
      form.append("file", this.fotoPerfil ? this.fotoPerfil : null);
      this.insertData(form);
    },

    chargeProfilePic() {
      this.fotoPerfil = this.$refs.profilePic.files[0];
      this.showPreview(this.fotoPerfil);
    },

    showPreview(file) {
      if (file) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        let self = this;
        fileReader.addEventListener("load", function () {
          self.$refs.profPic.src = this.result;
        });    
      }
    },
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