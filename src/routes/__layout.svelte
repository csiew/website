<script lang="ts">
	import Header from '$lib/header/Header.svelte';
	import '../app.css';
</script>

<svelte:head>
	<title>Clarence Siew</title>
</svelte:head>

<Header />
<main>
	<slot />
</main>
<footer>
	<p><a sveltekit:prefetch href="/versions">Version history</a></p>
	<p>&copy; 2021 Clarence Siew</p>
</footer>
