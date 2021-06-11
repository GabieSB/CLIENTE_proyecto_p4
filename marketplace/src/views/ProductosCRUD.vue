<template>
  <div>
    <Header></Header>
    <div class="container-fluid px-5 mt-1 d-flex flex-column">
      <div class="row"><h1 class="my-3">Agregar Producto</h1></div>

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
                required
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

          <button type="submit" class="btn mt-5 btn-dark btn-lg btn-block">
            Guardar
          </button>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Carousel from "@/components/Carousel.vue";
import axios from "axios";


export default {
  components: {
    Header,
    Carousel,
  },
  data: () => ({
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
    },

    preview_list: [],
    image_list: [],
    show: false,
    categorias: [],
  }),
  mounted() {
    this.getCategorias();
      console.log(this.$store.state.usuario.tienda_id)
  },

  methods: {
    getCategorias() {
      var url = process.env.VUE_APP_API_URL + "get_categorias";
      axios
        .get(url)
        .then((response) => {
          this.categorias = response.data; //llenamos el vector con los datos JSON obtenidos
          console.log(this.categorias);
        })
        .catch((error) => {});
    },
    onSubmit(event) {
      //this.form.id = this.$store.state.usuario.tienda_id;

      this.form.id = localStorage.getItem('tienda_id')

    
      
      let param = new FormData();

      param.append("dataProducto", JSON.stringify(this.form));

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
          console.log(data)
          this.$alertify.success(data.data)
        })
        .catch((error) => {
         console.log(error)
          this.$alertify.error(error.data)
          
        });
    },
    onFileChange(event) {
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

    deleteImagePreview(index) {
      this.preview_list.splice(index, 1);
      this.image_list.splice(index, 1);
    },
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
  border: solid 1px  rgb(3, 133, 226);
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