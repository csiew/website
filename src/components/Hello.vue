<template>
  <div class="section hello width-full width-max-640 text-align-center margin-auto-horizontal margin-xl-top">
    <div class="section-header margin-xxl-bottom">
      <img class="profile-img profile-img-l nodrag noselect border-radius-100pct" alt="profile.jpg" src="@/assets/images/profile.jpg" />
      <h1 class="margin-m-top margin-s-bottom">Clarence Siew</h1>
      <p class="text-color-secondary">Software Engineer based in Melbourne, Australia</p>
    </div>
    <span v-if="isMobile()">
      <a id="toggleContactLinksButton" class="button cursor-pointer width-max-480 width-full margin-l-bottom" v-on:click="toggleContactLinks">Contact</a>
    </span>
    <div id="contactLinks" class="grid grid-gap-m grid-col-auto-fit-128 width-max-480 margin-auto-horizontal">
      <span v-for="item in links" v-bind:key="item.id">
        <a class="grid-item button width-full" v-bind:href=item.url target="_blank">{{ item.name }}</a>
      </span>
    </div>
  </div>
</template>

<script>
import linksJSON from '@/assets/links.json'

export default {
  name: 'Hello',
  data() {
    return {
      showContactLinks: true,
      links: linksJSON.links
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
    toggleContactLinks: function () {
      this.showContactLinks = !this.showContactLinks;
      this.revealContactLinks();
      if (this.showContactLinks === false) {
        this.hideContactLinks();
      }
    },
    revealContactLinks: function () {
        try {
          document.getElementById("toggleContactLinksButton").innerHTML = "Contact &uarr;";
        } catch {
          console.log("Cannot set contact button innerHTML");
        }
        document.getElementById("contactLinks").style.visibility = "visible";
        document.getElementById("contactLinks").style.display = "grid";
        document.getElementById("contactLinks").style.height = "auto";
    },
    hideContactLinks: function () {
        try {
          document.getElementById("toggleContactLinksButton").innerHTML = "Contact &darr;";
        } catch {
          console.log("Cannot set contact button innerHTML");
        }
        document.getElementById("contactLinks").style.visibility = "hidden";
        document.getElementById("contactLinks").style.display = "none";
        document.getElementById("contactLinks").style.height = "0";
    }
  },
  mounted: function () {
    this.revealContactLinks();
    if (this.isMobile() === true) {
      this.hideContactLinks();
    }
  }
}
</script>