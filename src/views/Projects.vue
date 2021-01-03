<template>
  <div id="top"></div>
  <div class="width-max-960 width-full margin-auto-horizontal padding-l">
    <div class="section-header">
      <h2>Projects</h2>
    </div>
    <div class="section width-full">
      <div class="section-header">
        <h3>Recent projects</h3>
      </div>
      <div class="width-full width-max-800 grid grid-gap-m grid-col-1 margin-auto-horizontal margin-xl-top margin-xl-bottom">
        <ProjectCard v-for="item in this.recent" v-bind:key="item.id" class="grid-item" v-bind:project=item />
      </div>
    </div>
    <div class="section width-full">
      <div class="section-header">
        <h3>Past projects</h3>
      </div>
      <div class="width-full width-max-800 grid grid-gap-m grid-col-1 margin-auto-horizontal margin-xl-top">
        <ProjectCard v-for="item in this.previous" v-bind:key="item.id" class="grid-item" v-bind:project=item />
      </div>
    </div>
  </div>
  <ProjectsNav v-bind:recent="recent" v-bind:previous="previous" @scroll-to-section="scrollToSection" />
</template>

<script>
import ProjectsNav from '@/components/ProjectsNav.vue';
import ProjectCard from '@/components/ProjectCard.vue';
import projectsJSON from '@/assets/projects.json';

export default {
  name: 'Projects',
  components: {
    ProjectsNav,
    ProjectCard
  },
  data() {
    return {
      state: {
        showNavMenu: false
      },
      recent: projectsJSON.recent,
      previous: projectsJSON.previous
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

