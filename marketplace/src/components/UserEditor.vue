<template>
  <div class="container-fluid">
    <h1>Editor de usuarios</h1>
    <form class="row">
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
          required
        />

        <div>
          <label class="inputLabel" for="nombreCompleto"
            >Nombre completo o de tu tienda</label
          >
        </div>
        <input
          id="nombreCompleto"
          type="text"
          placeholder="Ingresa tu nombre o el de tu tienda"
          required
        />

        <div>
          <label class="inputLabel" for="correo">Correo electrónico</label>
        </div>
        <input
          id="correo"
          type="text"
          placeholder="Ingresa tu nombre o el de tu tienda"
          required
        />

        <div><label class="inputLabel" for="telefono">Teléfono</label></div>
        <input
          id="telefono"
          type="text"
          placeholder="Ingresa tu nombre o el de tu tienda"
          required
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
          required
        />

        <div><label class="inputLabel" for="password">Contraseña</label></div>
        <input
          class="passwordInput"
          id="password"
          type="password"
          placeholder="Ingresa una contraseña segura"
          required
        />
        <div><label class="inputLabel">Dirección</label></div>
        <div class="form-row" style="background-color: #f5f5f5">
          <input class="sr-only" id="pais" type="text" placeholder="País" required/>
          <input id="provincia" type="text" placeholder="Provincia" required/>
          <input id="canton" type="text" placeholder="Cantón" required/>
        </div>
      </div>
      <div class="col-sm-2" style="background-color: #f5f5f5">
        <img
          class="profile-pic"
          src="https://xn--diseoscreativos-1qb.com/wp-content/uploads/2018/06/Imagenes-de-gatos-www.dise%C3%B1oscreativos.com-portada-3-1.jpg"
          alt="foto de perfil"
        />
        <input id="picSelector" type="file" accept=".png, .jpg, .jpge" />
        <div id="tipe_select">
          <h4>Tipo de usuario</h4>
          <label class="r_type" for="tienda">Tienda</label>
          <input id="tienda" type="radio" name="usr_type" required/>

          <label class="r_type" for="cliente">Cliente</label>
          <input id="cliente" type="radio" name="usr_type" required/>
        </div>
      </div>
      <div class="form-group" style="background-color: #f5f5f5">
        <button class="btn act_btn btn-success btn-lg" type="submit">
          Guardar cambios
        </button>
        <button class="btn act_btn btn-warning btn-lg">Limpiar campos</button>
      </div>
    </form>
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
  position: relative;
  margin-left: 1%;
  padding-left: 5px;
  background: #90caf9;
  border-radius: 4px;
  height: 80px;
  top: 40%;
  -webkit-box-shadow: -2px 3px 28px -8px rgba(77, 169, 240, 1);
  -moz-box-shadow: -2px 3px 28px -8px rgba(77, 169, 240, 1);
  box-shadow: -2px 3px 28px -8px rgba(77, 169, 240, 1);
}

.r_type {
  margin-left: 10px;
}

.col-sm-12 {
  padding-top: 25px;
}

.act_btn {
  position: relative;
  margin: 25px;
  left: 33%;
}

.profile-pic {
  position: relative;
  border-radius: 100px;
  height: 150px;
  width: 150px;
  top: 25%;
  left: 33%;
}

#picSelector {
  position: relative;
  top: 27%;
  width: 70%;
  transform: translateX(25%);
}
</style>
