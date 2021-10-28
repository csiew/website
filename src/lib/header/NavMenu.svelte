<script lang="ts">
	import { page } from '$app/stores';
  import { fly } from 'svelte/transition';

  export let hide: boolean = true;
</script>

{#if !hide}
  <nav in:fly={{ x: -500, duration: 500 }} out:fly={{ x: 500, duration: 500 }}>
    <ul>
      <li class:active={$page.path === '/'}><a sveltekit:prefetch href="/">Home</a></li>
      <li class:active={$page.path === '/blog'}><a sveltekit:prefetch href="/blog">Blog</a></li>
      <li class:active={$page.path === '/projects'}><a sveltekit:prefetch href="/projects">Projects</a></li>
      <li class:active={$page.path === '/playlists'}><a sveltekit:prefetch href="/playlists">Playlists</a></li>
      <li><a href="https://portfolio.clarencesiew.com/" target="_blank">Portfolio</a></li>
    </ul>
  </nav>
{/if}

<style>
  :root {
    --link-border-radius: 9px;
  }

  nav {
		display: inline-flex;
		flex-flow: row;
		justify-content: flex-end;
		align-items: flex-start;
		margin: 1rem 1rem 0 1rem;
    bottom: 0;
		padding: 0;
	}
	nav ul {
		position: relative;
		margin: 0;
    bottom: 0;
		padding: 0;
		width: 100%;
    height: 100%;
		display: inline-flex;
		flex-flow: row;
		justify-content: flex-end;
		align-items: flex-end;
    gap: 0.5rem;
		list-style: none;
	}
	nav li {
		position: relative;
	}
	nav a {
    --background: var(--tertiary-color);
    --color: var(--text-color);
		width: min-content;
		display: inline-flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0.5rem 1rem;
		background: var(--background);
		color: var(--color);
    text-shadow: 0px 1px 1px white;
    box-shadow: 0px -4px 8px dimgray inset, 0px 2px 2px white inset, 0px 4px 8px gray inset;
    border-radius: var(--link-border-radius) var(--link-border-radius) 0 0;
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

  @media (max-width: 720px) {
    :root {
      --padding: 0.75rem;
    }

    nav {
      margin: 0;
      width: 100%;
    }
    nav ul {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(96px, 1fr));
      gap: 0.25rem;
      padding: 1rem;
      width: 100%;
    }
    nav li {
      width: 100%;
    }
    nav li a {
      align-items: center;
      width: 100%;
      padding: var(--padding);
      border-radius: var(--link-border-radius);
    }
    nav li a:is(:active, :focus) {
      padding: var(--padding);
    }
    nav a:hover {
      padding: 0.25rem 0.75rem;
    }
  }
</style>
