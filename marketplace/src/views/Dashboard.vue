<template>
    <div>
        <Header></Header>
        <h1>{{usuario}}</h1>
    </div>
  
</template>
<script>
import Header from "@/components/Header.vue"
export default {
    name: "Dashboard",
    components:{
        Header
    ,
    data: () => ({
     
      
     }),
}
    
}
</script>