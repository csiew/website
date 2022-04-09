<script context="module" lang="ts">
	import { dev } from '$app/env';
	
	export const hydrate = dev;
	export const prerender = true;
</script>

<script lang="ts">
	import { onMount } from "svelte";
	import type { PostEntry } from "../../types/PostEntry";
	import postManifest from "./post_manifest.json";

	let posts = postManifest.posts.sort((a: PostEntry, b: PostEntry) => {
		let dateA = new Date(a.date).getTime();
		let dateB = new Date(b.date).getTime();
		return dateB > dateA ? 1 : dateA > dateB ? -1 : 0;
	});

	onMount(() => {
		document.getElementsByTagName("main")[0].scrollTo({ top: 0 });
	});
</script>

<svelte:head>
	<title>Blog | Clarence Siew</title>
</svelte:head>

<div class="content">
	<div class="heading">
		<h1>Blog</h1>
	</div>
  <section class="posts">
		<div class="post-list">
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
  </section>
</div>

<style>
	@media (max-width: 767px) {
		.posts {
			margin-top: 2rem;
		}
	}

	.post-list ul {
		display: inline-flex;
		flex-flow: column;
		justify-content: flex-start;
		align-items: stretch;
		gap: 0.5rem;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.post-list li {
		display: inline-flex;
		flex-flow: column;
		justify-content: center;
		align-items: flex-start;
		margin: 0;
		padding: 0;
	}
	.post-list a {
		display: grid;
		grid-template-columns: 1fr;
		width: 100%;
		padding: 1.5rem;
		border: var(--border-width) solid transparent;
		border-radius: var(--border-radius);
		text-decoration: none;
		cursor: pointer;
		user-select: none;
		-webkit-user-select: none;
		-moz-user-select: none;
	}
	.post-list a:hover {
		background: var(--secondary-color);
		border-color: var(--border-color);
		box-shadow: var(--3d-shadow), var(--element-shadow);
		transform: scale(1.00625);
	}
	.post-list a:active {
		color: var(--secondary-color);
		background: var(--text-color);
		box-shadow: none;
		transform: scale(1);
	}
	.post-list h3 {
		margin: 0;
		padding: 0;
		font-size: 1.5rem;
		font-weight: 500;
		line-height: 1;
	}
	.post-list sub {
		margin: 0;
		padding: 0;
		color: var(--subtitle-color);
		font-size: 0.9rem;
		font-weight: 400;
		line-height: 1;
	}

	.post-list a:active :is(h2, h3, sub) {
		color: var(--secondary-color);
	}
</style>
