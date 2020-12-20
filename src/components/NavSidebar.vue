<template>
  <div id="navSidebar" class="nav navsidebar">
    <div class="vstack vstack-space-between height-full">
      <div class="vstack">
        <router-link class="navbar-wordmark margin-l-top margin-s-bottom" to="/">
          <img class="profile-img profile-img-m nodrag noselect border-radius-100pct" src="@/assets/images/profile.jpg" />
        </router-link>
        <div class="width-full text-align-left padding-s">
          <div class="vstack margin-none">
            <router-link v-for="item in this.pages" v-bind:key="item.id" class="tabbar-vertical-item" v-bind:to="item.route">{{ item.label }}</router-link>
          </div>
          <hr class="margin-xs-top margin-xs-bottom">
          <div class="vstack margin-none">
            <a class="tabbar-vertical-item" href="https://csiew-portfolio.netlify.app/" target="_blank">Portfolio</a>
          </div>
        </div>
      </div>
      <div class="flex-inline flex-flow-row align-center justify-start width-full padding-s">
        <button class="toggle-switch" v-bind:class="isDarkMode === true ? 'toggle-switch-active' : ''" v-on:click="this.toggleDarkMode()" title="Toggle dark mode (requires refresh)">
          <div class="toggle-switch-knob"></div>
        </button>
        <div class="vstack width-auto margin-s-left text-color-secondary noselect">
          <h4 class="margin-none padding-none">Dark mode</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavSidebar',
  inject: ['SettingsProvider'],
  data() {
    return {
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
    isDarkMode: function () {
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
    revealNavMenuButton() {
      document.getElementById("navbarMenuButton").style.visibility = "visible";
      document.getElementById("navbarMenuButton").style.display = "inline-block";
    },
    hideNavMenuButton() {
      document.getElementById("navbarMenuButton").style.visibility = "hidden";
      document.getElementById("navbarMenuButton").style.display = "none";
    },
    revealNavMenu() {
      document.getElementById("navbarMenu").style.visibility = "visible";
      document.getElementById("navbarMenu").style.display = "inline-block";
    },
    hideNavMenu() {
      document.getElementById("navbarMenu").style.visibility = "hidden";
      document.getElementById("navbarMenu").style.display = "none";
    },
    toggleNavMenu() {
      let navbarMenu = document.getElementById("navbarMenu");
      if (navbarMenu != null) {
        if (navbarMenu.style.visibility === "hidden") {
          this.revealNavMenu();
        } else {
          this.hideNavMenu();
        }
      }
    },
    revealNavLinks() {
      document.getElementById("navbarLinks").style.visibility = "visible";
      document.getElementById("navbarLinks").style.display = "inline-block";
    },
    hideNavLinks() {
      document.getElementById("navbarLinks").style.visibility = "hidden";
      document.getElementById("navbarLinks").style.display = "none";
    },
    toggleDarkMode() {
      this.SettingsProvider.toggleDarkModeState();
    }
  }
}
</script>

<style scoped>
.navsidebar {
  border-right: var(--CARD-BORDER-WIDTH) solid var(--CARD-BORDER-COLOR);
}

#navSidebar {
  visibility: visible;
  display: inline-flex;
}
@media only screen and (max-width: 1024px) {
  #navSidebar {
    visibility: hidden;
    display: none;
  }
}
</style>