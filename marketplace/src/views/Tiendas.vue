<template>
<div>
<Header></Header>
<SidebarComponent></SidebarComponent>
<InformacionTienda></InformacionTienda>
<ProductosTiendas></ProductosTiendas>
</div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue"
import SidebarComponent from "@/components/SidebarComponent.vue"
import InformacionTienda from "@/components/InformacionTienda.vue"
import ProductosTiendas from "@/components/ProductosTiendas.vue"
export default {
  name: "Tiendas",
  components: {
    Header,
    SidebarComponent,
    InformacionTienda,
    ProductosTiendas,
  }

};
</script>