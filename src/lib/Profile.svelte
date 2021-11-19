<script lang="ts">
  export let width: string = "12rem";
  export let height: string = "12rem";
</script>

<div class="profile-container" style={`width: ${width}; height: ${height}`}>
  <img src="/profile.jpg" class="profile" alt="Clarence" />
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
		border-radius: 100%;
		filter: drop-shadow(0px 2px 8px rgba(0,0,0,0.5) inset);
	}
</style>
