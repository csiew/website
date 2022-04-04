<script context="module" lang="ts">
	import { dev } from '$app/env';
	
	export const hydrate = dev;
	export const prerender = true;
</script>

<script lang="ts">
	import { onMount } from "svelte";
	import SectionedPage from "$lib/ui/SectionedPage.svelte";
	import playlistsJson from "$lib/playlists/playlists.json";

	const noItemsMessage = "Could not retrieve playlists. Try reloading the page.";

	onMount(() => {
		document.getElementsByTagName("main")[0].scrollTo({ top: 0 });
	});
</script>

<svelte:head>
	<title>Playlists | Clarence Siew</title>
</svelte:head>

<SectionedPage
	title="Playlists"
	sections={playlistsJson.collection}
	noItemsMessage={noItemsMessage}
>
	<svelte:fragment slot="section-list">
		{#each playlistsJson.collection as year}
			{#if year.playlists.standard.length > 0 || year.playlists.special.length > 0}
				<section class="card" id={year.name}>
					<div class="heading">
						<span class="title">
							<h2>{year.name}</h2>
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
							<p>No special playlists for this year</p>
						{/if}
					</div>
				</section>
			{/if}
		{:else}
			<p>{noItemsMessage}</p>
		{/each}
	</svelte:fragment>
</SectionedPage>
