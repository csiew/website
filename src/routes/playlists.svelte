<script context="module" lang="ts">
	import { browser, dev } from '$app/env';
	
	export const hydrate = dev;
	export const router = browser;
	export const prerender = true;
</script>

<script lang="ts">
	import PlaylistShortcuts from "$lib/playlists/PlaylistShortcuts.svelte";
	import playlistsJson from "../lib/playlists/playlists.json";
</script>

<svelte:head>
	<title>Playlists | Clarence Siew</title>
</svelte:head>

<div class="content">
	<div class="heading">
		<h1>Playlists</h1>
	</div>

	<div class="list">
		{#each playlistsJson.collection as year}
			<section class="card" id={year.title}>
				<div class="heading">
					<span class="title">
						<h2>{year.title}</h2>
					</span>
				</div>
				<div class="body">
					{#if year.playlists.standard.length > 0}
						<div class="link-grid">
							{#each year.playlists.standard as playlist}
								<a class="button" href={playlist.url} target="_blank">{playlist.name}</a>
							{/each}
						</div>
					{:else}
						<p>No monthly/seasonal playlists for this year</p>
					{/if}
					{#if year.playlists.special.length > 0}
						<div class="link-grid">
							{#each year.playlists.special as playlist}
								<a class="button" href={playlist.url} target="_blank">{playlist.name}</a>
							{/each}
						</div>
					{:else}
						<p>Non special playlists for this year</p>
					{/if}
				</div>
			</section>
		{:else}
			<p>No projects</p>
		{/each}
	</div>
</div>
<PlaylistShortcuts playlistYears={playlistsJson.collection} />

<style>
	.list {
		display: grid;
		grid-auto-flow: row;
		gap: 2rem;
	}

	.link-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(196px, 1fr));
		gap: 1rem;
		margin: 0;
		padding: 1.5rem 0;
		width: 100%;
		border-bottom: 3px solid var(--border-color);
	}
	.link-grid:first-child {
		padding-top: 0;
	}
	.link-grid:last-child {
		padding-bottom: 0;
		border-bottom: none;
	}
</style>
