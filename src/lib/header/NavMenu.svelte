<script lang="ts">
	import { page } from '$app/stores';

  const navLinks = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: "Projects", url: "/projects" },
    { name: "Playlists", url: "/playlists" },
  ];
</script>

<nav>
  <ul>
    {#each navLinks as navLink}
      <li class:active={$page.path === navLink.url}><a sveltekit:prefetch href={navLink.url}>{navLink.name}</a></li>
    {/each}
    <li><a href="https://portfolio.clarencesiew.com/" target="_blank">Portfolio</a></li>
  </ul>
</nav>

<style>
  :root {
    --link-border-radius: var(--border-radius);
  }

  nav {
		display: inline-flex;
		flex-flow: row;
		justify-content: flex-end;
		align-items: flex-start;
		margin: 1rem 1rem 0 1rem;
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
    font-weight: bold;
    text-shadow: 0px 1px 1px white;
    box-shadow: 0px -4px 8px dimgray inset, 0px 2px 2px white inset, 0px 4px 8px gray inset;
    border-width: 1px 1px 0 1px;
    border-style: solid;
    border-color: gray;
    border-radius: var(--link-border-radius) var(--link-border-radius) 0 0;
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
    border-color: darkgoldenrod;
    box-shadow: 0px 2px 2px white inset, 0px 16px 8px rgba(255,255,255,0.25) inset;
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
