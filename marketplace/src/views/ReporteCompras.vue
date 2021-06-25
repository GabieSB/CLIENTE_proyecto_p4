<template>
  <div>
    <div class="encabezado">
      <div class="info">
        <img class="logo" src="../assets/marketplace.png" alt="" />
        Marktetplace
      </div>
      <div class="datos">
        <h3 class="my-3">Reporte de ventas de {{ this.nombre_usuario}}</h3>
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
      <BarChart
        class="bar"
        v-if="itemsChart.length > 0"
        :data="chartData"
        :options="options"
      ></BarChart>
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
import BarChart from "@/components/BarChart.vue";

export default {
  name: "ReporteCompras",
  components: {
    Header,
    BarChart,
  },
  data: () => ({
    idComprador: "",
    subscripciones: [],
    fields: [
      "nombre_producto",
      "descripcion_producto",
      "categoria",
      "precio",
      "cantidad_comprada",
      "precio_total",
      "precio_final",
      "tarjeta",
    ],

    chartData: {
      labels: [],
      datasets: [
        {
          label: "Producto en el que se gastó más dinero",
          borderWidth: 1,
          backgroundColor: [],
          borderColor: [],
          pointBorderColor: '#2554FF',
          data: [],
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
            gridLines: {
              display: true,
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              display: false,
            },
          },
        ],
      },
      legend: {
        display: true,
      },
      responsive: true,
      maintainAspectRatio: false,
    },
    items: [],
    itemsChart: [],
    startDate: "",
    endDate: "",
    modalShow: true,
    showChart: false,
    total: 0,
    nombre_usuario: "",
    fecha: ""
  }),
  mounted() {
    this.idComprador =localStorage.getItem('comprador_id');
    var aux = new Date();
    this.endDate = new Date().toISOString().split("T")[0];
    aux.setDate(aux.getDate() - 10);
    this.startDate = aux.toISOString().split("T")[0];
  },
  methods: {
    getCompras() {
      var url =
        process.env.VUE_APP_API_URL +
        "/get_compras_between/" +
        this.idComprador +
        "/" +
        this.startDate +
        "/" +
        this.endDate;

      axios
        .get(url)
        .then((response) => {
          this.items = response.data; //llenamos el vector con los datos JSON obtenidos
          if(this.items.length > 0){
            console.log(this.items);
            this.getFormatoFecha();
            this.getTotal();
            this.getProductosMasGastado();
            this.nombre_usuario = this.items[0].nombre_usuario
          }
        })
        .catch((error) => {});
    },
    getProductosMasGastado() {
      var url =
        process.env.VUE_APP_API_URL +
        "/get_productos_mas_dinero/" +
        this.idComprador +
        "/" +
        this.startDate +
        "/" +
        this.endDate;

      axios
        .get(url)
        .then((response) => {
            this.itemsChart = response.data
            console.log(this.itemsChart)
          this.generarChart();
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
        this.total += this.items[i].precio_total;
      }
    },
    generar() {
      this.getCompras();
      this.modalShow = false;
    },
    generarChart() {
      console.log("in geenrar chart");
      console.log(this.itemsChart.length);
      for (var i = 0; i < this.itemsChart.length; i++) {
        this.chartData.labels[i] = this.itemsChart[i].nombre_producto;
        var color = this.random_rgba();
        this.chartData.datasets[0].borderColor[i] = " rgba(128,128,128,1)";
        this.chartData.datasets[0].backgroundColor[i] = color;
        this.chartData.datasets[0].data[i] = this.itemsChart[i].total;
      }

      console.log(this.chartData);
      this.showChart = true;
    },
    random_rgba() {
      console.log("dentro del randn");
      var o = Math.round,
        r = Math.random,
        s = 255;
      return (
        "rgba(" +
        0 +
        "," +
        o(r() * s) +
        "," +
        o(r() * s) +
        "," +
        r().toFixed(1) +
        ")"
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
.chart {
  display: flex;
  justify-content: center;
  height: 200px;
}
</style>