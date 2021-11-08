<div class="card construction">
  <div class="heading">
    <h2>Under construction</h2>
  </div>
  <div class="body">
    Welcome to version 5.0 of my site! It is still under heavy development and a lot may change within a short span of time. This new iteration uses the Svelte framework (with SvelteKit) and the aesthetic is inspired by late 2000s and early 2010s skeumorphic UI (it's nostalgia season).
  </div>
</div>

<style>
  .card.construction {
		margin: 0 0 3rem 0;
		padding: 0;
		background: rgba(0,0,0,0.75);
		color: lightgray;
		border-color: black;
		font-size: 1rem;
	}
	.card.construction .heading {
		--accent-1: rgba(0,0,0,0.5);
		--accent-2: goldenrod;
		justify-content: center;
		margin: 0;
		padding: 0.5rem 1rem 0 1rem;
		background: linear-gradient(-45deg, var(--accent-1) 25%, var(--accent-2) 25%, var(--accent-2) 50%, var(--accent-1) 50%, var(--accent-1) 75%, var(--accent-2) 75%);
		background-size: 27px 27px;
		border: none;
		border-radius: var(--border-radius) var(--border-radius) 0 0;
		box-shadow: 0px 4px 4px rgba(255,255,255,0.5) inset, 0px -2px 2px rgba(0,0,0,0.125) inset, 0px -8px 16px rgba(0,0,0,0.75) inset, 0px 8px 16px rgba(255,255,255,0.75) inset, 0px -12px 16px rgba(255,255,255,0.5) inset;
		animation: barberpole 25s infinite linear;
	}
	.card.construction:hover .heading {
		--accent-1: green;
		--accent-2: limegreen;
	}
	.card.construction .heading h2 {
		margin: 0;
		padding: 0.5rem 1rem;
		background: linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.75));
		border: 1px solid #333333;
		border-radius: var(--border-radius) var(--border-radius) 0 0;
		color: white;
		font-size: 1rem;
		text-transform: uppercase;
		text-shadow: 0px 1px 8px rgba(0,0,0,0.25);
		box-shadow: 0px 2px 2px rgba(0,0,0,0.25) inset, 0px -4px 8px rgba(255,255,255,0.25) inset;
		backdrop-filter: blur(4px);
	}
	.card.construction .body {
		padding: 1rem;
    border-radius: 0 0 var(--border-radius) var(--border-radius);
		box-shadow: 0px 2px 4px rgba(0,0,0,0.75) inset;
	}

	@keyframes barberpole {
		from {
			background-position: 0%;
		}
		to {
			background-position: 100%;
		}
	}
</style>
