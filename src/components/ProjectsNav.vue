<template>
  <div class="vstack width-auto height-auto align-end justify-end z-index-200 position-fixed margin-auto-top margin-none-bottom margin-auto-left margin-m-right padding-xs padding-none-bottom anchor-bottom anchor-right overflow-auto transition-enter-up">
    <transition name="fade">
      <div v-if="state.showNavMenu === true" class="card margin-s-bottom overflow-auto height-auto">
        <div class="padding-s padding-xs-bottom text-align-right">
          <h4>Recent projects</h4>
        </div>
        <div class="card-list padding-none-top">
          <ul>
            <li v-for="item in this.recent" v-bind:key="item.id" class="cursor-pointer padding-s padding-xs-top padding-xs-bottom align-end text-align-right noselect" v-on:click="scrollToSection(item.id); state.showNavMenu = false;">{{ item.name }}</li>
          </ul>
        </div>
        <div class="padding-s padding-xs-bottom text-align-right">
          <h4>Past projects</h4>
        </div>
        <div class="card-list padding-none-top">
          <ul>
            <li v-for="item in this.previous" v-bind:key="item.id" class="cursor-pointer padding-s padding-xs-top padding-xs-bottom align-end text-align-right noselect" v-on:click="scrollToSection(item.id); state.showNavMenu = false;">{{ item.name }}</li>
          </ul>
        </div>
      </div>
    </transition>
    <div class="grid grid-auto-flow-column grid-gap-none nav-shadow-drop">
      <button class="border-radius-card hug-bottom hug-right cursor-pointer shadow-none padding-m-left padding-m-right" v-on:click="scrollToSection('top'); state.showNavMenu = false;">
        &UpArrowBar;
      </button>
      <button class="border-radius-card hug-bottom hug-left cursor-pointer shadow-none padding-m-left padding-m-right" v-bind:class="state.showNavMenu === true ? 'button-selected' : ''" v-on:click="state.showNavMenu = !state.showNavMenu">
        &#9776;
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectsNav',
  props: {
    recent: Object,
    previous: Object
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

