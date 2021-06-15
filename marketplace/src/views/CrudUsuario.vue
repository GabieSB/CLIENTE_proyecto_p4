<template>
    <UserEditor></UserEditor>
    
</template>


<script>
// @ is an alias to /src
    import UserEditor from '@/components/UserEditor.vue'

    export default {
        name: "CrudUsuarios",
        props: ['items'],
        components: {
            UserEditor,
        },
        data: () => ({
     
      
        }),
    };
</script>
