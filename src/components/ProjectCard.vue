<template>
  <div class="card">
    <div class="hstack hstack-responsive hstack-space-between align-start">
      <div>
        <h3>{{ project.name }}</h3>
        <p class="text-color-secondary">
          <small>{{ project.timeRange }}</small>
        </p>
      </div>
      <div>
        <div v-if="project.url || project.github">
          <small>
            <div class="grid grid-col-2 grid-gap-m">
              <a v-if="project.url" class="button" v-bind:href="project.url" target="_blank">Website</a>
              <a v-else class="button button-disabled">Website</a>
              <a v-if="project.github" class="button" v-bind:href="project.github" target="_blank">GitHub</a>
              <a v-else class="button button-disabled">GitHub</a>
            </div>
          </small>
        </div>
      </div>
    </div>
    <span v-if="project.imgUrl">
      <a v-bind:href="getProjectImgUrl(project.imgUrl)"><img v-bind:alt="project.imgUrl" class="card card-img margin-s-top margin-s-bottom" v-bind:src="getProjectImgUrl(project.imgUrl)" style="width: 100%; height: 100%;" /></a>
    </span>
    <p>
      {{ project.description }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'ProjectCard',
  props: {
    project: Object
  },
  methods: {
    getProjectImgUrl: function (imgFilename) {
      return require("@/assets/images/projects/" + imgFilename);
    }
  }
}
</script>

