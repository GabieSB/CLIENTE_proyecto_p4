<template>
  <div>
    <Header></Header>
    <div class="container">
      <div class="row d-flex justify-content-center">
        <h1 class="tittle my-3">Comentarios sin responder</h1>
      </div>
      <div
        class="row d-flex justify-content-center"
        v-for="comentario in comentarios"
        :key="comentario.comentario_id"
      >
        <b-card
          no-body
          class="overflow-hidden my-2 card"
          style="max-width: 540px"
        >
          <b-row no-gutters class="d-flex py-2">
            <b-col md="2">
              <b-card-img
                v-bind:src="comentario.fotoSRC"
                alt="Image"
                class="profile-img"
              ></b-card-img>
            </b-col>
            <b-col
              class="d-flex justify-content-between align-items-center"
              md="10"
            >
            <div>
                <h5>{{ comentario.nombre_usuario }}</h5>
                <p> {{comentario.comentario}} </p>

            </div>
              
              <b-button @click.prevent="goPerfil(comentario.comprador_id)" variant="outline-dark"
                >Responder</b-button
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
  name: "Comentarios",
  components: {
    Header,
  },
  data: () => ({
    idTienda: '',
    comentarios: [],
  }),
  mounted() {
      this.idTienda =  localStorage.getItem("id_tienda");
      this.getComentariosNoLeidos();
      
  },
  methods: {
    getComentariosNoLeidos() {
      var url =
        process.env.VUE_APP_API_URL +
        "get_tienda_comentarios_no_leidos/" +
        this.idTienda;
      axios
        .get(url)
        .then((response) => {
          this.comentarios = response.data; //llenamos el vector con los datos JSON obtenidos
        
          for (var i = 0; i < this.comentarios.length; i++) {
            if (this.comentarios[i].foto.length > 0) {
              this.comentarios[i].fotoSRC =
                process.env.VUE_APP_API_URL +
                "get_foto/" +
                this.comentarios[i].producto_foto;
            }
            console.log(this.comentarios);
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
