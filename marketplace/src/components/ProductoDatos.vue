<template>
  <div id="contenedor">
    <b-container bg-variant="primary" text-variant="dark">
      <b-row>
        <b-col cols="12" md="3">
          <b-row>
            <b-img
              class="imagenes"
              id="img_muestra"
              center
              src=""
              alt="Image 1"
              heigth="75"
              width="320"
            ></b-img>
          </b-row>
          <b-row>
            <b-col v-for="foto in imagensProd" :key="foto.foto_id" md="3">
              <b-img
                @click="actualizarFoto(foto.fotoSRC)"
                class="img_galeria"
                thumbnail
                fluid
                v-bind:src="foto.fotoSRC"
                alt="Image 1"
                width="100"
              ></b-img>
            </b-col>
          </b-row>
        </b-col>
        <b-col
          class="dataContainer"
          cols="6"
          md="7"
          v-for="producto in productoSelecionado"
          :key="producto.producto_id"
        >
          <b-row>
            <div>
              <h1 class="producto_nombre">{{ producto.nombre }}</h1>
            </div>
          </b-row>
          <b-row class="mx-1 my-2">
            <b-col class="precios">
              <span class=""
                ><b> Descripción:</b> {{ producto.descripcion }}</span
              >
              <span> <b>Precio:</b> ₡{{ producto.precio }}</span>
              <span> <b>Precio oferta:</b> ₡{{ producto.oferta }}</span>
              <span> <b>Stock:</b> {{ producto.cantidad }}</span>
              <span
                ><b>Dirección física</b>: {{ producto.pais }},{{
                  producto.provincia
                }},{{ producto.canton }}</span
              >
              <span>
                <b> Duración del envío: </b>{{ producto.prom_envio }} días
              </span>
              <span>
                <b>Fecha publicación:</b> {{ producto.fechaFormater }}
              </span>
              <span> <b>Calificación:</b> {{ producto.calificacion }} ✰ </span>
            </b-col>
          </b-row>
        </b-col>

        <div class="comentarios">
          <h5 class="my-3">Comentarios</h5>

          <div
            v-for="comentario in comentarios"
            :key="comentario.comentario_id"
          >
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
                  <button
                    v-if="login"
                    class="btn btn-primary"
                    v-b-modal.modal-prevent-closing
                    @click="agregarIdRespuesta(comentario.comentario_id)"
                  >
                    Responder
                  </button>
                </div>
                <div v-else class="comentario respuesta">
                  <div class="fecha">
                    <div>
                      
                      <img
                        class="profile"
                        :src="comentario.foto_tienda"
                        alt=""
                      />
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
      </b-row>
      <b-modal
        id="modal-prevent-closing"
        ref="modal"
        title="Responder comentario"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
        no-close-on-backdrop
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group
            label="Respuesta: "
            label-for="name-input"
            invalid-feedback="La respuesta es requerida"
            :state="nameState"
          >
            <b-form-textarea
              id="textarea"
              v-model="form.respuesta"
              placeholder="Ingrese su respuesta..."
              rows="3"
              max-rows="6"
            >
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
  name: "ProductoData",

  components: {},
  data: () => ({
    productoSelecionado: [],
    imagensProd: [],
    value: null,
    status: "not_accepted",
    deseos: [],
    id: "",
    comentarios: [],
    login: false,
    nameState: null,
    form: {
      respuesta: "",
      id_comentario: "",
    },
  }),
  mounted() {
    this.id = this.$route.params.id;
    this.getFotos();
    this.getProductoSeleccionado();
    this.getComentarios();
    if (localStorage.getItem("id_tienda")) {
      this.login = true;
    }
  },
  methods: {
    getFotos() {
      axios
        .get(process.env.VUE_APP_API_URL + "get_fotosProductos/" + this.id)
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
      axios
        .get(process.env.VUE_APP_API_URL + "get_productoSelecionado/" + this.id)
        .then((respose) => {
          this.productoSelecionado = respose.data;
          this.getFormatoFecha();
          console.log(this.productoSelecionado);
        });
    },
    getComentarios() {
      axios
        .get(process.env.VUE_APP_API_URL + "get_comentario2/" + this.id)
        .then((respose) => {
          this.comentarios = respose.data;
          this.convertirFechaComentarios();
          this.getFotosUsuarios();

          console.log(this.comentarios);
        });
    },
    actualizarFoto(url) {
      var imagen = document.getElementById("img_muestra");
      imagen.src = url;
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
    getDeseo() {
      axios
        .get(
          process.env.VUE_APP_API_URL +
            "get_deseo/" +
            localStorage.getItem("comprador_id") +
            "/" +
            this.id
        )
        .then((respose) => {
          this.deseos = respose.data;
          // alert(this.subscripcion[0].tienda);
          this.check();
        });
    },
    responderComentario() {
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
    agregarIdRespuesta(id) {
      this.form.id_comentario = id;
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

      this.responderComentario();

      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
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
