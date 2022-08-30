---
title: Building a boilerplate factory
subtitle: An experiment in boilerplates and templates
author: Clarence Siew
publishedOn: 2021-02-05T14:58:08
layout: post
---

As of late, I've been attempting some web development projects. I found a common problem with starting several new projects across different frameworks and runtimes is that I've been constantly looking up their docs online or my own notes on setting new projects up.

I decided it was finally time to start doing a little automation with shell scripts.

The first runtime-framework combination I'm working with is Node and Express. The script asks for the project name so that it could create a directory in my usual projects directory. It then goes through the motions of running the standard `npm` or `yarn` project initialisation. It also installs the `nodemon` package so that Node could automatically restart the app whenever I make a change.

It works great for my standard Express backend project setup. However I plan on adding flags so that it could be more convenient to toggle adding additional packages like `nodemon`. Flags could play a larger role in the future when I automate the setup process for React and Vue projects (i.e. adding a router package, or the Material UI or Bootstrap packages).

I'm also figuring out a frontend or interface to conveniently toggle various options in a single *view* rather than fiddling with flags and command line parameters. An `ncurses` text user interface was my initial choice, but I'm currently experimenting with an Electron app that would call the script and plug in the necessary flags.

You can take a look at the initial script on [GitHub](https://github.com/csiew/boilerplate_generators). The script is currently designed for use on Debian-based Linux distributions. Support for macOS (and maybe Windows) will come a little later.
