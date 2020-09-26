<template>
  <div class="navbar hstack hstack-space-between padding-s padding-m-left padding-m-right">
    <div>
      <router-link class="link-discrete" to="/"><h1>Clarence Siew</h1></router-link>
    </div>
    <div class="grid grid-auto-flow-column grid-gap-xl text-align-center">
      <router-link v-for="item in this.pages" v-bind:key="item.id" class="grid-item" v-bind:to="item.route">{{ item.label }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      pages: [
        {
          id: 'home',
          label: 'Home',
          route: '/'
        },
        {
          id: 'about',
          label: 'About',
          route: '/about'
        },
        {
          id: 'projects',
          label: 'Projects',
          route: '/projects'
        }
      ]
    };
  }
}
</script>