<script lang="ts">
  export let url: string;
  export let title: string;
</script>

<a sveltekit:prefetch href={url}>
  <span class="icon" title={title}>
    <slot />
  </span>
</a>
