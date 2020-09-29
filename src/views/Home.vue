<template>
  <div class="width-max-640 width-full margin-auto-horizontal">
    <Hello />
    <div class="section width-full">
      <div class="section-header">
        <h3>Contact</h3>
      </div>
      <div class="grid grid-col-3 grid-col-auto-fit-640 grid-gap-m">
        <span v-for="item in links" v-bind:key="item.id">
          <a class="grid-item button width-full" v-bind:href=item.url target="_blank">{{ item.name }}</a>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import linksJSON from '@/assets/links.json'
import Hello from '@/components/Hello.vue'

export default {
  name: 'Home',
  components: {
    Hello
  },
  data() {
    return {
      links: linksJSON.links
    }
  },
}
</script>
