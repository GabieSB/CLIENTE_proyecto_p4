<template>
  <div>
    <div class="encabezado">
      <div class="info">
        <img class="logo" src="../assets/marketplace.png" alt="" />
        Marktetplace
      </div>
      <div class="datos">
        <h3 class="my-3">Reporte de ofertas {{tiendaNombre}} </h3>
        <span v-if="sdate !='none' && edate !='none' ">Desde {{ this.startDate }} hasta {{ this.endDate }}</span>
        <span v-if="pmenor !='none' && pmayor !='none' ">Desde ₡{{ this.pmenor }} hasta ₡{{ this.pmayor }}</span>
        <span v-if="categoria != 'none'"> Categoría: {{this.categoriaNombre.text }}</span>
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
    
    </div>
     <span class="px-2">Generado el {{fecha}}</span>

    <b-modal
      hide-footer
      class="modal-backdrop"
      v-model="modalShow"
      title="Generar Reporte"
       no-close-on-backdrop
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
           
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Precio menor"
          label-for="name-input"
          invalid-feedback="El precio es requerido"
        >
          <b-form-input
            id="name-input"
            type="number"
            v-model="precioMenor"
            
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Precio Mayor"
          label-for="name-input"
          invalid-feedback="Precio es requerido"
        >
          <b-form-input
            id="name-input"
            type="number"
            v-model="precioMayor"
           
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Selecione una categoria"
          label-for="name-input"
          invalid-feedback="Precio es requerido"
        >
          <b-form-select v-model="selected" :options="categorias"></b-form-select>
        </b-form-group>
        
      </form>
      <div class="actions">
        <b-button class="mt-2" variant="primary" @click="generar" block
          >Generar</b-button
        >
         <b-button class="mt-2" variant="secondary" @click="cerrar" block
          >Cancelar</b-button
        >
      </div>
    </b-modal>
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
    tiendaNombre: "",
    subscripciones: [],
    fields: [
      "fecha_publicacion",
      "nombre_producto",
      "descripcion",
      "precio", 
      "precio_oferta",   
      "categoria",
      "tienda"
    ],
    categorias: [],
    selected: "",
    items: [],
    startDate: "",
    endDate: "",
    precioMenor: "",
    precioMayor: "",
    sdate: "",
    edate: "",
    pmenor: "",
    pmayor: "",
    modalShow: true,
    categoria: "",
    categoriaNombre: "",
    showChart: false,
    total: 0,
    fecha: ""
  }),
  mounted() {
   // var aux = new Date();
    //this.endDate = new Date().toISOString().split("T")[0];
    //aux.setDate(aux.getDate() - 10);
    //this.startDate = aux.toISOString().split("T")[0];

    this.getCategorias();

    this.getFormatoFechaHoras()

  },
  methods: {
    getCategorias() {
      
      axios
        .get(process.env.VUE_APP_API_URL + "get_categorias")
        .then((response) => {
          var aux = [];
          aux[0] = {
            value: null,
            text: "Selecione una categoria",
          };
          var cont = 1;
          for (var x of response.data) {
            this.selected,
              (aux[cont] = x);
            cont++;
          }
          this.categorias = aux;
        });
    },
    getOfertas() {
      
      var url =
        process.env.VUE_APP_API_URL +
        "get_ofertas/" +
        this.categoria +
        "/" +
        this.pmenor+
        "/" +
        this.pmayor+
         "/" +
        this.sdate+
        "/" +
        this.edate
       
       console.log(url)
      
      axios
        .get(url)
        .then((response) => {
          this.items = response.data; //llenamos el vector con los datos JSON obtenidos
          console.log(this.items);
          this.getFormatoFecha();

        })
        .catch((error) => {});
    },
    validarFiltros(){
        var cont = 1;
        var fechaV = 2;
        var precioV = 2;

        if(this.startDate.length == 0){
            this.sdate = "none"
            fechaV--
        }else {this.sdate = this.startDate}
        if(this.endDate.length == 0){
            this.edate = "none"
            fechaV--
        }else {this.edate = this.endDate}

        if(this.precioMenor.length == 0){
            this.pmenor = "none"
            precioV--;
        }else {this.pmenor = this.precioMenor}

        if(this.precioMayor.length == 0){
            this.pmayor = "none"
            precioV--
        }else {this.pmayor = this.precioMayor}

        if(this.selected.length == 0){
            cont--;
            this.categoria = "none"
        }else{
            this.categoriaNombre = this.categorias.find(option => option.value === this.selected)
            this.categoria = this.selected;
        }

        console.log(this.pmenor + this.pmayor + this.edate)
        if(fechaV == 1)   { this.$alertify.error("Debe un rango de fechas válido");  return false}
        if(precioV == 1)  {  this.$alertify.error("Debe seleccionar un rango de precio válido"); return false}
        if((cont + fechaV + precioV ) == 0) {this.$alertify.error("Debe seleccionar al menos un filtro"); return false}
        
        return true;
     
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
    generar() {
     
      if(this.validarFiltros()){
        this.modalShow = false
        this.getOfertas()
      }

    },
    cerrar() {
        window.close();
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