<script context="module" lang="ts">
	import { dev } from '$app/env';
	
	export const hydrate = dev;
	export const prerender = true;
</script>

<script lang="ts">
	import { onMount } from "svelte";
	import SvelteMarkdown from "svelte-markdown";
	import versionHistoryJson from "../lib/versions/history.json";

	onMount(() => {
		document.getElementsByTagName("main")[0].scrollTo({ top: 0 });
	});
</script>

<svelte:head>
	<title>Versions | Clarence Siew</title>
	<meta name="description" content="Clarence has been building his personal site since 2018.">
</svelte:head>

<div class="content">
	<div class="heading">
		<h1>Versions</h1>
		<sub><a href="https://github.com/csiew/website" target="_blank">Visit the GitHub repository</a></sub>
	</div>

	<div class="list">
		{#each versionHistoryJson as era}
			<div class="era">
				<h2>{era.title}</h2>
				<div class="list">
					{#each era.versions as version}
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
		border-bottom: var(--hr-border);
		color: var(--text-color);
		text-align: center;
	}
</style>
