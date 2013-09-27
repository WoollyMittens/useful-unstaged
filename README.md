# useful.unstaged.js: Only load visible backgrounds

Defers the loading of backgrounds until they come into view. This lowers the time it takes for the initial page to load.

Try the <a href="http://www.woollymittens.nl/useful/default.php?url=useful-unstaged">demo</a>.

## How to include the script

The stylesheet is best included in the header of the document.

```html
<link rel="stylesheet" href="./css/unstaged.css"/>
```

This include can be added to the header or placed inline before the script is invoked.

```html
<script src="./js/unstaged.min.js"></script>
```

To enable the use of HTML5 tags in Internet Explorer 8 and lower, include *html5.js*. To provide an alternative for *document.querySelectorAll* and CSS3 animations in Internet Explorer 8 and lower, include *jQuery*.

```html
<!--[if lte IE 9]>
	<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
<![endif]-->
```

## How to start the script

```javascript
var stage  = document.getElementById('unstagedExample');
var actors = document.querySelectorAll('.off-stage');
var unstaged = new useful.Unstaged(
	stage,
	actors,
	{'offset' : 32}
);
unstaged.start();
```

This is the safest way of starting the script, but allows for only one target element at a time.

**stage : {DOM Element}** - This is the page element with the scrollbar. By default this is "window".

**actors : {Array of DOM Elements}** - These are the elements that start off stage.

**offset : {integer}** - Makes the background pre-load slightly outside the viewport.

## Prerequisites

To concatenate and minify the script yourself, the following prerequisites are required:
+ https://github.com/WoollyMittens/useful-positions
+ https://github.com/WoollyMittens/useful-polyfills

## License
This work is licensed under a Creative Commons Attribution 3.0 Unported License. The latest version of this and other scripts by the same author can be found at http://www.woollymittens.nl/
