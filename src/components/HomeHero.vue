<template>
  <div class="section">
    <div class="section-header">
      <h3>Featured projects</h3>
    </div>
    <div class="section card width-full width-max-800 margin-auto-horizontal text-align-center padding-m">
      <div class="vstack align-start justify-center width-full height-full">
        <div class="vstack width-full align-start justify-center text-align-center">
          <div class="grid grid-col-auto-fill-256 grid-gap-m width-full align-start text-align-center padding-s-bottom">
            <transition name="slide-fade">
              <div v-if="isVisible.projectTitle === true" class="hstack width-auto align-center justify-start padding-xs-bottom">
                <img v-bind:src="this.getImgUrl(projects[currentIndex].logoUrl)" class="margin-s-right nodrag noselect" style="max-width: 2.75rem; max-height: 2.75rem;" />
                <div class="vstack width-auto text-align-left align-start justify-center">
                  <h1 class="margin-none-top margin-xxs-bottom">{{ projects[currentIndex].name }}</h1>
                  <small class="text-color-secondary">{{ projects[currentIndex].description }}</small>
                </div>
              </div>
            </transition>
            <div class="hstack width-auto align-start justify-end">
              <div class="tabbar width-auto">
                <button v-for="(item, index) in this.projects" v-bind:key="item.name" class="tabbar-item" v-bind:class="currentIndex === index ? 'tabbar-item-current' : ''" v-on:click="this.setIndex(index)">{{ index + 1 }}</button>
              </div>
              <div class="tabbar width-auto margin-s-left">
                <button class="tabbar-item" v-on:click="this.prevIndex">&#10094;</button>
                <button class="tabbar-item" v-on:click="this.nextIndex">&#10095;</button>
              </div>
            </div>
          </div>
          <transition name="slide-fade">
            <img v-if="isVisible.projectScreenshot === true" v-bind:src="this.getImgUrl(projects[currentIndex].imageUrl)" v-bind:alt="projects[currentIndex].name" class="card card-img nodrag noselect" style="width: 100%; height: auto;" />
          </transition>
          <div class="hstack width-full align-center justify-center padding-m-top">
            <router-link class="button" v-bind:to="{ name: 'Projects' }">See all projects &#8594;</router-link>
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
      isVisible: {
        projectTitle: true,
        projectScreenshot: true
      },
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
      this.transitionToggle();
    },
    nextIndex: function () {
      if (this.currentIndex === this.projects.length - 1) {
        this.currentIndex = 0;
      } else {
        this.currentIndex += 1;
      }
      this.transitionToggle();
    },
    setIndex: function (newIndex) {
      if (newIndex < this.projects.length && newIndex >= 0) {
        this.currentIndex = newIndex;
      }
      this.transitionToggle();
    },
    transitionToggle: function () {
      this.isVisible.projectTitle = false;
      this.isVisible.projectScreenshot = false;
      setTimeout(() => {
        this.isVisible.projectTitle = true;
        this.isVisible.projectScreenshot = true;
      }, 0);
    }
  }
}
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-to-active {
  transition: all 0.25s ease-in-out;
}
.slide-fade-enter-from {
  opacity: 0%;
  filter: saturate(0%) blur(5px) drop-shadow(0px 4px 8px rgba(0,0,0,0.5));
  transform: translateY(-5%) scale(0.95);
}
.slide-fade-leave-to {
  opacity: 0%;
  filter: saturate(0%) blur(5px) drop-shadow(0px 4px 8px rgba(0,0,0,0.5));
  transform: translateY(-5%) scale(0.95);
}
.slide-fade-enter-to {
  opacity: 100%;
  filter: saturate(100%) blur(0px) drop-shadow(none);
  transform: translateY(0%) scale(1);
}
</style>