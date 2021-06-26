<template>
<div>
    <div class="encabezado">
        <div class="info">
            <img class="logo" src="../assets/marketplace.png" alt="" />
            Marktetplace

        </div>
        <div class="datos">
            <h3 class="my-3">
                Reporte de subscripciones de tiendas y productos en lista de deseos {{ this.nombre_usuario }}
            </h3>

        </div>
        <div class="icon">
            <button @click.prevent="print">
                <img class="py-2" src="https://img.icons8.com/android/24/000000/print.png" />
            </button>

        </div>

    </div>
    <div class="data_subs">
        <b-table striped hover :items="items" :fields="fields">
            <template #cell(productos_deseados)="data">

                <b-list-group v-for="deseo in data.value" :key="deseo.nombre_producto">
                    <b-list-group-item button class="itemList">
                        <span class="precio">• {{ deseo.nombre_producto }}</span>
                        <span class="precio"> Precio: ₡{{ deseo.precio_producto }} </span>
                    </b-list-group-item>
                </b-list-group>
                <span class=" precio mx-4" v-if="data.value.length == 0">No hay productos agregados</span>
            </template>
        </b-table>
        <h2 v-if="items.length == 0">No existen subscripciones registradas</h2>

    </div>
    <span class="px-2">Generado el {{fecha}}</span>
</div>
</template>

<script>
import Header from "@/components/Header.vue";
import axios from "axios";


export default {
  name: "ReporteSubscripciones",
  components: {
    Header,
    
  },
  data: () => ({
    idComprador: "",
    subscripciones: [],
    fields: ["nombre_tienda", "productos_deseados"],

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
        this.idComprador = 1;
        this.getSubscripcionesDeseos();
        this.getFormatoFecha();
    },
    methods: {
        getSubscripcionesDeseos() {
            console.log("in subd");
            var url =
                process.env.VUE_APP_API_URL +
                "/get_susbcripciones_deseos/" +
                this.idComprador;
            console.log(url);
            axios
                .get(url)
                .then((response) => {
                    this.items = response.data; //llenamos el vector con los datos JSON obtenidos
                    // this.generarListaDeseos();
                })
                .catch((error) => {});
        },

        generarListaDeseos() {
            for (var i = 0; i < this.items.length; i++) {
                var html = "<b-list-group class='list'>";
                for (var j = 0; j < this.items[i].deseos.length; j++) {
                    html +=
                        "<b-list-group-item>" +
                        this.items[i].deseos[j].nombre_producto +
                        " ₡" +
                        this.items[i].deseos[j].precio_producto +
                        "</b-list-group-item>";
                }
                html += "</b-list-group>";
                console.log(html);
                this.items[i].deseos = html;
            }
        },
        print() {
            window.print();
        },
        getFormatoFecha() {
            let current_datetime = new Date()
            let formatted_date =
                current_datetime.getDate() +
                "-" +
                (current_datetime.getMonth() + 1) +
                "-" +
                current_datetime.getFullYear() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes();
            this.fecha = formatted_date
        },
        generar() {
            this.getCompras();
            this.modalShow = false;
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

.list {
    display: flex;
    flex-direction: column;
}

.itemList {
    background-color: transparent;
}

.precio {
    border: solid 1px rgb(184, 184, 184);
    border-radius: 3px;
    padding: 5px;
    margin: 2px;
}
</style>
