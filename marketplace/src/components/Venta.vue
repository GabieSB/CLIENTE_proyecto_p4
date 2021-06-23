<template>
<div class="container-fluid">
    <h1>Listas de productos</h1>
    <div>
        <b-table striped hover :items="carrito">

        </b-table>
    </div>
    <b-row>
        <b-col>
            <label>
                <h3>Formas de pago</h3>
            </label>
            <b-form-select id="fmPago" v-model="selected" :options="formaPago" class="mb-3"></b-form-select>
        </b-col>
        <b-col>
            <label>
                <h3>Dirreción de envio</h3>
            </label>
            <b-form-select id="selectFormaPago" v-model="selected2" :options="dirrecionEnvio" class="mb-3"></b-form-select>
        </b-col>
        <b-button variant="danger" @click="comprar()">Comprar</b-button>
    </b-row>
</div>
</template>

<script>
import axios from "axios";;

export default {
    setup() {},

    name: "Venta",
    data: () => ({
        carrito: [],
        selected: null,
        formaPago: [],
        selected2: null,
        dirrecionEnvio: [],
        imagenes: []
    }),
    mounted() {
        this.getCarrito();
        this.getFormasPago();
        this.getDirrecionEnvio();
    },
    methods: {
        getCarrito() {
            axios.get(process.env.VUE_APP_API_URL + 'get_miCarrito/' + localStorage.getItem('comprador_id'))
                .then((respose) => {
                    this.imagenes = respose.data;
                    this.getPhotoPreview();
                    var aux = [];
                    var cont = 0;
                    for (var x of respose.data) {
                        var total = x.precio * x.cantidad;
                        aux[cont] = {
                            Producto: x.nombre,
                            Descripción: x.descripcion,
                            ValorUnidad: x.precio,
                            Cantidad: x.cantidad,
                            Total: total

                        }
                        cont++;
                    }
                    this.carrito = aux;

                })
        },
        getFormasPago() {
            axios
                .get(process.env.VUE_APP_API_URL + "get_formaPago/" + localStorage.getItem('comprador_id'))
                .then((response) => {
                    var aux = [];
                    aux[0] = {
                        value: null,
                        text: "Selecionar metodo de pago"
                    }
                    var cont = 1;
                    for (var x of response.data) {
                        this.selected,
                            aux[cont] = {
                                value: x.formaPago_id,
                                text: x.numeroTarjeta
                            };
                        console.log(this.aux);
                        cont++;
                    }
                    console.log(this.aux);
                    this.formaPago = aux;

                });
        },
        getDirrecionEnvio() {
            axios
                .get(process.env.VUE_APP_API_URL + "get_DirrecionEnvio/" + localStorage.getItem('comprador_id'))
                .then((response) => {
                    var aux = [];
                    aux[0] = {
                        value: null,
                        text: "Selecione una dirreción"
                    }
                    var cont = 1;
                    for (var x of response.data) {
                        this.selected2,
                            aux[cont] = {
                                value: x.envio_id,
                                text: x.pais + ',' + x.provincia + ',' + x.canton + '-#' + x.casillero
                            };
                        console.log(this.aux);
                        cont++;
                    }
                    console.log(this.aux);
                    this.dirrecionEnvio = aux;

                });
        },
        getPhotoPreview() {
            for (var i = 0; i < this.imagenes.length; i++) {
                if (this.imagenes[i].foto.length > 0) {
                    this.imagenes[i].fotoSRC =
                        process.env.VUE_APP_API_URL + "get_foto/" + this.imagenes[i].foto;
                }
            }
        },
        comprar(){
              var formaPago = document.getElementById("fmPago").value
                 axios.get(process.env.VUE_APP_API_URL + 'get_comprar/' + localStorage.getItem('comprador_id')+'/'+formaPago)
                .then((respose) => {
                })
        }
        

    }

};
</script>

<style scoped>

</style>
