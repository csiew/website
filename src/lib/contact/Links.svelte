<script lang="ts">
  import linksJson from "./links.json";
</script>

<section class="card">
  <div class="heading">
    <span class="title">
      <h2>Links</h2>
    </span>
  </div>
  <div class="body">
    <div class="link-grid">
      {#each linksJson.links as link}
        <a class="button" href={link.url} target="_blank">{link.name}</a>
      {/each}
    </div>
  </div>
</section>

<style>
	.link-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(196px, 1fr));
		gap: 1rem;
		margin: 0;
		padding: 1.5rem 0;
		width: 100%;
		border-bottom: 3px solid var(--border-color);
	}
	.link-grid:first-child {
		padding-top: 0;
	}
	.link-grid:last-child {
		padding-bottom: 0;
		border-bottom: none;
	}
</style>
