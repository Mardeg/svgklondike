[Live page](https://svgklondike.pages.dev)

Initial code by Jeff Schiller, salvaged from https://web.archive.org/web/20060206025235id_/https://www.codedread.com/solitaire.php

__TODO__:

☑Add: sound FX

☑Modernise code: remove unecessary namespaces (upgrade SVG to version 2)

☑Modernise code: var to let/const for memory conservation

☑Add: completion detection

☑Modernise code: mousedown/move/up events to pointer ones so it works on mobile

☑Accessibility: match background to system/browser dark/light setting

☑Add: undo feature

☑Accessibility: widen card numbers for better readability, especially on mobile

☑Add: timer

☑Accessibility: visual completion indicator for deaf users

☑Add: hint feature

☑Add: extra deck themes and choice of back colours

☑Add: fullscreen toggle at top right corner

☑Add: autoplay to completion when Deck is empty and all cards are face-up

☐Internationalisation: country flags as a dropdown for translation and different card symbols

☐Add: animate waste turning over to become the deck when it's empty, and animate flipping facedown cards

☐Accessibility: Left and Right handed modes

## Ongoing Undertaking: Keep this game working in the MyPal browser on ReactOS
Only the Basic and Classic decks (and any future SVG-only decks) work fully.

Since MyPal never added support for AVIF bitmap images, those images won't show up from the Astronomia, Elemental and any future decks with AVIF images.

The ranks, pips and card backs will still show up on those decks in MyPal since they are SVG.

For anyone wanting to include working bitmap images in decks they create from the **TemplateDeck.svg** so they're visible in the MyPal browser, the following formats will work:

* JPG
* GIF
* PNG
* WebP

The width:height ratio of 5:7 is what to aim for. The exact cardsize is 241x335 although it's safer to at least double that for bitmap images due to the game scaling up to fill the browser viewport, along with the provided Fullscreen toggle.

[![Star History Chart](https://starhistory.link/Mardeg/svgklondike.svg?theme=cyan)](https://starhistory.link/Mardeg/svgklondike)
