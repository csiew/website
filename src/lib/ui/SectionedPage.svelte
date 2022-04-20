<script lang="ts">
  export let title: string;
  export let sections: { id: string; name: string; [k: string]: any; }[];
  export let noItemsMessage: string = "Nothing to see here";
</script>

<svelte:head>
	<title>{title} | Clarence Siew</title>
</svelte:head>

<div class="content">
	<div class="heading">
		<h1>{title}</h1>
	</div>
</div>
<div class="nav-view">
	<div class="content">
		<div class="list">
      <slot name="section-list">
        <p>{noItemsMessage}</p>
      </slot>
		</div>
	</div>
	<div class="sidebar">
		<div class="shortcuts">
			<ul>
				{#each sections as s}
					<li><a href={`#${s.id}`}>{s.name}</a></li>
				{/each}
			</ul>
		</div>
	</div>
</div>

<style>
	.nav-view {
		display: inline-flex;
		flex-flow: row;
		align-items: flex-start;
		justify-content: center;
		width: 100%;
		margin: auto;
		padding: 0rem 2rem;
	}
	.nav-view .content {
		flex-grow: 1;
    margin-left: 0;
    margin-right: 0;
		padding: 0;
	}
	.nav-view .sidebar {
		flex-grow: 0;
		position: sticky;
		width: min-content;
		top: 0;
	}

	.shortcuts {
		position: sticky;
		top: 0;
		font-size: 80%;
	}
	.shortcuts ul {
		list-style: none;
		display: inline-flex;
		flex-flow: column;
		align-items: flex-start;
		justify-content: flex-start;
		gap: 0.25rem;
		margin: 0;
		padding: 1rem;
	}
	.shortcuts li {
		display: block;
		width: 100%;
	}
	.shortcuts a {
		display: block;
		width: min-content;
		margin: 0;
		padding: 0.25rem 0.5rem;
		background: none;
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--button-border-radius);
		box-shadow: none;
		font-weight: 600;
		text-decoration: none;
		white-space: nowrap;
	}
	.shortcuts a:hover {
		color: var(--secondary-color);
		background: var(--accent-color);
		border-color: var(--accent-color);
		box-shadow: var(--element-shadow);
	}
	.shortcuts a:active {
		box-shadow: none;
	}

	.list {
		display: grid;
		grid-auto-flow: row;
		gap: 2rem;
	}

  :global(.nav-view .link-grid) {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(196px, 1fr));
    gap: 1rem;
    margin: 0;
    padding: 1.5rem 0;
    width: 100%;
    border-bottom: 3px solid var(--border-color);
  }
  :global(.nav-view .link-grid:first-child) {
    padding-top: 0;
  }
  :global(.nav-view .link-grid:last-child) {
    padding-bottom: 0;
    border-bottom: none;
  }
	
	:global(.nav-view .body img) {
		margin: 0 0 2rem 0;
		border: 1px solid var(--border-color);
		border-radius: var(--border-radius);
		box-shadow: var(--element-shadow);
	}

	@media (max-width: 767px) {
    .nav-view {
      padding: 0;
    }
    
		.nav-view .content {
			padding: 1rem;
		}

		.nav-view .sidebar {
			display: none;
		}
	}
</style>
