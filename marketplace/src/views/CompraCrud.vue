<template>
<div>
<Header></Header>
<SidebarComponent></SidebarComponent>
<Venta></Venta>
</div>
</template>

<script>
import Header from "@/components/Header.vue"
import SidebarComponent from "@/components/SidebarComponent.vue"
import Venta from "@/components/Venta.vue"
export default {
  name: "Tiendas",
  components: {
    Header,
    SidebarComponent,
     Venta
  }

};
</script>