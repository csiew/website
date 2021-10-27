<script context="module" lang="ts">
	import { browser, dev } from '$app/env';

	export const hydrate = dev;
	export const router = browser;
	export const prerender = true;
</script>

<script lang="ts">
	import Skills from "../lib/skills/Skills.svelte";

	import Profile from "../lib/home/Profile.jpg";
	import Penang from "../lib/home/Penang.png";
	import Victoria from "../lib/home/Victoria.png";
</script>

<div class="content">
	<div class="heading">
		<h1>Hello World</h1>
	</div>
	<div class="slide">
		<div class="showcase showcase-right">
			<img src={Profile} alt="Clarence" style="width: 12rem; height: 12rem; border-radius: 100%;" />
			<section class="card">
				<div class="body">
					<p>
						Hi there! I'm Clarence. I'm a software engineer based in Melbourne. I graduated with a Bachelor of Software Engineering from Monash University in 2020.
					</p>
					<p>
						I mostly work on web applications and websites as a full-stack engineer. I also have an interest in Linux, and graphic design.
					</p>
				</div>
			</section>
		</div>
	</div>
	<div class="slide">
		<div class="showcase showcase-left">
			<section class="card">
				<div class="body">
					<p>
						I was born in George Town on Penang Island, which is one half of the state of Penang in Malaysia.
					</p>
				</div>
			</section>
			<img src={Penang} alt="Penang" style="height: 12rem;" />
		</div>
		<div class="showcase showcase-right">
			<img src={Victoria} alt="Victoria" style="height: 12rem;" />
			<section class="card">
				<div class="body">
					<p>
						I currently live in Melbourne, Victoria in Australia. It was at one point, the most locked-down city in the world. Being a homebody, I wasn't too bothered.
					</p>
				</div>
			</section>
		</div>
	</div>
	<div class="slide">
		<section class="card">
			<div class="body">
				<p>
					I absolutely must have music playing when working. My favourite genres are punk, grunge, alternative, hard rock and metal.
				</p>
			</div>
		</section>
	</div>

	<div class="slide">
		<Skills />
	</div>
</div>
