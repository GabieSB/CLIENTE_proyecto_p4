<template>
 <div>
   <Header></Header>
   <SidebarComponent></SidebarComponent>
   <Ruleta :girar="giros"  ></Ruleta>

 </div>

  
</template>
<script>
import Ruleta from "@/components/Ruleta.vue";
import axios from "axios";
import Header from "@/components/Header.vue";
import SidebarComponent from "@/components/SidebarComponent.vue"
export default {
  components: {
    Ruleta,
    Header,
    SidebarComponent
  },
  data: () => ({
      comprador_id : "",
      giros: 0,

  }),
  mounted() {
    this.comprador_id = localStorage.getItem("comprador_id")
    this.getGirosHoy();
  },
  methods: {
    getGirosHoy() {
      var url = process.env.VUE_APP_API_URL + "get_total_giros_hoy/" + this.comprador_id  ;
      axios
        .get(url)
        .then((response) => {
            this.giros = response.data
         
        })
        .catch((error) => {});
    },

   
  },
};
</script>