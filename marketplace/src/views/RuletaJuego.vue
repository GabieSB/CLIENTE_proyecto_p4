<template>
 <div>
   <Header></Header>
   <Ruleta :girar="giros < 4"  ></Ruleta>

 </div>

  
</template>
<script>
import Ruleta from "@/components/Ruleta.vue";
import axios from "axios";
import Header from "@/components/Header.vue";
export default {
  components: {
    Ruleta,
    Header
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