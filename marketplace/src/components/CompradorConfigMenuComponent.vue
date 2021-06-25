<template>
  <form class="container-fluid" v-on:submit.prevent="saveChanges">
    <h3>¿Qué deseas configurar?</h3>
    <div class="button-container">
      <div class="internal-button-container">
        <b-button class="menu-btn" @click="goTo('CompradorEditor')">
          <img src="https://img.icons8.com/dusk/64/000000/gear.png" />
          Generales
        </b-button>
        <b-button class="menu-btn" @click="goTo('MetodosPagoAdmin')">
          <img
            src="https://img.icons8.com/dusk/64/000000/insert-credit-card.png"
          />
          Métodos de pago
        </b-button>
        <b-button class="menu-btn" @click="goTo('DireccionesEnvioAdmin')">
          <img
            src="https://img.icons8.com/dusk/64/000000/mailbox-opened-flag-down.png"
          />
          Direcciones de envío
        </b-button>
        <b-button class="menu-btn" @click="goTo()" variant="success">
          <img src="https://img.icons8.com/flat-round/50/000000/back--v1.png" />
          Salir de aquí
        </b-button>
      </div>
    </div>
  </form>
</template>

<script>
import axios from "axios";
import { main } from "../main.js";

export default {
  setup() {},

  name: "CompradorConfigMenuComponent",

  data: () => ({}),

  methods: {
    goTo(where) {
      if (where) {
        this.$router.push(where);
      } else {
        this.$router.back();
      }
    },
  },
};
</script>

<style scoped>
.container-fluid {
  padding: 100px;
}

.button-container {
  background: #78909c;
  min-height: 450px;
  border-radius: 25px;

  -webkit-box-shadow: -1px 2px 14px -1px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -1px 2px 14px -1px rgba(0, 0, 0, 0.75);
  box-shadow: -1px 2px 14px -1px rgba(0, 0, 0, 0.75);
}

.internal-button-container {
  position: relative;
  transform: translateY(100%);
  left: 15%;
}

.menu-btn {
  margin: 20px;
  height: 80px;
}
</style>