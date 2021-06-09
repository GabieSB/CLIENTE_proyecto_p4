<template>
<div>
    <Header></Header>
    <SidebarComponent></SidebarComponent>
    <Carousel></Carousel>
     <ListTiendas></ListTiendas>
    <!--h1>Soy un comprador</h1-->

</div>
</template>

<script>
import Header from "@/components/Header.vue"
import SidebarComponent from "@/components/SidebarComponent.vue"
import ListTiendas from "@/components/ListTiendas"
import Carousel from "@/components/Carousel.vue"
export default {
    name: "Dashboard",
    components: {
        Header,
        SidebarComponent,
        Carousel,
       ListTiendas,

    }

}
</script>
