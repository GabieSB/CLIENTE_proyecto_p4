<template>
    <CompradorConfigMenuComponent></CompradorConfigMenuComponent>
</template>

<script>
    import CompradorConfigMenuComponent from '@/components/CompradorConfigMenuComponent.vue'

    export default {
        name: "CompradorConfigMenu",
        props: ['items'],
        components: {
            CompradorConfigMenuComponent,
        },
        data: () => ({}),
    };
</script>