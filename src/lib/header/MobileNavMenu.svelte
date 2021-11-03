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
      <li><a sveltekit:prefetch href={navLink.url} class:active={$page.path === navLink.url}>{navLink.name}</a></li>
    {/each}
    <li><a href="https://portfolio.clarencesiew.com/" target="_blank">Portfolio</a></li>
  </ul>
</nav>

<style>
  nav {
    display: inline-flex;
    flex-flow: row;
    justify-content: flex-end;
    align-items: center;
    margin: 0;
    bottom: 0;
    padding: 0;
    width: 100%;
    height: max-content;
  }
  nav ul {
    position: relative;
    display: inline-flex;
    flex-flow: row;
    justify-content: stretch;
    align-items: center;
    gap: 0;
    margin: 0;
    right: 0;
    padding: 0;
    width: 100%;
    height: max-content;
    list-style: none;
    overflow-x: auto;
    overflow-y: visible;
  }
  nav li {
    display: inline-flex;
    flex-flow: row;
    justify-content: center;
    align-items: stretch;
    width: 100%;
    height: max-content;
    text-align: center;
  }
  nav a {
    width: 100%;
    padding: 0.25rem 1rem;
    color: darkgray;
    font-weight: 400;
    text-decoration: none;
    border: 1px solid rgba(0,0,0,0.5);
    box-shadow: 0px 2px 2px rgba(255,255,255,0.5) inset, 0px 4px 8px rgba(255,255,255,0.25) inset, 0px -2px 2px rgba(0,0,0,0.75) inset;
  }
  nav a:hover {
    box-shadow: 0px 2px 2px rgba(255,255,255,0.5) inset, 0px 4px 8px rgba(255,255,255,0.5) inset, 0px -2px 2px rgba(0,0,0,0.75) inset, 0px -4px 8px rgba(0,0,0,0.5) inset;
  }
  nav a:is(:active, .active) {
    color: goldenrod;
    font-weight: 600;
    box-shadow: 0px -4px 8px rgba(0,0,0,0.5) inset, 0px -2px 2px rgba(255,255,255,0.5) inset, 0px 4px 8px rgba(0,0,0,0.75) inset;
  }
</style>
