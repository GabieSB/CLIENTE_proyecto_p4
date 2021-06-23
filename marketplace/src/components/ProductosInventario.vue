<template>
  <div class="contenedor" id="divProductos">
    <h1>Inventario</h1>
    <div class="menu">
      <div class="buscar-box">
        <b-form-select
          id="selectCategoria"
          v-model="selected"
          :options="categorias"
          class="mb-3 input-field"
          @change="buscarProductos()"
        ></b-form-select>
        <input
          id="buscar"
          type="search"
          @keyup="buscarProductos()"
          class="fadeIn second input-field"
          name="buscar"
          placeholder="Buscar"
          required
        />
      </div>
      <div>
        <b-button @click.prevent="goTienda" variant="primary"
          >Agregar Producto</b-button
        >
      </div>
    </div>

    <div
      class="contenedor_productos"
      v-for="producto in productos"
      :key="producto.producto_id"
    >
      <b-card
        v-bind:img-src="producto.fotoSRC"
        v-model="producto.producto_id"
        img-alt="Image"
        img-top
        tag="article"
        class="card mb-2"
      >
        <h5 class="title">{{ producto.nombre }}</h5>
        <p style="width: 200px" class="detalle-producto">
          {{ producto.descripcion }}
        </p>
        <div class="data-producto my-1">
          <b-card-text class="detalle-producto">
            Precio: ₡{{ producto.precio }}
          </b-card-text>
          <b-card-text class="detalle-producto">
            Stock: {{ producto.cantidad }} unid.
          </b-card-text>
          <b-card-text class="detalle-producto">
            Promedio de envío: {{ producto.prom_envio }}
          </b-card-text>
          <b-card-text class="detalle-producto">
            Costo envio: ₡{{ producto.cost_envio }}
          </b-card-text>
          <b-card-text v-if="producto.oferta > 0" class="detalle-producto">
            Precio oferta:{{ producto.oferta }}
          </b-card-text>
        </div>
        <b-form-rating
          variant="warning"
          v-model="producto.calificacion"
          readonly
        ></b-form-rating>

        <p style="width: 200px" class="detalle-producto mt-1">
          📍
          {{
            producto.pais + ", " + producto.provincia + ", " + producto.canton
          }}
        </p>
        <small class="text-muted">Publicado: {{ producto.publicacion }}</small>

        <div class="actions">
          <div>
            <b-button
              class="mx-2 btn-actions"
              @click="eliminarProducto(producto.producto_id)"
              variant="outline-danger"
              >Eliminar</b-button
            >
            <b-button
              class="mx-2 btn-actions"
              @click="editarProducto(producto.producto_id)"
              variant="outline-warning"
              >Editar</b-button
            >
            <b-button
              v-b-modal.modal-scrollable
              @click.prevent="verListaUsuarios(producto.producto_id)"
              class="mx-2 btn-actions"
              variant="outline-primary"
              >{{producto.deseos[0]}} ♥</b-button
            >
          </div>
        </div>
      </b-card>
    </div>
    <b-modal
      id="modal-scrollable"
      scrollable
      title="Usuarios que tienen este producto en lista de deseos"
      @show="resetModal"
      @hidden="resetModal"
    >
      <div
        class="row d-flex justify-content-center"
        v-for="deseo in deseos"
        :key="deseo.id"
      >
        <b-card
          no-body
          class="overflow-hidden my-2 deseos"
          style="max-width: 540px"
        >
          <b-row no-gutters class="d-flex py-2">
            <b-col md="1">
              <b-card-img v-bind:src="deseo.fotoSRC" alt="Image"></b-card-img>
            </b-col>
            <b-col
              class="d-flex justify-content-between align-items-center"
              md="10"
            >
              <h5 class="mx-3">{{ deseo.nombre }}</h5>
              <b-button
                @click.prevent="goPerfil(deseo.id)"
                variant="outline-dark"
                >Ir a perfil</b-button
              >
            </b-col>
          </b-row>
        </b-card>
      </div>

      <span v-if="deseos.length === 0">
        No hay usuarios que lo hayan agregado a lista de deseos
      </span>
    </b-modal>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
export default {
  name: "productosInventario",
  data: () => ({
    productos: [],
    selected: null,
    categorias: [],
    tiendaId: "",
    deseos: [],
  }),
  mounted() {
    localStorage.setItem("id_producto_edit", null);
    this.tiendaId = localStorage.getItem("id_tienda");
    this.getProductos();
    this.getCategorias();
  },
  methods: {
    irDescripcioProducto() {
      this.$router.push("ProductosDescripcion");
    },
    buscarProductos() {
      var buscar = document.getElementById("buscar").value;
      var selectionarCategoria =
        document.getElementById("selectCategoria").value;
      var ur = "";

      if (buscar.length != 0 && selectionarCategoria.length != 0) {
        ur =
          "get_productosTiendas/" +
          this.tiendaId +
          "/" +
          buscar +
          "/" +
          selectionarCategoria;
      } else if (buscar.length != 0 && selectionarCategoria.length == 0) {
        ur = "get_productosTiendas/" + this.tiendaId + "/" + buscar;
      } else if (buscar.length == 0 && selectionarCategoria.length != 0) {
        ur =
          "get_productosTiendas/" + this.tiendaId + "/" + selectionarCategoria;
      } else {
        ur = "get_productosTiendas/" + "1";
      }
      axios.get(process.env.VUE_APP_API_URL + ur).then((respose) => {
        this.productos = respose.data;
        this.getPhotoPreview();
        console.log(this.productos);
      });
    },
    getProductos() {
      axios
        .get(
          process.env.VUE_APP_API_URL + "get_productosTiendas/" + this.tiendaId
        )
        .then((respose) => {
          this.productos = respose.data;
          this.getPhotoPreview();
        
        });
    },
    getPhotoPreview() {
      for (var i = 0; i < this.productos.length; i++) {
        if (this.productos[i].foto.length > 0) {
          this.productos[i].fotoSRC =
            process.env.VUE_APP_API_URL + "get_foto/" + this.productos[i].foto;
        }
      
      }
    },

    getCategorias() {
      console.log(this.tiendaId);
      axios
        .get(process.env.VUE_APP_API_URL + "get_categorias")
        .then((response) => {
          var aux = [];
          aux[0] = {
            value: null,
            text: "Selecione una categoria",
          };
          var cont = 1;
          for (var x of response.data) {
            this.selected,
              (aux[cont] = x);
            cont++;
          }
          this.categorias = aux;
        });
    },
    eliminarProducto(id) {
      axios
        .delete(process.env.VUE_APP_API_URL + "delete_product/" + id)
        .then((response) => {
          
          this.getProductos();
          this.$alertify.success(data.data);
        })
        .catch((error) => {
          console.log(error);
          this.$alertify.success(error);


        });
    },
    editarProducto(id) {
      localStorage.setItem("id_producto_edit", id);
      this.$router.push("productosCRUD");
    },
    goTienda() {
      this.$router.push("productosCRUD");
    },
    verListaUsuarios(id) {
      var url = process.env.VUE_APP_API_URL + "get_deseos_id/" + id;

      console.log(url);
      axios
        .get(url)
        .then((response) => {
          this.deseos = response.data; //llenamos el vector con los datos JSON obtenidos
          for (var i = 0; i < this.deseos.length; i++) {
            if (this.deseos[i].foto_url.length > 0) {
              this.deseos[i].fotoSRC =
                process.env.VUE_APP_API_URL +
                "get_foto/profiles/" +
                this.deseos[i].foto_url;
            }
            console.log(this.deseos);
          }
        })
        .catch((error) => {});
    },
    goPerfil(id) {
      localStorage.setItem("id_perfil", id);
      this.$router.push("comprador/" + id);
    },
    resetModal() {
      this.deseos = [];
    },
  },
};
</script>

<style>
.card img {
  height: 140px;
  width: auto;
  padding: 5px;
  border-radius: 10px;
}
#divProductos {
  text-align: center;
}

#divProductos.left {
  float: left;
  background: rgb(17, 17, 53);
}

.card {
  height: auto;
  width: auto;
  font-size: 14px;
  background: rgb(255, 255, 255);
  border: solid 2px rgb(205, 206, 206);
}

.data-producto {
  background-color: rgb(57, 105, 131);

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
  border-radius: 10px;
  color: white;
}
.detalle-producto {
  padding: 0;
  margin: 0;
}

.card:hover {
  cursor: pointer;
  background: rgb(238, 238, 238);
}

.contenedor_productos {
  float: left;
  padding-left: 80px;
  padding-top: 15px;
}
.btn-actions {
  padding: 0 8px;
}
.actions {
  margin: 5px;
}
.card-body {
  padding-top: 3px;
  padding-bottom: 3px;
}
.menu {
  margin: 0 10% 10px 5%;
  display: flex;
  justify-content: space-between;
}
.input-field {
  width: auto;
  height: 40px;
  border: solid 1px rgb(3, 133, 226);
  border-radius: 5px;
  background-color: whitesmoke;
  margin: 0 10px;
  text-align: start;
  padding: 5px;
}
.buscar-box {
  display: flex;
  width: 80%;
}
.tittle {
  margin: 10px;
  text-align: center;
}
.profile-img {
  border-radius: 50px;
  height: 40px;
  width: 40px;
  border: solid 3px white;
}
.deseos {
  height: auto;
  width: auto;
}
.deseos img {
  height: 40px;
  width: 40px;
}
h4 {
  padding: 0;
  margin: 0;
  color: rgb(83, 83, 83);
}
</style>
