<template>
  <div>
    
    <b-sidebar id="sidebar-no-header" aria-labelledby="sidebar-no-header-title" 
    no-header shadow bg-variant="dark" text-variant="light" backdrop backdrop-variant="dark">
      <template #default="{ hide }">
        <div class="p-3">
          
          <div class="d">
            <b-avatar src="https://placekitten.com/300/300" size="6rem"></b-avatar>
            <h4 id="sidebar-no-header-title">Menú</h4>
            <div class="divider-menu"></div>
          </div>
        
          <nav class="mb-3">
            <b-nav vertical>
              <b-nav-item active @click="hide">Active</b-nav-item>
              <b-nav-item href="#link-1" @click="hide">Link</b-nav-item>
              <b-nav-item href="#link-2" @click="hide">Another Link</b-nav-item>
            </b-nav>
          </nav>
          <b-button variant="primary" block @click="hide">Close Sidebar</b-button>
        </div>
      </template>
    </b-sidebar>
  </div>
</template>

<script>
 export default
 {
   name:'SidebarComponent',
 }
</script>

<style>
.nav-item > .nav-link
{
  color:#fff;
}
.nav-item > .nav-link:hover
{
  color:#CCC;
}
.divider-menu{
  border:1px solid #fff;
  width: 100;
}
</style>

