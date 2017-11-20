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
		this.controls_container = document.querySelector('.video__controls');
	}

	_createClass(Videoplayer, [{
		key: 'load',
		value: function load() {
			this.loadControls();
			this.id = window.location.search.substr(4);
			this.loadVideo();
		}
	}, {
		key: 'play',
		value: function play() {
			console.log("play");
			this.buttons.play.setAttribute('class', 'button__hidden');
			this.buttons.pause.setAttribute('class', 'button');
			this.video_container.querySelector('#overlay').setAttribute('class', 'video__overlay__hidden');
			this.video.play();
		}
	}, {
		key: 'pause',
		value: function pause() {
			console.log("pause");
			this.buttons.play.setAttribute('class', 'button');
			this.buttons.pause.setAttribute('class', 'button__hidden');
			this.video_container.querySelector('#overlay').setAttribute('class', 'video__overlay');
			this.video.pause();
		}
	}, {
		key: 'rewind',
		value: function rewind() {
			console.log("rewind");
			this.video.currentTime -= 3;
		}
	}, {
		key: 'forward',
		value: function forward() {
			console.log("forward");
			this.video.currentTime += 3;
		}
	}, {
		key: 'mute',
		value: function mute() {
			console.log("mute");
			this.buttons.mute.setAttribute('class', 'button__hidden');
			this.buttons.unmute.setAttribute('class', 'button');
			this.video.muted = true;
		}
	}, {
		key: 'unmute',
		value: function unmute() {
			console.log("unmute");
			this.buttons.mute.setAttribute('class', 'button');
			this.buttons.unmute.setAttribute('class', 'button__hidden');
			this.video.muted = false;
		}
	}, {
		key: 'fullscreen',
		value: function fullscreen() {
			console.log("fullscreen");

			this.launchIntoFullscreen(this.video);
		}
	}, {
		key: 'launchIntoFullscreen',
		value: function launchIntoFullscreen(element) {
			if (element.requestFullscreen) {
				element.requestFullscreen();
			} else if (element.mozRequestFullScreen) {
				element.mozRequestFullScreen();
			} else if (element.webkitRequestFullscreen) {
				element.webkitRequestFullscreen();
			} else if (element.msRequestFullscreen) {
				element.msRequestFullscreen();
			}
		}
	}, {
		key: 'loadVideo',
		value: function loadVideo() {
			this.video = this.video_container.querySelector('video');
			this.videosrc = 'videos/bunny.mp4';
			this.video.setAttribute('src', this.videosrc);
		}
	}, {
		key: 'loadControls',
		value: function loadControls() {
			var play = this.controls_container.querySelector('#play');
			play.addEventListener('click', this.play.bind(this));
			var play2 = this.video_container.querySelector('#play');
			play2.addEventListener('click', this.play.bind(this));
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

document.addEventListener("DOMContentLoaded", function () {
  if (window.location["pathname"] === "/") {
    var API_URL = "/videos.json";
    writeHTML.fetchData(API_URL);
  }
});

/**
* Forrit sem skrifar html síðu eftir .json skrá,
* keyrist með writeHTML.fetchData("skrá.json")
*/
var writeHTML = function () {
  var allData;
  var main = document.querySelector("main");
  var row;

  // Nær í gögnin og kallar á write() til að skrifa html.
  function fetchData(API_URL) {
    var fetch = new XMLHttpRequest();
    fetch.open('GET', API_URL, true);
    fetch.onload = function () {
      var data = JSON.parse(fetch.response);
      allData = data;
      write();
    };
    fetch.send();
  }

  // Kallar á writeCategory() til að búa til flokk, og kallar á writeVideo()
  // fyrir hvert myndband sem á að vera inni í flokknum.
  function write() {
    var cLength = allData.categories.length;

    for (var i = 0; i < cLength; i++) {
      var vLength = allData.categories[i].videos.length;
      var categoryTitle = allData.categories[i].title;
      writeCategory(categoryTitle);
      for (var j = 0; j < vLength; j++) {
        var videoID = allData.categories[i].videos[j];
        writeVideo(videoID);
      }
    }
  }

  // Skrifar titil á videoflokk og bætir við línu fyrir neðan.
  function writeCategory(categoryTitle) {
    var section = document.createElement("section");
    var hr = document.createElement("hr");

    var h1 = document.createElement("h1");
    h1.setAttribute("class", "categoryTitle");
    h1.appendChild(document.createTextNode(categoryTitle));

    var div = document.createElement("div");
    div.setAttribute("class", "row");

    section.appendChild(h1);
    section.appendChild(div);
    main.appendChild(section);
    main.appendChild(hr);

    row = div;
  }

  // Bætir myndbandi við videoflokk.
  function writeVideo(videoID) {
    var title = allData.videos[videoID - 1].title;
    var created = timeSince(allData.videos[videoID - 1].created);
    var duration = secToDuration(allData.videos[videoID - 1].duration);
    var poster = allData.videos[videoID - 1].poster;

    var outerDiv = document.createElement("div");
    outerDiv.setAttribute("class", "videoListing col col-6 col-sm-12");

    var innerDiv1 = document.createElement("div");
    innerDiv1.setAttribute("class", "thumbnail");

    var innerDiv2 = document.createElement("div");
    innerDiv2.setAttribute("class", "description");

    var x2InnerDiv1 = document.createElement("img");
    x2InnerDiv1.setAttribute("src", poster);
    x2InnerDiv1.setAttribute("class", "image");

    var x2InnerDiv2 = document.createElement("div");
    x2InnerDiv2.setAttribute("class", "videoTime");
    x2InnerDiv2.appendChild(document.createTextNode(duration));

    var x2InnerDiv3 = document.createElement("h3");
    x2InnerDiv3.appendChild(document.createTextNode(title));

    var x2InnerDiv4 = document.createElement("p");
    x2InnerDiv4.appendChild(document.createTextNode(created));

    row.appendChild(outerDiv);
    outerDiv.appendChild(innerDiv1);
    outerDiv.appendChild(innerDiv2);
    innerDiv1.appendChild(x2InnerDiv1);
    innerDiv1.appendChild(x2InnerDiv2);
    innerDiv2.appendChild(x2InnerDiv3);
    innerDiv2.appendChild(x2InnerDiv4);
  }

  // Breytir int sekúndum í tíma á forminu 00:00.
  function secToDuration(seconds) {
    var date = new Date(null);
    date.setSeconds(seconds);
    var result = date.toISOString().substr(14, 5);
    return result;
  }

  // Breytir dateString í texta sem segir hversu langur tími hefur liðið.
  function timeSince(date) {
    var now = Date.now();
    var timePassed = now - date;
    var totalSecs = timePassed / 1000;

    var hours = Math.floor(totalSecs / 3600);
    var days = Math.floor(totalSecs / (60 * 60 * 24));
    var weeks = Math.floor(totalSecs / (60 * 60 * 24 * 7));
    var months = Math.floor(totalSecs / (60 * 60 * 24 * 30));
    var years = Math.floor(totalSecs / (60 * 60 * 24 * 365));

    if (years === 1) {
      return "Fyrir " + years + " ári síðan";
    } else if (years > 1) {
      return "Fyrir " + years + " árum síðan";
    } else if (months === 1) {
      return "Fyrir " + months + " mánuði síðan";
    } else if (months > 1) {
      return "Fyrir " + months + " mánuðum síðan";
    } else if (weeks === 1) {
      return "Fyrir " + weeks + " viku síðan";
    } else if (weeks > 1) {
      return "Fyrir " + weeks + " vikum síðan";
    } else if (days === 1) {
      return "Fyrir " + days + " degi síðan";
    } else if (days > 1) {
      return "Fyrir " + days + " dögum síðan";
    } else if (hours === 1) {
      return "Fyrir " + hours + " klukkustund síðan";
    } else if (hours > 1) {
      return "Fyrir " + hours + " klukkustundum síðan";
    } else {
      return "Vantar upphlöðunardagsetningu";
    }
  }

  return {
    fetchData: fetchData
  };
}();

//# sourceMappingURL=script-compiled.js.map