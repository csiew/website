<script lang="ts">
  import HoverTooltip from "./HoverTooltip.svelte";

  export let url: string;
  export let title: string;

  let navLink;

  let tooltipIsVisible = false;
  let tooltipValue = "";
  let tooltipXPos = "0px";
  let tooltipYPos = "0px";

  function setTooltip(e, value: string): void {
    const navLinkRect = navLink.getBoundingClientRect();
    tooltipIsVisible = true;
    tooltipValue = value;
    tooltipXPos = `${navLinkRect.width + 24}px`;
    tooltipYPos = `${navLinkRect.y + (navLinkRect.height / 8)}px`;
  }

  function unsetTooltip(): void {
    tooltipIsVisible = false;
  }
</script>

<a
  sveltekit:prefetch href={url}
  bind:this={navLink}
  on:mouseover|preventDefault={(e) => setTooltip(e, title)}
  on:mouseout|preventDefault={unsetTooltip}
  on:focus={(e) => {}}
  on:blur={(e) => {}}
>
  <span class="icon" title={title}>
    <slot />
  </span>
</a>
<HoverTooltip
  bind:isVisible={tooltipIsVisible}
  bind:value={tooltipValue}
  bind:xPos={tooltipXPos}
  bind:yPos={tooltipYPos}
/>
