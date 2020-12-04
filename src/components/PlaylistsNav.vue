<template>
  <div class="vstack width-auto height-auto align-end justify-end z-index-200 position-fixed margin-auto-top margin-s-bottom margin-auto-left margin-m-right padding-xs anchor-bottom anchor-right overflow-auto">
    <transition name="fade">
      <div v-show="state.showNavMenu === true" class="card margin-s-bottom overflow-auto height-auto">
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
    <div class="grid grid-auto-flow-column grid-gap-s">
      <button class="button-accent button-circle button-circle-xl nav-shadow cursor-pointer" v-on:click="scrollToSection('top'); state.showNavMenu = false;">
        &UpArrowBar;
      </button>
      <button class="button-circle button-circle-xl nav-shadow cursor-pointer" v-bind:class="state.showNavMenu === true ? 'button-fg' : 'button-accent'" v-on:click="state.showNavMenu = !state.showNavMenu">
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

