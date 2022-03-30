<script lang="ts">
	import { scale } from "svelte/transition";
  import { quintOut } from "svelte/easing";
	import MdArrowUpward from "svelte-icons/md/MdArrowUpward.svelte";
	import NavMenu from "./NavMenu.svelte";
	import Profile from "../Profile.svelte";

	export let isAtTop;

	function scrollToTop(): void {
		document.getElementsByTagName("main")[0].scrollTo({ top: 0 });
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

<style>
	header {
		z-index: 100;
		display: inline-flex;
		flex-flow: column;
		justify-content: flex-start;
		align-self: center;
		margin: 0;
		inset: 0;
		padding: 1.5rem 0rem;
		gap: 1.5rem;
		width: min-content;
		height: 100vh;
		border: solid var(--border-color);
		border-width: 0px var(--border-width) 0px 0px;
	}

	.title {
		display: inline-flex;
		flex-flow: column;
		justify-content: flex-start;
		align-items: center;
		margin: 0;
		padding: 0;
		width: 100%;
		min-width: 96px;
	}
	.title a {
		display: grid;
		grid-auto-flow: column;
		gap: 1rem;
		align-items: center;
		padding: 0;
		width: auto;
		height: min-content;
		text-decoration: none;
	}

	.navbar {
		display: inline-flex;
		flex-flow: column;
		justify-content: flex-start;
		align-items: flex-start;
		margin: 0;
		padding: 0;
		width: 100%;
	}

	.v-spacer {
		height: 100%;
	}

	button.scroll-top-shortcut,
	button.scroll-top-shortcut:focus {
		display: inline-flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
		width: min-content;
		height: min-content;
    margin: auto;
    padding: 0.5rem;
		color: var(--subtitle-color);
		background: none;
		border: none;
		transition: 0.2s;
	}
	button.scroll-top-shortcut:hover {
		color: var(--text-color);
    background: rgba(0,0,0,0.03125);
		box-shadow: none;
		transition: 0.2s;
	}
	button.scroll-top-shortcut .icon {
    padding: 0.125rem;
    width: 2rem;
    height: 2rem;
		color: var(--text-color);
		transition: 0.1s linear;
	}
	button.scroll-top-shortcut:hover .icon {
    transform: scale(115%);
		transition: 0.3s linear;
	}
	button.scroll-top-shortcut:active .icon {
    transform: scale(100%);
		transition: 0.2s linear;
	}

	@media (max-width: 767px) {
		header {
			flex-flow: row;
			justify-content: space-between;
			align-items: center;
			padding: 0.75rem 1rem;
			min-width: 100%;
			height: auto;
			border-width: 0px 0px 1px 0px;
		}

		.title {
			justify-content: center;
			margin: 0;
			padding: 0rem 0.5rem;
			width: auto;
		}
		.title h1 {
			display: none;
		}

		.navbar {
			display: inline-flex;
			flex-flow: column;
			justify-content: flex-end;
			align-items: flex-end;
			margin: auto;
			padding: 0;
			width: 100%;
			height: auto;
		}

		.v-spacer, button.scroll-top-shortcut {
			display: none;
		}
	}
</style>
