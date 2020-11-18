<template>
  <div id="navbar" class="nav navbar vstack justify-stretch align-stretch width-full">
    <div class="hstack hstack-space-between padding-s-top padding-s-bottom padding-m-left padding-m-right">
      <router-link class="navbar-wordmark" to="/">
        <img class="profile-img profile-img-s nodrag noselect border-radius-100pct" src="@/assets/images/profile.jpg" />
      </router-link>
      <div>
        <div v-if="!this.isMobile()" class="hstack width-auto align-center">
          <button class="toggle-switch margin-m-right" v-bind:class="darkModeState === true ? 'toggle-switch-active' : ''" v-on:click="this.toggleDarkMode()" title="Toggle dark mode (requires refresh)">
            <div class="toggle-switch-knob"></div>
          </button>
          <small>
            <div id="navbarLinks" class="tabbar">
              <router-link v-for="item in this.pages" v-bind:key="item.id" class="tabbar-item" v-bind:to="item.route">{{ item.label }}</router-link>
            </div>
          </small>
        </div>
        <div v-else>
          <button id="navbarMenuButton" class="button-borderless padding-none line-height-1 font-scale-xl" v-on:click="isVisible.navMenu = !isVisible.navMenu">&#9776;</button>
        </div>
      </div>
    </div>
  </div>
  <transition name="fade">
    <div v-if="isVisible.navMenu === true" id="navbarMenu" class="nav nav-translucent navmenu vstack width-full text-align-left">
      <div class="flex-inline flex-flow-column height-full align-center justify-space-between">
        <div class="width-full">
          <div class="hstack hstack-space-between padding-s-top padding-s-bottom padding-m-left padding-m-right">
            <router-link class="navbar-wordmark" to="/">
              <img class="profile-img profile-img-s nodrag noselect border-radius-100pct" src="@/assets/images/profile.jpg" />
            </router-link>
            <button class="button-borderless padding-none line-height-1 font-scale-xl" v-on:click="isVisible.navMenu = false">&#10005;</button>
          </div>
          <div class="vstack padding-m">
            <router-link v-for="item in this.pages" v-bind:key="item.id" class="tabbar-vertical-item text-align-center font-scale-xl" v-bind:to="item.route" v-on:click="isVisible.navMenu = false">{{ item.label }}</router-link>
          </div>
        </div>
        <div class="flex-inline flex-flow-row align-center justify-start width-full padding-s">
          <button class="toggle-switch" v-bind:class="darkModeState === true ? 'toggle-switch-active' : ''" v-on:click="this.toggleDarkMode()" title="Toggle dark mode (requires refresh)">
            <div class="toggle-switch-knob"></div>
          </button>
          <div class="vstack width-auto margin-s-left text-color-secondary noselect">
            <h4 class="margin-none-top margin-xxs-bottom padding-none">Dark mode</h4>
            <span class="font-scale-xxs">Requires page refresh</span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Navbar',
  inject: ['SettingsProvider'],
  data() {
    return {
      isVisible: {
        navLinks: true,
        navMenuButton: false,
        navMenu: false
      },
      pages: [
        {
          id: 'home',
          label: 'Home',
          route: '/'
        },
        {
          id: 'about',
          label: 'About',
          route: '/about'
        },
        {
          id: 'blog',
          label: 'Blog',
          route: '/blog'
        },
        {
          id: 'projects',
          label: 'Projects',
          route: '/projects'
        },
        {
          id: 'playlists',
          label: 'Playlists',
          route: '/playlists'
        }
      ]
    };
  },
  computed: {
    darkModeState: function () {
      return this.SettingsProvider.getDarkModeState();
    }
  },
  methods: {
    isMobile() {
      if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true
      } else {
        return false
      }
    },
    toggleDarkMode() {
      this.SettingsProvider.toggleDarkModeState();
    }
  },
  mounted: function () {
    if (this.isMobile() === true) {
      this.isVisible = {
        navLinks: false,
        navMenuButton: true,
        navMenu: false
      }
    } else {
      this.isVisible = {
        navLinks: true,
        navMenuButton: false,
        navMenu: false
      }
    }
  }
}
</script>

<style scoped>
#navbar {
  visibility: hidden;
  display: none;
  border-bottom: var(--CARD-BORDER-WIDTH) solid var(--CARD-BORDER-COLOR);
}
@media only screen and (max-width: 1024px) {
  #navbar {
    visibility: visible;
    display: inline-flex;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
</style>