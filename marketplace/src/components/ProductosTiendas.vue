<template>
<div class="contenedor" id="divProductos">
    <div>
        <b-form-select v-model="selected" :options="options"></b-form-select>
        <input type="search" id="buscar" class="fadeIn second" name="buscar" placeholder="Buscar" required />
    </div>
</div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

export default {
    name: "productosTiendas",
    data: () => ({
        categorias: [],
    }),
      mounted() {
        this.getCategorias();
    },
     methods: {
         getCategorias() {
             axios.get(process.env.VUE_APP_API_URL + 'get_categorias/1')
                 .then((respose) => {
                     this.categorias = respose.data;
                     console.log(this.categorias[0]);
                 })

         }
     },
     dato(){
         return{
             selected:null,
             options: [{value:null,text:'HOLA'}]
         }
     }
}
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
</style>
