<template>
  <div class="width-max-640 width-full margin-auto-horizontal">
    <div class="section-header">
      <h2>Projects</h2>
    </div>
    <div class="section width-full">
      <div class="section-header">
        <h3>Recent projects</h3>
      </div>
      <div class="width-full width-max-640 grid grid-gap-m grid-col-1 margin-auto-horizontal margin-xl-top margin-xl-bottom">
        <ProjectCard v-for="item in this.recent" v-bind:key="item.id" class="grid-item width-full padding-m" v-bind:project=item />
      </div>
    </div>
    <div class="section width-full">
      <div class="section-header">
        <h3>Past projects</h3>
      </div>
      <div class="width-full width-max-640 grid grid-gap-m grid-col-1 margin-auto-horizontal margin-xl-top">
        <ProjectCard v-for="item in this.previous" v-bind:key="item.id" class="grid-item width-full padding-m" v-bind:project=item />
      </div>
    </div>
  </div>
</template>

<script>
import ProjectCard from '@/components/ProjectCard.vue';
import projectsJSON from '@/assets/projects.json';

export default {
  name: 'Projects',
  components: {
    ProjectCard
  },
  data() {
    return {
      recent: projectsJSON.recent,
      previous: projectsJSON.previous
    }
  }
}
</script>

