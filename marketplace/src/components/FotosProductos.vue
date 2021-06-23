<template>
<div id="contenedor">
    <b-container bg-variant="primary" text-variant="dark">
        <b-row>
            <b-col cols="12" md="3">
                <b-row>
                    <b-img id="img_muestra" center src="" alt="Image 1" heigth=75 width=320></b-img>
                </b-row>
                <b-row>
                    <b-col v-for="foto in imagensProd" :key="foto.foto_id" md="3">
                        <b-img @click="actualizarFoto(foto.fotoSRC)" class="img_galeria" thumbnail fluid v-bind:src="foto.fotoSRC" alt="Image 1" width=100></b-img>
                    </b-col>
                </b-row>
            </b-col>
            <b-col cols="6" md="7" v-for="producto in productoSelecionado" :key="producto.producto_id">
                <b-row>
                    <div>
                        <h1> {{producto.nombre}}</h1>
                    </div>
                </b-row>
                <b-row>
                    <b-col>
                        <h1> {{producto.descripcion}}</h1>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        Fecha publicación:{{producto.fechaFormater}}</b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <h4> Precio:${{producto.precio}}</h4>
                        <h4> Precio oferta:${{producto.oferta}}</h4>
                        <h4>Stock:{{producto.cantidad}}</h4>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col md="3">
                        <b-form-rating id="rating-inline" v-model="value" variant="warning" @change="setEditarCalificacion()"></b-form-rating>
                    </b-col>
                    <b-col>
                        <b-form-checkbox @change="cambiar()" id="susb" switch size="lg" v-model="status" value="accepted" unchecked-value="not_accepted">Agregar deseo</b-form-checkbox>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col md="8">
                        <h5>Dirreción fisica:{{producto.pais}},{{producto.provincia}},{{producto.canton}}</h5>
                        Duración del envio:{{producto.prom_envio}} días
                    </b-col>
                </b-row>
                <b-row>
                    <b-col md="3">
                        <b-button squared variant="primary" @click=" irPregunta()">Comentar</b-button><br>
                    </b-col>
                    <b-col md="4">
                        <!--b-button squared>Agregar al Carrito</b-button-->
                        <b-button v-b-modal.modal-prevent-closingo variant='primary'>Agregar carrito</b-button>
                        <b-modal id="modal-prevent-closingo" ref="modal" title="Cantidad de unidades" @show="resetModal" @hidden="resetModal" @ok="handleOk">
                            <b-form-input id="txtCantidad2" placeholder="Cantidad de productos"  type="number" class="input-field"></b-form-input>
                        </b-modal>
                    </b-col>
                    <br>
                    <b-col md="3">
                        <b-button squared variant="primary" @click="irCompra()">Comprar ahora</b-button>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </b-container>
</div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
export default {
    name: "FotosProductos",
    components: {

    },
    data: () => ({
        productoSelecionado: [],
        imagensProd: [],
        value: null,
        status: 'not_accepted',
        deseos: [],
    }),
    mounted() {
        var a = localStorage.getItem('id_producto');
        this.getDeseo();
        this.getFotos();
        this.getProductoSeleccionado();
        this.getObtenerCalificacion();
    },
    methods: {

        irCompra() {
            this.$router.push("CompraCrud");
        },
        irPregunta() {
            this.$router.push("PreguntaCrud");
        },
        handleOk(bvModalEvt) {
            var objetoReporte = new Object();
            objetoReporte.idComprador = localStorage.getItem('comprador_id');
            objetoReporte.idProducto = localStorage.getItem('id_producto');
            objetoReporte.cantidad = document.getElementById('txtCantidad2').value;
            axios.post(process.env.VUE_APP_API_URL + "agregar_carrito", JSON.stringify(objetoReporte))
                  .then((respose) => {});
        },
        getFotos() {
            var a = localStorage.getItem('id_producto');
            axios.get(process.env.VUE_APP_API_URL + 'get_fotosProductos/' + a)
                .then((respose) => {
                    this.imagensProd = respose.data;
                    console.log(this.imagensProd);
                    this.getPhotoPreview();

                })
        },
        getPhotoPreview() {
            // console.log("in ptp s");
            for (var i = 0; i < this.imagensProd.length; i++) {
                if (this.imagensProd[i].url.length > 0) {
                    this.imagensProd[i].fotoSRC =
                        process.env.VUE_APP_API_URL + "get_foto/" + this.imagensProd[i].url;
                }
            }
            var imagen = document.getElementById("img_muestra");
            imagen.src = this.imagensProd[0].fotoSRC;
        },
        getProductoSeleccionado() {
            var a = localStorage.getItem('id_producto');
            axios.get(process.env.VUE_APP_API_URL + 'get_productoSelecionado/' + a)
                .then((respose) => {
                    this.productoSelecionado = respose.data;
                    this.getFormatoFecha();
                    console.log(this.productoSelecionado);
                })
        },
        actualizarFoto(url) {
            var imagen = document.getElementById("img_muestra");
            imagen.src = url;
        },
        getObtenerCalificacion() {

            var idProducto = localStorage.getItem('id_producto');
            axios.get(process.env.VUE_APP_API_URL + 'get_calificacionProducto/' + localStorage.getItem('comprador_id') + '/' + idProducto)
                .then((respose) => {
                    this.value = respose.data[0].calificacion;
                })
        },
        setEditarCalificacion() {
            var objeto = new Object();
            objeto.idComprador = localStorage.getItem('comprador_id');
            objeto.idProducto = localStorage.getItem('id_producto')
            objeto.calificacion = this.value
            axios.post(process.env.VUE_APP_API_URL + "calificar_producto", JSON.stringify(objeto));

        },
        getFormatoFecha() {

            for (var i = 0; i < this.productoSelecionado.length; i++) {
                let current_datetime = new Date(this.productoSelecionado[i].publicacion)
                let formatted_date = current_datetime.getDate() + "/" + (current_datetime.getMonth() + 1) + "/" + current_datetime.getFullYear()
                this.productoSelecionado[i].fechaFormater = formatted_date;
            }
        },
        getDeseo() {
            axios.get(process.env.VUE_APP_API_URL + 'get_deseo/' + localStorage.getItem('comprador_id') + '/' + localStorage.getItem('id_producto'))
                .then((respose) => {
                    this.deseos = respose.data;
                    // alert(this.subscripcion[0].tienda);
                    this.check();
                })
        },
        check() {
            if (this.deseos != '') {
                this.status = 'accepted';

            } else {
                this.status = 'not_accepted';
            }
        },
        cambiar() {
            if (this.status == 'accepted') {
                var objeto = new Object();
                objeto.idComprador = localStorage.getItem('comprador_id');
                objeto.idProducto = localStorage.getItem('id_producto');
                axios.post(process.env.VUE_APP_API_URL + "agregar_deseo", JSON.stringify(objeto))
                    .then((respose) => {
                        this.getDeseo();
                    });
            } else {
                axios.delete(process.env.VUE_APP_API_URL + "eliminar_deseo/" +
                    localStorage.getItem('comprador_id') + '/' +
                    localStorage.getItem('id_producto')).then((respose) => {
                    this.getDeseo();
                });
            }
        }
    }
    /*
     <b-form-input
                  placeholder="Ingresa la cantidad de tu stock"
                  v-model="form.cantidad"
                  required
                  type="number"
                  class="input-field"
                ></b-form-input>*/
};
</script>

<style>
.img_galeria:hover {
    cursor: pointer;
    background: darkblue;
}

#fProducto {
    padding-top: 10px;
}

#contenedor {
    background: #ccc;
}
</style>
