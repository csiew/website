<script lang="ts">
	import Profile from "./home/Profile.jpg";

  export let width: string = "12rem";
  export let height: string = "12rem";
</script>

<div class="profile-container" style={`width: ${width}; height: ${height}`}>
  <img src={Profile} class="profile" alt="Clarence" />
</div>

<style>
	img {
		position: relative;
		drag: none;
		-webkit-user-drag: none;
	}

	.profile-container {
		position: relative;
	}
	img.profile {
		width: inherit;
		height: inherit;
		border: 1px solid darkgray;
		border-radius: 100%;
		filter: drop-shadow(0px 2px 2px rgba(0,0,0,0.5) inset);
	}
	.profile-container::after {
		content: '';
		position: absolute;
		margin: 0;
		inset: 0;
		width: inherit;
		height: inherit;
		background: transparent;
		border-radius: 100%;
		box-shadow: 0px -2px 1px white inset, 0px 2px 8px rgba(0,0,0,0.75) inset;
	}
</style>