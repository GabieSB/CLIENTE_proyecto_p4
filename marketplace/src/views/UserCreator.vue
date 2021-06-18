<template>
    <UserCreatorComponent></UserCreatorComponent>
</template>


<script>
// @ is an alias to /src
    import UserCreatorComponent from '@/components/UserCreatorComponent.vue'

    export default {
        name: "UserCreatorComponet",
        props: ['items'],
        components: {
            UserCreatorComponent,
        },
        data: () => ({
     
      
        }),
    };
</script>
