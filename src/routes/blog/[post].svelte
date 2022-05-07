<script context="module" lang="ts">
	import { dev } from "$app/env";
	
	export const hydrate = dev;
	export const prerender = true;
</script>

<script lang="ts">
  import { page } from "$app/stores";
  import { onDestroy } from "svelte";
	import SvelteMarkdown from "svelte-markdown";
  import MdArrowBack from "svelte-icons/md/MdArrowBack.svelte";
	import { type BlogPost, store } from "./journal.store";
  import sortPosts from "./sortPosts";

  let postId = $page.params.post;
  let post: BlogPost = {
    id: postId,
    title: "",
    date: "",
    content: ""
  };
  let loadingText = "Loading";
  let isLoading = true;
  let isSuccess = false;

  let posts: BlogPost[] = [];

  const unsubscribe = store.subscribe((value: BlogPost[]) => {
    posts = value.sort(sortPosts);
    post = posts.find((post) => post.id === postId);
    if (post) {
      isSuccess = true;
    } else {
      console.error("Could not load blog post");
    }
    isLoading = false;
  });

  onDestroy(unsubscribe);
</script>

<svelte:head>
  <title>{post.title ?? "Blog"} | Clarence Siew</title>
  <meta charset="UTF-8">
  <meta name="description" content={post.content.slice(0, 256) + "..."}>
  <meta name="keywords" content="Clarence Siew, Clarence, Siew, HTML, CSS, JavaScript, React, Vue, Svelte, Node, Express, Penang, Malaysia, Melbourne, Australia">
  <meta name="author" content="Clarence Siew">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</svelte:head>

<div class="content">
  <div class="card">
    <div class="article-nav toolbar">
      <a id="blog-back-button" class="button" href="/blog" title="Back">
        <span class="icon"><MdArrowBack /></span>
      </a>
    </div>
    <article>
      {#if isSuccess && !isLoading}
        <h1>{post.title}</h1>
        <sub>{new Date(post.date).toLocaleString()}</sub>
        <hr />
        <SvelteMarkdown source={post.content} />
      {:else}
        <span class="loading subsection">
          <span class:loading-text={isLoading}>
            {loadingText}
          </span>
        </span>
      {/if}
    </article>
  </div>
</div>

<style>
  hr {
    margin: 1.5rem 0;
  }

  #blog-back-button:global(.button) {
    display: inline-flex;
    flex-flow: row;
    align-items: center;
    justify-content: center;
    gap: 0.125rem;
  }
  #blog-back-button:global(span) {
    margin: 0;
    padding: 0;
  }
  #blog-back-button:global(.button .icon svg) {
    margin: 0;
    padding: 0;
    width: 1.5rem;
    height: 1.5rem;
    color: var(--text-color);
  }
  #blog-back-button:global(.button:active .icon svg) {
    color: var(--secondary-color);
  }

  .card {
    padding: 0;
  }

  .toolbar {
    border-width: 0px 0px var(--border-width) 0px;
    border-style: solid;
    border-color: var(--border-color);
    border-radius: var(--border-radius) var(--border-radius) 0 0;
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
    font-family: var(--font-article);
    line-height: inherit;
  }

  article :is(h1, sub) {
    font-family: var(--font-family);
  }
  article h1 {
    line-height: 1.125;
  }
  article sub {
    font-weight: inherit;
  }

  .loading {
		display: inline-flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
    width: 100%;
    margin: 0;
    padding: 2rem;
    text-align: center;
  }
  .loading-text {
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    animation: loading-throbber infinite alternate-reverse 0.5s;
  }

  @keyframes loading-throbber {
    0% {
      opacity: 100%;
    }
    100% {
      opacity: 50%;
    }
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
