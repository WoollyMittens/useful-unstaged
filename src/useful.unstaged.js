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
		};
		this.update = function () {
			var objectPos, objectSize, className, replace = new RegExp(' off-stage| on-stage|off-stage|on-stage', 'i');
			// get the scroll position
			var scrollSize = useful.positions.window(this.stage);
			var scrollPos = useful.positions.document(this.stage);
			// for every watched element
			for (var a = 0, b = this.actors.length; a < b; a += 1) {
				className = this.actors[a].className;
				// if this actor is still invisible
				if (replace.test(className) || cfg.always) {
					// get the object position / dimensions
					objectPos = { x : this.actors[a].offsetLeft, y : this.actors[a].offsetTop };
					objectSize = { x : this.actors[a].offsetWidth, y : this.actors[a].offsetHeight };
					// if the object is in the viewport
					if (objectPos.y + objectSize.y >= scrollPos.y - this.cfg.offset && objectPos.y < scrollPos.y + this.cfg.offset + scrollSize.y) {
						// mark its visibility
						this.actors[a].className = className.replace(replace, '') + ' on-stage';
					} else {
						// mark the object is outsidie the viewport
						this.actors[a].className = className.replace(replace, '') + ' off-stage';
					}
				}
			}
		};
		// events
		this.onUpdate = function () {
			var context = this;
			return function () { context.update(); };
		};
	};

}(window.useful = window.useful || {}));
