<script lang="ts">
  import { page } from '$app/stores';
  import type { PostEntry } from '../../types/PostEntry';
  import postManifest from './post_manifest.json';
	import SvelteMarkdown from "svelte-markdown";

  let postId = $page.params.slug;
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
  }

  .toolbar {
    border-radius: 9px 9px 0 0;
  }

  article {
		display: inline-flex;
		flex-flow: column;
		justify-content: flex-start;
		align-items: flex-start;
		width: 100%;
    padding: 2rem 2.5rem 3rem 2.5rem;
    background: white;
    border-radius: 0 0 9px 9px;
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
