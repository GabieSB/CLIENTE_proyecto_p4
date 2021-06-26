<template>
<div>
    <div class="d-flex justify-content-center my-3" >
          <h1>Productos más vendidos</h1>
    </div>
  
    <b-container-fluid >
        
        <div id="carouselProdutos" v-for="producto in productosVendidos" :key="producto.producto_id">
            <b-card id='card-producto' @click="irDescripcioProducto(producto.producto_id)" v-bind:img-src="producto.fotoSRC" v-model="producto.producto_id" img-alt="Image" img-top tag="article" class="card mb-2">
                <h5 class="title">{{ producto.nombre }}</h5>
                <p style="width: 200px" class="detalle-producto">
                    {{ producto.descripcion }}
                </p>
                <div class="data-producto my-1">
                    <b-card-text class="detalle-producto">
                        Precio: ₡{{ producto.precio }}
                    </b-card-text>
                    <b-card-text v-if="producto.oferta > 0" class="detalle-producto">
                        Precio oferta: ₡{{ producto.oferta}}
                    </b-card-text>
                    <b-card-text class="detalle-producto">
                        Vendidos: {{ producto.vendidos}}
                    </b-card-text>
                    
                  
                </div>
            </b-card>
        </div>
    </b-container-fluid>
</div>
</template>

<script>
import axios from "axios";;

export default {
    setup() {},

    name: "Carusel",
    data: () => ({
        productosVendidos: [],
    }),
    mounted() {
        this.getProductosVendidos();
    },
    methods: {
        getProductosVendidos() {
            axios.get(process.env.VUE_APP_API_URL + 'get_productosMasVendidos')
                .then((respose) => {
                    this.productosVendidos = respose.data;
                    this.getPhotoPreview();
                    this.getFormatoFecha();
                });
        },
        getPhotoPreview() {
            for (var i = 0; i < this.productosVendidos.length; i++) {
                if (this.productosVendidos[i].foto.length > 0) {
                    this.productosVendidos[i].fotoSRC =
                        process.env.VUE_APP_API_URL + "get_foto/" + this.productosVendidos[i].foto;
                }
            }

        },
        getFormatoFecha() {

            for (var i = 0; i < this.productosVendidos.length; i++) {
                let current_datetime = new Date(this.productosVendidos[i].publicacion)
                let formatted_date = current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear()
                this.productosVendidos[i].fechaFormato = formatted_date;
            }
        },
        irDescripcioProducto(idProducto) {
            localStorage.setItem("id_producto", idProducto);
            this.$router.push("ProductosDescripcion")

        }

    }
}
</script>

<style>
#carouselProdutos {
    float: left;
    padding-left: 90px;
}

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
