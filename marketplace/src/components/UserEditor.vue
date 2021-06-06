<template>
  <div class="container-fluid">
    <h1>Editor de usuarios</h1>
    <div class="row">
      <div class="col-sm-6" style="background-color: #f5f5f5">
        <div>
          <label class="inputLabel" for="cedula"
            >Cédula física o juridica</label
          >
        </div>
        <input
          id="cedula"
          type="text"
          placeholder="Ingresa tu cédula física o jurídica"
        />

        <div>
          <label class="inputLabel" for="nombreCompleto"
            >Nombre completo o de tu nueva tienda</label
          >
        </div>
        <input
          id="nombreCompleto"
          type="text"
          placeholder="Ingresa tu nombre o el de tu nueva tienda"
        />

        <div>
          <label class="inputLabel" for="correo">Correo electrónico</label>
        </div>
        <input
          id="correo"
          type="text"
          placeholder="Ingresa tu nombre o el de tu nueva tienda"
        />

        <div><label class="inputLabel" for="telefono">Teléfono</label></div>
        <input
          id="telefono"
          type="text"
          placeholder="Ingresa tu nombre o el de tu nueva tienda"
        />
      </div>
      <div class="col-sm-4" style="background-color: #f5f5f5">
        <div>
          <label class="inputLabel" for="usuario">Nombre de usuario</label>
        </div>
        <input
          id="usuario"
          type="text"
          placeholder="Ingresa una contraseña segura"
        />

        <div><label class="inputLabel" for="password">Contraseña</label></div>
        <input
          class="passwordInput"
          id="password"
          type="password"
          placeholder="Ingresa una contraseña segura"
        />
        <div id="tipe_select">
          <h4>Tipo de usuario</h4>
          <label class="r_type" for="tienda">Tienda</label>
          <input id="tienda" type="radio" name="usr_type" />

          <label class="r_type" for="cliente">Cliente</label>
          <input id="cliente" type="radio" name="usr_type" />
        </div>
      </div>
      <div class="col-sm-2" style="background-color: #f5f5f5">
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        illo inventore veritatis et quasi architecto.
      </div>
      <div class="col-sm-12"  style="background-color: #f5f5f5">
        <button class="act_btn btn-success">Guardar cambios</button>
        <button class="act_btn btn-warning">Limpiar campos</button>
      </div>
    </div>
    
  </div>
</template>


<script>
import axios from "axios";

export default {
  setup() {},

  name: "UserEditor",

  data: () => ({
    usuario: "",
    password: "",
    error: false,
  }),

  methods: {},
};
</script>


<style scoped>
.container-fluid {
  padding-left: 50px;
  padding-right: 50px;
}

.row {
  padding-top: 50px;
}

.inputLabel {
  padding-top: 25px;
  font-weight: bold;
}

input {
  border-bottom-color: #b0bec5;
  background: white;
}

.passwordInput {
  background: white;
  border: none;
  border-radius: 3px;
  height: 55px;
  width: 85%;
  border-bottom: #bdbdbd 2px solid;
  margin-top: 1%;
  margin-left: 1%;
}

.passwordInput:focus {
  border-bottom: #8bc34a 2px solid;
}

#tipe_select {
  margin-top: 25px;
  margin-left: 1%;
  padding-left: 5px;
  background: #90caf9;
  width: 85%;
  border-radius: 4px;
  height: 80px;
  -webkit-box-shadow: -2px 3px 28px -8px rgba(77,169,240,1);
  -moz-box-shadow: -2px 3px 28px -8px rgba(77,169,240,1);
  box-shadow: -2px 3px 28px -8px rgba(77,169,240,1);
}

.r_type {
  margin-left: 10px;
}

.col-sm-12{
  padding-top: 25px;
}

.act_btn{
  border: none;
  height: 40px;
  border-radius: 5px;
  margin-left: 75px;
}
</style>
