A client-side web frontend library (more so a collection of functions to enable single-page web apps). The previous version of my site and my 'Hoddle' Javascript window manager contain the foundational work for this library. The initial version of my upcoming podcast app used this library extensively.

It does not add additional syntactic sugar to the existing HTML syntax of a site (unlike _Vue.js_ or _Svelte_). It is largely made up of utility functions written in vanilla JavaScript with some JQuery thrown-in (for stuff like changing out contents of an element, performing data calls, etc). My own custom utility CSS stylesheets also work hand-in-hand with this library to provide pre-designed UI elements.

Cardo's CSS utility library survived beyond _Cast's_ transition to Vue.js. The latest iteration of it powers this site. This CSS utility library along with the custom React components in use on this site are in the process of being converted into a reusable library.
