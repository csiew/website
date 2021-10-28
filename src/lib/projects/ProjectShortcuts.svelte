<script lang="ts">
  import { fly } from 'svelte/transition';

  export let projects: Project[];

  let hide: boolean = true;
</script>

<div class="toast-window">
  <div class="heading" on:click|preventDefault={() => hide = !hide}>
    <span class="title">
      Shortcuts
    </span>
  </div>
  {#if !hide}
    <div class="body" in:fly={{ y: 500, duration: 200 }} out:fly={{ y: 500, duration: 200 }}>
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
