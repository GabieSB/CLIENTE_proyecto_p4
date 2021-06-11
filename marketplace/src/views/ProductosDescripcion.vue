<template>
<div>
<Header></Header>
<SidebarComponent></SidebarComponent>
<h1>Hola</h1>
</div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue"
import SidebarComponent from "@/components/SidebarComponent.vue"
export default {
  name: "Tiendas",
  components: {
    Header,
    SidebarComponent,
  }

};
</script>