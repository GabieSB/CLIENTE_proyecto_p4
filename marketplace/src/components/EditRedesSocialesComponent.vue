<template>
  <b-modal id="modal" ref="modal" @hidden='clear' @ok="save">
    <h4>Redes sociales</h4>
    <b-form-group label="Facebook">
      <input type="text" placeholder="Facebook" v-model="text_facebook" />
    </b-form-group>
    <b-form-group label="Instagram">
      <input type="text" placeholder="Instagram" v-model="text_instagram" />
    </b-form-group>
  </b-modal>
</template>

<script>
import axios from "axios";

export default {
  setup() {},

  name: "EditRedesSocialesComponent",

  data: () => ({
    text_facebook: "",
    text_instagram: "",
    facebook: {},
    instagram: {},
  }),

  methods: {
    save() {
      let data = [];
      if (this.text_facebook.trim() != "") {
        this.facebook["red_direccion"] = this.text_facebook;
        this.facebook["red_nombre"] = "Facebook";
      }
      if (this.text_instagram.trim() != "") {
        this.instagram["red_direccion"] = this.text_instagram;
        this.instagram["red_nombre"] = "Instagram";
      }

      data.push(this.facebook);
      data.push(this.instagram);
      this.send(data);
    },

    send(data) {
      let json = {
        user_id: localStorage.getItem("id_user"),
        body: data,
      };

      axios
        .post(
          process.env.VUE_APP_API_URL + "/create_update_redes_sociales",
          JSON.stringify(json)
        )
        .then((response) => {
          this.$alertify.success("Cambios guardados con éxito");
        })
        .catch((error) => {
          this.proccessAxiosError(error);
        });
    },

    resetData() {
      this.getRedesSociales();
    },

    clear(){
      this.text_facebook = '';
      this.text_instagram = '';
      this.facebook = {};
      this.instagram = {};
    },

    getRedesSociales() {
      axios
        .get(
          process.env.VUE_APP_API_URL +
            "get_redes_sociales/" +
            localStorage.getItem("id_user")
        )
        .then((response) => {
          let data = response.data;
          for (let i = 0; i < data.length; i++) {
            if (data[i]["red_nombre"] == "Facebook") {
              this.facebook = data[i];
              this.text_facebook = this.facebook["red_direccion"];
            } else if (data[i]["red_nombre"] == "Instagram") {
              this.instagram = data[i];
              this.text_instagram = this.instagram["red_direccion"];
            }
          }
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
  },
};
</script>