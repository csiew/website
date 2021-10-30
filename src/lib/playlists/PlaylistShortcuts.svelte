<script lang="ts">
  import { fade } from 'svelte/transition';

  export let playlistYears: PlaylistYear[];
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
        {#each playlistYears as year}
          <li><a href={`#${year.title}`}>{year.title}</a></li>
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
