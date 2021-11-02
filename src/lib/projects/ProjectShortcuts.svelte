<script lang="ts">
  import { fade } from 'svelte/transition';

  export let projects: Project[];
  let hide: boolean = true;
</script>

<div class="toast-window" class:toast-window-open={!hide}>
  <div class="heading" on:click|preventDefault={() => hide = !hide}>
    <span class="title">
      Shortcuts
    </span>
  </div>
  {#if !hide}
    <div class="body" in:fade={{ duration: 200 }} out:fade={{ duration: 200 }}>
      <ul>
        {#each projects as project}
          <li><a href={`#${project.id}`}>{project.name}</a></li>
        {/each}
      </ul>
    </div>
  {/if}
</div>

<style>
  .heading {
    cursor: pointer;
  }
</style>
