<template>
<div id="contenedor">
    <b-container id='galeria'>
        <b-row>
            <b-col>
                <b-col v-for="foto in imagensProd" :key="foto.foto_id">
                    <b-img @click="actualizarFoto(foto.url)" class="img_galeria" thumbnail fluid v-bind:src="foto.url" alt="Image 1" width=100></b-img>
                </b-col>
            </b-col>
            <b-col>
                <b-img id="img_muestra" center src="" alt="Image 1" width=350></b-img>
            </b-col>
            <b-col>
                <b-card v-for="producto in productoSelecionado" :key="producto.producto_id" width=250 heigth=250>
                <template #header>
                    <h4 class="mb-0">
                        <h1>{{producto.nombre}}</h1>
                    </h4>
                </template>
                <b-card-text>
                    <h4> valor unida:{{producto.precio}}</h4>
                    <h4> valor oferta:{{producto.oferta}}</h4>
                    <h4>unidades disponibles:{{producto.cantidad}}</h4>

                </b-card-text>
                <b-card-text> Descripcion del producto:
                    <li> {{producto.descripcion}}</li>
                </b-card-text>
                <b-card-text>
                    Fecha publicación:{{producto.publicacion}}
                </b-card-text>
                <b-card-text>
                    <h5>Ubicación:{{producto.pais}},{{producto.provincia}},{{producto.canton}}</h5>
                </b-card-text>

                </b-card>
            </b-col>
              <b-col>
                    <b-card  v-for="producto in productoSelecionado" :key="producto.producto_id">

                        <b-card-text>
                            Duración del envio:{{producto.prom_envio}} dias
                        </b-card-text>
                        <b-card-text>
                            <template>
                                <div>
                                    <h4>Calificar:</h4>
                                    <b-form-rating id="rating-inline" v-model="value" variant="warning"></b-form-rating>
                                     <p class="mt-2">Value: {{ value }}</p>
                                   
                                </div>
                            </template>
                        </b-card-text>
                        <div id="contendor_botones">
                            <b-button squared variant="primary" @click=" irPregunta()">Comentar</b-button><br>
                            <b-button squared>Agregar al Carrito</b-button>
                            <br>
                            <b-button squared variant="primary" @click="irCompra()" >Comprar ahora</b-button>
                        </div>
                    </b-card>
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
        value:0,

    }),
    mounted() {
        this.getProductoSeleccionado();
        this.getFotos();

    },
    methods: {
        irCompra(){
             this.$router.push("CompraCrud");
        },
        irPregunta(){
             this.$router.push("PreguntaCrud");
        },
        getEstrellas(){
            alert("s");
         //   console.log(this.value+"dd");
        },
        getFotos() {
            var a = localStorage.getItem('id_producto');
            axios.get(process.env.VUE_APP_API_URL + 'get_fotosProductos/' + a)
                .then((respose) => {
                    this.imagensProd = respose.data;
                    var imagen = document.getElementById("img_muestra");
                    imagen.src = this.imagensProd[0].url;
                    console.log(this.imagensProd);
                })
        },
        getProductoSeleccionado() {
            var a = localStorage.getItem('id_producto');
            axios.get(process.env.VUE_APP_API_URL + 'get_productoSelecionado/'+a)
                .then((respose) => {
                    this.productoSelecionado = respose.data;
                    console.log(this.productoSelecionado);
                })
        },
        actualizarFoto(url) {
            var imagen = document.getElementById("img_muestra");
            imagen.src = url;
        }
    }
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
#contenedor{
    background: #ccc;
}
</style>
