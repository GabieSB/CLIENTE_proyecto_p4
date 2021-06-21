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
                        <em>Deseos</em>
                    </template>
                    <b-dropdown-item id='menuDeseos' v-for="d in deseos" :key="d.nombre">
                        <b-col @click="irProductoDeseo(d.producto)">
                            <b-img thumbnail fluid v-bind:src='d.fotoSRC' alt="Image 1" style="max-width: 4rem;"></b-img>{{d.nombre}}
                        </b-col>
                    </b-dropdown-item>
                </b-nav-item-dropdown>
                 <b-nav-item-dropdown>
                    <template #button-content>
                        <em>Susb</em>
                    </template>
                     <b-dropdown-item id='menuDeseoxs' v-for="d in suscripcion" :key="d.tienda">
                        <b-col @click="irTienda(d.tienda)">
                            <b-img thumbnail fluid v-bind:src='d.fotoSRC' alt="Image 1" style="max-width: 4rem;"></b-img>{{d.nombre}}
                        </b-col>
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
        suscripcion:[]
    }),
    mounted() {
        //  this.getComprador();
        this.getDeseo();
        this.getSuscripcion();
    },
    methods: {
        irProductoDeseo(idProducto) {
            localStorage.setItem("id_producto", idProducto);
             this.$router.push("ProductosDescripcion").catch(err=>{});
        },
         irTienda(id) {
            localStorage.setItem('id_tienda',id);
            this.$router.push("Tiendas");

        },
        getDeseo() {
            //   alert('eee');
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
            }

    }
};
</script>

<style>
#menuDeseos:hover {
    background: #ccc;
}
</style>
