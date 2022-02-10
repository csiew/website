<script context="module" lang="ts">
	import { dev } from '$app/env';
	
	export const hydrate = dev;
	export const prerender = true;
</script>

<svelte:head>
  <title>{postMetadata.title ?? 'Blog'} | Clarence Siew</title>
  <meta charset="UTF-8">
  <meta name="description" content={postContent.slice(0, 256) + '...'}>
  <meta name="keywords" content="Clarence Siew, Clarence, Siew, HTML, CSS, JavaScript, React, Vue, Svelte, Node, Express, Penang, Malaysia, Melbourne, Australia">
  <meta name="author" content="Clarence Siew">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</svelte:head>

<script lang="ts">
  import { page } from '$app/stores';
  import type { PostEntry } from '../../types/PostEntry';
  import postManifest from './post_manifest.json';
	import SvelteMarkdown from "svelte-markdown";

  let postId = $page.params.post;
  let postMetadata = postManifest.posts.filter(p => p.id === postId)[0] ?? undefined;
  let postContent = '';

  async function getPostContent(metadata: PostEntry) {
    if (metadata) {
      try {
        const response = await fetch(metadata.path);
        postContent = await response.text();
      } catch (err) {
        console.error(err);
      }
    }
  }

  getPostContent(postMetadata);
</script>

<div class="content">
  <div class="card">
    <div class="article-nav toolbar">
      <a class="button" href="/blog">&leftarrow; Back</a>
    </div>
    <article>
      <h1>{postMetadata.title}</h1>
      <sub>{new Date(postMetadata.date).toLocaleString()}</sub>
      <hr />
      <SvelteMarkdown source={postContent} />
    </article>
  </div>
</div>

<style>
  hr {
    margin: 1.5rem 0;
  }

  .card {
    padding: 0;
    background: var(--primary-color);
  }

  .toolbar {
    background: var(--primary-color);
    border: none !important;
    border-radius: 0 0 var(--border-radius) var(--border-radius);
    filter: opacity(75%);
    backdrop-filter: blur(16px);
    transition: 0.2s;
  }
  .toolbar:hover {
    filter: opacity(90%);
    transition: 0.2s;
  }

  article {
		display: inline-flex;
		flex-flow: column;
		justify-content: flex-start;
		align-items: flex-start;
		width: 100%;
    padding: 2rem 2.5rem 3rem 2.5rem;
    color: var(--text-color);
    border-radius: 0 0 var(--border-radius) var(--border-radius);
  }

  article h1 {
    line-height: 1.125;
  }

	@media (max-width: 720px) {
    .content {
      margin: 0;
      padding: 0;
      width: 100%;
      max-width: unset;
    }

    .card {
      border: none;
      border-radius: 0;
    }
    
    .toolbar {
      border-radius: 0;
    }

    article {
      padding: 2rem;
      border-radius: 0;
      box-shadow: none;
    }
  }
</style>
