<script context="module" lang="ts">
	import { dev } from "$app/env";
	
	export const hydrate = dev;
	export const prerender = false;
</script>

<script lang="ts">
	import { onDestroy, onMount } from "svelte";
  import MdArrowForward from "svelte-icons/md/MdArrowForward.svelte";
	import { type BlogPost, store } from "./journal.store";
	import sortPosts from "./sortPosts";

	let posts: BlogPost[] = [];

	const unsubscribe = store.subscribe((value: BlogPost[]) => {
		posts = value.sort(sortPosts);
	});

	onMount(() => {
		document.getElementsByTagName("main")[0].scrollTo({ top: 0 });
	});

	onDestroy(unsubscribe);
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
							<span class="icon">
								<MdArrowForward />
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
		display: inline-flex;
		flex-flow: row;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 1.5rem;
		background: var(--card-bg-color);
		border: var(--border-width) solid var(--button-border-color);
		border-radius: var(--border-radius);
		box-shadow: var(--button-shadow);
		text-decoration: none;
		cursor: pointer;
		user-select: none;
		-webkit-user-select: none;
		-moz-user-select: none;
	}
	.post-list a:hover {
		box-shadow: var(--button-shadow-hover);
	}
	.post-list a:active {
		box-shadow: var(--button-shadow-active);
	}
	.post-list h3 {
		margin: 0;
		padding: 0;
		font-size: 120%;
    font-family: var(--font-family);
		font-weight: 800;
		line-height: 1;
	}
	.post-list sub {
		margin: 0;
		padding: 0;
		color: var(--subtitle-color);
		font-size: 80%;
		font-weight: 400;
		line-height: 1;
	}

	.post-list a:active :is(h2, h3, sub) {
		color: var(--button-fg-color-active);
	}

	.post-list a .icon {
		opacity: 0.25;
		transition: 0.2s;
	}
	.post-list a:hover .icon {
		opacity: 1;
		transition: 0.2s;
	}
</style>
