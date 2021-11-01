<script lang="ts">
	import Header from '$lib/header/Header.svelte';
	import '../app.css';
	import '../fonts/SourceCodePro.css';
	import '../fonts/GandhiSans.css';
	import '../fonts/GandhiSerif.css';
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
	<p><a sveltekit:prefetch href="/versions">Version history</a></p>
	<p>&copy; 2021 Clarence Siew</p>
</footer>
