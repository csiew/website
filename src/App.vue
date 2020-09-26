<template>
  <Navbar />
  <div class="container padding-l">
    <router-view></router-view>
  </div>
  <Footer />
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  }
}
</script>

<style>
@import './assets/style/base.css';
@import './assets/style/main.css';
@import './assets/style/button.css';
@import './assets/style/card.css';
@import url('https://fonts.googleapis.com/css2?family=Epilogue:ital,wght@0,300;0,400;0,700;0,800;0,900;1,300;1,400;1,700;1,800;1,900&display=swap');
</style>
