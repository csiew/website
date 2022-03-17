<script context="module" lang="ts">
	import { dev } from '$app/env';
	
	export const hydrate = dev;
	export const prerender = true;
</script>

<script lang="ts">
	import type { PostEntry } from "../../types/PostEntry";
	import postManifest from "./post_manifest.json";

	let posts = postManifest.posts.sort((a: PostEntry, b: PostEntry) => {
		let dateA = new Date(a.date).getTime();
		let dateB = new Date(b.date).getTime();
		return dateB > dateA ? 1 : dateA > dateB ? -1 : 0;
	});
</script>

<svelte:head>
	<title>Blog | Clarence Siew</title>
</svelte:head>

<div class="content">
	<div class="heading">
		<h1>Blog</h1>
	</div>
  <div class="card">
		<div class="heading toolbar">
			<h4>Posts</h4>
		</div>
		<div class="body">
			<ul>
				{#each posts as post}
					<li>
						<a href={`/blog/${post.id}`}>
							<span class="item">
								<h3>{post.title}</h3>
								<sub>{new Date(post.date).toLocaleString()}</sub>
							</span>
						</a>
					</li>
				{/each}
			</ul>
		</div>
  </div>
</div>

<style>
	.card {
		padding: 0;
	}
	.card .heading {
		margin: 0;
		padding: 0.5rem 1rem;
		background: none;
		border-radius: var(--border-radius) var(--border-radius) 0 0;
	}
	.card .body {
		margin: 0;
		padding: 0.5rem;
	}

	.card .body ul {
		display: inline-flex;
		flex-flow: column;
		justify-content: flex-start;
		align-items: stretch;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.card .body li {
		display: inline-flex;
		flex-flow: column;
		justify-content: center;
		align-items: flex-start;
		margin: 0;
		padding: 0;
	}
	.card .body a {
		display: grid;
		grid-template-columns: 1fr;
		width: 100%;
		padding: 1rem;
		border-radius: var(--border-radius);
		text-decoration: none;
		cursor: pointer;
		user-select: none;
		-webkit-user-select: none;
		-moz-user-select: none;
	}
	.card .body a:hover {
		background: rgba(0,0,0,0.0625);
	}
	.card .body a:active {
		color: var(--secondary-color);
		background: var(--text-color);
		box-shadow: none;
	}
	.card .body h3 {
		margin: 0;
		padding: 0;
		font-size: 1.25rem;
		font-weight: 600;
		line-height: 1;
	}
	.card .body sub {
		margin: 0;
		padding: 0;
		color: var(--subtitle-color);
		font-size: 0.9rem;
		line-height: 1;
	}

	.card .body a:active :is(h2, h3, sub) {
		color: var(--secondary-color);
	}
</style>
