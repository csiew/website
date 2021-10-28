<script context="module" lang="ts">
	import { browser, dev } from '$app/env';

	export const hydrate = dev;
	export const router = browser;
	export const prerender = true;
</script>

<script lang="ts">
	import Skills from "../lib/skills/Skills.svelte";
	import Links from '$lib/contact/Links.svelte';
	import Profile from "$lib/Profile.svelte";
	import Penang from "../lib/home/Penang.png";
	import Victoria from "../lib/home/Victoria.png";
</script>

<svelte:head>
	<title>Home | Clarence Siew</title>
</svelte:head>

<div class="content">
	<div class="card construction">
		<div class="heading">
			<h2>Under construction</h2>
		</div>
		<div class="body">
			Welcome to version 5.0 of my site! It is still under heavy development and a lot may change within a short span of time. This new iteration uses the Svelte framework (with SvelteKit) and the aesthetic is inspired by late 2000s and early 2010s skeumorphic UI (it's nostalgia season).
		</div>
	</div>
	<div class="heading">
		<h1>Hello World</h1>
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

	.card.construction {
		margin: 0 0 3rem 0;
		padding: 0;
		background: rgba(0,0,0,0.75);
		color: lightgray;
		border-color: black;
		font-size: 0.9rem;
	}
	.card.construction .heading {
		justify-content: center;
		margin: 0;
		padding: 0.5rem 1rem 0 1rem;
		background: linear-gradient(-45deg, rgba(0,0,0,0.5) 25%, goldenrod 25%, goldenrod 50%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.5) 75%, goldenrod 75%);
		background-size: 27px 27px;
		border: none;
		border-radius: 9px 9px 0 0;
		box-shadow: 0px -2px 2px rgba(0,0,0,0.125) inset, 0px -8px 16px rgba(0,0,0,0.75) inset, 0px 8px 16px rgba(255,255,255,0.75) inset, 0px -12px 16px rgba(255,255,255,0.5) inset;
		animation: barberpole 25s infinite linear;
	}
	.card.construction .heading h2 {
		margin: 0;
		padding: 0.5rem 1rem;
		background: linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.75));
		border: 1px solid #333333;
		border-radius: 9px 9px 0 0;
		color: goldenrod;
		font-size: 1rem;
		text-transform: uppercase;
		text-shadow: 0px 1px 8px rgba(0,0,0,0.25);
		box-shadow: 0px 2px 2px rgba(0,0,0,0.25) inset, 0px -4px 8px rgba(255,255,255,0.25) inset;
		backdrop-filter: blur(4px);
	}
	.card.construction .body {
		padding: 1rem;
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
