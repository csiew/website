<template>
  <div class="section">
    <div class="section-header">
      <h3>Featured projects</h3>
    </div>
    <div class="section card width-full width-max-800 margin-auto-horizontal text-align-center padding-l">
      <div class="vstack align-start justify-center width-full height-full">
        <div class="vstack width-full align-start justify-center text-align-center">
          <div class="hstack hstack-responsive hstack-space-between width-full align-start text-align-center padding-s-bottom">
            <div class="hstack width-auto align-center justify-start padding-xs-bottom">
              <img v-bind:src="this.getImgUrl(projects[currentIndex].logoUrl)" class="margin-s-right nodrag noselect" style="max-width: 2.5rem; max-height: 2.5rem;" />
              <div class="vstack width-auto text-align-left align-start justify-center">
                <h1 class="margin-none padding-xs-top">{{ projects[currentIndex].name }}</h1>
                <small class="text-color-secondary">{{ projects[currentIndex].description }}</small>
              </div>
            </div>
            <div class="hstack width-auto align-start justify-end">
              <div class="hstack width-auto">
                <button v-for="(item, index) in this.projects" v-bind:key="item.name" class="tabbar-item" v-bind:class="currentIndex === index ? 'tabbar-item-current' : ''" v-on:click="this.setIndex(index)">{{ index + 1 }}</button>
              </div>
              <div class="hstack width-auto margin-s-left">
                <button class="tabbar-item" v-on:click="this.prevIndex">&#10094;</button>
                <button class="tabbar-item" v-on:click="this.nextIndex">&#10095;</button>
              </div>
            </div>
          </div>
          <img v-bind:src="this.getImgUrl(projects[currentIndex].imageUrl)" v-bind:alt="projects[currentIndex].name" class="card card-img nodrag noselect" style="width: 100%; height: auto;" />
          <div class="hstack width-full align-center justify-center padding-m-top">
            <router-link class="button" v-bind:to="{ name: 'Projects' }">See all projects &#10132;</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeHero',
  data() {
    return {
      projects: [
        {
          id: "cast",
          name: "Cast",
          description: "Listen to your podcasts on the web with style",
          logoUrl: "logo/cast.png",
          imageUrl: "cast.png"
        },
        {
          id: "biscuitwm",
          name: "BiscuitWM",
          description: "A minimalist window manager for Linux",
          logoUrl: "logo/biscuitwm.png",
          imageUrl: "biscuitwm.png"
        },
        {
          id: "antorcalinux",
          name: "Antorca Linux",
          description: "Linux for desktops, out of the box",
          logoUrl: "logo/antorca.png",
          imageUrl: "antorca_linux.png"
        }
      ],
      currentIndex: 0
    }
  },
  methods: {
    getImgUrl: function (url) {
      try {
        return require("@/assets/images/projects/" + url);
      } catch (error) {
        console.warn(error);
      }
    },
    prevIndex: function () {
      if (this.currentIndex === 0) {
        this.currentIndex = this.projects.length - 1;
      } else {
        this.currentIndex -= 1;
      }
    },
    nextIndex: function () {
      if (this.currentIndex === this.projects.length - 1) {
        this.currentIndex = 0;
      } else {
        this.currentIndex += 1;
      }
    },
    setIndex: function (newIndex) {
      if (newIndex < this.projects.length && newIndex >= 0) {
        this.currentIndex = newIndex;
      }
    }
  }
}
</script>