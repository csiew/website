<script lang="ts">
	import { page } from '$app/stores';
	import profile from './profile.jpg';
</script>

<header>
	<div class="title">
		<a href="/">
			<img src={profile} alt="Clarence" />
			<h1>Clarence Siew</h1>
		</a>
	</div>

	<nav>
		<ul>
			<li class:active={$page.path === '/'}><a sveltekit:prefetch href="/">Home</a></li>
			<li class:active={$page.path === '/about'}><a sveltekit:prefetch href="/about">About</a></li>
		</ul>
	</nav>
</header>

<style>
	header {
		--header-background: #333333;
		position: sticky;
		display: inline-flex;
		flex-flow: row;
		justify-content: space-between;
		align-items: center;
		margin: 0;
		top: 0;
		padding: 0.5rem;
		color: var(--secondary-color);
		background: var(--header-background);
	}

	.title {
		width: auto;
		padding: 0;
	}
	.title a {
		display: grid;
		grid-auto-flow: column;
		gap: 0.5rem;
		align-items: center;
		width: 100%;
		height: 100%;
		text-decoration: none;
	}
	.title img {
		width: 2em;
		height: 2em;
		object-fit: contain;
		border-radius: 100%;
	}
	.title h1 {
		margin: 0;
		color: var(--primary-color);
		font-size: 1.75rem;
		font-weight: 700;
		line-height: 1;
	}

	nav {
		height: 100%;
		display: inline-flex;
		flex-flow: row;
		justify-content: center;
		align-items: stretch;
		margin: 0;
		padding: 0;
	}
	nav ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 100%;
		display: inline-flex;
		flex-flow: row;
		justify-content: flex-end;
		align-items: stretch;
		list-style: none;
	}
	nav li {
		position: relative;
		height: 100%;
	}
	nav a {
		height: 100%;
		display: inline-flex;
		flex-flow: row;
		justify-content: center;
		align-items: stretch;
		padding: 0.25rem 0.5rem;
		color: var(--tertiary-color);
		font-weight: 700;
		font-size: 1rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}
	nav a:hover, nav li.active a {
		color: white;
	}
	nav a:active {
		color: var(--accent-color);
	}

	@media (max-width: 720px) {
		.title h1 {
			display: none;
		}
	}
</style>
