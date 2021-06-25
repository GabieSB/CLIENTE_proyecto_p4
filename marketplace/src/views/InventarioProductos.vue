<template>

<div>
  <HeaderTienda></HeaderTienda>

    <ProductosInventario></ProductosInventario>
</div>
    
</template>
<script>
import HeaderTienda from "@/components/HeaderTienda.vue";
import ProductosInventario from "@/components/ProductosInventario.vue"


export default {
  components: {
    HeaderTienda,
    ProductosInventario, 
  },
  data: () => ({
    
  }),
  mounted() {
  
  },
  methods: {
   
  }
    
}
</script>
<style scoped>

</style>