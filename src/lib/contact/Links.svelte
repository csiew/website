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
		padding: 0;
		width: 100%;
	}
</style>
