<script context="module" lang="ts">
	import { browser, dev } from '$app/env';
	
	export const hydrate = dev;
	export const router = browser;
	export const prerender = false;
</script>

<script lang="ts">
	import SvelteMarkdown from "svelte-markdown";
	import ProjectShortcuts from "../lib/projects/ProjectShortcuts.svelte";
	import projectsJson from "../lib/projects/projects.json";
</script>

<svelte:head>
	<title>Projects | Clarence Siew</title>
</svelte:head>

<div class="content">
	<div class="heading">
		<h1>Projects</h1>
	</div>

	<div class="list">
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
						<img src={`/img/${project.imgUrl}`} alt={project.name} width="100%" />
					{/if}
					<p><SvelteMarkdown source={project.description} /></p>
				</div>
			</section>
		{:else}
			<p>No projects</p>
		{/each}
	</div>
</div>
<ProjectShortcuts projects={projectsJson.projects} />

<style>
	.list {
		display: grid;
		grid-auto-flow: row;
		gap: 2rem;
	}
	
	.body img {
		margin: 0 0 2rem 0;
		border: 1px solid var(--border-color);
		border-radius: 9px;
		box-shadow: 0px 2px 4px rgba(0,0,0,0.5);
	}
</style>
