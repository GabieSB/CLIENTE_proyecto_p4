<template>
    <div>
        <Header></Header>
        <SidebarComponent></SidebarComponent>
       <!--h1>Soy un comprador</h1-->
       
    </div>
  
</template>
<script>
import Header from "@/components/Header.vue"
import SidebarComponent from "@/components/SidebarComponent.vue"
export default {
    name: "Dashboard",
    components:{
        Header,
        SidebarComponent
      
    ,
    data: () => ({
     
      
     }),
}
    
}
</script>


