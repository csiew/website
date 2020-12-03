<template>
  <div id="appDelegate" class="vstack height-full" v-bind:class="isDarkMode ? 'dark-mode' : ''">
    <Navbar />
    <div class="hstack hstack-height-full">
      <NavSidebar class="hstack-column width-full width-max-256" />
      <div class="hstack-column vstack vstack-height-full align-center justify-start width-full">
        <router-view />
        <Footer />
      </div>
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
  computed: {
    isDarkMode: function () {
      return SettingsProvider.getDarkModeState();
    }
  },
  mounted: function () {
    var darkModeCookie = VueCookies.get('dark_mode');
    if (darkModeCookie) {
      SettingsProvider.setDarkModeState(darkModeCookie === 'true' ? true : false);
    } else {
      // If cookie does not exist
      SettingsProvider.setDarkModeState(false);
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
@import './assets/style/themes/light.css';
@import './assets/style/themes/dark.css';
</style>
