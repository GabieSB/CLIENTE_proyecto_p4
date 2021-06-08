<template>
    <CompradorExtraForm></CompradorExtraForm>
</template>

<script>
// @ is an alias to /src
    import CompradorExtraForm from '@/components/CompradorExtraForm.vue'

    export default {
        name: "CrudComprador",
        props: ['items'],
        components: {
            CompradorExtraForm,
        },
        data: () => ({
     
      
        }),
    };
</script>