<script lang="ts">
	import Header from '$lib/header/Header.svelte';
	import '../app.css';
	import '../styles/fonts/Bitter.css';
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

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 0;
		margin-top: 3rem;
		padding: 3rem;
		background: var(--footer-background);
		color: var(--footer-color);
	}

	footer a {
		font-weight: bold;
	}

	@media (max-width: 720px) {
		footer {
			padding: 1rem 0;
		}
	}
</style>
