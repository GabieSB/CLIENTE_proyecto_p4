<template>

<div>
    <Header></Header>
    <SidebarComponent></SidebarComponent>
    <MensajesComponent></MensajesComponent>
</div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue"
import SidebarComponent from "@/components/SidebarComponent.vue"
import MensajesComponent from "@/components/MensajesComponent.vue"
export default {
    name: "PreguntaCrud",
    components: {
        Header,
        SidebarComponent,
        MensajesComponent
    }

};
</script>

