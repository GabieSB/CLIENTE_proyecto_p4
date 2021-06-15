<template>

<div>
  <Header></Header>

    <ProductosInventario></ProductosInventario>
</div>
    
</template>
<script>
import Header from "@/components/Header.vue";
import ProductosInventario from "@/components/ProductosInventario.vue"


export default {
  components: {
    Header,
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