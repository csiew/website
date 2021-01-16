<template>
  <div id="top"></div>
  <div class="width-max-960 width-full margin-auto-horizontal padding-l">
    <div class="section width-full">
      <div class="section-header">
        <h2>Playlists</h2>
      </div>
      <div class="grid grid-col-1 grid-gap-l width-full">
        <div v-for="year in this.playlists" v-bind:key="year.title" v-bind:id="year.title" class="card card-enter width-full padding-m">
          <h3 class="margin-xxs-top margin-xxs-bottom font-scale-xl">{{ year.title }}</h3>
          <hr class="margin-m-top margin-m-bottom padding-none" />
          <span v-if="year.playlists.standard.length !== 0">
            <div class="grid grid-col-3 grid-col-auto-fit-640 grid-gap-m margin-l-bottom">
                <a v-for="standard in year.playlists.standard" v-bind:key="standard.name" class="grid-item button" v-bind:href="standard.url">{{ standard.name }}</a>
            </div>
          </span>
          <hr v-if="year.playlists.standard.length !== 0 && year.playlists.special.length !== 0" class="margin-m-top margin-m-bottom padding-none" />
          <span v-if="year.playlists.special.length !== 0">
            <div class="grid grid-col-3 grid-col-auto-fit-640 grid-gap-m">
              <a v-for="special in year.playlists.special" v-bind:key="special.name" class="grid-item button" v-bind:href="special.url">{{ special.name }}</a>
            </div>
          </span>
        </div>
      </div>
    </div>
  </div>
  <PlaylistsNav v-bind:playlists="playlists" @scroll-to-section="scrollToSection" />
</template>

<script>
import PlaylistsNav from '@/components/PlaylistsNav.vue';
import playlistsJSON from '@/assets/playlists.json'

export default {
  name: 'Playlists',
  components: {
    PlaylistsNav
  },
  data() {
    return {
      playlists: playlistsJSON.collection
    }
  },
  methods: {
    scrollToSection: function (sectionId) {
      try {
        const el = document.getElementById(sectionId);
        el && el.scrollIntoView({
          block: 'start',
          behavior: 'smooth'
        });
      } catch (err) {
        console.warn(err);
      }
    }
  }
}
</script>

