<template>
  <div>
    <div class="encabezado">
      <div class="info">
        <img class="logo" src="../assets/marketplace.png" alt="" />
        Marktetplace
      </div>
      <div class="datos">
        <h3 class="my-3">Reporte de ventas de {{tiendaNombre}} </h3>
        <span>Desde {{ this.startDate }} hasta {{ this.endDate }}</span>
      </div>
      <div class="icon">
        <button @click.prevent="print">
          <img
            class="py-2"
            src="https://img.icons8.com/android/24/000000/print.png"
          />
        </button>
      </div>
    </div>
    <div class="data">
    
      <b-table striped hover :items="items" :fields="fields"></b-table>
      <span>Total: {{ total }}</span>
     
    </div> 
     
    <div class="chart">
        <h2 v-if="items.length == 0">No existen ventas registradas</h2>
        <DoughnutChart  class="doughnout" v-if="items.length > 0" :data = "chartData" :options = "options" ></DoughnutChart>
    </div>
     <span class="px-2">Generado el {{fecha}}</span>

    <b-modal
      hide-footer
      class="modal-backdrop"
      v-model="modalShow"
      title="Generar Reporte"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Fecha de inicio"
          label-for="name-input"
          invalid-feedback="Name is required"
        >
          <b-form-input
            id="name-input"
            type="date"
            v-model="startDate"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Fecha final"
          label-for="name-input"
          invalid-feedback="Date is required"
        >
          <b-form-input
            id="name-input"
            type="date"
            v-model="endDate"
            required
          ></b-form-input>
        </b-form-group>
      </form>
      <div class="actions">
        <b-button class="mt-2" variant="info" block
          >Generar de ventas del día</b-button
        >
        <b-button class="mt-2" variant="primary" @click="generar" block
          >Generar</b-button
        >
      </div>
    </b-modal>
    

  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import axios from "axios";
import DoughnutChart from '@/components/DoughnutChart.vue'
;



export default {
  name: "ReporteVentas",
  components: {
    Header,
    DoughnutChart

  },
  data: () => ({
    idTienda: "",
    tiendaNombre: "",
    subscripciones: [],
    fields: [
      "fecha_publicacion",
      "nombre",
      "categoria",
      "precio_estimado",
      "cantidad_vendida",
      "total",
    ],

    chartData: {
        labels: [],
        datasets: [
          {
            borderWidth: 1,
            borderColor: [],
            backgroundColor: [],
            data: [],
          },
        ],
      },
      options: {
        legend: {
          display: true,
        },
        responsive: true,
        maintainAspectRatio: false,
      
      },
    items: [],
    startDate: "",
    endDate: "",
    modalShow: true,
    showChart: false,
    total: 0,
    fecha: ""
  }),
  mounted() {
    
    this.idTienda = localStorage.getItem("id_tienda");
    this.tiendaNombre =  localStorage.getItem("tienda_nombre")

    var aux = new Date();
    this.endDate = new Date().toISOString().split("T")[0];
    aux.setDate(aux.getDate() - 10);
    this.startDate = aux.toISOString().split("T")[0];

    this.getFormatoFechaHoras()

  },
  methods: {
    getUltimasVentas() {
      var url =
        process.env.VUE_APP_API_URL +
        "/get_ventas_between/" +
        this.idTienda +
        "/" +
        this.startDate +
        "/" +
        this.endDate;

      axios
        .get(url)
        .then((response) => {
          this.items = response.data; //llenamos el vector con los datos JSON obtenidos
          console.log(this.items);
          this.getFormatoFecha();
          this.getTotal();
          this.generarChart()
          
          
        })
        .catch((error) => {});
    },
    print() {
      window.print();
    },
    getFormatoFecha() {
      for (var i = 0; i < this.items.length; i++) {
        let current_datetime = new Date(this.items[i].fecha_publicacion);
        let formatted_date =
          current_datetime.getDate() +
          "-" +
          (current_datetime.getMonth() + 1) +
          "-" +
          current_datetime.getFullYear();
        this.items[i].fecha_publicacion = formatted_date;
      }
    },
    getTotal() {
      for (var i = 0; i < this.items.length; i++) {
        this.total += this.items[i].total;
      }
    },
    generar() {
      this.getUltimasVentas()
      this.modalShow = false
      
     
    },
    generarChart() {
      console.log("in geenrar chart")
      console.log(this.items.length)
      for (var i = 0; i < this.items.length; i++) {
        this.chartData.labels[i] = "[" + this.items[i].cantidad_vendida +"] " + this.items[i].nombre;
        var color =  this.random_rgba() ;
        this.chartData.datasets[0].borderColor[i] = " rgba(128,128,128,1)"
         this.chartData.datasets[0].backgroundColor[i] = color; 
         this.chartData.datasets[0].data[i] = this.items[i].cantidad_vendida;
      }

      console.log(this.chartData)
       this.showChart = true
    },
    random_rgba() {
      console.log("dentro del randn")
      var o = Math.round,
        r = Math.random,
        s = 255;
      return (
        "rgba(" + 0 + "," + o(r() * s) + "," + o(r() * s) + "," + r().toFixed(1) + ")"
      );
    },
     getFormatoFechaHoras() {
        let current_datetime = new Date()
        let formatted_date =
          current_datetime.getDate() +
          "-" +
          (current_datetime.getMonth() + 1) +
          "-" +
          current_datetime.getFullYear() + " " + current_datetime.getHours() + ":"+ current_datetime.getMinutes();
        this.fecha = formatted_date
    },
    
  },
};
</script>

<style scoped>
.encabezado {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.datos {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 20px;
}
.icon {
  margin: 0 20px;
}
button {
  border: none;
}
.logo {
  padding: 10px;
  height: 80px;
  width: 80px;
}
.info {
  display: flex;
  flex-direction: column;
  padding: 5px;
}
.data {
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.modal-backdrop {
  background-color: red;
}
.actions {
  display: flex;
  justify-content: space-between;
}
.chart{
  display: flex;
  justify-content: center;
}

</style>