<template>
  <div>
    <HeaderTienda  ></HeaderTienda>
    <SidebarComponent></SidebarComponent>
    <ProductoData></ProductoData>
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderTienda from "@/components/HeaderTienda.vue";
import SidebarComponent from "@/components/SidebarComponent.vue";
import ProductoData from "@/components/ProductoDatos.vue";
export default {
  name: "ProductoTienda",
  components: {
    HeaderTienda,
    SidebarComponent,
    ProductoData,
  },
  data: () => ({
    id_producto: ""
  }),
  mounted() {
     
    this.id_producto = this.$route.params.id;
     console.log(this.id_producto)
  },
};
</script>
    
<style scoped>
</style>
