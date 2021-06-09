<template>
<div class="contenedor" id="divTienda">
    <div>
        <div class="cads-tienda" v-for="tienda in tiendas" :key="tienda.tienda_id">

            <b-card v-bind:title="tienda.nombre" img-src="https://picsum.photos/600/300/?image=25" img-alt="Image" img-top tag="article" style="max-width: 20rem;" class="mb-2">
                <b-card-text>
                    {{tienda.descripcion}}
                </b-card-text>
                <b-card-text>
                    {{tienda.pais}} {{tienda.provincia}} {{tienda.canton}}
                </b-card-text>
                  <b-button variant="primary" @click="irTienda()">ir</b-button>
                
            </b-card>
        </div>
    </div>
</div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

export default {
    name: "ListTiendas",

    components: {

    },
    data: () => ({
        tiendas: [],

    }),
    mounted() {
        this.getTiendas();
    },
    methods: {
        irTienda() {
            this.$router.push("Tiendas");

        },
        getTiendas() {
            axios.get(process.env.VUE_APP_API_URL + 'get_tiendas/')
                .then((respose) => {
                    this.tiendas = respose.data;
                    console.log(this.tiendas[0]);
                    console.log(this.tiendas[1].tienda_descripcion);
                })

        }
    },
    props:{
        title:String
    }

}
</script>

<style>
#divTienda {
    text-align: center;

}

#divTienda.left {
    float: left;
    background: rgb(17, 17, 53);
}

.cads-tienda {
    float: left;
    padding-left: 80px;
    padding-top: 15px;

}
</style>
