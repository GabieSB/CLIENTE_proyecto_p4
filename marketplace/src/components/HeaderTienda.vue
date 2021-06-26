<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">
        <b-button variant="dark" v-b-toggle.sidebar-no-header>
          <b-icon icon="list"></b-icon>
        </b-button>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>User</em>
            </template>

            <b-dropdown-item @click="goHome" href="#"
              >Cerrar Session</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HeaderTienda",
  data: () => ({}),
  mounted() {},
  methods: {
    goHome() {

      this.$router.push("/");
     
    },
  },
};
</script>

<style>
</style>
