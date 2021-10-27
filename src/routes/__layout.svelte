<script lang="ts">
	import Header from '$lib/header/Header.svelte';
	import '../app.css';
	import '../styles/fonts/ZenKakuGothicAntique.css';
	import '../styles/fonts/BasementGrotesque.css';
</script>

<svelte:head>
	<title>Clarence Siew</title>
</svelte:head>

<Header />
<main>
	<slot />
</main>
<footer>
	<p>&copy; 2021 Clarence Siew</p>
</footer>
