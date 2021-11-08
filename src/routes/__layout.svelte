<script lang="ts">
	import Header from '$lib/header/Header.svelte';
	import '../app.css';
	import '../fonts/SourceSansPro.css';
	import '../fonts/SourceCodePro.css';
	import '../fonts/Jost.css';
	import '../fonts/Cabin.css';
</script>

<svelte:head>
	<link rel="icon" href="/profile.jpg" />
	<link rel="apple-touch-icon" href="/profile.jpg" />
</svelte:head>

<Header />
<main>
	<slot />
</main>
<footer>
	<p>Version 5.0.2<br/><a sveltekit:prefetch href="/versions">Version history</a></p>
	<p>&copy; 2021 Clarence Siew</p>
</footer>
