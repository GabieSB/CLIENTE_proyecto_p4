<template>
<div class="contenedor" id="divProductos">
    <div>
        <b-form-select id="selectCategoria" v-model="selected" :options="categorias" class="mb-3" @change="buscarProductos()"></b-form-select>
        <input type="search" id="buscar" @keyup="buscarProductos()" class="fadeIn second" name="buscar" placeholder="Buscar" required />
    </div>

    <div class="contenedor_productos" v-for="producto in productos" :key="producto.producto_id">
        <!--b-card id="card" @click="irDescripcioProducto(producto.producto_id)" v-bind:title="producto.nombre" v-bind:img-src="producto.fotoSRC" img-alt="Image" img-height="250" img-width="250" img-top tag="article" style="max-width: 20rem" class="mb-2">
            <b-card-text> Monto:{{producto.precio}} </b-card-text>
            <template>
                <div>
                    <b-form-rating v-model="value"></b-form-rating>
                    <p class="mt-2">Value:{{value}}</p>
                </div>
            </template>

        </b-card-->
        <b-card id='card-producto' @click="irDescripcioProducto(producto.producto_id)" v-bind:img-src="producto.fotoSRC" v-model="producto.producto_id" img-alt="Image" img-top tag="article" class="card mb-2">
            <h5 class="title">{{ producto.nombre }}</h5>
            <p style="width: 200px" class="detalle-producto">
                {{ producto.descripcion }}
            </p>
            <div class="data-producto my-1">
                <b-card-text class="detalle-producto">
                    Precio: ₡{{ producto.precio }}
                </b-card-text>
                <b-card-text class="detalle-producto">
                    Stock: {{ producto.cantidad }} unid.
                </b-card-text>
                <b-card-text class="detalle-producto">
                    Promedio de envío: {{ producto.prom_envio }}
                </b-card-text>
                <b-card-text class="detalle-producto">
                    Costo envio: ₡{{ producto.cost_envio }}
                </b-card-text>
                <b-card-text v-if="producto.oferta > 0" class="detalle-producto">
                    Precio oferta:{{ producto.oferta }}
                </b-card-text>
            </div>
            <b-form-rating variant="warning" v-model="producto.calificacion" readonly></b-form-rating>

            <p style="width: 200px" class="detalle-producto mt-1">
                📍
                {{
            producto.pais + ", " + producto.provincia + ", " + producto.canton
          }}
            </p>
            <small class="text-muted">Publicado: {{ producto.publicacion }}</small>

        </b-card>
    </div>
</div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
export default {
    name: "productosTiendas",
    data: () => ({
        productos: [],
        selected: null,
        categorias: [],
        value: null
    }),
    mounted() {
        this.getCategorias();
        this.getProductos();

    },
    methods: {

        irDescripcioProducto(idProducto) {
            localStorage.setItem("id_producto", idProducto);
            //this.$router.push(() => {});
            // this.$router.push("ProductosDescripcion").catch(err=>{});
            this.$router.push("ProductosDescripcion")

        },
        buscarProductos() {
            //  var aux = this.$store.getters.tiendaSelecionada;
            var aux = localStorage.getItem('id_tienda');
            var buscar = document.getElementById("buscar").value;
            var selectionarCategoria = document.getElementById("selectCategoria").value;
            var ur = ""
            console.log(ur);
            if (buscar.length != 0 && selectionarCategoria.length != 0) {
                ur = "get_productosTiendas/" + aux + '/' + buscar + '/' + selectionarCategoria;
            } else if (buscar.length != 0 && selectionarCategoria.length == 0) {
                ur = "get_productosTiendas/" + aux + '/' + buscar;
            } else if (buscar.length == 0 && selectionarCategoria.length != 0) {
                ur = "get_productosTiendas/" + aux + '/' + selectionarCategoria;
            } else {
                ur = ur = "get_productosTiendas/" + aux;
            }
            axios
                .get(process.env.VUE_APP_API_URL + ur)
                .then((respose) => {
                    this.productos = respose.data;
                    console.log(this.productos);
                    this.getPhotoPreview();
                });

        },
        getProductos() {
            var aux = localStorage.getItem('id_tienda');
            console.log("Hola" + aux);
            axios
                .get(process.env.VUE_APP_API_URL + "get_productosTiendas/" + aux)
                .then((respose) => {
                    console.log(this.$store.state.tienda);
                    this.productos = respose.data;
                    console.log(this.productos);
                    this.getPhotoPreview();
                });
        },
        getPhotoPreview() {
            for (var i = 0; i < this.productos.length; i++) {
                if (this.productos[i].foto.length > 0) {
                    this.productos[i].fotoSRC =
                        process.env.VUE_APP_API_URL + "get_foto/" + this.productos[i].foto;
                }
            }
        },
        getCategorias() {
            axios
                .get(process.env.VUE_APP_API_URL + "get_categorias2/1")
                .then((response) => {
                    var aux = [];
                    aux[0] = {
                        value: null,
                        text: "Selecione una categoria"
                    }
                    var cont = 1;
                    for (var x of response.data) {
                        this.selected,
                            aux[cont] = {
                                value: x.categoria_id,
                                text: x.categoria
                            };
                        console.log(this.aux);
                        cont++;
                    }
                    console.log(this.aux);
                    this.categorias = aux;

                });

        },
    },
};
</script>

<style>
#card-producto img {
    height: 140px;
    width: auto;
    padding: 5px;
    border-radius: 10px;
}

.card {
    height: auto;
    width: auto;
    font-size: 14px;
    background: rgb(255, 255, 255);
    border: solid 2px rgb(205, 206, 206);
}

.data-producto {
    background-color: rgb(57, 105, 131);

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
    border-radius: 10px;
    color: white;
}

.detalle-producto {
    padding: 0;
    margin: 0;
}

.card:hover {
    cursor: pointer;
    background: rgb(238, 238, 238);
}

.contenedor_productos {
    float: left;
    padding-left: 80px;
    padding-top: 15px;
}

.btn-actions {
    padding: 0 8px;
}

.actions {
    margin: 5px;
}

.card-body {
    padding-top: 3px;
    padding-bottom: 3px;
}
</style>
