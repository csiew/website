<script context="module" lang="ts">
	import { browser, dev } from '$app/env';

	export const hydrate = dev;
	export const router = browser;
	export const prerender = true;
</script>

<script lang="ts">
	import { onMount } from "svelte";
	import Skills from "../lib/skills/Skills.svelte";
	import Links from '$lib/contact/Links.svelte';
	import Profile from "$lib/Profile.svelte";
	import Penang from "../lib/home/Penang.png";
	import Victoria from "../lib/home/Victoria.png";

	onMount(() => {
		document.getElementsByTagName("main")[0].scrollTo({ top: 0 });
	});
</script>

<svelte:head>
	<title>Home | Clarence Siew</title>
  <meta charset="UTF-8">
  <meta name="description" content="Software engineer based in Melbourne.">
  <meta name="keywords" content="Clarence Siew, Clarence, Siew, HTML, CSS, JavaScript, React, Vue, Svelte, Node, Express, Penang, Malaysia, Melbourne, Australia">
  <meta name="author" content="Clarence Siew">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</svelte:head>

<div class="content">
	<div class="heading">
		<h1>Clarence Siew</h1>
	</div>
	<div class="slide">
		<div class="showcase showcase-right">
			<div class="profile-container">
				<Profile />
			</div>
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
		<div class="showcase showcase-left">
			<section class="card">
				<div class="body">
					<p>
						I was born in George Town on Penang Island, which is one half of the state of Penang in Malaysia.
					</p>
				</div>
			</section>
			<img src={Penang} alt="Penang" class="wireframe-dynamic-color" style="height: 12rem;" />
		</div>
		<div class="showcase showcase-right">
			<img src={Victoria} alt="Victoria" class="wireframe-dynamic-color" style="height: 12rem;" />
			<section class="card">
				<div class="body">
					<p>
						I currently live in Melbourne, Victoria in Australia. It was at one point, the most locked-down city in the world. Being a homebody, I wasn't too bothered.
					</p>
				</div>
			</section>
		</div>
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

	<div class="slide">
		<Links />
	</div>
</div>

<style>
	img {
		position: relative;
		drag: none;
		-webkit-user-drag: none;
	}
</style>
