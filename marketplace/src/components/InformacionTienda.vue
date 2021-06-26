<template>
<div>
    <b-card overlay img-src="https://picsum.photos/900/250/?image=3" img-height="300" img-alt="Card Image" text-variant="white" v-bind:title="tienda.nombre" v-bind:sub-title='tienda.descripcion'>
        <b-card-text>
            <h4>Teléfono: {{tienda.telefono}}</h4>
        </b-card-text>
        <b-card-text>
            <h4>Correo: {{tienda.correo}}</h4>
        </b-card-text>
        <b-card-text>
            <h4>Dirreción: {{tienda.pais}},{{tienda.provincia}},{{tienda.canton}}</h4>
        </b-card-text>
        <b-card-text>
            <b-row>
                <b-col>
                    Calificar:
                    <b-form-rating class="calificar" id="rating-inline" v-model="value" variant="warning" @change="setEditarCalificacion()"></b-form-rating>
                </b-col>
                <b-col>
                    <b-form-checkbox @change="cambiar()" id="susb" switch size="lg" v-model="status" value="accepted" unchecked-value="not_accepted">Suscripción</b-form-checkbox>
                </b-col>
            </b-row>
        </b-card-text>
        <b-card-text>

        </b-card-text>
        <b-card-text>

            <div v-if="comp>0">
                <b-button v-b-modal.modal-prevent-closing variant='danger' v-if="reportesR==0">Reportar</b-button>
                <b-modal id="modal-prevent-closing" ref="modal" title="Envie su reporte" @show="resetModal" @hidden="resetModal" @ok="handleOk">
                    <input type="text" id="txtReporte" class="fadeIn second" name="reporte" placeholder="Descripción reporte" required />
                </b-modal>
                <b-button variant='danger' v-if="reportesR==1" @click="elimanarReporte()">Eliminar Reporte</b-button>
            </div>

        </b-card-text>

    </b-card>
</div>
</template>

<script>
//localStorage.setItem('id_tienda',id);
import axios from "axios";
export default {
    name: "InformacionTienda",

    components: {

    },
    data: () => ({
        subscripcion: [],
        status: 'not_accepted',
        tienda: null,
        comp: null,
        reportesR: null,
        value: null
    }),
    mounted() {
        this.getSuscripcion();
        this.getTienda();
        this.comprasRealizadas();
        this.reportesRealizados();
        this.getObtenerCalificacion();
    },
    methods: {
        showModal() {
            this.$refs['my-modal'].show()
        },
        hideModal() {
            this.$refs['my-modal'].hide()
        },
        toggleModal() {

            ;
            this.$refs['my-modal'].toggle('#toggle-btn');

        },
        handleOk(bvModalEvt) {
            var objetoReporte = new Object();
            objetoReporte.idComprador = localStorage.getItem('comprador_id');
            objetoReporte.idTienda = localStorage.getItem('id_tienda');
            objetoReporte.estado = 'A';
            objetoReporte.descripcion = document.getElementById('txtReporte').value;
            axios.post(process.env.VUE_APP_API_URL + "agregar_reporte", JSON.stringify(objetoReporte))
                .then((respose) => {
                    this.comprasRealizadas();
                    this.reportesRealizados();
                });
        },

        getSuscripcion() {
            axios.get(process.env.VUE_APP_API_URL + 'get_suscripcion/' + localStorage.getItem('comprador_id') + '/' + localStorage.getItem('id_tienda'))
                .then((respose) => {
                    this.subscripcion = respose.data;
                    // alert(this.subscripcion[0].tienda);
                    this.check();
                })
        },
        check() {
            if (this.subscripcion != '') {
                this.status = 'accepted';

            } else {
                this.status = 'not_accepted';
            }
        },
        cambiar() {
            if (this.status == 'accepted') {
                var objeto = new Object();
                objeto.idComprador = localStorage.getItem('comprador_id');
                objeto.idTienda = localStorage.getItem('id_tienda');
                axios.post(process.env.VUE_APP_API_URL + "agregar_suscripcion", JSON.stringify(objeto))
                    .then((respose) => {
                        this.getSuscripcion();
                    });
            } else {
                axios.delete(process.env.VUE_APP_API_URL + "eliminar_suscripcion/" +
                    localStorage.getItem('comprador_id') + '/' +
                    localStorage.getItem('id_tienda')).then((respose) => {
                    this.getSuscripcion();
                });
            }
        },
        getTienda() {
            axios.get(process.env.VUE_APP_API_URL + 'get_informacion_tienda/' + localStorage.getItem('id_tienda'))
                .then((respose) => {
                    this.tienda = respose.data;
                })

        },
        comprasRealizadas() {
            axios.get(process.env.VUE_APP_API_URL + 'get_reporteFactura/' + localStorage.getItem('comprador_id') + '/' + localStorage.getItem('id_tienda'))
                .then((respose) => {
                    this.comp = respose.data.cantidad;

                })
        },
        reportesRealizados() {
            axios.get(process.env.VUE_APP_API_URL + 'get_reportesRealizados/' + localStorage.getItem('comprador_id') + '/' + localStorage.getItem('id_tienda'))
                .then((respose) => {
                    this.reportesR = respose.data.cantidad;
                })
        },
        elimanarReporte() {
            self = this;
            this.$alertify.confirm('¿Desea eliminar el reporte?',
                function () {
                    self.eliminar();
                },
                function () {});

        },
        eliminar() {
            axios.delete(process.env.VUE_APP_API_URL + "eliminar_reporte/" +
                localStorage.getItem('comprador_id') + '/' +
                localStorage.getItem('id_tienda')).then((respose) => {
                this.reportesRealizados();
            });
        },
        setEditarCalificacion() {
            var objeto = new Object();
            objeto.idComprador = localStorage.getItem("comprador_id");
            objeto.idTienda = localStorage.getItem("id_tienda");
            objeto.calificacion = this.value;
            axios.post(
                process.env.VUE_APP_API_URL + "calificar_tienda",
                JSON.stringify(objeto)
            );
        },
        getObtenerCalificacion() {
            var idTienda = localStorage.getItem("id_tienda");
            axios
                .get(
                    process.env.VUE_APP_API_URL +
                    "get_calificacionTienda/" +
                    localStorage.getItem("comprador_id") +
                    "/" +
                    idTienda
                )
                .then((respose) => {
                    this.value = respose.data[0].calificacion;
                });
        }
    }
}
</script>

<style>
body {
    background: #ccc;
}

#img_perfil {
    text-align: center;

}
</style>
