<template>
  <div class="container-fluid">
      <h1>Datos adicionales de la tienda</h1>
    <form class="row">
      <div class="col-sm-8" style="background-color: #f5f5f5">
        <div class="desc_form" style="background-color: #f5f5f5">
            <label class="inputLabel" for='descripcion'>Detalles</label>
          <b-textarea
            name="descripcion"
            id="descripcion"
            cols="30"
            rows="20"
            maxlength="512"
            placeholder="Ingresa aqui observaciones o detalles sobre tu tienda"
          ></b-textarea>
          <b-button class="submit-btn btn-success" v-on:click="prueba">Finzalizar y guardar</b-button>
        </div>
      </div>
      <div class="col-sm-4" style="background-color: #f5f5f5">
        <img
          class="profile-pic"
          src="https://xn--diseoscreativos-1qb.com/wp-content/uploads/2018/06/Imagenes-de-gatos-www.dise%C3%B1oscreativos.com-portada-3-1.jpg"
          alt="foto de perfil"
        />
        <input id="picSelector" type="file" accept=".png, .jpg, .jpge" />
      </div>
    </form>
  </div>
</template>


<script>
import axios from "axios";
import {main} from '../main.js'

export default ({
    setup() {},

  name: "DetallesTienda",
  props: ['items'],

  data: () => ({}),
  methods:{
      prueba(){
          let rrrrrr = main.AppContext['userData'];
          console.log(rrrrrr);
      },
  },
})
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

.submit-btn{
    margin-top: 50px;
}

.inputLabel {
  padding-top: 25px;
  font-weight: bold;
}
</style>