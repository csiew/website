### Pre-framework era

#### Pre-historic (????-2018)

I only recently recalled that I hosted very early versions of my website on Google Firebase before migrating to GitHub Pages. I also used to build websites using Google Sites (they were effectively wikis), but they have since been lost to time.

#### Version 1.0 (2018-2022)

Initial implementation using plain HTML, CSS, and JavaScript. Early revisions were not single-page apps, and often swung wildly between brutalist web design and skeumorphic design. The final revision of version 1.0 used JavaScript to inject templated components like the navigation bar and site footer (which is the _opposite_ of what most modern JavaScript SPA frameworks do). This project used my now-abandoned frontend library, _Cardo_, to perform these injections. [Click here to visit this version of the site.](https://csiew.github.io/archive/index.html)

#### Version 1.1 (2020-24/09/2020)

Stripped back to just a single landing page. It had nothing more than links to my social media accounts and side projects. [Click here to visit this version of the site.](https://csiew.github.io/index.html)

### Vue era

#### Version 2.x (24/09/2020-19/06/2021)

A complete overhaul of the website as a playground to learn Vue. Like version 1.0, this iteration of the site went through drastical design changes throughout its lifetime. The CSS stylesheets I developed for this site largely came from my abandoned podcast app project. [Click here to visit this version of the site.](https://v2.clarencesiew.com)

### React era

#### Version 3.x (19/06/2021-28/07/2021)

Another overhaul of the website, but using React this time. I wanted to practice using functional components rather than class components, and to take advantage of React Hooks. The CSS from the previous site was getting huge and unwieldy too, so it's high-time to simplify it.

This was the most short-lived major version of the site. Its custom components and CSS stylesheets formed the basis of the [Brioche](https://github.com/csiew/brioche) UI library for React. The following version of this site was the first to use the library rather than internal custom components.

#### Version 4.x (28/07/2021-2/10/2021)

It was identical in appearance, layout, and content to version 3.0, however it was the first version to use the [Brioche](https://github.com/csiew/brioche) UI library. [Click here to visit this version of the site.](https://v4.clarencesiew.com)

### Svelte era

#### Version 5.x (2/10/2021-13/09/2022)

The website was migrated to yet another frontend framework, Svelte. The original plan was to use this version as a chance to learn Tailwind CSS as well, but I just couldn't help playing around with some custom CSS to achieve some mid-2010s skeuomorphic aesthetic.

This version also had a couple of neobrutalist phases too, but as of version 5.10.0, skeuomorphism is back. Unlike the previous version of the website, version 5.0 did not use the Brioche UI library.

### NextJS era

#### Version 6.x (13/09/2022-Present)

I went from one statically-generated/server-side generation framework to another. As I was working on new side projects that relied heavily on React, I thought it would be nice to once again use my website as a React playground. I still wanted to use static generation for blog posts, so at first I looked at using a plugin for Vite, but I wasn't able to figure out the configuration.

I gradually began moving out a lot of content stored as Markdown and JSON files (which required making a new Git commit and re-running a deploy of the site every time I want to modify some content) into Firebase. I also built a whole admin CMS app into the site for my own use to write and publish new blog posts, and manage listed projects and their information. In fact this description update for Version 6.x of this site's era was written using this very CMS!
