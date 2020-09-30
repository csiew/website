<template>
  <div class="nav navbar vstack justify-stretch align-stretch width-full">
    <div class="hstack hstack-space-between padding-s">
      <router-link class="navbar-wordmark" to="/">
        <img class="profile-img profile-img-s nodrag noselect border-radius-100pct" src="@/assets/images/profile.jpg" />
      </router-link>
      <div v-if="!this.isMobile()">
        <small>
          <div id="navbarLinks" class="tabbar">
            <router-link v-for="item in this.pages" v-bind:key="item.id" class="tabbar-item" v-bind:to="item.route">{{ item.label }}</router-link>
          </div>
        </small>
      </div>
      <div v-else>
        <a id="navbarMenuButton" class="button" v-on:click="this.toggleNavMenu()">&#9776;</a>
      </div>
    </div>
  </div>
  <div v-if="this.isMobile()" id="navbarMenu" class="nav navmenu vstack width-full text-align-left">
    <div class="vstack">
      <div class="hstack hstack-space-between padding-s">
        <router-link class="navbar-wordmark" to="/">
          <img class="profile-img profile-img-s nodrag noselect border-radius-100pct" src="@/assets/images/profile.jpg" />
        </router-link>
        <a class="button" v-on:click="this.hideNavMenu()">&#10005;</a>
      </div>
      <div class="vstack padding-m">
        <router-link v-for="item in this.pages" v-bind:key="item.id" class="tabbar-vertical-item text-align-center font-scale-xl" v-bind:to="item.route" v-on:click="this.hideNavMenu()">{{ item.label }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
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
      document.getElementById("navbarMenuButton").style.display = "inline-flex";
    },
    hideNavMenuButton() {
      document.getElementById("navbarMenuButton").style.visibility = "hidden";
      document.getElementById("navbarMenuButton").style.display = "none";
    },
    revealNavMenu() {
      document.getElementById("navbarMenu").style.visibility = "visible";
      document.getElementById("navbarMenu").style.display = "inline-flex";
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
    }
  },
  mounted: function () {
    if (this.isMobile() === true) {
      this.hideNavMenu();
    }
  }
}
</script>