<template>
<div class="contenedor" id="divProductos">
    <div>
        <b-form-select id="selectCategoria" v-model="selected" :options="categorias" class="mb-3" @change="buscarProductos()"></b-form-select>
        <input type="search" id="buscar" @keyup="buscarProductos()" class="fadeIn second" name="buscar" placeholder="Buscar" required />
    </div>

    <div class="contenedor_productos" v-for="producto in productos" :key="producto.producto_id">
        <b-card id="card" v-bind:title="producto.nombre" v-bind:img-src="producto.foto" img-alt="Image" img-height="350" img-top tag="article" style="max-width: 20rem" class="mb-2">
            <b-card-text> Monto:{{producto.precio}} </b-card-text>
                <div>
                    <b-form-checkbox v-model="checked" v:name="check-button" switch>
                    
                    </b-form-checkbox>
                </div>
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
    }),
    mounted() {
        this.getProductos();
        this.getCategorias();
    },
    methods: {
        buscarProductos() {
            var buscar = document.getElementById("buscar").value;
            var selectionarCategoria = document.getElementById("selectCategoria").value;
            var ur = ""
            console.log(ur);
            if (buscar.length != 0 && selectionarCategoria.length != 0) {
                ur = "get_productosTiendas/" + '1' + '/' + buscar + '/' + selectionarCategoria;
            } else if (buscar.length != 0 && selectionarCategoria.length == 0) {
                ur = "get_productosTiendas/" + '1' + '/' + buscar;
            } else if (buscar.length == 0 && selectionarCategoria.length != 0) {
                ur = "get_productosTiendas/" + '1' + '/' + selectionarCategoria;
            } else {
                ur = ur = "get_productosTiendas/" + '1';
            }
            axios
                .get(process.env.VUE_APP_API_URL + ur)
                .then((respose) => {
                    this.productos = respose.data;
                    console.log(this.productos);
                });

        },
        getProductos() {
            axios
                .get(process.env.VUE_APP_API_URL + "get_productosTiendas/1")
                .then((respose) => {
                    this.productos = respose.data;
                    console.log(this.productos);
                });
        },
        getCategorias() {
            axios
                .get(process.env.VUE_APP_API_URL + "get_categorias/1")
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
