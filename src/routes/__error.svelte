<script context="module" lang="ts">
	export function load({ error, status }) {
		return {
			props: {
				title: status,
        message: error.message
			}
		};
	}
</script>

<script lang="ts">
	export let title: string;
	export let message: string;
</script>

<div class="content">
  <span class="error-heading">
    <h1>{title}</h1>
    <sub>{message}</sub>
  </span>
  <iframe src="https://www.youtube-nocookie.com/embed/t-XOlgAZTlM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

<style>
  .content {
    min-height: 50vh;
    text-align: center;
  }

  .error-heading {
    display: inline-flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 3rem;
  }

  h1, sub {
    line-height: 1;
  }

  h1 {
    color: var(--text-color);
    font-size: 8rem;
    text-align: center;
  }

  sub {
    color: gray;
    font-size: 2rem;
    text-align: center;
    font-weight: 300;
  }

  iframe {
    width: 100%;
    max-width: 100vh;
    height: 50vh;
    border-radius: var(--border-radius);
    box-shadow: 0px 4px 8px rgba(0,0,0,0.25), 0px 2px 2px rgba(255,255,255,0.5) inset, 0px -2px 2px rgba(0,0,0,0.5) inset;
  }


  @media (max-width: 720px) {
    iframe {
      height: 30vh;
    }
  }
</style>