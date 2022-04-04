<script context="module" lang="ts">
	import { dev } from '$app/env';
	
	export const hydrate = dev;
	export const prerender = true;
</script>

<script lang="ts">
	import { onMount } from "svelte";
	import SvelteMarkdown from "svelte-markdown";
	import SectionedPage from "$lib/ui/SectionedPage.svelte";
	import projectsJson from "$lib/projects/projects.json";

	const noItemsMessage = "Could not retrieve projects. Try reloading the page.";

	onMount(() => {
		document.getElementsByTagName("main")[0].scrollTo({ top: 0 });
	});
</script>

<SectionedPage
	title="Projects"
	sections={projectsJson.projects}
	noItemsMessage={noItemsMessage}
>
	<svelte:fragment slot="section-list">
		{#each projectsJson.projects as project}
			<section class="card" id={project.id}>
				<div class="heading">
					<span class="title">
						<h2>{project.name}</h2>
						<sub>{project.timeRange}</sub>
					</span>
					<span class="accessories">
						<a class="button" href={project.url ?? undefined} target={project.url ? "_blank" : undefined} class:disabled={!project.url}>Website</a>
						<a class="button" href={project.github ?? undefined} target={project.url ? "_blank" : undefined} class:disabled={!project.github}>Repository</a>
					</span>
				</div>
				<div class="body">
					{#if project.imgUrl.length > 0}
						<img
							loading="lazy"
							decoding="async"
							src={`/img/${project.imgUrl}`} alt={project.name}
							width="100%"
						/>
					{/if}
					<p><SvelteMarkdown source={project.description} /></p>
				</div>
			</section>
		{:else}
			<p>{noItemsMessage}</p>
		{/each}
	</svelte:fragment>
</SectionedPage>
