<template>
<div class="container-fluid">
    <h1>Listas de productos</h1>
    <div>
        <b-table striped hover :items="carrito">
            <template #cell(Acciones)="data">
                <b-button size="sm" variant="danger" @click="eliminarProductoCarrito(data.value)">Eliminar
                </b-button>
            </template>
            <template #cell(imagen)="data2">
                <b-img v-bind:src='data2.value' fluid alt="Fluid image" heigth=75 width=70></b-img>
            </template>
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
            <b-form-select id="dirrecion" v-model="selected2" :options="dirrecionEnvio" class="mb-3"></b-form-select>
        </b-col>

    </b-row>
    <b-row>
        <b-col>
            <input type="text" id="cvv" class="fadeIn second" name="cvv" placeholder="cvv" required /></b-col>
        <b-col>
            <b-button variant="danger" @click="comprar()" v-if="carrito.length">Comprar</b-button>
        </b-col>

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
                    this.carrito = respose.data;
                    var aux = [];
                    var cont = 0;
                    for (var x of respose.data) {
                        var total = x.precio * x.cantidad;
                        var va = this.getPhotoPreview(x.foto);
                        aux[cont] = {
                            Producto: x.nombre,
                            imagen: va,
                            Descripción: x.descripcion,
                            ValorUnidad: x.precio,
                            Cantidad: x.cantidad,
                            Total: total,
                            Acciones: x.producto,

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
        getPhotoPreview(x) {
            return process.env.VUE_APP_API_URL + "get_foto/" + x;
        },
        comprar() {

            self = this;
            this.$alertify.confirm('¿Desea comprar los productos?',
                function () {
                    self.realizarCompra()
                },
                function () {}
            );

        },
        realizarCompra() {

            var formaPago = document.getElementById("fmPago").value;
            var cv = document.getElementById("cvv").value;
            var dirrecion = document.getElementById("dirrecion").value;
            axios.get(process.env.VUE_APP_API_URL + 'get_comprar/' + localStorage.getItem('comprador_id') + '/' + formaPago + '/' + cv + '/' + dirrecion)
                .then((respose) => {
                    //  alert(respose.data)

                    localStorage.setItem('factura_id', respose.data[1])
                    this.getCarrito();
                  
                    let routeUrl = this.$router.resolve({
                        path: "/reporte-factura",
                    });

                    window.open(routeUrl.href, '_blank');
                })
        },
        eliminarProductoCarrito(idProducto) {
            self = this;
            this.$alertify.confirm('¿Desea eliminar el producto del carrito de compra?',
                function () {
                    self.eliminar(idProducto);
                },
                function () {});
        },
        eliminar(idProducto) {
            axios.delete(process.env.VUE_APP_API_URL + "eliminar_carrito/" +
                localStorage.getItem('comprador_id') + '/' + idProducto).then((respose) => {
                this.getCarrito();
            });
        }

    }

};
</script>

<style scoped>

</style>
