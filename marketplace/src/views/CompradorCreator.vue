<template>
    <CompradorCreatorComponent></CompradorCreatorComponent>
</template>

<script>
// @ is an alias to /src
    import CompradorCreatorComponent from '@/components/CompradorCreatorComponent.vue'

    export default {
        name: "CompradorCreator",
        props: ['items'],
        components: {
            CompradorCreatorComponent,
        },
        data: () => ({
     
      
        }),
    };
</script>