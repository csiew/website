<script lang="ts">
	import NavMenu from "./NavMenu.svelte";
	import Profile from "../Profile.svelte";

</script>

<header>
	<div class="title">
		<a href="/">
			<Profile width="2.5rem" height="2.5rem" />
		</a>
	</div>

	<span class="navbar">
		<NavMenu />
	</span>
</header>

<style>
	header {
		z-index: 100;
		display: inline-flex;
		flex-flow: column;
		justify-content: flex-start;
		align-self: center;
		margin: 0;
		inset: 0;
		padding: 1.5rem 1rem;
		gap: 1.5rem;
		width: 100%;
		max-width: 96px;
		height: 100vh;
		border: solid var(--border-color);
		border-width: 0px var(--border-width) 0px 0px;
	}

	.title {
		display: inline-flex;
		flex-flow: column;
		justify-content: flex-start;
		align-items: center;
		margin: 0;
		padding: 0;
		width: 100%;
	}
	.title a {
		display: grid;
		grid-auto-flow: column;
		gap: 1rem;
		align-items: center;
		padding: 0;
		width: auto;
		height: 100%;
		text-decoration: none;
	}

	.navbar {
		display: inline-flex;
		flex-flow: column;
		justify-content: flex-start;
		align-items: flex-start;
		margin: 0;
		padding: 0;
		width: 100%;
	}

	@media (max-width: 767px) {
		header {
			flex-flow: row;
			justify-content: space-between;
			align-items: center;
			padding: 0.75rem 1rem;
			min-width: 100%;
			height: auto;
			border-width: 0px 0px 1px 0px;
		}

		.title {
			justify-content: center;
			margin: 0;
			padding: 0rem 0.5rem;
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
