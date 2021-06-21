<template>
<div>
    <b-card overlay img-src="https://picsum.photos/900/250/?image=3" img-height="300" img-alt="Card Image" text-variant="white" title="Image Overlay" sub-title="Subtitle">
        <b-card-text>
            INFORMACION
        </b-card-text>
        <b-card-text>
            <b-form-checkbox @change="cambiar()" id="susb" switch size="lg" v-model="status" value="accepted" unchecked-value="not_accepted">Suscripción</b-form-checkbox>
            <div>
                <b-button v-b-modal.modal-prevent-closing variant='danger'>Reportar</b-button>
                <b-modal id="modal-prevent-closing" ref="modal" title="Envie su reporte" @show="resetModal" @hidden="resetModal" @ok="handleOk">
                    <input type="text" id="txtReporte" class="fadeIn second" name="reporte" placeholder="Descripción reporte" required />
                </b-modal>
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
    }),
    mounted() {
        this.getSuscripcion();

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
                .then((respose) => {});
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
