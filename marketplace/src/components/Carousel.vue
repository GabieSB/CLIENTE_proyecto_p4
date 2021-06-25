<!--template>
<div>
    <b-carousel id="carousel-1" v-model="slide" :interval="4000" controls indicators background="#ababab" img-width="1024" img-height="480" style="text-shadow: 1px 1px 2px #333;" >
      
        <b-carousel-slide>
            <template>
<div id="carouselProdutos">
    <b-card title="Card Title" img-src="https://atamashi.org/wp-content/uploads/2020/01/Plantilla-12.jpg" img-alt="Image" img-top tag="article" style="max-width: 20rem;" class="mb-2">
        <b-card-text>
            Some quick example text to build on the card title and make up the bulk of the card's content.
        </b-card-text>
    </b-card>
</div>
<div id="carouselProdutos">
    <b-card title="Card Title" img-src="https://img.zonared.com/images/noticias/portada/63000/63986-h.jpg" img-alt="Image" img-top tag="article" style="max-width: 20rem;" class="mb-2">
        <b-card-text>
            Some quick example text to build on the card title and make up the bulk of the card's content.
        </b-card-text>
    </b-card>
</div>
<div id="carouselProdutos">
    <b-card title="Card Title" img-src="https://esports.as.com/2019/11/28/bonus/Bulbasaur_1304579536_308516_1024x576.jpg" img-alt="Image" img-top tag="article" style="max-width: 20rem;" class="mb-2">
        <b-card-text>
            Some quick example text to build on the card title and make up the bulk of the card's content.
        </b-card-text>
    </b-card>
</div>

</template>
</b-carousel-slide>
<b-carousel-slide>
    <template v-slot:img>
        <div id="carouselProdutos">
            <b-card title="Card Title" img-src="https://64.media.tumblr.com/c4033944bceb338cfbd98d8c5ef37baa/1abf29658173c51a-22/s2048x3072/2ab7a7e905e7cd7fbffa3c49102a102d1eeeb3a1.png" img-alt="Image" img-top tag="article" style="max-width: 20rem;" class="mb-2">
                <b-card-text>
                    Some quick example text to build on the card title and make up the bulk of the card's content.
                </b-card-text>
            </b-card>
        </div>
        <div id="carouselProdutos">
            <b-card title="Card Title" img-src="https://3.bp.blogspot.com/-hkFnP-cYh1A/UTIjytNLTlI/AAAAAAAAECU/YgdRKzwzUNs/s1600/bwns30203_zpsbf0a2780.png" img-alt="Image" img-top tag="article" style="max-width: 20rem;" class="mb-2">
                <b-card-text>
                    Some quick example text to build on the card title and make up the bulk of the card's content.
                </b-card-text>
            </b-card>
        </div>
        <div id="carouselProdutos">
            <b-card title="Card Title" img-src="https://www.zonared.com/images/juegos/portada/5000/5052-h.jpg" img-alt="Image" img-top tag="article" style="max-width: 20rem;" class="mb-2">
                <b-card-text>
                    Some quick example text to build on the card title and make up the bulk of the card's content.
                </b-card-text>
            </b-card>
        </div>

    </template>
</b-carousel-slide>
</b-carousel>
</div>
</template-->

<template>
    <div>
        <b-carousel id="carousel-1" v-model="slide" :interval="4000" controls indicators background="#ababab" img-width="1024" img-height="480" style="text-shadow: 1px 1px 2px #333;">

            <b-carousel-slide>
                <template v-slot:img>

                    <div id="carouselProdutos">
                        <div id="carouselProdutos" v-for="producto in productosVendido1" :key="producto.producto_id">
                            <b-card id='card-producto' v-bind:img-src="producto.fotoSRC" v-model="producto.producto_id" img-alt="Image" img-top tag="article" class="card mb-2">
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
                            </b-card>
                        </div>
                    </div>
                </template>
            </b-carousel-slide>
            <b-carousel-slide>
                <template v-slot:img>

                    <div id="carouselProdutos">
                        <div id="carouselProdutos" v-for="producto in productosVendidos2" :key="producto.producto_id">
                            <b-card id='card-producto' v-bind:img-src="producto.fotoSRC" v-model="producto.producto_id" img-alt="Image" img-top tag="article" class="card mb-2">
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
                                        Costo envio: ₡{{ producto.cost_envio}}
                                    </b-card-text>
                                    <b-card-text v-if="producto.oferta > 0" class="detalle-producto">
                                        Precio oferta:{{ producto.oferta}}
                                    </b-card-text>
                                </div>
                            </b-card>
                        </div>
                    </div>
                </template>
            </b-carousel-slide>
        </b-carousel>
    </div>
</template>

<script>
import axios from "axios";;

export default {
    setup() {},

    name: "Carusel",
    data: () => ({
        productosVendidos: [],
        productosVendidos2: [],
        productosVendidos1: []
    }),
    mounted() {
        this.getProductosVendidos();
        this.odernar();
    },
    methods: {
        getProductosVendidos() {
            axios.get(process.env.VUE_APP_API_URL + 'get_productosMasVendidos')
                .then((respose) => {
                    this.productosVendidos = respose.data;
                    /* var cont = 1;
                     var aux = 0;
                     var aux1 = 0;
                     var aux2 = 0;
                     if (respose.data.length % 2 == 1) {
                         aux = (respose.data.length) + 1;
                         aux = aux / 2;
                     } else {
                         aux = (respose.data.length) / 2
                     }
                     for (var x of respose.data) {
                         if (cont <= aux) {
                             this.productosVendidos[aux1] = x;
                             alert(this.productosVendidos[aux1].nombre)
                             aux1++;
                             cont++;
                         } else {
                             this.productosVendidos2[aux2] = x;
                             alert(this.productosVendidos[aux2].nombre)
                             aux2++;
                             cont++;
                         }

                     }*/
                    this.getPhotoPreview();
                    this.odernar();
                });
        },
        odernar() {
            
            var cont = 1;
            var aux = 0;
            var aux1 = 0;
            var aux2 = 0;
            if (this.productosVendidos.length%2 == 1) {
                aux = (this.productosVendidos.length) + 1;
                aux = aux / 2;
            } else {
                aux = (this.productosVendidos) / 2
            }
            for (var x=0;x< this.productosVendidos.length;x++) {
                if (cont <= aux) {
                    this.productosVendidos1[aux1] =this.productosVendidos[x];
                  //  alert(this.productosVendidos1[aux1].nombre)
                    aux1++;
                    cont++;
                } else {
                    this.productosVendidos2[aux2] =this.productosVendidos[x];
                  // alert(this.productosVendidos2[aux2].nombre);
                    aux2++;
                    cont++;
                }

            }
        },
        getPhotoPreview() {
            for (var i = 0; i < this.productosVendidos.length; i++) {
                if (this.productosVendidos[i].foto.length > 0) {
                    this.productosVendidos[i].fotoSRC =
                        process.env.VUE_APP_API_URL + "get_foto/" + this.productosVendidos[i].foto;
                }
            }
           
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
