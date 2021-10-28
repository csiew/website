<script context="module" lang="ts">
	import { browser, dev } from '$app/env';
	
	export const hydrate = dev;
	export const router = browser;
	export const prerender = false;
</script>

<svelte:head>
	<title>Blog | Clarence Siew</title>
</svelte:head>

<div class="content">
	<div class="heading">
		<h1>Blog</h1>
	</div>
  <div class="card">
    <div class="body">
      <p>The blog will be back soon!</p>
    </div>
  </div>
</div>
