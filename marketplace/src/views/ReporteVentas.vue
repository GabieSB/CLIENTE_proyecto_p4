<template>
  <div>
    <div class="encabezado">
      <div class="datos">
        <h3 class="my-3">Reporte de ventas</h3>
       <span>Desde {{this.startDate}} hasta {{this.endDate}}</span>
      </div>
      
       <div class="icon"> 
         <img src="/src/assets/marketplace.png" alt="">
         <button @click.prevent="print" > 
            <img  class="py-2" src="https://img.icons8.com/android/24/000000/print.png"/>
         </button>
       
       </div>
   </div>
   
    <div>
        <b-table striped hover :items="items" :fields="fields"></b-table>
    </div>
  
  </div>
    
</template>
<script>
import Header from "@/components/Header.vue";
import axios from "axios";
export default {
  name: "ReporteVentas",
  components: {
    Header,
  },
  data: () => ({
    idTienda: "",
    subscripciones: [],
    fields: [ 'fecha','nombre', 'categoria', 'precio_estimado', 'cantidad_vendida', 'total'],
    items:[],
    startDate: '',
    endDate: '',
    buttonShow: true,
  }),
  mounted() {
    this.idTienda = localStorage.getItem("id_tienda");
    this.getUltimasVentas();
  },
  methods: {

    getUltimasVentas(){
       var aux = new Date()
       this.endDate = (new Date()).toISOString().split('T')[0];
       aux.setDate( aux.getDate() -10 )
       this.startDate = (aux).toISOString().split('T')[0]
    
       var url =
        process.env.VUE_APP_API_URL +
        "/get_ventas_between/"+this.idTienda+"/"+this.startDate+"/"+this.endDate;

      axios
        .get(url)
        .then((response) => {
          this.items = response.data; //llenamos el vector con los datos JSON obtenidos
          console.log(this.items)
          this.getFormatoFecha()
          
        })
        .catch((error) => {});
    },
    print(){
      window.print();
    },
    getFormatoFecha() {

      for (var i = 0; i < this.items.length; i++) {
        let current_datetime = new Date(this.items[i].fecha)
        let formatted_date = current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear()
        this.items[i].fecha = formatted_date;
      }
   },
  


  },

 
}
</script>

<style scoped>
.encabezado{
  display: flex;
  justify-content: space-between;

}
.datos{
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 20px;
}
.icon{
 margin: 0 20px;
}
button{
  border: none ;
}
</style>