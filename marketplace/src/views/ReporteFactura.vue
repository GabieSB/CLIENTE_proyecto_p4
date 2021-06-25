<template>
  <div>
    <div class="encabezado">
      <div class="info">
        <img class="logo" src="../assets/marketplace.png" alt="" />
        Marktetplace
      </div>
      <div class="datos">
        <h3 class="my-3">Factura</h3>
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

    <div class="comprador">
      <div class="m-2">
        <span class="negrita">Datos del comprador</span>
        <div class="my-1">
          <span class="negrita mx-2"> Nombre del comprador: </span>
          <span>{{ this.dataFactura.nombre_cliente }}</span>
          <span class="negrita mx-2"> Cédula: </span>
          <span>{{ this.dataFactura.cedula }}</span>
          <span class="negrita mx-2"> Teléfono: </span>
          <span>{{ this.dataFactura.telefono }}</span>
          <span class="negrita mx-2"> Email: </span>
          <span>{{ this.dataFactura.email }}</span>
        </div>
        <span class="negrita">Dirección de envío</span>
          <div class="my-1">
          <span class="negrita mx-2"> Pais: </span>
          <span>{{ this.dataFactura.pais }}</span>
          <span class="negrita mx-2"> Provincia: </span>
          <span>{{ this.dataFactura.provincia }}</span>
          <span class="negrita mx-2"> Cantón: </span>
          <span>{{ this.dataFactura.canton }}</span>
          <span class="negrita mx-2"> Código postal: </span>
          <span>{{ this.dataFactura.codigo_postal }}</span>
          <span class="negrita mx-2"> Número de casillero: </span>
          <span>{{ this.dataFactura.casillero }}</span>
        </div>
        <span class="negrita">Información del pago</span>
          <div class="my-1">
          <span class="negrita mx-2"> Tarjeta: </span>
          <span>{{ this.dataFactura.tarjeta }}</span>
        </div>
        <span class="negrita"> Observaciones</span>
         <div class="my-1">
          <span class="negrita mx-2"> Generales: </span>
          <span>{{ this.dataFactura.observaciones }}</span>
        </div>
      </div>
    </div>
    <div class="data">
      <b-table striped hover :items="items" :fields="fields"></b-table>
      <span> <b> Total sin costo de envío: </b> {{this.dataFactura.subtotal}} </span>
       <span>  <b> Total: </b>{{this.dataFactura.total}} </span>
    </div>
    <span class="px-2">Generado el {{ fecha }}</span>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import axios from "axios";

export default {
  name: "ReporteFacturas",
  components: {
    Header,
  },
  data: () => ({
    fields: [
      "nombre_producto",
      "tienda",
      "cantidad",
      "precio_unitario",
      "total",
      "costo_envio"
    ],

    items: [],
    facturaId: "",
    dataFactura: [],
    total: 0,
    fecha: "",
  }),
  mounted() {
    // var aux = new Date();
    //this.endDate = new Date().toISOString().split("T")[0];
    //aux.setDate(aux.getDate() - 10);
    //this.startDate = aux.toISOString().split("T")[0];
    this.facturaId = 1;
    this.getFormatoFechaHoras();
    this.getFactura();
  },
  methods: {
    getFactura() {
      axios
        .get(process.env.VUE_APP_API_URL + "get_factura/" + this.facturaId)
        .then((response) => {
          this.items = response.data.detalles;
          this.dataFactura = response.data;

          console.log(this.items);
          console.log(this.dataFactura);
        });
    },

    print() {
      window.print();
    },

    getFormatoFechaHoras() {
      let current_datetime = new Date();
      let formatted_date =
        current_datetime.getDate() +
        "-" +
        (current_datetime.getMonth() + 1) +
        "-" +
        current_datetime.getFullYear() +
        " " +
        current_datetime.getHours() +
        ":" +
        current_datetime.getMinutes();
      this.fecha = formatted_date;
    },
  },
};
</script>

<style scoped>
.negrita {
  font-weight: bold;

}
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
  padding: 20px;
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
}
.comprador {
  margin: 10px;
  border: solid 2px black;
  font-size: 11px;
 
}
</style>