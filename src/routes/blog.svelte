<script context="module" lang="ts">
	import { dev } from '$app/env';
	
	export const hydrate = dev;
	export const prerender = true;
</script>

<script lang="ts">
	import type { PostEntry } from "../types/PostEntry";
	import SvelteMarkdown from "svelte-markdown";
	import postManifest from "../lib/blog/post_manifest.json";

	let posts = postManifest.posts.sort((a: PostEntry, b: PostEntry) => {
		let dateA = new Date(a.date).getTime();
		let dateB = new Date(b.date).getTime();
		return dateB > dateA ? 1 : dateA > dateB ? -1 : 0;
	});
	let activePost: PostEntry | null = null;
	let postContent = "";

	function clearActivePost() {
			activePost = null;
			postContent = "";
	}

	async function selectPost(post: PostEntry) {
		try {
			const response = await fetch(post.path);
			postContent = await response.text();
			activePost = post;
		} catch (err) {
			console.error(err);
			clearActivePost();
		}
	}
</script>

<svelte:head>
	<title>Blog | Clarence Siew</title>
</svelte:head>

<div class="content">
  <div class="card nav-view" class:article-selected={activePost}>
    <div class="sidebar">
      <div class="heading toolbar">
				<h4>Posts</h4>
			</div>
			<div class="list">
				{#each posts as post}
					<span class="item" class:active={activePost === post} on:click|preventDefault={() => selectPost(post)}>
						<h3>{post.title}</h3>
						<sub>{new Date(post.date).toLocaleString()}</sub>
					</span>
				{/each}
			</div>
    </div>
		<div class="body">
			{#if activePost}
				<div class="article-nav toolbar">
					<button on:click|preventDefault={clearActivePost}>Close</button>
				</div>
				<article>
					<h1>{activePost.title}</h1>
					<sub>{new Date(activePost.date).toLocaleString()}</sub>
					<hr />
					<SvelteMarkdown source={postContent} />
				</article>
			{:else}
				<div class="body-placeholder">
					<span>Select a post to read</span>
				</div>
			{/if}
		</div>
  </div>
</div>

<style>
	:root {
		--toolbar-gradient: linear-gradient(to bottom, whitesmoke, lightgray);
		--toolbar-shadow: 0px 2px 2px rgba(255,255,255,0.75) inset, 0px -2px 2px rgba(0,0,0,0.125) inset;
		--border: 1px solid var(--border-color);
	}

	hr {
		margin: 2rem 0;
	}

	.toolbar {
		position: sticky;
		display: inline-flex;
		flex-flow: row;
		justify-content: space-between;
		align-items: center;
		margin: 0;
		top: 0;
		padding: 0.25rem 1rem;
		height: 3.5rem;
		background: var(--toolbar-gradient);
		border-bottom: var(--border);
		box-shadow: var(--toolbar-shadow);
	}
	.toolbar :is(button, .button) {
		background: var(--toolbar-gradient);
		border: var(--border);
		box-shadow: var(--toolbar-shadow);
	}

	.content {
		max-width: 1024px;
	}

	.nav-view {
		display: grid;
		grid-template-columns: 1fr 2fr;
		gap: 0;
		height: 60vh;
		max-height: 100vh;
		padding: 0;
		overflow-y: auto;
	}
	.sidebar {
		position: sticky;
		display: inline-flex;
		flex-flow: column;
		justify-content: flex-start;
		align-items: flex-start;
		margin: 0;
		top: 0;
		height: 100%;
		border-right: var(--border);
		overflow-y: auto;
	}
	.sidebar .heading {
		border-top-left-radius: 9px;
	}
	.sidebar .list {
		display: inline-flex;
		flex-flow: column;
		justify-content: flex-start;
		align-items: stretch;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		box-shadow: 0px 2px 2px rgba(0,0,0,0.125) inset;
	}
	.sidebar .list .item {
		display: inline-flex;
		flex-flow: column;
		justify-content: center;
		align-items: flex-start;
		gap: 0.125rem;
		padding: 0.5rem 1rem;
		border-bottom: var(--border);
		cursor: pointer;
		-webkit-user-select: none;
		-moz-user-select: none;
	}
	.sidebar .list .item:hover {
		background: rgba(255,255,255,0.25);
	}
	.sidebar .list .item:active {
		background: rgba(0,0,0,0.125);
	}
	.sidebar .list .item h3 {
		font-size: 1.125rem;
		font-weight: 600;
		line-height: 1;
	}
	.sidebar .list .item sub {
		color: gray;
		font-size: 0.9rem;
		font-weight: 400;
	}
	.sidebar .list .item.active {
		background: var(--accent-color);
	}
	.sidebar .list .item.active :is(h3, sub) {
		color: white;
	}

	.body {
		display: inline-flex;
		flex-flow: column;
		justify-content: flex-start;
		align-items: stretch;
		margin: 0;
		padding: 0;
		width: 100%;
		height: 100%;
		overflow-y: auto;
		border-radius: 0px 9px 9px 0px;
	}
	.body-placeholder {
		display: inline-flex;
		flex-flow: row;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		background: lightgray;
		color: gray;
		text-shadow: 0px 1px 1px white;
		box-shadow: var(--toolbar-shadow);
		-webkit-user-select: none;
		-moz-user-select: none;
	}
	.article-selected .body {
		background: white;
	}

	.body .article-nav {
		position: sticky;
		top: 0;
		justify-content: flex-end;
		border-top-right-radius: 9px;
	}

	article {
		display: inline-flex;
		flex-flow: column;
		justify-content: flex-start;
		align-items: flex-start;
		width: 100%;
		padding: 1.5rem 2rem;
	}

	article h1 {
		line-height: 1.125;
	}

	.article-nav {
		display: none;
	}

	@media (max-width: 720px) {
		.content {
			margin: 0;
			padding: 0;
			width: 100%;
			max-width: unset;
		}

		.nav-view {
			display: inline-flex;
			flex-flow: column;
			justify-content: flex-start;
			align-items: stretch;
			height: unset;
			max-height: unset;
			overflow: visible;
			border: none;
			border-radius: 0;
		}

		.sidebar {
			border-right: none;
		}
		.body {
			overflow: visible;
		}

		.article-selected .sidebar {
			display: none;
		}
		.nav-view:not(.article-selected) .body {
			display: none;
		}

		.article-nav {
			display: inline-flex;
		}
	}
</style>
