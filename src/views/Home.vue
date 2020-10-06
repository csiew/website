<template>
  <div class="width-full margin-auto-horizontal">
    <Hello />
    <HomeHero />
    <Contact />
  </div>
</template>

<script>
import Hello from '@/components/Hello.vue';
import HomeHero from '@/components/HomeHero.vue';
import Contact from '@/components/Contact.vue';

export default {
  name: 'Home',
  components: {
    Hello,
    HomeHero,
    Contact
  }
}
</script>
