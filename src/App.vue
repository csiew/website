<template>
  <Navbar />
  <div class="hstack hstack-height-full">
    <NavSidebar class="hstack-column" />
    <div class="container width-full padding-l">
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
@import './assets/style/card.css';
@import './assets/style/fonts/fonts.css';
@import url('https://fonts.googleapis.com/css2?family=Epilogue:ital,wght@0,300;0,400;0,700;0,800;0,900;1,300;1,400;1,700;1,800;1,900&display=swap');
</style>
