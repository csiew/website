<script lang="ts">
	import { page } from '$app/stores';
  import { fade } from 'svelte/transition';

  const navLinks = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: "Projects", url: "/projects" },
    { name: "Playlists", url: "/playlists" },
  ];

  let hide: boolean = true;
</script>

<button class="toggle" on:click|preventDefault={() => hide = !hide}>Menu</button>
{#if !hide}
  <nav in:fade={{ duration: 120 }} out:fade={{ duration: 120 }}>
    <ul>
      {#each navLinks as navLink}
        <li class:active={$page.path === navLink.url}><a sveltekit:prefetch href={navLink.url} on:click={() => hide = true}>{navLink.name}</a></li>
      {/each}
      <li><a href="https://portfolio.clarencesiew.com/" target="_blank">Portfolio</a></li>
    </ul>
  </nav>
{/if}

<style>
  @media (max-width: 720px) {
    :root {
      --link-border-radius: 9px;
    }

    .toggle {
      position: absolute;
      margin: 0 1rem 1rem 1rem;
      inset: 0 0 auto auto;
      border-radius: 0 0 var(--link-border-radius) var(--link-border-radius);
    }

    nav {
      display: inline-flex;
      flex-flow: row;
      justify-content: flex-end;
      align-items: flex-start;
      margin: 1rem;
      bottom: 0;
      padding: 0;
      width: 100%;
    }
    nav ul {
      position: relative;
      margin: 0;
      bottom: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      min-height: 100vh;
      display: inline-flex;
      flex-flow: column;
      justify-content: flex-start;
      align-items: center;
      gap: 0.5rem;
      list-style: none;
    }
    nav li {
      position: relative;
      width: 100%;
    }
    nav a {
      --background: var(--tertiary-color);
      --color: var(--text-color);
      display: inline-flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;
      margin: 0;
      padding: 0.5rem 1rem;
      width: 100%;
      background: var(--background);
      color: var(--color);
      text-shadow: 0px 1px 1px white;
      box-shadow: 0px -4px 8px dimgray inset, 0px 2px 2px white inset, 0px 4px 8px gray inset;
      border-radius: var(--link-border-radius);
      font-weight: bold;
      text-decoration: none;
      transition: 0.1s linear;
    }
    nav a:hover {
      --background: var(--secondary-color);
      box-shadow: 0px -2px 8px gray inset, 0px 2px 1px white inset, 0px 4px 8px gray inset;
    }
    nav li.active :is(a, a:hover) {
      --background: goldenrod;
      --color: #1e1e1e;
      box-shadow: 0px 2px 2px white inset, 0px 24px 12px rgba(255,255,255,0.5) inset;
    }
    nav a:active {
      --background: var(--primary-color);
      padding-bottom: 0.325rem;
    }
  }
</style>
