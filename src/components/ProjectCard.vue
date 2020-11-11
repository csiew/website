<template>
  <div class="card">
    <div class="grid grid-col-auto-fill-256 grid-gap-l">
      <div class="align-start">
        <h3 class="margin-xxs-top margin-xxs-bottom font-scale-xl">{{ project.name }}</h3>
        <small class="timestamp text-color-secondary">{{ project.timeRange }}</small>
      </div>
      <div class="grid grid-col-2 grid-gap-m align-start justify-end">
        <a class="button" v-bind:class="!project.url ? 'button-disabled' : ''" v-bind:href="project.url ? project.url : null" target="_blank" v-bind:title="project.url ? 'Visit project website' : 'Project does not have a website'">Website</a>
        <a class="button" v-bind:class="!project.github ? 'button-disabled' : ''" v-bind:href="project.github ? project.github : null" target="_blank" v-bind:title="project.url ? 'Visit project repository' : 'Project does not have a repository'">GitHub</a>
      </div>
    </div>
    <hr class="margin-s-top margin-s-bottom padding-none" />
    <span v-if="project.imgUrl">
      <a v-bind:href="getProjectImgUrl(project.imgUrl)"><img v-bind:alt="project.imgUrl" class="card card-img margin-xs-top margin-s-bottom" v-bind:src="getProjectImgUrl(project.imgUrl)" style="width: 100%; height: auto;" /></a>
    </span>
    <div v-html="contentMarkdown"></div>
  </div>
</template>

<script>
import marked from 'marked';

export default {
  name: 'ProjectCard',
  props: {
    project: Object
  },
  computed: {
    contentMarkdown: function () {
      return marked(this.project.description, { sanitized: true });
    }
  },
  methods: {
    getProjectImgUrl: function (imgFilename) {
      return require("@/assets/images/projects/" + imgFilename);
    }
  }
}
</script>