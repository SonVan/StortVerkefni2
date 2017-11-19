'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * VideoPlayer
 */
var Videoplayer = function () {
	function Videoplayer() {
		_classCallCheck(this, Videoplayer);

		this.title_container = document.querySelector('#video__title');
		this.video_container = document.querySelector('.video__container');
		this.controls_container = document.querySelector('.controls__container');
	}

	_createClass(Videoplayer, [{
		key: 'load',
		value: function load() {
			this.loadControls();
		}
	}, {
		key: 'play',
		value: function play() {
			console.log("play");
			this.buttons.play.setAttribute('class', 'button__hidden');
			this.buttons.pause.setAttribute('class', 'button');
		}
	}, {
		key: 'pause',
		value: function pause() {
			console.log("pause");
			this.buttons.play.setAttribute('class', 'button');
			this.buttons.pause.setAttribute('class', 'button__hidden');
		}
	}, {
		key: 'rewind',
		value: function rewind() {
			console.log("rewind");
		}
	}, {
		key: 'forward',
		value: function forward() {
			console.log("forward");
		}
	}, {
		key: 'mute',
		value: function mute() {
			console.log("mute");
			this.buttons.mute.setAttribute('class', 'button__hidden');
			this.buttons.unmute.setAttribute('class', 'button');
		}
	}, {
		key: 'unmute',
		value: function unmute() {
			console.log("unmute");
			this.buttons.mute.setAttribute('class', 'button');
			this.buttons.unmute.setAttribute('class', 'button__hidden');
		}
	}, {
		key: 'fullscreen',
		value: function fullscreen() {
			console.log("fullscreen");
		}
	}, {
		key: 'loadControls',
		value: function loadControls() {
			var play = this.controls_container.querySelector('#play');
			play.addEventListener('click', this.play.bind(this));
			var pause = this.controls_container.querySelector('#pause');
			pause.addEventListener('click', this.pause.bind(this));
			var rewind = this.controls_container.querySelector('#rewind');
			rewind.addEventListener('click', this.rewind.bind(this));
			var forward = this.controls_container.querySelector('#forward');
			forward.addEventListener('click', this.forward.bind(this));
			var mute = this.controls_container.querySelector('#mute');
			mute.addEventListener('click', this.mute.bind(this));
			var unmute = this.controls_container.querySelector('#unmute');
			unmute.addEventListener('click', this.unmute.bind(this));
			var fullscreen = this.controls_container.querySelector('#fullscreen');
			fullscreen.addEventListener('click', this.fullscreen.bind(this));

			this.buttons = {
				play: play,
				pause: pause,
				rewind: rewind,
				forward: forward,
				mute: mute,
				unmute: unmute,
				fullscreen: fullscreen
			};
		}
	}]);

	return Videoplayer;
}();

document.addEventListener('DOMContentLoaded', function () {
	var videoplayer = new Videoplayer();
	videoplayer.load();
});
"use strict";

console.log("test");

//# sourceMappingURL=script-compiled.js.map