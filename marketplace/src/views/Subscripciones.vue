<template>
  <div>
    <Header></Header>
    <div class="container">
      <div class="row d-flex justify-content-center">
        <h1 class="tittle">Subscriptores</h1>
      </div>
      <div
        class="row d-flex justify-content-center"
        v-for="sub in subscripciones"
        :key="sub.id"
      >
        <b-card
          no-body
          class="overflow-hidden my-2 card"
          style="max-width: 540px"
        >
          <b-row no-gutters class="d-flex py-2">
            <b-col md="2">
              <b-card-img
                v-bind:src="sub.fotoSRC"
                alt="Image"
                class="profile-img"
              ></b-card-img>
            </b-col>
            <b-col
              class="d-flex justify-content-between align-items-center"
              md="10"
            >
              <h4>{{ sub.nombre }}</h4>
              <b-button @click.prevent="goPerfil(sub.id)" variant="outline-dark"
                >Ir a perfil</b-button
              >
            </b-col>
          </b-row>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import axios from "axios";
export default {
  name: "Subscripciones",
  components: {
    Header,
  },
  data: () => ({
    idTienda: "",
    subscripciones: [],
  }),
  mounted() {
    this.idTienda = localStorage.getItem("id_tienda");
    this.getSubscripciones();
  },
  methods: {
    getSubscripciones() {
      var url =
        process.env.VUE_APP_API_URL +
        "get_subscripciones_by_id/" +
        this.idTienda;
      axios
        .get(url)
        .then((response) => {
          this.subscripciones = response.data; //llenamos el vector con los datos JSON obtenidos
          for (var i = 0; i < this.subscripciones.length; i++) {
            if (this.subscripciones[i].foto_url.length > 0) {
              this.subscripciones[i].fotoSRC =
                process.env.VUE_APP_API_URL +
                "get_foto/profiles/" +
                this.subscripciones[i].foto_url;
            }
            console.log(this.subscripciones);
          }
        })
        .catch((error) => {});
    },
    goPerfil(id) {
     // localStorage.setItem("id_perfil", id);
      this.$router.push("comprador/" + id);
    },
  },
};
</script>

<style scoped>
.tittle {
  margin: 10px;
  text-align: center;
}
.profile-img {
  border-radius: 50px;
  height: 50px;
  width: 50px;
  border: solid 3px white;
}
.card {
  background: rgb(114, 48, 219);
  background: linear-gradient(
    90deg,
    rgba(114, 48, 219, 0.7492877492877492) 0%,
    rgba(6, 156, 222, 0.7763532763532763) 0%,
    rgba(187, 167, 216, 0.5256410256410257) 100%
  );
  border-radius: 15px;
}
h4 {
  padding: 0;
  margin: 0;
  color: rgb(83, 83, 83);
}
</style>