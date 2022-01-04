<script lang="ts">
	import Header from '$lib/header/Header.svelte';
	import '../app.css';
	import '../fonts/Outfit.css';
	import '../fonts/JetBrainsMono.css';
	import '../fonts/SplineSans.css';
</script>

<svelte:head>
	<link rel="icon" href="/profile.jpg" />
	<link rel="apple-touch-icon" href="/profile.jpg" />
</svelte:head>

<Header />
<main>
	<slot />
	<footer>
		<p>Version 5.3.1<br/><a sveltekit:prefetch href="/versions">Version history</a></p>
		<p>&copy; 2022 Clarence Siew</p>
	</footer>
</main>
