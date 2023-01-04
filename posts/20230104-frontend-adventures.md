---
slug: frontend-adventures
title: Adventures in Frontend
subtitle: A not-so-technical chronical of the frontend shenanigans I've been up to
author: Clarence Siew
publishedOn: 2023-01-05T01:30:00
layout: post
---

This post was supposed to be a short foreword to _another_ post about software architecture to briefly chronicle my adventures in the world of frontend web development, from the beginning to the present. But alas, I got a little too excited and ended up writing up something a far too long for a foreword and a little too meandering for a proper post.

I started bumbling my way into the world of frontend development during a nail-biting final year project through [React](https://reactjs.org/). I consequently had PTSD from trying to learn React (pre-hooks!) with [Material UI](https://mui.com/) (now _MUI_) at the same time. Prior to this I was mostly toying with [Python UI toolkits](https://pygobject.readthedocs.io/en/latest/) and [playing around with window managers on Linux](https://github.com/csiew/BiscuitWM).

As I graduated from uni just as the pandemic kicked-off, I tried to roll-my-own barebones duct-taped client side JavaScript mixed with [template-based responses](https://ejs.co/) via an Express server. This was used for my first crack at a podcast web app. It performed _poorly_ and I genuinely appear to have lost the code/repository of this attempt. Some aspects of the client side JavaScript work made its way on to my personal website.

I then got sucked into the [Vue.js](https://vuejs.org/) ecosystem and coming surprisingly close to completing a second crack at this podcast web app. I started getting responses to job applications close to the ~1 year anniversary (late 2020 to early 2021) of the first COVID case on Australian shores, so this project was abandoned. I also re-implemented my personal website using Vue.js.

I jumped back into the world of React for my first full-stack client (work) project in early 2021. It was initially built using class-based components, but once I understood how [React Hooks](https://reactjs.org/docs/hooks-intro.html) worked, I hastily refactored the entire frontend to use functional components. We were supposedly following the Agile methodology, but being fresh out of uni it still didn't click that working on a card/issue _absolutely should not_ involve refactoring half the project _all the time_. Apologies and thanks to Chris for having the patience to review my absolutely _horrifyingly large_ pull requests!

My mesmerising UI work and my colleagues' brilliant backend + database design ended up being such a hit that this project ended up getting extended and its scope expanded. After I left this team, they rewrote everything in TypeScript (it was originally all in JavaScript; I would only be introduced to TypeScript in my next work project) whilst retaining my CSS styling.

Shifting to more backend-heavy work did not satisfy my frontend itch after the success of my previous work project, so I turned to making my personal website something of a playground. I replaced my Vue.js based personal site with a new React site and imbued it with the many learnings from mistakes made in my last work project. I eventually rolled out a UI library called [Brioche](https://github.com/csiew/brioche), but abandoned it around the time I discovered [Svelte](https://svelte.dev/) and [SvelteKit](https://kit.svelte.dev/). I then rewrote my site _again_ with SvelteKit.

I started getting interested in server-side rendering (SSR) as I learned more and more about using SvelteKit. However, a series of [breaking changes in preparation for SvelteKit's 1.0 release](https://www.netlify.com/blog/migrating-breaking-changes-in-sveltekit/) and sheer laziness made me return to re-implementing my site with React. A failed attempt to make my site SSR using a [Vite](https://vitejs.dev/) plugin led me to finally give [Next.js](https://nextjs.org/) a shot. The current version of my site (at the time of publishing) was written using Next.js.

What comes next in my frontend adventures is still somewhat in the air. I've been looking into [module federation](https://medium.com/@vueshenzhen/a-brief-introduction-of-vite-plugin-federation-9e998b2e43b) recently (this was going to be a part of the original post I was going to write) for my own rather-large personal project. I've pulled off another _Brioche_, in that I extracted the components from my personal website and turned them into a new component library. However this time I don't plan on turning this into a Brioche v0.2.

Til next time.
