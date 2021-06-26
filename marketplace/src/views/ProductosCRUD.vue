<template>
  <div>
    <HeaderTienda></HeaderTienda>
    <div class="container-fluid px-5 mt-1 d-flex flex-column">
      <div class="row">
        <h1 class="my-3">{{ mensaje }}</h1>
      </div>

      <div class="row border-top">
        <b-form v-on:submit.prevent="onSubmit">
          <div class="row">
            <div class="col-6">
              <div class="form-group my-2 d-flex flex-column">
                <label>Nombre del producto</label>
                <b-form-input
                  placeholder="Ingresa el nombre del producto"
                  v-model="form.nombre"
                  size="lg"
                  type="text"
                  required
                  class="input-field"
                ></b-form-input>
              </div>
              <div class="form-group my-2 d-flex flex-column">
                <label>Precio</label>
                <b-form-input
                  type="number"
                  placeholder="Ingresa el precio del producto"
                  v-model="form.precio"
                  required
                  class="input-field"
                ></b-form-input>
              </div>
              <div class="form-group my-2 d-flex flex-column">
                <label>Costo de envío</label>
                <b-form-input
                  type="number"
                  placeholder="Ingresa el costo de envío del producto"
                  v-model="form.costo"
                  required
                  class="input-field"
                ></b-form-input>
              </div>
              <div class="form-group my-2 d-flex flex-column">
                <label>Categoría de producto</label>
                <b-form-select
                  v-model="form.categoria"
                  :options="categorias"
                  class="input-field"
                ></b-form-select>
              </div>
            </div>

            <div class="col-6">
              <div class="form-group my-2 d-flex flex-column">
                <label>Descripción</label>
                <b-form-input
                  type="text"
                  placeholder="Describe tu producto"
                  v-model="form.descripcion"
                  size="lg"
                  required
                  class="input-field"
                ></b-form-input>
              </div>
              <div class="form-group my-2 d-flex flex-column">
                <label>Cantidad</label>
                <b-form-input
                  placeholder="Ingresa la cantidad de tu stock"
                  v-model="form.cantidad"
                  required
                  type="number"
                  class="input-field"
                ></b-form-input>
              </div>
              <div class="form-group my-2 d-flex flex-column">
                <label>Promedio de días para recibir el producto</label>
                <b-form-input
                  placeholder="Ingresa el promedio de envío del producto"
                  v-model="form.duracion"
                  required
                  type="number"
                  class="input-field"
                ></b-form-input>
              </div>
              <div class="form-group my-2 d-flex flex-column">
                <label>Precio de oferta</label>
                <b-form-input
                  type="number"
                  placeholder="Ingresa el precio de oferta producto si lo tiene"
                  v-model="form.precioOferta"
                  class="input-field"
                ></b-form-input>
              </div>
            </div>
          </div>

          <div class="row mt-2 pt-2 border-top">
            <h3>Dirección del producto</h3>

            <div class="col-6">
              <div class="form-group my-2 d-flex flex-column">
                <label>País</label>
                <b-form-input
                  id="input-small"
                  size="sm"
                  placeholder="Ingresa el país donde se ubica"
                  v-model="form.pais"
                  required
                  class="input-field text-left"
                ></b-form-input>
              </div>
              <div class="form-group my-2 d-flex flex-column">
                <label>Provincia</label>
                <b-form-input
                  id="input-small"
                  size="sm"
                  placeholder="Ingresa la provincia donde se ubica"
                  v-model="form.provincia"
                  required
                  class="input-field"
                ></b-form-input>
              </div>
            </div>

            <div class="col-6">
              <div class="form-group my-2 d-flex flex-column">
                <label>Cantón</label>
                <b-form-input
                  id="input-small"
                  size="sm"
                  placeholder="Ingresa el cantón donde se ubica"
                  v-model="form.canton"
                  required
                  class="input-field"
                ></b-form-input>
              </div>
            </div>
          </div>
          <div class="row border-top">
            <h3>Galería del producto</h3>
            <div class="dropbox">
              <b-form-file
                class="input-file"
                id="file-upload"
                multiple
                @change="onFileChange"
                plain
                
              ></b-form-file>
              <p>Seleccione las fotos del producto</p>

              <div class="row">
                <template v-if="preview_list.length">
                  <div
                    class="col d-flex justify-content-center"
                    v-for="(item, index) in preview_list"
                    :key="index"
                  >
                    <div>
                      <img
                        class="delete-image"
                        @click="deleteImagePreview(index)"
                        src="https://img.icons8.com/metro/26/ffffff/delete-sign.png"
                      />
                    </div>

                    <img
                      :src="item"
                      height="200px"
                      width="200px"
                      class="img-preview"
                    />
                  </div>
                </template>
              </div>
            </div>
          </div>

          <button  type="submit" class="btn mt-5 btn-dark btn-lg btn-block">
            Guardar
          </button>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderTienda from "@/components/HeaderTienda.vue";
import Carousel from "@/components/Carousel.vue";
import axios from "axios";


export default {
  name: "productosCRUD",
  components: {
    HeaderTienda,
    Carousel 
,
  },
  data: () => ({
    mensaje: "Agregar Producto",
    form: {
      id: "",
      nombre: "",
      descripcion: "",
      precio: "",
      cantidad: "",
      duracion: "",
      costo: "",
      categoria: "",
      pais: "",
      provincia: "",
      canton: "",
      precioOferta: "",
      direccionId: "",
      idProducto: "",
    },

    preview_list: [],
    image_list: [],
    delete_list: [],
    nameImage_list:[],
    show: false,
    categorias: [],
    modoCreacion: true,
    imagenesModificadas: false
  }),
  mounted() {
    this.getCategorias();
    this.getDataTienda();
    this.verificarEdicion();
  },

  methods: {
    //se verifica si la vista esta en modo de edicion para cargar los datos del producto
    verificarEdicion() {
      if (localStorage.getItem("id_producto_edit") != "null") {
        this.mensaje = "Editar producto";
        this.getDataProducto();
        this.getImagenesProducto();
        this.modoCreacion = false
      }
    },
    // si esta en modo edicion se tiene la informacion del producto
    getDataProducto() {
      var url =
        process.env.VUE_APP_API_URL +
        "get_product_by_id/" +
        localStorage.getItem("id_producto_edit");
      axios
        .get(url)
        .then((response) => {
          console.log(response.data)
          this.form.nombre = response.data[0].nombre;
          this.form.descripcion = response.data[0].descripcion;
          this.form.precio = response.data[0].precio;
          this.form.cantidad = response.data[0].cantidad;
          this.form.costo = response.data[0].cost_envio;
          this.form.categoria = response.data[0].categoria;
          this.form.pais = response.data[0].pais;
          this.form.canton = response.data[0].canton;
          this.form.provincia = response.data[0].provincia;
          this.form.duracion = response.data[0].prom_envio;
          this.form.direccionId = response.data[0].direccion_id
          this.form.idProducto =   localStorage.getItem("id_producto_edit");
          if (response.data[0].oferta > 0)
            this.form.precioOferta = response.data[0].oferta;
        })
        .catch((error) => {});
    },
    // si esta en modo edicion se obtienen las imagenes
    getImagenesProducto() {
      var url =
        process.env.VUE_APP_API_URL +
        "get_fotos_by_producto/" +
        localStorage.getItem("id_producto_edit");
      axios
        .get(url)
        .then((response) => {
          var names = [];
          names = response.data;
         
          for (var i = 0; i < names.length; i++) {
            this.preview_list.push( process.env.VUE_APP_API_URL + "get_foto/" + names[i].url)  
            this.nameImage_list.push(process.env.VUE_APP_API_URL + "get_foto/" + names[i].url)
          }
        })
        .catch((error) => {});
    },
    //las categorias que se muestran al registrar el producto
    getCategorias() {
      var url = process.env.VUE_APP_API_URL + "get_categorias";
      axios
        .get(url)
        .then((response) => {
          this.categorias = response.data; //llenamos el vector con los datos JSON obtenidos
        })
        .catch((error) => {});
    },
    // si se preciona el boton de guardar dependiento el modo compra o actualiza
    onSubmit(event) {
      
      if(this.modoCreacion){
        this.create_product(event)
      }else{
        this.update_product(event);
      }
    },
    create_product(event){
  
      this.form.id = this.$store.state.tienda.tienda_id;

      let param = new FormData();

      param.append("dataProducto", JSON.stringify(this.form));
     
    //agrega al form data todas la imagenes de la lista para ser enviadas
      for (var i = 0; i < this.image_list.length; i++) {
        param.append("file", this.image_list[i]);
      }

      axios
        .post(process.env.VUE_APP_API_URL + "create_product", param, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((data) => {
          this.limpiarCampos();
          this.$alertify.success(data.data);
        })
        .catch((error) => {
          console.log(error);
          this.$alertify.error(error.data);
        });

    },
    //mismo procesos de creacion
    update_product(event){
      let param = new FormData();
       console.log( JSON.stringify(this.form))

      param.append("dataProducto", JSON.stringify(this.form));
      param.append('imagenesEliminar', JSON.stringify(this.delete_list))

      if(this.imagenesModificadas){
         for (var i = 0; i < this.image_list.length; i++) {
          param.append("file", this.image_list[i]);
         }
      }     

      axios
        .post(process.env.VUE_APP_API_URL + "update_product", param, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((data) => {
          this.limpiarCampos();
          this.$alertify.success(data.data);
        })
        .catch((error) => {
          console.log(error);
          this.$alertify.error(error.data);
        });


    },
    //este evento mostrara cada imagen al ser cargada por el usuario y que la pueda previsualizar
    onFileChange(event) {
     
      this.imagenesModificadas = true
      var input = event.target;
      var count = input.files.length;
      var index = 0;
      if (input.files) {
        while (count--) {
          var reader = new FileReader();
          reader.onload = (e) => {
            
            this.preview_list.push(e.target.result);
          };
          this.image_list.push(input.files[index]);
          reader.readAsDataURL(input.files[index]);
          index++;
        }
      }
    },
//elimina la imgagen de la preview y de la lista
    deleteImagePreview(index) {
      let imageToDelete = this.preview_list[index]

      if(this.nameImage_list.includes(imageToDelete)){
        console.log("eliminar de base " + imageToDelete)
        this.delete_list.push(imageToDelete)
      }

      this.preview_list.splice(index, 1);
      this.image_list.splice(index, 1);

    },
  // se obtiene la info de la empresa que poseera el producto
    getDataTienda() {
      const id_user = localStorage.getItem("id_user");
      axios
        .get(process.env.VUE_APP_API_URL + "getTiendaByUserId/" + id_user)
        .then((response) => {
          if (response.statusText == "OK") {
            this.$store.state.tienda = response.data;
            console.log("Se ha obtenido los datos de la tienda");
          }
        })
        .catch((error) => {
          if (error.response.status == 500 || error.response.status == 404) {
            this.$alertify.error(
              "Han surgido problemas para conectarse con el servidor. Inténtelo más tarde."
            );
          } else {
            this.$alertify.error(error.response.data);
          }
        });
    },
    limpiarCampos(){
        this.form.nombre = ""
        this.form.descripcion =""
        this.form.precio = ""
        this.form.cantidad =""
        this.form.costo = ""
        this.form.categoria =""
        this.form.pais = ""
        this.form.canton = ""
        this.form.provincia =""
        this.form.duracion = ""
        this.form.direccionId = ""
        this.form.idProducto =   ""
        this.form.precioOferta = ""
        this.delete_list = []
        this.preview_list = []
        this.image_list = []
    }

    
  },
};
</script>
    
<style scoped>
label {
  font-weight: 3px;
}

.input-field {
  width: 90%;
  height: 40px;
  border: solid 1px rgb(3, 133, 226);
  border-radius: 5px;
  background-color: whitesmoke;
  margin: 0;
  text-align: start;
  padding: 5px;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dropbox {
  outline: 2px dashed rgb(3, 133, 226); /* the dash box */
  outline-offset: -10px;
  background: rgb(255, 255, 255);
  color: dimgray;
  padding: 10px 10px;
  min-height: 100px; /* minimum height */
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 80px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: rgb(
    247,
    247,
    247
  ); /* when mouse over to the drop zone, change color */
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 30px 20px 20px;
}
.image-container {
  position: relative;
}

.delete-image {
  position: absolute;
  width: 20px;
  height: 20px;
  padding: 2px;
  margin: 5px;
  background-color: rgb(61, 61, 61);
  opacity: 0.5;
}
.delete-image:hover {
  opacity: 1;
  background-color: rgb(214, 85, 85);
}
.img-preview {
  border: solid 2px rgb(195, 245, 253);
  border-radius: 2px;
  max-width: 200px;
  max-height: 200px;
  padding: 2px;
}
.img-preview:hover {
  border: solid 2px rgb(0, 171, 218);
}
</style>