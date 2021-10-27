<script lang="ts">
	import NavMenu from "./NavMenu.svelte";

</script>

<header>
	<div class="title">
		<a href="/">
			<h1>Clarence Siew</h1>
		</a>
	</div>

	<NavMenu />
</header>

<style>
	header {
		z-index: 100;
		position: sticky;
		display: inline-flex;
		flex-flow: row;
		justify-content: space-between;
		align-self: stretch;
		margin: 0;
		inset: 0;
		padding: 0;
		width: 100%;
		min-width: 300px;
		background: var(--text-color);
		color: var(--primary-color);
		border-bottom: 5px solid goldenrod;
	}

	.title {
		margin: 1rem 0;
		padding: 0;
		width: auto;
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
	.title h1 {
		margin: 0;
		padding: 0 1.5rem;
		color: white;
		font-size: 200%;
		font-weight: 700;
		line-height: 1;
		text-align: right;
		transition: 0.2s linear;
	}
	.title h1:hover {
		text-shadow: 0px 0px 2px var(--tertiary-color);
	}

	@media (max-width: 720px) {
		header {
			flex-flow: column;
			justify-content: center;
			align-items: center;
			min-width: 100%;
			height: auto;
			padding: 0.25rem 0 0 0;
		}
		.title h1 {
			padding: 0;
			text-align: center;
		}
	}
</style>
