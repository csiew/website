<template>
  <div class="vstack width-auto height-auto align-end justify-end z-index-200 position-fixed margin-auto-top margin-none-bottom margin-auto-left margin-m-right padding-xs padding-none-bottom anchor-bottom anchor-right overflow-auto card-enter-up">
    <transition name="fade">
      <div v-if="state.showNavMenu === true" class="card margin-s-bottom overflow-auto height-auto">
        <div class="padding-s padding-xs-bottom text-align-right">
          <h4>Playlists</h4>
        </div>
        <div class="card-list padding-none-top">
          <ul>
            <li v-for="year in this.playlists" v-bind:key="year.title" class="cursor-pointer padding-s padding-xs-top padding-xs-bottom align-end text-align-right noselect" v-on:click="scrollToSection(year.title); state.showNavMenu = false;">{{ year.title }}</li>
          </ul>
        </div>
      </div>
    </transition>
    <div class="grid grid-auto-flow-column grid-gap-none nav-shadow-drop">
      <button class="border-radius-card hug-bottom hug-right button-accent cursor-pointer padding-m-left padding-m-right" v-on:click="scrollToSection('top'); state.showNavMenu = false;">
        &#8593;
      </button>
      <button class="border-radius-card hug-bottom hug-left cursor-pointer padding-m-left padding-m-right" v-bind:class="state.showNavMenu === true ? 'button-fg' : 'button-accent'" v-on:click="state.showNavMenu = !state.showNavMenu">
        &#9776;
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlaylistsNav',
  props: {
    playlists: Object
  },
  data() {
    return {
      state: {
        showNavMenu: false
      }
    }
  },
  methods: {
    scrollToSection: function (sectionId) {
      this.$emit('scroll-to-section', sectionId);
    }
  }
}
</script>

