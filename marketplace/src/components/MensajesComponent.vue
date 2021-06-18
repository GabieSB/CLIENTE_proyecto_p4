<template>
<div>
    <b-form inline>
        <label class="sr-only" for="inline-form-input-name">Mensaje:</label>
        <b-form-input id="idMensaje" class="mb-2 mr-sm-2 mb-sm-0" placeholder="¿Pregunta?"></b-form-input>
        <b-button variant="primary" @click="enviarMensaje()">Enviar</b-button>
    </b-form>
    
    <b-card id="contedor" bg-variant="primary" text-variant="dark" v-for="coment in comentarios" :key="coment.comentario_id">
        <b-row>
            <b-col align-self="start">
                
                <b-avatar  v-bind:src='coment.fotoSRC' size="6rem"></b-avatar>
                 {{coment.usuario}}
                <b-row>
                    <br>
                    {{coment.fechaFormater}}
                </b-row>
            </b-col>
            <b-col align-self="center">
                <b-card id="comentario" text-variant="primary">{{coment.comentario}}</b-card>
            </b-col>
            <b-col align-self="end">
                <b-card id="comentario" text-variant="primary">
                    <div>{{coment.respuesta}}</div>
                </b-card>
            </b-col>
            <b-row>
                {{cambiarEstado(coment.comprador)}}
                <template v-if="comprador">
                    <b-button variant="danger" @click="eliminarMensaje(coment.comentario_id)">Eliminar</b-button>
                </template>
            </b-row>
        </b-row>
    </b-card>

</div>
</template>

<script>
import axios from "axios";
export default {
    name: "mensajesComponent",
    data: () => ({
        comentarios: [],
        comprador: true
    }),
    mounted() {
        this.getCometarios();
    },
    methods: {
        getCometarios() {
            var idProducto = localStorage.getItem('id_producto');
            axios.get(process.env.VUE_APP_API_URL + 'get_comentario/' + idProducto)
                .then((respose) => {
                    this.comentarios = respose.data;
                    this.getFormatoFecha();
                    this.getPhotoPreview();
                })
        },
        getFormatoFecha() {

            for (var i = 0; i < this.comentarios.length; i++) {
                let current_datetime = new Date(this.comentarios[i].fecha)
                let formatted_date = current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear()
                this.comentarios[i].fechaFormater = formatted_date;
            }
        },
        enviarMensaje() {
            var objeto = new Object();
            objeto.idComprador = localStorage.getItem('comprador_id');
            objeto.idProducto = localStorage.getItem('id_producto');
            objeto.comentario = document.getElementById('idMensaje').value;
            var d = new Date();
            // alert(d);
            objeto.fecha = d;
                        axios.post(process.env.VUE_APP_API_URL + "agregar_comentario", JSON.stringify(objeto))
                .then((respose) => {
                    this.getCometarios();

                });

        },
        cambiarEstado(comp) {
            if (comp == localStorage.getItem('comprador_id')) {
                this.comprador = true;
            } else {
                this.comprador = false;
            }

        },
        eliminarMensaje(idMensaje) {
            axios.delete(process.env.VUE_APP_API_URL + "eliminar_comentario/" +
                localStorage.getItem('comprador_id') + '/' +
                localStorage.getItem('id_producto') + '/' +
                idMensaje).then((respose) => {
                this.getCometarios();
            })
        },
        getPhotoPreview() {
            // console.log("in ptp s");
            for (var i = 0; i < this.comentarios.length; i++) {
                if (this.comentarios[i].foto.length > 0) {
                    this.comentarios[i].fotoSRC =
                        process.env.VUE_APP_API_URL + "get_foto/profiles/" + this.comentarios[i].foto;
                     
                }
            }
        }

    }
}
</script>

<style>
#contedor {
    margin-top: 7px;
}

#comentario {
    background: #ccc;
}
</style>
