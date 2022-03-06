<script lang="ts">
	import { page } from "$app/stores";

  import MdHome from "svelte-icons/md/MdHome.svelte";
  import MdMessage from "svelte-icons/md/MdMessage.svelte";
  import MdExplore from "svelte-icons/md/MdExplore.svelte";
  import MdPlaylistPlay from "svelte-icons/md/MdPlaylistPlay.svelte";

  import NavMenuLink from "./NavMenuLink.svelte";
  import HoverTooltip from "./HoverTooltip.svelte";

  let tooltipIsVisible = false;
  let tooltipValue = "";
  let tooltipXPos = "0px";
  let tooltipYPos = "0px";

  function setTooltip(e, value: string): void {
    tooltipIsVisible = true;
    tooltipValue = value;
    tooltipXPos = `${e.clientX + 24}px`;
    tooltipYPos = `${e.clientY}px`;
  }

  function unsetTooltip(): void {
    tooltipIsVisible = false;
  }
</script>

<HoverTooltip
  bind:isVisible={tooltipIsVisible}
  bind:value={tooltipValue}
  bind:xPos={tooltipXPos}
  bind:yPos={tooltipYPos}
/>
<nav>
  <ul>
    <li
      class:active={$page.url.pathname === "/"}
      on:mouseover|preventDefault={(e) => setTooltip(e, "Home")}
      on:mouseout|preventDefault={unsetTooltip}
      on:focus={(e) => {}}
      on:blur={(e) => {}}
    >
      <NavMenuLink
        url="/"
        title="Home"
      >
        <MdHome />
      </NavMenuLink>
    </li>
    <li
      class:active={$page.url.pathname === "/blog"}
      on:mouseover|preventDefault={(e) => setTooltip(e, "Blog")}
      on:mouseout|preventDefault={unsetTooltip}
      on:focus={(e) => {}}
      on:blur={(e) => {}}
    >
      <NavMenuLink
        url="/blog"
        title="Blog"
      >
        <MdMessage />
      </NavMenuLink>
    </li>
    <li
      class:active={$page.url.pathname === "/projects"}
      on:mouseover|preventDefault={(e) => setTooltip(e, "Projects")}
      on:mouseout|preventDefault={unsetTooltip}
      on:focus={(e) => {}}
      on:blur={(e) => {}}
    >
      <NavMenuLink
        url="/projects"
        title="Projects"
      >
        <MdExplore />
      </NavMenuLink>
    </li>
    <li
      class:active={$page.url.pathname === "/playlists"}
      on:mouseover|preventDefault={(e) => setTooltip(e, "Playlists")}
      on:mouseout|preventDefault={unsetTooltip}
      on:focus={(e) => {}}
      on:blur={(e) => {}}
    >
      <NavMenuLink
        url="/playlists"
        title="Playlists"
      >
        <MdPlaylistPlay />
      </NavMenuLink>
    </li>
  </ul>
</nav>
