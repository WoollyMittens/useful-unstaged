# useful.unstaged.js: Only load visible backgrounds

Defers the loading of backgrounds until they come into view. This lowers the time it takes for the initial page to load.

Try the <a href="http://www.woollymittens.nl/useful/default.php?url=useful-unstaged">demo</a>.

## How to include the script

The stylesheet is best included in the header of the document.

```html
<link rel="stylesheet" href="./css/useful-unstaged.css"/>
```

This include can be added to the header or placed inline before the script is invoked.

```html
<script src="./js/useful-unstaged.js"></script>
```

To enable the use of HTML5 tags in Internet Explorer 8 and lower, include *html5.js*.

```html
<!--[if lte IE 9]>
	<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
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

**always : {boolean}** - Makes the background unload again after it goes outside the viewport.

## How to build the script

This project uses node.js from http://nodejs.org/

This project uses grunt.js from http://gruntjs.com/

The following commands are available for development:
+ `npm install` - Installs the prerequisites.
+ `grunt import` - Re-imports libraries from supporting projects to `./src/libs/` if available under the same folder tree.
+ `grunt dev` - Builds the project for development purposes.
+ `grunt prod` - Builds the project for deployment purposes.
+ `grunt watch` - Continuously recompiles updated files during development sessions.
+ `grunt serve` - Serves the project on a temporary web server at http://localhost:8000/ .

## License

This work is licensed under a Creative Commons Attribution 3.0 Unported License. The latest version of this and other scripts by the same author can be found at http://www.woollymittens.nl/
