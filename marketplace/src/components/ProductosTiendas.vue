<template>
<div class="contenedor" id="divProductos">
    <div>
        <b-form-select id="selectCategoria" v-model="selected" :options="categorias" class="mb-3" @change="buscarProductos()"></b-form-select>
        <input type="search" id="buscar" @keyup="buscarProductos()" class="fadeIn second" name="buscar" placeholder="Buscar" required />
    </div>

    <div class="contenedor_productos" v-for="producto in productos" :key="producto.producto_id">
        <b-card id="card" @click="irDescripcioProducto(producto.producto_id)" v-bind:title="producto.nombre" v-bind:img-src="producto.fotoSRC" img-alt="Image" img-height="250" img-width="250" img-top tag="article" style="max-width: 20rem" class="mb-2">
            <b-card-text> Monto:{{producto.precio}} </b-card-text>
            <template>
                <div>
                    <b-form-rating v-model="value"></b-form-rating>
                    <p class="mt-2">Value:{{value}}</p>
                </div>
            </template>

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
            //this.$store.state.producto = idProducto;
            localStorage.setItem("id_producto", idProducto);
            this.$router.push("ProductosDescripcion");
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
#divProductos {
    text-align: center;
}

#divProductos.left {
    float: left;
    background: rgb(17, 17, 53);
}

.cads-productos {
    float: left;
    padding-left: 80px;
    padding-top: 15px;
}

#card:hover {
    cursor: pointer;
}

.contenedor_productos {
    float: left;
    padding-left: 80px;
    padding-top: 15px;
}
</style>
