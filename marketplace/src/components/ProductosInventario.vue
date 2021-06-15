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
         id= "buscar"
          type="search"
          @keyup="buscarProductos()"
          class="fadeIn second input-field"
          name="buscar"
          placeholder="Buscar"
          required
        />
      </div>
      <div>
          <b-button variant="primary">Agregar Producto</b-button>
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
          v-model="value"
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
          <b-button class="mx-2 btn-actions" @click="eliminarProducto(producto.producto_id)" variant="outline-danger">Eliminar</b-button>
          <b-button class="mx-2 btn-actions" variant="outline-warning">Editar</b-button>
        </div>
      </b-card>
    </div>
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
   
    value: 4,
  }),
  mounted() {
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

      console.log(this.tiendaId);

      console.log(ur);
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
          console.log(this.productos);
        });
    },
    getPhotoPreview() {
      console.log("in ptp s");
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
        .get(process.env.VUE_APP_API_URL + "get_categorias2/" + this.tiendaId)
        .then((response) => {
          var aux = [];
          aux[0] = {
            value: null,
            text: "Selecione una categoria",
          };
          var cont = 1;
          for (var x of response.data) {
            this.selected,
              (aux[cont] = {
                value: x.categoria_id,
                text: x.categoria,
              });
            cont++;
          }
          this.categorias = aux;
        });
    },
    getFotosProductoId(id = 17) {
      axios
        .get(process.env.VUE_APP_API_URL + "get_fotos_by_producto/" + id)
        .then((respose) => {
          console.log(respose);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    eliminarProducto(id){
         axios
        .delete(process.env.VUE_APP_API_URL + "delete_product/" + id)
        .then((response) => {
            console.log(response.data)
            this.getProductos();
          
        }).catch((error) => {
          console.log(error);
        });

    }
  },
};
</script>

<style>
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
.card img {
  height: 140px;
  width: auto;
  padding: 5px;
  border-radius: 10px;
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
.btn-actions{
  padding: 0 8px;
}
.actions {
  margin: 5px;
}
.card-body {
  padding-top: 3px;
  padding-bottom: 3px;
}
.menu{
    margin: 0  10% 10px 5%;
    display: flex;
    justify-content: space-between;
}
.input-field {
  width: auto;
  height: 40px;
  border: solid 1px  rgb(3, 133, 226);
  border-radius: 5px;
  background-color: whitesmoke;
  margin: 0 10px;
  text-align: start;
  padding: 5px;
}
.buscar-box{
    display: flex;
    width: 80%;
}

</style>
