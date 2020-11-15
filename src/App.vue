<template>
  <Navbar />
  <div class="hstack hstack-height-full">
    <NavSidebar class="hstack-column width-full width-max-300" />
    <div class="hstack-column vstack vstack-height-full align-center justify-start width-full">
      <router-view />
      <Footer />
    </div>
  </div>
</template>

<script>
import VueCookies from 'vue-cookies'
import { store as SettingsProvider } from '@/providers/SettingsProvider.js';

import Navbar from '@/components/Navbar.vue'
import NavSidebar from '@/components/NavSidebar.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'App',
  provide: {
    SettingsProvider
  },
  components: {
    Navbar,
    NavSidebar,
    Footer
  },
  mounted: function () {
    var isDarkMode = VueCookies.get('dark_mode');
    if (isDarkMode) {
      SettingsProvider.setDarkModeState(isDarkMode === 'true' ? true : false);
    } else {
      // If cookie does not exist
      SettingsProvider.setDarkModeState(false);
    }
    console.log(isDarkMode);
    switch (isDarkMode) {
      case ('true'):
        import('./assets/style/themes/dark.css');
        break;
      default:
        import('./assets/style/themes/light.css');
    }
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
/* @import './assets/style/themes/dark.css' all and (prefers-color-scheme: dark);
@import './assets/style/themes/light.css' all and (prefers-color-scheme: light); */

@import url('https://fonts.googleapis.com/css2?family=Commissioner:wght@300;400;700;800;900&display=swap');
</style>
