<template>
  <div class="contenedor" id="divTienda">
      <h1>Tiendas</h1>
    <div class="tiendas">
        <div class="filtros">
         
              <input
          id="buscar"
          type="search"
          @keyup="buscarProductos()"
          class="fadeIn second input-field"
          name="buscar"
          placeholder="Buscar por nombre"
          required
        />
            
        </div>
        <div
        class="cads-tienda"
        v-for="tienda in tiendas"
        :key="tienda.tienda_id"
        >
        
        <b-card
          v-bind:title="tienda.nombre"
          v-bind:img-src="tienda.fotoSRC"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem"
          class="mb-2"
        >
          <b-card-text>
            {{ tienda.descripcion }}
          </b-card-text>
          <b-card-text>
            {{ tienda.pais }} {{ tienda.provincia }} {{ tienda.canton }}
          </b-card-text>
          <b-button variant="primary" @click="irTienda(tienda.tienda_id)"
            >ir</b-button
          >
        </b-card>
      </div>
      
      
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

export default {
  name: "ListTiendas",

  components: {},
  data: () => ({
    tiendas: [],
  }),
  mounted() {
    this.getTiendas();
  },
  methods: {
    irTienda(id) {
      // this.$store.state.tienda=id;
      localStorage.setItem("id_tienda", id);
      console.log( "id tienda " +localStorage.getItem("id_tienda"))
      this.$router.push("Tiendas");
    },
    getTiendas() {
      axios
        .get(process.env.VUE_APP_API_URL + "get_tiendas/")
        .then((respose) => {
          this.tiendas = respose.data;
          this.getPhotoPreview();
        });
    },
    getPhotoPreview() {
      // console.log("in ptp s");
      for (var i = 0; i < this.tiendas.length; i++) {
        if (this.tiendas[i].foto.length > 0) {
          this.tiendas[i].fotoSRC =
            process.env.VUE_APP_API_URL +
            "get_foto/profiles/" +
            this.tiendas[i].foto;
        }
      }
    },
    buscarProductos() {
      var buscar = document.getElementById("buscar").value;

      if(buscar.length > 0){
        axios.get(process.env.VUE_APP_API_URL + "get_tiendas_by_param/" + buscar).then((respose) => {
        this.tiendas = respose.data
         this.getPhotoPreview();
      });
      }else{
          this.getTiendas()
      }
    },
  },
  props: {
    title: String,
  },
};
</script>

<style>
#divTienda {
  text-align: center;
}

#divTienda.left {
  float: left;
  background: rgb(17, 17, 53);
}

.cads-tienda {
  float: left;
  padding-left: 80px;
  padding-top: 15px;
}

.filtros{
    display: flex;
    justify-content: flex-start;
    border:solid 2px rgb(230, 230, 230);
    padding: 10px;
    margin: 10px;
    border-radius: 15px;
    height: auto;
}
.input-field {
  width: auto;
  height: 40px;
  border: solid 1px rgb(3, 133, 226);
  border-radius: 5px;
  background-color: whitesmoke;
  margin: 0 10px;
  text-align: start;
  padding: 5px;
}
</style>
