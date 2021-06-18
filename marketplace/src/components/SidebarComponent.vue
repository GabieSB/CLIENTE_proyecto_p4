<template>
  <div>
    
    <b-sidebar id="sidebar-no-header" aria-labelledby="sidebar-no-header-title" 
    no-header shadow bg-variant="dark" text-variant="light" backdrop backdrop-variant="dark">
      <template #default="{ hide }">
        <div class="p-3">
          
          <div class="d">
            <b-avatar ref="profPic" size="6rem"></b-avatar>
            <label ref="username" id="username"></label>
            <b-button title="Editar mi perfil de usuario">✏️</b-button>
            <h4 id="sidebar-no-header-title">Menú</h4>
            <div class="divider-menu"></div>
          </div>
        
          <nav class="mb-3">
            <b-nav vertical>
              <b-nav-item active @click="hide">Active</b-nav-item>
              <b-nav-item href="#link-1" @click="hide">Link</b-nav-item>
              <b-nav-item href="#link-2" @click="hide">Another Link</b-nav-item>
            </b-nav>
          </nav>
          <b-button variant="primary" block @click="hide">Close Sidebar</b-button>
        </div>
      </template>
    </b-sidebar>
  </div>
</template>

<script>
import axios from "axios";
 export default
 {
   name:'SidebarComponent',

  data: () => ({
    userData: undefined,
  }),

   mounted() {
    this.deployPrechagedData();
  },
  methods:{

    deployPrechagedData(){
      let userId = localStorage.getItem("id_user");
      this.userData = this.getAllUserData(userId);
     
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

    getAllUserData(id){
      axios.get(process.env.VUE_APP_API_URL+ "get_userdata_by_id/" + id )
      .then((response) => {
          this.userData = response.data;
          this.$refs.username.innerHTML = '@ ' + this.userData['usuario_nom_usr'];
          this.$refs.profPic.src = process.env.VUE_APP_API_URL +  '/get_foto/profiles/' 
          + this.userData['usuario_foto'];
        })
        .catch((error) => {
          this.proccessAxiosError(error);
        });
    },
  }
 }
</script>

<style>
.nav-item > .nav-link
{
  color:#fff;
}
.nav-item > .nav-link:hover
{
  color:#CCC;
}
.divider-menu{
  border:1px solid #fff;
  width: 100;
}

#username{
  padding-left: 5px;
  margin-right: 5px;
}
</style>

