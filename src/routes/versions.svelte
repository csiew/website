<script context="module" lang="ts">
	import { dev } from '$app/env';
	
	export const hydrate = dev;
	export const prerender = true;
</script>

<script lang="ts">
	import SvelteMarkdown from "svelte-markdown";
	import versionHistoryJson from "../lib/versions/history.json";
</script>

<svelte:head>
	<title>Versions | Clarence Siew</title>
</svelte:head>

<div class="content">
	<div class="heading">
		<h1>Versions</h1>
	</div>

	<div class="list">
		{#each versionHistoryJson as era}
			<div class="era">
				<h2>{era.title}</h2>
				<div class="list">
					{#each era.versions.reverse() as version}
						<section class="card">
							<div class="heading">
								<span class="title">
									<h3>{version.title}</h3>
									<sub>{version.date}</sub>
								</span>
							</div>
							<div class="body">
								{#each version.body as paragraph}
									<p><SvelteMarkdown source={paragraph} /></p>
								{/each}
							</div>
						</section>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.list {
		display: grid;
		grid-auto-flow: row;
		gap: 2rem;
	}

	.era h2 {
		margin: 2rem 0;
		padding: 1rem 0;
		border-bottom: 3px solid var(--border-color);
		color: var(--text-color);
		font-weight: lighter;
		text-align: center;
	}
</style>
