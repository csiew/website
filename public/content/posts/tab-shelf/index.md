On 13 June 2023, I released [Tab Shelf](https://tabshelf.clarencesiew.com/) to the world. It's a Google Chrome extension that lets you view and manage your tabs from the new-ish side panel.

## Features

Aside from viewing your tabs in the side panel, you can also:

* Put tabs to sleep to save system resources.
* Move tabs between groups.
* Create new tab groups from a selection of tabs.
* Close tabs in bulk.
* Control mute/unmute volume (it doesn't even need to have audio playing - you can mute a tab if you suspect that it will autoplay video or audio ahead of time).
* Filter tabs by group (once you get used to it, it effectively feels like a way to treat tab groups like separate workspaces).

## Inspiration

Of course, vertical tabs aren't new. Not at all. They're already common features on other browsers such as Safari, Microsoft Edge, Vivaldi, and of course, Arc by The Browser Company. Firefox has had a multitude of legendary vertical tab management extensions like Tree-Style Tabs and Sideberry.

I had previously grown accustomed to vertical tabs when trying the Arc browser extensively. When switching back to Firefox, I just had to install Sideberry to continue having these darn vertical tabs.

When I hopped on over back to Chrome (I've switched back due for dev purposes), I realised there _still_ wasn't a vertical tab solution ready. Even after Google added side panels to the browser. I was surprised that there wasn't even an API to make use of it at the time.

## From the ashes

Over the King's Birthday long weekend, I discovered that Google had _finally_ made the Side Panel extensions API available in Chrome v114. I immediately thought back to an extension I was working on called TabQueue, which was meant to help with queueing tabs (akin to the already-existent Reading List). I thought: _"How about I slap on some vertical tab management features to this?"_

Without going too deep into it, much of the TabQueue codebase was written at a time I was just returning to using React extensively for the first time in 1-2 years. I had forgotten how to use the React Context API and state management in TabQueue was a dog's breakfast. I effectively gutted most of the TabQueue code but kept (and heavily modified) much of the existing CSS styling.

Tab Shelf definitely isn't the first vertical tab management extension to make use of the Side Panel API, but I have to say (with some considerable bias) that it's perhaps the prettiest looking one out there at the moment.

## Give it a go!

You can now get [Tab Shelf on the Chrome Web Store](https://chrome.google.com/webstore/detail/tab-shelf/gkiobnohamhihbaipacecjfljepjjlmg). I'd love to get feedback on it as I'm working through new features and planning future releases. It's already pretty featureful at the time of writing this, but there's still so much more in the pipeline.
