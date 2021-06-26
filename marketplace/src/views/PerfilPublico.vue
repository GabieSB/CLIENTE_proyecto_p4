<template>
<div>
<Header></Header>

<div class="container">
  <div class="row my-5">
    <div class="col-5 my-4">
      <h3 class="mb-5"> Foto de  perfil</h3>
      <b-img class="profile-picture" v-bind:src="usuario.fotoSRC">

      </b-img>
    </div>
    <div class="col-7 my-4">
      <h3>Información del usuario</h3>
      <div class="row my-3 d-flex justify-content-start ">
          <img class="icon" src="https://img.icons8.com/ios-filled/50/000000/username.png"/>
          <span >Nombre de usuario:</span>
          <span style="font-weight: bold;"> {{usuario.nombre_usuario}}</span>
      </div>
       <div class="row my-3 d-flex ">
          <img class="icon" src="https://img.icons8.com/ios/50/000000/name-tag-woman-horizontal.png"/>
          <span>Nombre completo: </span>
          <span style="font-weight: bold;"> {{usuario.nombre_completo}}</span>
      </div>
       <div class="row my-3 d-flex ">
            <img class="icon" src="https://img.icons8.com/ios-filled/50/000000/phone.png"/>
          <span>Teléfono: </span>
          <span style="font-weight: bold;"> {{usuario.telefono}}</span>
      </div>
       <div class="row my-3 d-flex ">
          <img class="icon" src="https://img.icons8.com/ios-filled/50/000000/email.png"/>
          <span>Email: </span>
          <span style="font-weight: bold;"> {{usuario.email}}</span>
      </div>
      <div class="row my-3">
          <span>Social Media</span>
          <div class="d-flex"> 
            <img class="mx-1" src="https://img.icons8.com/ios-filled/50/000000/facebook-new.png"/>
            <img  class="mx-1" src="https://img.icons8.com/ios-filled/50/000000/twitter.png"/>
            <img class="mx-1" src="https://img.icons8.com/ios-filled/50/000000/instagram-new.png"/>
          </div>
 
      </div>
    
    </div>

  </div>
</div>
</div>

    
</template>
<script>
import Header from "@/components/Header.vue";
import axios from "axios";
export default {
  name: "PerfilPublico",
  components: {
    Header,
  },
  data: () => ({
    id: '',
    usuario: '',
    
  }),
  mounted() {
    this.id = this.$route.params.id
    this.getUserData();
 
  },
  methods: {
    
    getUserData(){
      var url =
        process.env.VUE_APP_API_URL + "get_comprador/" + this.id;
      axios
        .get(url)
        .then((response) => {
         this.usuario = response.data;
         console.log(this.usuario)
         this.usuario.fotoSRC =  process.env.VUE_APP_API_URL + "get_foto/profiles/" + this.usuario.foto;

        })
        .catch((error) => {});
    }

  }
}
</script>
<style scoped>

.profile-picture{
  width: 300px;
  height: 300px;
}
.icon{
  width: 70px;
  height: 50px;
}
span{
  margin: 10px 0;
  width: auto;
  height: 20px;
}
</style>