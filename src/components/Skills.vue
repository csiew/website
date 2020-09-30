<template>
  <div class="section width-full">
    <div class="section-header">
      <h3>Skills</h3>
    </div>
    <div class="card padding-m">
      <div class="margin-l-bottom">
        <form>
          <input class="width-full" type="text" placeholder="Filter..." @keyup="filter" v-model="filterTerm" />
        </form>
      </div>
      <span v-if="this.filterTerm.length !== 0">
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
          <div class="grid-item list-freestyle">
            <ul>
              <li v-for="item in this.programmingLangs" v-bind:key="item">{{ item }}</li>
            </ul>
          </div>
        </div>
        <hr />
        <h4 class="padding-s-bottom">Frameworks</h4>
        <div class="grid grid-gap-m grid-col-2 grid-col-auto-fit-640">
          <div class="grid-item list-freestyle">
            <h5>Frontend</h5>
            <ul>
              <li v-for="item in this.frameworks.frontend" v-bind:key="item">{{ item }}</li>
            </ul>
          </div>
          <div class="grid-item list-freestyle">
            <h5>Backend</h5>
            <ul>
              <li v-for="item in this.frameworks.backend" v-bind:key="item">{{ item }}</li>
            </ul>
          </div>
        </div>
        <hr />
        <h4 class="padding-s-bottom">Infrastructure</h4>
        <div class="grid grid-gap-m grid-col-2 grid-col-auto-fit-640">
          <div class="grid-item list-freestyle">
            <h5>Database</h5>
            <ul>
              <li v-for="item in this.infrastructure.database" v-bind:key="item">{{ item }}</li>
            </ul>
          </div>
          <div class="grid-item list-freestyle">
            <h5>Cloud</h5>
            <ul>
              <li v-for="item in this.infrastructure.cloud" v-bind:key="item">{{ item }}</li>
            </ul>
          </div>
          <div class="grid-item list-freestyle">
            <h5>Continuous Integration</h5>
            <ul>
              <li v-for="item in this.infrastructure.ci" v-bind:key="item">{{ item }}</li>
            </ul>
          </div>
        </div>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Skills',
  data() {
    return {
      programmingLangs: [
        'JavaScript',
        'Python',
        'Swift',
        'Java',
        'Kotlin',
        'HTML',
        'CSS',
        'Bash'
      ],
      frameworks: {
        frontend: [
          'React',
          'SwiftUI'
        ],
        backend: [
          'Node.js',
          'Express',
          'Spring'
        ]
      },
      infrastructure: {
        database: [
          'PostgreSQL',
          'MySQL',
          'Firestore (NoSQL)'
        ],
        cloud: [
          'EC2, CloudWatch (Amazon AWS)',
          'Google Firebase'
        ],
        ci: [
          'GitHub Pages'
        ]
      },
      filterTerm: '',
      result: []
    }
  },
  methods: {
    filter: function () {
      this.result = this.programmingLangs.concat(this.frameworks.frontend, this.frameworks.backend, this.infrastructure.database, this.infrastructure.cloud, this.infrastructure.ci).filter(item => item.toLowerCase().includes(this.filterTerm.toLowerCase()));
    },
    resetResults: function () {
      this.result = [];
    }
  }
}
</script>