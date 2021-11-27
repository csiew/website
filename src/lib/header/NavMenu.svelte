<script lang="ts">
	import { page } from '$app/stores';
  import IoMdHome from 'svelte-icons/io/IoMdHome.svelte';
  import IoMdMail from 'svelte-icons/io/IoMdMail.svelte';
  import IoMdGitCompare from 'svelte-icons/io/IoMdGitCompare.svelte';
  import IoMdMusicalNote from 'svelte-icons/io/IoMdMusicalNote.svelte';
</script>

<nav>
  <ul>
    <li class:active={$page.path === '/'}>
      <a sveltekit:prefetch href="/">
        <span class="icon" title="Home"><IoMdHome /></span>
      </a>
    </li>
    <li class:active={$page.path === '/blog'}>
      <a sveltekit:prefetch href="/blog">
        <span class="icon" title="Blog"><IoMdMail /></span>
      </a>
    </li>
    <li class:active={$page.path === '/projects'}>
      <a sveltekit:prefetch href="/projects">
        <span class="icon" title="Projects"><IoMdGitCompare /></span>
      </a>
    </li>
    <li class:active={$page.path === '/playlists'}>
      <a sveltekit:prefetch href="/playlists">
        <span class="icon" title="Playlists"><IoMdMusicalNote /></span>
      </a>
    </li>
  </ul>
</nav>

<style>
  :root {
    --link-border-radius: var(--border-radius);
  }

  .icon {
    padding: 0.125rem;
    width: 2rem;
    height: 2rem;
    color: var(--text-color);
  }

  nav {
		display: inline-flex;
		flex-flow: row;
		justify-content: flex-end;
		align-items: flex-start;
		margin: 0.5rem 1rem;
    bottom: 0;
		padding: 0;
    font-family: var(--font-control);
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
		align-items: center;
    gap: 0.5rem;
		list-style: none;
	}
	nav li {
		position: relative;
	}
	nav a {
		width: min-content;
		display: inline-flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0.5rem 1rem;
		color: var(--text-color);
		background: none;
    font-weight: bold;
    border: 1px solid transparent;
    border-radius: var(--link-border-radius);
		text-decoration: none;
		transition: 0.1s linear;
	}
	nav a:hover {
		color: var(--accent-color);
    background: var(--tertiary-color);
    border-color: var(--border-color);
    box-shadow: 0px 3px 0px rgba(255,255,255,0.25) inset, 0px -3px 0px rgba(0,0,0,0.25) inset, 0px 2px 4px rgba(0,0,0,0.25);
  }
  nav a:hover .icon {
		color: var(--accent-color);
		transition: 0.3s linear;
  }
  nav li.active :is(a, a:hover) {
		color: var(--secondary-color);
    background: var(--accent-color);
    border-color: var(--accent-color);
    box-shadow: 0px 3px 0px rgba(255,255,255,0.5) inset, 0px -3px 0px rgba(0,0,0,0.25) inset, 0px 2px 4px rgba(0,0,0,0.25);
	}
  nav li.active a .icon {
		color: var(--secondary-color);
		transition: 0.3s linear;
  }
	nav a:active {
    background: var(--primary-color);
    border-color: var(--border-color);
    box-shadow: 0px 2px 4px rgba(0,0,0,0.5) inset;
	}

  @media (max-width: 720px) {
    .icon {
      width: 1.75rem;
      height: 1.75rem;
    }

    nav {
      margin: 0;
      width: 100%;
    }
    nav ul {
      display: inline-flex;
      flex-flow: row;
      justify-content: center;
      align-items: center;
      gap: 0.25rem;
      padding: 0.5rem;
      width: 100%;
    }
    nav li {
      width: 100%;
    }
    nav li a {
      align-items: center;
      width: 100%;
      padding: 0.5rem;
      border-radius: var(--link-border-radius);
    }
    nav li a:is(:hover, :active) {
      box-shadow: none;
    }
  }
</style>
