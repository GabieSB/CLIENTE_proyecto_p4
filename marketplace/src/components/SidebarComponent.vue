<template>
<div>
    <b-sidebar id="sidebar-no-header" aria-labelledby="sidebar-no-header-title" no-header shadow bg-variant="dark" text-variant="light" backdrop backdrop-variant="dark">
        <template #default="{ hide }">
            <div class="p-3">
                <div class="d">
                    <b-avatar ref="profPic" size="6rem"></b-avatar>
                    <label ref="username" id="username"></label>
                    <b-button title="Editar mi perfil de usuario" @click="editProfile()">✏️</b-button>
                    <h4 id="sidebar-no-header-title">Menú</h4>
                    <div class="divider-menu"></div>
                </div>

                <nav class="mb-3">
                    <b-nav vertical v-if="tipoUsuario!='c'">
                        <b-button @click="goReporteCompras()">Reporte Compras</b-button>
                        <br>
                        <b-button @click="goReporteSuscripciones()">Reporte Subscripciones</b-button>
                        <br>
                        <b-button @click="goReporteOfertas()">Reporte ofertas</b-button>
                        <br>
                        <b-button @click="goRuleta()">Jugar a la ruleta</b-button>
                    </b-nav>
                </nav>
                <b-button variant="primary" block @click="hide">Cerrar menú</b-button>
            </div>
        </template>
    </b-sidebar>
</div>
</template>

<script>
import axios from "axios";
export default {
    name: "SidebarComponent",

    data: () => ({
        userData: undefined,
        tipoUsuario: ''
    }),

    mounted() {
        this.deployPrechagedData();
        this.tipoUsuario = localStorage.getItem('modo_usuario');
    },
    methods: {
        deployPrechagedData() {
            let userId = localStorage.getItem("id_user");
            this.userData = this.getAllUserData(userId);
        },

        proccessAxiosError(error) {
            if (error.response) {
                if (error.response.status == 500 || error.response.status == 404) {
                    this.$alertify.error(
                        "Han surgido problemas para conectarse con el servidor. Inténtelo más tarde."
                    );
                } else {
                    this.$alertify.error(error.response.data);
                }
            } else {
                this.$alertify.error(
                    "No se ha podido establecer conexión con el servidor."
                );
            }
        },

        getAllUserData(id) {
            axios
                .get(process.env.VUE_APP_API_URL + "get_userdata_by_id/" + id)
                .then((response) => {
                    this.userData = response.data;
                    this.$refs.username.innerHTML =
                        "@ " + this.userData["usuario_nom_usr"];
                    this.$refs.profPic.src =
                        process.env.VUE_APP_API_URL +
                        "/get_foto/profiles/" +
                        this.userData["usuario_foto"];
                })
                .catch((error) => {
                    this.proccessAxiosError(error);
                });
        },

        editProfile() {
            localStorage.setItem('userId', this.userData['usuario_id']);
            this.$router.push((this.userData['usuario_tipo'] == 'T') ? 'TiendaEditor' : 'CompradorConfigMenu');
        },
        goReporteCompras() {

            let routeUrl = this.$router.resolve({
                path: "/reporte-compras",
            });
            window.open(routeUrl.href, '_blank');
        },
        goReporteSuscripciones() {

            let routeUrl = this.$router.resolve({
                path: "/reporte-subscripciones",
            });
            window.open(routeUrl.href, '_blank');
        },
        goReporteOfertas() {

            let routeUrl = this.$router.resolve({
                path: "/reporte-ofertas",
            });
            window.open(routeUrl.href, '_blank');
        },
        goRuleta() {

           this.$router.push('ruleta')
        }
    }
};
</script>

<style>
.nav-item>.nav-link {
    color: #fff;
}

.nav-item>.nav-link:hover {
    color: #ccc;
}

.divider-menu {
    border: 1px solid #fff;
    width: 100;
}

#username {
    padding-left: 5px;
    margin-right: 5px;
}
</style>
