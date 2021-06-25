<template>
<div>
    <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">
            <b-button variant="dark" v-b-toggle.sidebar-no-header>
                <b-icon icon="list"></b-icon>
            </b-button>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item href="#">Link</b-nav-item>

            </b-navbar-nav>

        </b-collapse>
    </b-navbar>
</div>
</template>

<script>
import axios from "axios";
export default {
    name: "HeaderTienda",
    data: () => ({
        
    }),
    mounted() {
        
    },
    methods: {
    
    }
};
</script>

<style>

</style>
