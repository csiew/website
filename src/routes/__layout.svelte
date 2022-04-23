<script lang="ts">
	import "../fonts/SplineSans.css";
	import "../fonts/JetBrainsMono.css";
	import "../colors.css";
	import "../app.css";
	import "$lib/header/nav.css";
	import Header from "$lib/header/Header.svelte";

	let y: number;

	$: isAtTop = (y === 0);
</script>

<svelte:head>
	<link rel="icon" href="/profile.jpg" />
	<link rel="apple-touch-icon" href="/profile.jpg" />
</svelte:head>

<svelte:window bind:scrollY={y} />

<Header {isAtTop} />
<main>
	<slot />
	<footer>
		<p>Version 5.9.0<br/><a sveltekit:prefetch href="/versions">Version history</a></p>
		<p>Copyright &copy; 2022 Clarence Siew</p>
	</footer>
</main>
