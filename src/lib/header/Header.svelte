<script lang="ts">
	import NavMenu from "./NavMenu.svelte";
	import Profile from "../Profile.svelte";

</script>

<div class="torse"></div>
<header>
	<div class="title">
		<a href="/">
			<Profile width="2.5rem" height="2.5rem" />
			<h1>Clarence Siew</h1>
		</a>
	</div>

	<span class="navbar">
		<NavMenu />
	</span>
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
		background: var(--secondary-color);
		color: var(--text-color);
		box-shadow: 8px 8px 64px rgba(255,255,255,0.125) inset, -8px -8px 64px rgba(0,0,0,0.5) inset, 0px 2px 8px rgba(0,0,0,0.25);
		border-bottom: 1px solid var(--border-color);
	}

	.title {
		display: inline-flex;
		flex-flow: row;
		justify-content: space-between;
		align-items: center;
		margin: 1rem 0;
		padding: 0;
		width: auto;
	}
	.title a {
		display: grid;
		grid-auto-flow: column;
		gap: 1rem;
		align-items: center;
		padding: 0 1.5rem;
		width: auto;
		height: 100%;
		text-decoration: none;
	}
	.title h1 {
		margin: 0;
		padding: 0;
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

	.navbar {
		display: inline-flex;
		flex-flow: column;
		justify-content: flex-end;
		align-items: flex-end;
		margin: auto 0 0 0;
		padding: 0;
		height: 100%;
	}

	.torse {
		--accent-1: rgba(0,0,0,0.5);
		--accent-2: goldenrod;
		margin: 0;
		padding: 0;
		width: 100%;
		height: 1rem;
		background: linear-gradient(-45deg, var(--accent-1) 25%, var(--accent-2) 25%, var(--accent-2) 50%, var(--accent-1) 50%, var(--accent-1) 75%, var(--accent-2) 75%);
		background-size: 27px 27px;
		border: none;
		box-shadow: 0px 2px 8px rgba(0,0,0,0.75), 0px -2px 2px rgba(0,0,0,0.125) inset, 0px -4px 8px rgba(0,0,0,0.75) inset, 0px 4px 8px rgba(255,255,255,0.5) inset;
	}

	@media (max-width: 960px) {
		header {
			flex-flow: row;
			justify-content: space-between;
			align-items: center;
			padding: 0.25rem 0 0 0;
			min-width: 100%;
			height: auto;
		}

		.title {
			justify-content: center;
			margin: 0;
			width: auto;
		}
		.title h1 {
			display: none;
		}

		.navbar {
			display: inline-flex;
			flex-flow: column;
			justify-content: flex-end;
			align-items: flex-end;
			margin: auto;
			padding: 0;
			width: 100%;
			height: auto;
		}
	}
</style>
