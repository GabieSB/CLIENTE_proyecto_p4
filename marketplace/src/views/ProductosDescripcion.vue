<template>
<div>
<Header></Header>
<SidebarComponent></SidebarComponent>
<FotosProductos></FotosProductos>
</div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue"
import SidebarComponent from "@/components/SidebarComponent.vue"
import FotosProductos from "@/components/FotosProductos.vue"
export default {
  name: "Tiendas",
  components: {
    Header,
    SidebarComponent,
    FotosProductos

  }

};
</script>