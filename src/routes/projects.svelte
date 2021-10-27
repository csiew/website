<script context="module" lang="ts">
	import { browser, dev } from '$app/env';
	
	export const hydrate = dev;
	export const router = browser;
	export const prerender = true;
</script>

<script lang="ts">
	import projectsJson from "../lib/projects/projects.json";
</script>

<div class="content">
	<div class="heading">
		<h1>Projects</h1>
	</div>

	<div class="list">
		{#each projectsJson.projects as project}
			<section class="card">
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
					<p>{project.description}</p>
				</div>
			</section>
		{:else}
			<p>No projects</p>
		{/each}
	</div>
</div>

<style>
	.list {
		display: grid;
		grid-auto-flow: row;
		gap: 2rem;
	}
</style>
