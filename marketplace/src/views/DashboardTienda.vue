<template>
  <div>
    <Header></Header>
    <h1>Soy una tienda</h1>
    <div>
      <b-card
        title="Card Title"
        img-src="https://picsum.photos/600/300/?image=25"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem"
        class="mb-2"
      >
        <b-card-text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </b-card-text>

        <b-button href="#"  @click.prevent="goTienda"  variant="primary">Go somewhere</b-button>
      </b-card>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
export default {
  name: "Dashboard",
  components: {
    Header,
    data: () => ({}),
  },
  methods:{
      goTienda(){
          this.$router.push('productosCRUD')
      }
  }
};
</script>