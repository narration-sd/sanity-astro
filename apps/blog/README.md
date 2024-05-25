
# Presentation-editing blog example

This is a visually-featured simple blog, derived from improvements made on the past sanity-astro-template-clean project.

It implements full Presentation content editing, using the fresh expansion of abilities in @sanity/astro version 3.1

A set of example content is included, so you can easily bring up the site,see how it operates.

And there's also a Media Browser and Unsplash access added, so that when you Click-to-Edit, and feel you'd like to change a look, a lot of variety is going to be right there, to discover and choose.

## Notes for this stage

Extensions and modifications have been added to the components and utilities basis, to achieve this.

These should be considered to be at a beta stage, as how they're done has a chance to improve, or as beginnings on useful features become completed.

Once there's stable enough design and experience, this blog example wil lbe PRed to the official @sanity/astro repo.

### Using the sample content

What's included for you is the same content that's appeared in a demo movie or two, and it's easily added from the /content folder.

1. To add the content for use, first prepare your Sanity.io project, so that you habe a projectId and dataset.

2. Put these into your own /.env file, acording to eh /.env_example

3. If you haven't done so, install the Sanity CLI with: `npm install -g sanity'`

5. Go to the /apps/blog folder, and make the upload there, with this command: `sanity dataset import content/contentable.tar.gz`

6. The upload will take a few minutes, depending on your internet speed, and give you two working pages including their images.

### Building your site

The repository you cloned is a monorepo, which has its conveniences, but the thing you nered to remember while developoing with it is that the @sanity/astro package will be operating locally. 
So you'll want to build that, even if you are doing the rest of your work in dev -- and you'll need to do so before you can run any of the apps.
1. Go to your /packages/sanity-astro folder
2. Enter `npm run build` on your command line, and return.
3. The package should build, anf inform you.

Once that's done, return to your /apps/blog which will use it. 

- be sure you've filled in all the environmental variables in your .env, with .env_example to guide values.
- There you can type 'npm run dev' in the usual way and on clicking the link it offers, you'll get your first view of this blog example website.
- Presentation will be operating, so you'll see blue outlines as you hover over content areas.
- On this page, each blue outline will have a Edit tab. Click on this, and your Studio will launch...and you'll be in Presentation, ready to make live changes, and see what happens when you do.

### Operating 'presentationally'

Once you're up and running, you'll find there's actually a lot to explore.

For example, each of those dropdowns and tiny icons on the Studio screen has its use, and often a very handy one.
- you can check what your site adjustments look like in a phone view, as well as regular screen
- you can find out -- and navigate to -- wherever a piece of content is used. 
  - This comes with the small dropdown menu, 'Used on page/s', that you find near the top of the editor. 
  - it's set up by the `locate` configuration in the /structure folder
  - When you're looking at content in the Structure editor, that's the way to go to Presentation on it
- You can navigate by click, usually, on either editor or the visible page
- you can turn of navigation if you need to use a button, for example on the page

### Patience is a virtue...

Once you get used to it, you'll find there are many facets of Presentation to appreciate. 

The ability to crop and hotspot images as you see the results, to get that the exactly expressed idea, or to adjust text so that it 'looks right', or safely handles page resizing, are real boons to be sure.

Is it perfect? It isn't. But it's very useful, and always improving.

As you might expect, things can occur. It's probably not possible to always click the content you want entirely into view. But it will be visible, and you can just scroll a little, to get the full portion you'd like to see.

A known problem at the moment is that a click may not register at times. You have all the moves you need, though, to keep working smoothly. 

Two particular recoveries are:
- click on another element of the content, or another content area, to gain back clickability.
- or just manually scroll to see what you wanted -- you'll find the editing itself is always live, always reliable once there.

If a page has a particular problem, as some in development may, there's a handy small circle-arrow page refresh, just like in a browser, which can clear such matters.

You can pull the center divider around, to set page view and editor sharing as you'd like. This tends to fight back a bit, but it won't if you move your mouse up higher on the page, while you adjust.

Presentation is a powerful and inviting toolset, and it's worth getting familiar with it, so those tools feel they're yours.

## Basis learning and documentation

The nearby /apps/example and example-ssr projects will give fundamental views of how @sanity/astro can be used.

This blog app begins with the SSR pattern you'll find there, though in future it can be easily arranged to offer both visual content editing, and a full speed static production website, from the same source repository. You'd select how it acts by setting environmental variables.

You can find the complete documentation for @sanity/astro in the /packages folder here.