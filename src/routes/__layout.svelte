<script lang="ts">
	import packageJson from '../../package.json';
	import Header from '$lib/header/Header.svelte';
	import '../app.css';
	import '../fonts/SourceSansPro.css';
	import '../fonts/SourceCodePro.css';
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
	<p>Version {packageJson.version}<br/><a sveltekit:prefetch href="/versions">Version history</a></p>
	<p>&copy; 2021 Clarence Siew</p>
</footer>
