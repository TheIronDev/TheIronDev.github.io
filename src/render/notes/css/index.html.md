---
title: "CSS Notes"
layout: "default"
isPage: true
wrapperClass: "notes"
---

## Helpful Resources

* [Even Faster Websites, Steve Souders](http://www.amazon.com/Even-Faster-Web-Sites-Performance/dp/0596522304)
* [CSS Selector Performance has Changed!](http://calendar.perfplanet.com/2011/css-selector-performance-has-changed-for-the-better/)
* [Box Sizing Border Box FTW](http://paulirish.com/2012/box-sizing-border-box-ftw/)


CSS has come a long way over the past decade.
Without a preexisting strategy, CSS has a tendency to became very disorganized in projects with multiple developers.

Unfortunately, there is no single definitive style on how developers should handle their CSS.
Using grid-frameworks is a well known strategy for helping provide structure... but they also add bloat.

## Floats

Using floats is like traveling through hyperspace. They exist, kinda, and can impact other DOM elements... but they are also travelling at a different dimensional plane (left-right).

To bridge the float hyperspace travel, you can apply `clear:both` on itself or `overflow:hidden` on its parent.

... And if you apply float on a floating element's parent, it can provide a self-clear, but then that parent is traveling through hyperspace too.

The clearfix is a well known approach that makes use of the `:after` pseudo-selector, creating a pseudo element that has a `clear:both;`.

## Specificity

CSS specificity can be seen as a point scale. The more descriptions you include, the more "points" that style will provide.
If two styles are providing the same number of points, then the last one "wins".
IDs provide a specificity that is equivalent to about 255 classes.

A few examples

```css
.onePoint .twoPoint{} /** This one wins **/
.onePoint {}

.first{}
.last{} /** This one wins **/

.onePoint .twoPoint .threePoint {}
#manyManyPoints {} /** This one wins **/

#manyManyPoints {color: green;}
.thing {color: red; !important;} /** This one wins **/
```

## Do's and Don'ts

### Do's

* Load up CSS before the JavaScript. From a user-experience standpoint, the page "appears" like it has loaded early.
* Minify CSS whenever possible.
* Use Less or Sass.
  * These frameworks compile css-like syntax into css.
  * They provide ways to up-level the structure of your compiled css, which significantly helps maintainability.
* Use transitions whenever appropriate.
  * Transitions make the difference between simply displaying content and drawing the user into an experience.

### Don'ts

* Use `!important;`. Usage generally shows poor structure.
* Use ids as selectors, there is too much specificity.
* Use elements as the right-most attribute.
  * CSS is read from right to left. What this means is "#someId a" would look at all anchors on the page, and then bubble up to see if these anchor elements have a `#someID` somewhere in the DOM tree.
    * Global selectors `*` supposively would traverese through each element in the DOM tree, however there have been enough optimizations to negate the loss in speed. However, `.foo > *` will be slow.
    * Newer browsers apply several optimizations on CSS selector matching, but it is important to be conscientious of the target audience (strong nudge at using GA or Omniture tracking).
