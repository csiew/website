<template>
  <div class="width-max-800 width-full margin-auto-horizontal padding-l">
    <div class="section width-full">
      <div class="section-header">
        <h2>About</h2>
      </div>
      <div class="card padding-m">
        <p>
          Clarence is a software engineer who is perhaps best known for creating illume OS and Antorca Linux. These days he's mostly involved in full-stack web development and mobile app development.
        </p>
        <p>
          He completed a Bachelor of Software Engineering at Monash University in March 2020. He currently lives in Melbourne, Australia. He was born and raised in Penang, Malaysia.
        </p>
        <div class="grid grid-col-2 grid-col-auto-fit-640 grid-gap-m margin-s-top margin-m-bottom nodrag">
          <div class="grid grid-col-1">
            <img class="grid-item" v-bind:class="this.darkModeState === true ? 'invert' : ''" src="@/assets/images/Penang.png" style="margin: auto; max-width: 233px; max-height: 240px; width: 100%; height: auto;" />
            <span class="caption width-full text-align-center text-color-secondary"><small>Penang, Malaysia</small></span>
          </div>
          <div class="grid grid-col-1">
            <img class="grid-item" v-bind:class="this.darkModeState === true ? 'invert' : ''" src="@/assets/images/Victoria.png" style="margin: auto; max-width: 328px; max-height: 240px; width: 100%; height: auto;" />
            <span class="caption width-full text-align-center text-color-secondary"><small>Victoria, Australia</small></span>
          </div>
        </div>
        <p>
          Post-punk &amp; surf rock (The National, IDLES, Heavy Lungs, Good Boy, Hockey Dad, shame) and caffeine (coffee in the day, tea at night) are the best brain fuel for software development. Some of his hobbies include programming (of course), playing Minecraft (specifically planning and building cities), and graphic design (pixel art).
        </p>
      </div>
    </div>
    <Skills />
    <div class="section width-full">
      <div class="section-header">
        <h3>This Site</h3>
      </div>
      <div class="card padding-m">
        <p>
          This site was made using the <a href="https://vuejs.org/" target="_blank">Vue.js framework</a>. You can see the previous version of the site <a href="https://csiew.github.io/" target="_blank">here</a>, and an even older one <a href="https://csiew.github.io/archive/index.html" target="_blank">here</a>.
        </p>
        <p>
          It's hosted on <a href="https://netlify.com/" target="_blank">Netlify</a> and new builds are automatically deployed from Git commits. This site previously used <a href="https://travis-ci.org/" target="_blank">TravisCI</a> to deploy new builds to GitHub Pages.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Skills from '@/components/Skills.vue'

export default {
  name: 'About',
  inject: ['SettingsProvider'],
  components: {
    Skills
  },
  computed: {
    darkModeState: function () {
      return this.SettingsProvider.getDarkModeState();
    }
  }
}
</script>
