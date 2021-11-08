<script lang="ts">
	import NavMenu from "./NavMenu.svelte";
	import MobileNavMenu from "./MobileNavMenu.svelte";
	import Profile from "../Profile.svelte";

</script>

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
	
	<span class="mobile-navbar">
		<MobileNavMenu />
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
		background: var(--text-color);
		color: var(--primary-color);
		box-shadow: 0px 8px 16px rgba(0,0,0,0.5) inset, 0px 2px 8px rgba(0,0,0,0.25), 0px 1px 2px rgba(0,0,0,0.5);
		border-bottom: 5px solid goldenrod;
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
		text-transform: uppercase;
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

	.mobile-navbar {
		display: none;
		margin: 0;
		width: 100%;
	}

	@media (max-width: 960px) {
		header {
			position: relative;
			flex-flow: column;
			justify-content: center;
			align-items: center;
			min-width: 100%;
			height: auto;
			padding: 0.25rem 0 0 0;
		}

		.title {
			justify-content: center;
			width: 100%;
		}
		.title h1 {
			display: none;
		}

		.navbar {
			display: none;
			visibility: hidden;
		}

		.mobile-navbar {
			display: inline-flex;
		}
	}
</style>
