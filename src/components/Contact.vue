<template>
  <div class="section">
    <div class="section-header transition-enter-pop">
      <h3>Contact</h3>
    </div>
    <div class="section card width-full width-max-800 margin-auto-horizontal padding-s padding-xl-top padding-xl-bottom">
      <div class="grid grid-col-3 grid-col-auto-fit-640 grid-gap-m width-max-640 margin-auto-horizontal">
        <span v-for="item in links" v-bind:key="item.id">
          <a class="grid-item button width-full" v-bind:href=item.url target="_blank">{{ item.name }}</a>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import linksJSON from '@/assets/links.json';

export default {
  name: 'Contact',
  data() {
    return {
      links: linksJSON.links
    }
  }
}
</script>