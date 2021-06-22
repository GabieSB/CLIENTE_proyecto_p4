<template>
<div>
    <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">
            <b-button variant="dark" v-b-toggle.sidebar-no-header>
                <b-icon icon="list"></b-icon>
            </b-button>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item href="#">Link</b-nav-item>

            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">

                <b-nav-item-dropdown right>
                    <!-- Using 'button-content' slot -->
                    <template #button-content>
                        <em>User</em>
                    </template>
                    <b-dropdown-item href="#">Profile</b-dropdown-item>
                    <b-dropdown-item href="#">Sign Out</b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item-dropdown>
                    <template #button-content>
                        <em @click="getDeseo()">Deseo</em>
                    </template>
                    <b-dropdown-item id='menuDeseos' v-for="d in deseos" :key="d.nombre">
                        <!--  {{getDeseo()}}-->

                        <b-col @click="irProductoDeseo(d.producto)">
                            <b-img thumbnail fluid v-bind:src='d.fotoSRC' alt="Image 1" style="max-width: 4rem;"></b-img>{{d.nombre}}
                        </b-col>

                    </b-dropdown-item>

                </b-nav-item-dropdown>
                <b-nav-item-dropdown>
                    <template #button-content>
                        <em @click="getSuscripcion()">Suscripcion</em>
                    </template>
                    <b-dropdown-item>
                        <!-- {{getSuscripcion()}}-->
                        <div id='menuDeseoxs' v-for="d in suscripcion" :key="d.tienda">
                            <b-col @click="irTienda(d.tienda)">
                                <b-img thumbnail fluid v-bind:src='d.fotoSRC' alt="Image 1" style="max-width: 4rem;"></b-img>{{d.nombre}}
                            </b-col>
                        </div>
                    </b-dropdown-item>

                </b-nav-item-dropdown>
                <b-nav-item-dropdown>
                    <template #button-content>
                        <em @click="getCarrito()">Carrito</em>
                    </template>

                    <b-dropdown-item>
                        <!--  {{getCarrito()}}-->
                        <div id='menuDeseoxs' v-for="d in carrito" :key="d.producto">
                            <b-col>
                                <b-img thumbnail fluid v-bind:src='d.fotoSRC' alt="Image 1" style="max-width: 4rem;"></b-img>{{d.nombre}}
                                <b-button squared variant="danger" @click="eliminarCarrito(d.producto)">x</b-button>
                                <b-button squared variant="primary" @click="irCompra()">E</b-button>
                            </b-col>
                        </div>
                        <b-button squared variant="primary">Comprar todo</b-button>
                    </b-dropdown-item>

                </b-nav-item-dropdown>

            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</div>
</template>

<script>
import axios from "axios";
export default {
    name: "Header",
    data: () => ({
        deseos: [],
        suscripcion: [],
        carrito: []
    }),
    mounted() {
        this.getDeseo();
        this.getSuscripcion();
        this.getCarrito();
    },
    methods: {
        irProductoDeseo(idProducto) {
            localStorage.setItem("id_producto", idProducto);
            this.$router.push("ProductosDescripcion").catch(err => {});
        },
        irTienda(id) {
            localStorage.setItem('id_tienda', id);
            this.$router.push("Tiendas");

        },
        getDeseo() {
            // alert('eee');
            axios.get(process.env.VUE_APP_API_URL + 'get_misDeseos/' + localStorage.getItem('comprador_id'))
                .then((respose) => {
                    this.deseos = respose.data;
                    this.getPhotoPreview();

                })
        },
        getPhotoPreview() {
            for (var i = 0; i < this.deseos.length; i++) {
                if (this.deseos[i].foto.length > 0) {
                    this.deseos[i].fotoSRC =
                        process.env.VUE_APP_API_URL + "get_foto/" + this.deseos[i].foto;

                }
            }
        },
        getSuscripcion() {
            //   alert('eee');
            axios.get(process.env.VUE_APP_API_URL + 'get_miSuscripcion/' + localStorage.getItem('comprador_id'))
                .then((respose) => {
                    this.suscripcion = respose.data;
                    this.getPhotoSuscripcion();
                })
        },
        getPhotoSuscripcion() {
            for (var i = 0; i < this.suscripcion.length; i++) {
                if (this.suscripcion[i].foto.length > 0) {
                    this.suscripcion[i].fotoSRC =
                        process.env.VUE_APP_API_URL + "get_foto/profiles/" + this.suscripcion[i].foto;

                }
            }
        },
        getCarrito() {
            axios.get(process.env.VUE_APP_API_URL + 'get_miCarrito/' + localStorage.getItem('comprador_id'))
                .then((respose) => {
                    this.carrito = respose.data;
                    this.getPhotoCarrito();
                })
        },
        getPhotoCarrito() {
            for (var i = 0; i < this.carrito.length; i++) {
                if (this.carrito[i].foto.length > 0) {
                    this.carrito[i].fotoSRC =
                        process.env.VUE_APP_API_URL + "get_foto/" + this.carrito[i].foto;

                }
            }
        },
        eliminarCarrito(idProducto){
            alert('DD');
              axios.delete(process.env.VUE_APP_API_URL + "eliminar_carrito/" +
                    localStorage.getItem('comprador_id') + '/' +idProducto).then((respose) => {
                    this.getCarrito();
                });
        }
    }
};
</script>

<style>
#menuDeseos:hover {
    background: #ccc;
}
</style>
