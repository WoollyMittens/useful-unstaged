/*
	Source:
	van Creij, Maurice (2012). "useful.unstaged.js: Applies a classname to things that are inside the viewport", version 20120606, http://www.woollymittens.nl/.

	License:
	This work is licensed under a Creative Commons Attribution 3.0 Unported License.

	Prerequisites:
	<script src="http://www.context.org/openlayers/context.js"></script>

	Usage:
	var stage = document.querySelectorAll('nav')[0] || window;
	var actors = document.querySelectorAll('.off-stage');
	var onstage = new useful.Onstage(stage, actors, {});
	onstage.start();
*/

(function (useful) {

	// invoke strict mode
	"use strict";

	// private functions
	useful.Unstaged = function (stage, actors, cfg) {
		// properties
		this.stage = stage;
		this.actors = actors;
		this.cfg = cfg;
		// methods
		this.start = function () {
			// set the default offset if there wasn't one
			this.cfg.offset = this.cfg.offset || 0;
			// set the default repeat behaviour
			this.cfg.always = this.cfg.always || false;
			// set the scrolling event handler
			this.stage.addEventListener('scroll', this.onUpdate(), true);
			// perform the first redraw
			this.update();
			// disable the start function so it can't be started twice
			this.start = function () {};
		};
		this.update = function () {
			var objectPos, objectSize, relativePos, className, replace = new RegExp(' off-stage| on-stage|off-stage|on-stage', 'i');
			// get the scroll position
			var scrollSize = useful.positions.window(this.stage);
			var scrollPos = useful.positions.document(this.stage);
			// if we can measure the stage
			if (scrollSize.y !== 0) {
				// get the screen actors if they are unknown
				var actors = this.actors || document.querySelectorAll('.off-stage');
				// for every watched element
				for (var a = 0, b = actors.length; a < b; a += 1) {
					className = actors[a].className;
					// if this actor is still invisible
					if (replace.test(className) || cfg.always) {
						// get the object position / dimensions
						objectPos = { x : actors[a].offsetLeft, y : actors[a].offsetTop };
						objectSize = { x : actors[a].offsetWidth, y : actors[a].offsetHeight };
						// if the object is in the viewport
						if (objectPos.y + objectSize.y >= scrollPos.y - this.cfg.offset && objectPos.y < scrollPos.y + this.cfg.offset + scrollSize.y) {
							// if required position the parallax
							if (this.cfg.parallax) {
								relativePos = (objectPos.y - scrollPos.y + objectSize.y) / (scrollSize.y + objectSize.y) * 100;
								relativePos = (relativePos > 100) ? 100 : relativePos;
								relativePos = (relativePos < 0) ? 0 : relativePos;
								actors[a].style.backgroundPosition = '50% ' + relativePos + '%';
							}
							// mark its visibility
							actors[a].className = className.replace(replace, '') + ' on-stage';
						} else {
							// mark the object is outsidie the viewport
							actors[a].className = className.replace(replace, '') + ' off-stage';
						}
					}
				}
			}
		};
		// events
		this.onUpdate = function () {
			var context = this;
			return function () { context.update(); };
		};
		// go
		this.start();
	};

}(window.useful = window.useful || {}));
