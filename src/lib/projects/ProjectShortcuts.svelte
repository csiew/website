<script lang="ts">
  import { fly } from 'svelte/transition';

  export let projects: Project[];

  let hide: boolean = false;
</script>

<div class="toast-window">
  <div class="heading" on:dblclick|preventDefault={() => hide = !hide}>
    <span class="title">
      Shortcuts
    </span>
    <span class="accessories">
      <small><button on:click|preventDefault={() => hide = !hide}>{hide ? 'Show' : 'Hide'}</button></small>
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
