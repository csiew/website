<template>
  <Navbar />
  <div class="hstack hstack-height-full">
    <NavSidebar class="hstack-column" />
    <div class="hstack-column width-full padding-l">
      <router-view></router-view>
      <Footer />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import NavSidebar from '@/components/NavSidebar.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    NavSidebar,
    Footer
  }
}
</script>

<style>
@import './assets/style/base.css';
@import './assets/style/main.css';
@import './assets/style/button.css';
@import './assets/style/form.css';
@import './assets/style/card.css';
@import './assets/style/fonts/fonts.css';
</style>
