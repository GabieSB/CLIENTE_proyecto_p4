<template>
<div id="contenedor">
    <b-container bg-variant="primary" text-variant="dark">
        <b-row>
            <b-col cols="12" md="3">
                <b-row>
                    <b-img class="imagenes" id="img_muestra" center src="" alt="Image 1" heigth="75" width="320"></b-img>
                </b-row>
                <b-row>
                    <b-col v-for="foto in imagensProd" :key="foto.foto_id" md="3">
                        <b-img @click="actualizarFoto(foto.fotoSRC)" class="img_galeria" thumbnail fluid v-bind:src="foto.fotoSRC" alt="Image 1" width="100"></b-img>
                    </b-col>
                </b-row>
            </b-col>
            <b-col class="dataContainer" cols="6" md="7" v-for="producto in productoSelecionado" :key="producto.producto_id">
                <b-row>
                    <div>
                        <h1 class="producto_nombre">{{ producto.nombre }}</h1>
                    </div>
                </b-row>
                <b-row class="mx-1 my-2">
                    <b-col class="precios">
                        <span class=""><b> Descripción:</b> {{ producto.descripcion }}</span>
                        <span> <b>Precio:</b> ₡{{ producto.precio }}</span>
                        <span> <b>Precio oferta:</b> ₡{{ producto.oferta }}</span>
                        <span> <b>Stock:</b> {{ producto.cantidad }}</span>
                        <span><b>Dirección física</b>: {{ producto.pais }},{{
                  producto.provincia
                }},{{ producto.canton }}</span>
                        <span>
                            <b> Duración del envío: </b>{{ producto.prom_envio }} días
                        </span>
                        <span>
                            <b>Fecha publicación:</b> {{ producto.fechaFormater }}
                        </span>
                        <span> <b>Calificación:</b> {{ producto.calificacion }} ✰ </span>
                    </b-col>
                </b-row>

                <b-row class="actions">
                    <div class="py-1">
                        <b-form-checkbox class="p-0" @change="cambiar()" id="susb" switch size="lg" v-model="status" value="accepted" unchecked-value="not_accepted">
                            Agregar a lista de deseos</b-form-checkbox>
                    </div>
                    <div class="py-1">
                        Calificar:
                        <b-form-rating class="calificar" id="rating-inline" v-model="value" variant="warning" @change="setEditarCalificacion()"></b-form-rating>
                    </div>

                    <b-row>
                        <b-col md="3">
                            <b-button v-b-modal.modal-prevent-closing variant="primary">Comentar</b-button><br />
                        </b-col>
                        <b-col md="4">
                            <!--b-button squared>Agregar al Carrito</b-button-->
                            <b-button v-b-modal.modal-prevent-closingo variant="primary">Agregar a carrito</b-button>
                            <b-modal id="modal-prevent-closingo" ref="modal" title="Cantidad de unidades" @show="resetModal" @hidden="resetModal" @ok="agregarCarrito">
                                <b-form-input id="txtCantidad2" placeholder="Cantidad de productos" type="number" class="input-field" min="1"></b-form-input>
                            </b-modal>
                        </b-col>
                        <br />
                        <b-col md="3">
                            <b-button variant="primary" @click="irCompra()">Comprar ahora</b-button>
                        </b-col>
                    </b-row>
                </b-row>
            </b-col>
        </b-row>
        <div class="comentarios">
            <h5 class="my-3">Comentarios</h5>

            <div v-for="comentario in comentarios" :key="comentario.comentario_id">
                <div class="comentario">
                    <div class="cuerpo-comentario">
                        <div class="fecha">
                            <div>
                                <img class="profile" :src="comentario.fotoSRC" alt="" />
                                <span>
                                    <b> {{ comentario.usuario }}</b>
                                </span>
                            </div>

                            <span>{{ comentario.fecha }}</span>
                        </div>
                        <p>{{ comentario.comentario }}</p>
                        <div v-if="comentario.respuesta == null" class="btn-responder">
                            <button class="btn btn-danger" v-if="comentario.comprador == comprador_id" @click="eliminarComentario(comentario.comentario_id)">
                                Eliminar
                            </button>
                        </div>
                        <div v-else class="comentario respuesta">
                            <div class="fecha">
                                <div>
                                    <img class="profile" :src="comentario.foto_tienda" alt="" />
                                    <span>
                                        <b> {{ comentario.tienda }}</b>
                                    </span>
                                </div>
                            </div>
                            <p>{{ comentario.respuesta }}</p>
                        </div>
                    </div>
                    <div></div>
                    <span></span>
                </div>
            </div>
        </div>
        <b-modal id="modal-prevent-closing" ref="modal" title="Agregar comentario" @show="resetModal" @hidden="resetModal" @ok="handleOk" no-close-on-backdrop>
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group label="Comentario: " label-for="name-input" invalid-feedback="El comentario es requerido" :state="nameState">
                    <b-form-textarea id="idMensaje" placeholder="Ingrese su comentario..." rows="3" max-rows="6">
                    </b-form-textarea>
                </b-form-group>
            </form>
        </b-modal>
    </b-container>
</div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
export default {
    name: "FotosProductos",
    components: {},
    data: () => ({
        productoSelecionado: [],
        imagensProd: [],
        value: null,
        status: "not_accepted",
        deseos: [],
        comentarios: [],
        login: false,
        nameState: null,
        form: {
            respuesta: "",
            id_comentario: "",
        },
        comprador_id: "",
    }),
    mounted() {
        this.comprador_id = localStorage.getItem("comprador_id")
        this.getDeseo();
        this.getFotos();
        this.getProductoSeleccionado();
        this.getObtenerCalificacion();
        this.getComentarios();
    },
    methods: {
        irCompra() {
            this.$router.push("CompraCrud");
        },
        irPregunta() {
            this.$router.push("PreguntaCrud");
        },
       agregarCarrito(bvModalEvt) {
            var objetoReporte = new Object();
            objetoReporte.idComprador = localStorage.getItem("comprador_id");
            objetoReporte.idProducto = localStorage.getItem("id_producto");
            objetoReporte.cantidad = document.getElementById("txtCantidad2").value;
            axios
                .post(
                    process.env.VUE_APP_API_URL + "agregar_carrito",
                    JSON.stringify(objetoReporte)
                )
                .then((respose) => {});
        },
        getFotos() {
            var a = localStorage.getItem("id_producto");
            axios
                .get(process.env.VUE_APP_API_URL + "get_fotosProductos/" + a)
                .then((respose) => {
                    this.imagensProd = respose.data;
                    console.log(this.imagensProd);
                    this.getPhotoPreview();
                });
        },
        getPhotoPreview() {
            // console.log("in ptp s");
            for (var i = 0; i < this.imagensProd.length; i++) {
                if (this.imagensProd[i].url.length > 0) {
                    this.imagensProd[i].fotoSRC =
                        process.env.VUE_APP_API_URL + "get_foto/" + this.imagensProd[i].url;
                }
            }
            var imagen = document.getElementById("img_muestra");
            imagen.src = this.imagensProd[0].fotoSRC;
        },
        getProductoSeleccionado() {
            var a = localStorage.getItem("id_producto");
            axios
                .get(process.env.VUE_APP_API_URL + "get_productoSelecionado/" + a)
                .then((respose) => {
                    this.productoSelecionado = respose.data;
                    this.getFormatoFecha();
                    console.log(this.productoSelecionado);
                });
        },
        actualizarFoto(url) {
            var imagen = document.getElementById("img_muestra");
            imagen.src = url;
        },
        getObtenerCalificacion() {
            var idProducto = localStorage.getItem("id_producto");
            axios
                .get(
                    process.env.VUE_APP_API_URL +
                    "get_calificacionProducto/" +
                    localStorage.getItem("comprador_id") +
                    "/" +
                    idProducto
                )
                .then((respose) => {
                    this.value = respose.data[0].calificacion;
                });
        },
        setEditarCalificacion() {
            var objeto = new Object();
            objeto.idComprador = localStorage.getItem("comprador_id");
            objeto.idProducto = localStorage.getItem("id_producto");
            objeto.calificacion = this.value;
            axios.post(
                process.env.VUE_APP_API_URL + "calificar_producto",
                JSON.stringify(objeto)
            );
        },
        /* getFormatoFecha() {
          for (var i = 0; i < this.productoSelecionado.length; i++) {
            let current_datetime = new Date(
              this.productoSelecionado[i].publicacion
            );
            let formatted_date =
              current_datetime.getDate() +
              "/" +
              (current_datetime.getMonth() + 1) +
              "/" +
              current_datetime.getFullYear();
            this.productoSelecionado[i].fechaFormater = formatted_date;
          }
        },*/
        eliminarComentario(idMensaje) {
            axios.delete(process.env.VUE_APP_API_URL + "eliminar_comentario/" +
                localStorage.getItem('comprador_id') + '/' +
                localStorage.getItem('id_producto') + '/' +
                idMensaje).then((respose) => {
                this.getComentarios();
            })
        },
        getDeseo() {
            axios
                .get(
                    process.env.VUE_APP_API_URL +
                    "get_deseo/" +
                    localStorage.getItem("comprador_id") +
                    "/" +
                    localStorage.getItem("id_producto")
                )
                .then((respose) => {
                    this.deseos = respose.data;
                    // alert(this.subscripcion[0].tienda);
                    this.check();
                });
        },
        check() {
            if (this.deseos != "") {
                this.status = "accepted";
            } else {
                this.status = "not_accepted";
            }
        },
        cambiar() {
            if (this.status == "accepted") {
                var objeto = new Object();
                objeto.idComprador = localStorage.getItem("comprador_id");
                objeto.idProducto = localStorage.getItem("id_producto");
                axios
                    .post(
                        process.env.VUE_APP_API_URL + "agregar_deseo",
                        JSON.stringify(objeto)
                    )
                    .then((respose) => {
                        this.getDeseo();
                    });
            } else {
                axios
                    .delete(
                        process.env.VUE_APP_API_URL +
                        "eliminar_deseo/" +
                        localStorage.getItem("comprador_id") +
                        "/" +
                        localStorage.getItem("id_producto")
                    )
                    .then((respose) => {
                        this.getDeseo();
                    });
            }
        },
        getComentarios() {
            axios
                .get(
                    process.env.VUE_APP_API_URL +
                    "get_comentario2/" +
                    localStorage.getItem("id_producto")
                )
                .then((respose) => {
                    this.comentarios = respose.data;
                    this.convertirFechaComentarios();
                    this.getFotosUsuarios();

                    console.log(this.comentarios);
                });
        },
        getFotosUsuarios() {
            for (var i = 0; i < this.comentarios.length; i++) {
                if (this.comentarios[i].foto.length > 0) {
                    this.comentarios[i].fotoSRC =
                        process.env.VUE_APP_API_URL +
                        "get_foto/profiles/" +
                        this.comentarios[i].foto;
                    this.comentarios[i].foto_tienda =
                        process.env.VUE_APP_API_URL +
                        "get_foto/profiles/" +
                        this.comentarios[i].foto_tienda;
                    console.log(this.comentarios[i].fotoSRC);
                }
            }
        },
        getFormatoFecha() {
            for (var i = 0; i < this.productoSelecionado.length; i++) {
                this.productoSelecionado[i].fechaFormater = this.getFechaFormateada(
                    this.productoSelecionado[i].publicacion
                );
            }
        },
        getFechaFormateada(date) {
            let current_datetime = new Date(date);
            let formatted_date =
                current_datetime.getDate() +
                "/" +
                (current_datetime.getMonth() + 1) +
                "/" +
                current_datetime.getFullYear();
            return formatted_date;
        },
        convertirFechaComentarios() {
            for (var i = 0; i < this.comentarios.length; i++) {
                this.comentarios[i].fecha = this.getFechaFormateada(
                    this.comentarios[i].fecha
                );
            }
        },
        checkFormValidity() {
            const valid = this.$refs.form.checkValidity();
            this.nameState = valid;
            return valid;
        },
        resetModal() {
            this.respuesta = "";
            this.nameState = null;
        },
        handleOk(bvModalEvt) {
            bvModalEvt.preventDefault();

            this.handleSubmit();
        },
        handleSubmit() {
            if (!this.checkFormValidity()) {
                return;
            }

            this.enviarMensaje();
            //enviar mensaje
            this.$nextTick(() => {
                this.$bvModal.hide("modal-prevent-closing");
            });
        },
        enviarMensaje() {
            var objeto = new Object();
            objeto.idComprador = localStorage.getItem("comprador_id");
            objeto.idProducto = localStorage.getItem("id_producto");
            objeto.comentario = document.getElementById("idMensaje").value;
            var d = new Date();
            // alert(d);
            objeto.fecha = d;
            axios
                .post(
                    process.env.VUE_APP_API_URL + "agregar_comentario2",
                    JSON.stringify(objeto)
                )
                .then((respose) => {
                    this.getComentarios();
                });
        },

        agregarRespuesta() {
            console.log(this.form);
            axios
                .post(
                    process.env.VUE_APP_API_URL + "insertar_respuesta",
                    JSON.stringify(this.form)
                )
                .then((respose) => {
                    this.getComentarios();
                })
                .catch((error) => {
                    this.$alertify.error(
                        `Ocurrió un problema al insertar la respuesta. ${error}`
                    );
                });
        },
    },
    /*
       <b-form-input
                    placeholder="Ingresa la cantidad de tu stock"
                    v-model="form.cantidad"
                    required
                    type="number"
                    class="input-field"
                  ></b-form-input>*/
};
</script>

<style>
.img_galeria {
    width: 50px;
    height: 40px;
    padding: 0;
    margin: 0;
}

.img_galeria:hover {
    cursor: pointer;
    background: darkblue;
}

#fProducto {
    padding-top: 10px;
}

#contenedor {
    background: rgb(250, 247, 247);
}

.producto_nombre {
    border: solid rgb(1, 155, 226) 2px;
    border-radius: 10px;
    width: auto;
    margin: auto;
    text-align: center;
    padding-bottom: 8px;
    font-size: 30px;
}

.dataContainer {
    margin: 30px 60px;
    padding: 10px;
    background-color: rgb(255, 255, 255);
    border-radius: 15px;
}

.imagenes {
    margin: 30px 10px;
    height: 300px;
    width: 400px;
    border-radius: 15px;
}

.precios {
    display: flex;
    flex-direction: column;
}

.actions {
    border: solid 2px rgb(223, 223, 223);
    border-radius: 10px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    margin: 10px;
}

.calificar {
    max-width: 200px;
    padding: 10px;
    margin: 5px;
    margin-bottom: 10px;
}

span {
    margin: 3px;
}

.comentarios {
    background-color: rgb(255, 255, 255);
    border: solid rgb(208, 208, 208) 2px;
    border-radius: 15px;
    margin: 10px;
}

.comentario {
    margin: 10px;
    border: solid rgb(1, 155, 226) 2px;
    border-radius: 15px;
    padding: 5px 10px;
    padding-bottom: 0;
}

p {
    margin: 0;
    padding: 0;
}

.cuerpo-cometario {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
}

.fecha {
    display: flex;
    justify-content: space-between;
    color: gray;
    font-size: 10px;
}

.btn-responder {
    display: flex;
    justify-content: flex-end;
}

.respuesta {
    padding: 20px;
    margin: 5px 0 0 0 0;
    border: solid rgb(97, 204, 253) 2px;
}

.profile {
    width: 40px;
    height: 40px;
    border-radius: 50px;
    border: solid 2px rgb(201, 201, 201);
}
</style>
