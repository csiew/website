<template>
  <div class="section width-full">
    <div class="section-header">
      <h3>Skills</h3>
    </div>
    <div class="card card-enter padding-m">
      <div class="hstack margin-l-bottom">
        <input class="width-full" type="text" placeholder="Filter..." @keyup="filter" v-model="filterTerm" />
        <button v-if="this.filterTerm.length > 0" class="margin-s-left cursor-pointer" v-on:click="this.resetResults()">Clear</button>
      </div>
      <span v-if="this.filterTerm.length > 0">
        <h4 class="padding-s-bottom">Results ({{ result.length }} items)</h4>
        <div class="grid grid-gap-m grid-col-1 grid-col-auto-fit-640">
          <div class="grid-item list-freestyle">
            <ul>
              <li v-for="item in this.result" v-bind:key="item">{{ item }}</li>
            </ul>
          </div>
        </div>
      </span>
      <span v-else>
        <h4 class="padding-s-bottom">Programming Languages</h4>
        <div class="grid grid-gap-m grid-col-1 grid-col-auto-fit-640">
          <div class="grid-item list-freestyle card card-inset padding-s">
            <ul>
              <li v-for="item in this.skills['programmingLangs']" v-bind:key="item">{{ item }}</li>
            </ul>
          </div>
        </div>
        <hr />
        <h4 class="padding-s-bottom">Frameworks and Libraries</h4>
        <div class="grid grid-gap-m grid-col-2 grid-col-auto-fit-640">
          <div class="grid-item list-freestyle card card-inset padding-s">
            <h5>Frontend</h5>
            <ul>
              <li v-for="item in this.skills['frameworks']['frontend']" v-bind:key="item">{{ item }}</li>
            </ul>
          </div>
          <div class="grid-item list-freestyle card card-inset padding-s">
            <h5>Backend</h5>
            <ul>
              <li v-for="item in this.skills['frameworks']['backend']" v-bind:key="item">{{ item }}</li>
            </ul>
          </div>
        </div>
        <hr />
        <h4 class="padding-s-bottom">Infrastructure</h4>
        <div class="grid grid-gap-m grid-col-2 grid-col-auto-fit-640">
          <div class="grid-item list-freestyle card card-inset padding-s">
            <h5>Database</h5>
            <ul>
              <li v-for="item in this.skills['infrastructure']['database']" v-bind:key="item">{{ item }}</li>
            </ul>
          </div>
          <div class="grid-item list-freestyle card card-inset padding-s">
            <h5>Cloud</h5>
            <ul>
              <li v-for="item in this.skills['infrastructure']['cloud']" v-bind:key="item">{{ item }}</li>
            </ul>
          </div>
          <div class="grid-item list-freestyle card card-inset padding-s">
            <h5>Continuous Integration</h5>
            <ul>
              <li v-for="item in this.skills['infrastructure']['ci']" v-bind:key="item">{{ item }}</li>
            </ul>
          </div>
        </div>
      </span>
    </div>
  </div>
</template>

<script>
import skillsJSON from '@/assets/skills.json'

export default {
  name: 'Skills',
  data() {
    return {
      skills: skillsJSON,
      filterTerm: '',
      result: []
    }
  },
  methods: {
    filter: function () {
      this.result = this.skills['programmingLangs'].concat(this.skills['frameworks']['frontend'], this.skills['frameworks']['backend'], this.skills['infrastructure']['database'], this.skills['infrastructure']['cloud'], this.skills['infrastructure']['ci']).filter(item => item.toLowerCase().includes(this.filterTerm.toLowerCase()));
    },
    resetResults: function () {
      this.filterTerm = "";
      this.result = [];
    }
  }
}
</script>