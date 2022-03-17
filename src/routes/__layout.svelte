<script lang="ts">
	import { onMount } from "svelte";
	import Header from '$lib/header/Header.svelte';
	import '../app.css';
	import '../fonts/JetBrainsMono.css';
	import '../fonts/Supreme.css';
	import '../fonts/ClashGrotesk.css';

	let mainEl: HTMLElement;
	let isAtTop = true;

	function checkIsAtTop(): void {
		isAtTop = mainEl.scrollTop === 0;
	}

	onMount(() => checkIsAtTop());
</script>

<svelte:head>
	<link rel="icon" href="/profile.jpg" />
	<link rel="apple-touch-icon" href="/profile.jpg" />
</svelte:head>

<Header {isAtTop} />
<main bind:this={mainEl} on:scroll={checkIsAtTop}>
	<slot />
	<footer>
		<p>Version 5.5.4<br/><a sveltekit:prefetch href="/versions">Version history</a></p>
		<p>&copy; 2022 Clarence Siew</p>
	</footer>
</main>
