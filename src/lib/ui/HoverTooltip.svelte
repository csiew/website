<script lang="ts">
	import { fade } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  export let isVisible: boolean;
  export let value: string;
  export let xPos: string = "0px";
  export let yPos: string = "0px";

  let viewportWidth, viewportHeight;

  // https://stackoverflow.com/a/11381730/8665013
  function detectMob() {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i
    ];
    
    return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
    });
  }

  function viewportIsBigEnough(width: number, height: number): boolean {
    console.log(width, height);
    return width > 768 && height > 390;
  }
</script>

<svelte:window bind:innerWidth={viewportWidth} bind:innerHeight={viewportHeight} />

{#if isVisible && viewportIsBigEnough(viewportWidth, viewportHeight) && !detectMob()}
  <div
    class="tooltip"
    style={`left: ${xPos}; top: ${yPos}`}
    transition:fade={{ delay: 100, duration: 500, easing: quintOut }}
  >
    {`${value}`}
  </div>
{/if}

<style>
  .tooltip {
    z-index: 100;
    position: fixed;
    display: block;
    margin: auto;
    padding: 0.25rem 0.5rem;
    color: var(--primary-color);
    background: var(--text-color);
    border-width: var(--border-width);
    border-style: solid;
    border-color: var(--text-color);
    border-radius: var(--border-radius);
    box-shadow: var(--element-shadow);
    font-size: 0.9rem;
    font-weight: bold;
    pointer-events: none;
  }
</style>
