<script lang="ts">
	import { scale } from "svelte/transition";
  import { quintOut } from "svelte/easing";
	import MdArrowUpward from "svelte-icons/md/MdArrowUpward.svelte";
	import NavMenu from "./NavMenu.svelte";
	import Profile from "../Profile.svelte";

	export let isAtTop;

	function scrollToTop(): void {
		document.getElementsByTagName("body")[0].scrollTo({ top: 0 });
	}
</script>

<header>
	<div class="title">
		<a href="/">
			<Profile width="2.5rem" height="2.5rem" />
		</a>
	</div>

	<div class="navbar">
		<NavMenu />
	</div>

	<span class="v-spacer"></span>

	{#if !isAtTop}
		<button
			transition:scale={{ delay: 5, duration: 200, easing: quintOut }}
			class="scroll-top-shortcut"
			on:click={() => scrollToTop()}
		>
			<span class="icon" title="Projects"><MdArrowUpward /></span>
		</button>
	{/if}
</header>
