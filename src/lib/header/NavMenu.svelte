<script lang="ts">
	import { page } from "$app/stores";

  import MdHome from "svelte-icons/md/MdHome.svelte";
  import MdMessage from "svelte-icons/md/MdMessage.svelte";
  import MdExplore from "svelte-icons/md/MdExplore.svelte";
  import MdPlaylistPlay from "svelte-icons/md/MdPlaylistPlay.svelte";

  import NavMenuLink from "./NavMenuLink.svelte";
</script>

<nav>
  <ul>
    <li class:active={$page.url.pathname === "/"}>
      <NavMenuLink
        url="/"
        title="Home"
      >
        <MdHome />
      </NavMenuLink>
    </li>
    <li class:active={$page.url.pathname === "/blog"}>
      <NavMenuLink
        url="/blog"
        title="Blog"
      >
        <MdMessage />
      </NavMenuLink>
    </li>
    <li class:active={$page.url.pathname === "/projects"}>
      <NavMenuLink
        url="/projects"
        title="Projects"
      >
        <MdExplore />
      </NavMenuLink>
    </li>
    <li class:active={$page.url.pathname === "/playlists"}>
      <NavMenuLink
        url="/playlists"
        title="Playlists"
      >
        <MdPlaylistPlay />
      </NavMenuLink>
    </li>
  </ul>
</nav>
