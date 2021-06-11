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

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">

                <b-nav-item-dropdown right>
                    <!-- Using 'button-content' slot -->
                    <template #button-content>
                        <em>User</em>
                    </template>
                    <b-dropdown-item href="#">Profile</b-dropdown-item>
                    <b-dropdown-item href="#">Sign Out</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-collapse>
        <b-nav-item-dropdown text="Lang" right>
            <div>
                <b-card title="Card Title" img-src="https://picsum.photos/600/300/?image=25" img-alt="Image" img-top tag="article" style="max-width: 20rem;" class="mb-2">
                    <b-card-text>
                        Some quick example text to build on the card title and make up the bulk of the card's content.
                    </b-card-text>

                    <b-button href="#" variant="primary">Go somewhere</b-button>
                </b-card>
            </div>
        </b-nav-item-dropdown>
    </b-navbar>
</div>
</template>

<script>
export default {
    name: "Header"
};
</script>

<style scoped>
</style>
