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
				var videoplayer = document.querySelector('.videoPlayer');
				var back = document.querySelector('.button__back');
				back.addEventListener('click', this.goBack.bind(this));

				this.video_container = document.createElement('div');
				this.video_container.setAttribute('class', 'video__container');
				this.controls_container = document.createElement('div');
				this.controls_container.setAttribute('class', 'video__controls');

				videoplayer.appendChild(this.video_container);
				videoplayer.appendChild(this.controls_container);
		}

		_createClass(Videoplayer, [{
				key: 'goBack',
				value: function goBack() {
						window.location.href = "./";
				}
		}, {
				key: 'load',
				value: function load() {
						this.createControlsElement();
						this.createVideoElement();
						this.id = window.location.search.substr(4);
						this.fetchData();
				}
		}, {
				key: 'fetchData',
				value: function fetchData(data) {
						var API_URL = "./videos.json";
						var request = new XMLHttpRequest();
						request.open('GET', API_URL, true);
						var Videoplayer = this;

						request.onload = function () {
								if (request.status < 400) {
										var data = JSON.parse(request.response);
										Videoplayer.loadVideo(data);
								} else {
										this.showError();
								}
						};

						request.onerror = function () {
								this.showError();
						};

						request.send();
				}
		}, {
				key: 'play',
				value: function play() {
						this.buttons.play.setAttribute('class', 'button__hidden');
						this.buttons.pause.setAttribute('class', 'button');
						this.video_overlay.setAttribute('class', 'video__overlay__hidden');
						this.video.play();
				}
		}, {
				key: 'pause',
				value: function pause() {
						this.buttons.play.setAttribute('class', 'button');
						this.buttons.pause.setAttribute('class', 'button__hidden');
						this.video_overlay.setAttribute('class', 'video__overlay');
						this.video.pause();
				}
		}, {
				key: 'rewind',
				value: function rewind() {
						this.video.currentTime -= 3;
				}
		}, {
				key: 'forward',
				value: function forward() {
						this.video.currentTime += 3;
				}
		}, {
				key: 'mute',
				value: function mute() {
						this.buttons.mute.setAttribute('class', 'button__hidden');
						this.buttons.unmute.setAttribute('class', 'button');
						this.video.muted = true;
				}
		}, {
				key: 'unmute',
				value: function unmute() {
						this.buttons.mute.setAttribute('class', 'button');
						this.buttons.unmute.setAttribute('class', 'button__hidden');
						this.video.muted = false;
				}
		}, {
				key: 'fullscreen',
				value: function fullscreen() {
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
				key: 'showError',
				value: function showError() {
						var error = document.createElement('p');
						error.appendChild(document.createTextNode('Videó er ekki til'));
						this.video_container.insertBefore(error, this.video_container.firstChild);
				}
		}, {
				key: 'loadVideo',
				value: function loadVideo(data) {
						if (!data.videos[this.id - 1]) {
								this.showError();
						} else {
								this.video_overlay.setAttribute('class', 'video__overlay');
								overlay.addEventListener('click', this.play.bind(this), false);
								this.title_container.innerHTML = data.videos[this.id - 1].title;
								this.video = this.video_container.querySelector('video');
								this.videosrc = data.videos[this.id - 1].video;
								this.video.setAttribute('src', this.videosrc);
								this.videoposter = data.videos[this.id - 1].poster;
								this.video.setAttribute('poster', this.videoposter);
								this.video.addEventListener('ended', this.pause.bind(this), false);
								this.video.addEventListener('click', this.pause.bind(this), false);
								this.video.addEventListener('playing', this.play.bind(this), false);
								this.video.addEventListener('pause', this.pause.bind(this), false);
								this.loadControls();
						}
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
		}, {
				key: 'createVideoElement',
				value: function createVideoElement() {
						this.video = document.createElement('video');
						this.video.setAttribute('class', 'video');
						this.video_overlay = document.createElement('div');
						this.video_overlay.setAttribute('class', 'video__overlay__hidden');
						this.video_overlay.setAttribute('id', 'overlay');
						var playbutton = document.createElement('button');
						playbutton.setAttribute('class', 'button');
						playbutton.setAttribute('id', 'play');

						this.video_overlay.appendChild(playbutton);
						this.video_container.appendChild(this.video);
						this.video_container.appendChild(this.video_overlay);
				}
		}, {
				key: 'createbutton',
				value: function createbutton(name) {
						var button = document.createElement('button');
						button.setAttribute('class', 'button');
						button.setAttribute('id', name);
						this.controls_container.appendChild(button);
						return button;
				}
		}, {
				key: 'createControlsElement',
				value: function createControlsElement() {
						var rewind = this.createbutton('rewind');
						var play = this.createbutton('play');
						var pause = this.createbutton('pause');
						pause.setAttribute('class', 'button__hidden');
						var mute = this.createbutton('mute');
						var unmute = this.createbutton('unmute');
						unmute.setAttribute('class', 'button__hidden');
						var fullscreen = this.createbutton('fullscreen');
						var forward = this.createbutton('forward');

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

document.addEventListener("DOMContentLoaded", function () {
		var currentUrlLastEntry = window.location.pathname.split("/").pop();
		if (currentUrlLastEntry === "video.html") {
				var videoplayer = new Videoplayer();
				videoplayer.load();
		}
});
'use strict';

/**
* Forrit sem skrifar html síðu eftir .json skrá,
*/
var writeHTML = function writeHTML() {
  var allData = void 0;
  var main = document.querySelector('main');
  var row = void 0;

  // Skrifar titil á videoflokk og bætir við línu fyrir neðan.
  function writeCategory(categoryTitle) {
    var section = document.createElement('section');
    var hr = document.createElement('hr');

    var h1 = document.createElement('h1');
    h1.setAttribute('class', 'categoryTitle');
    h1.appendChild(document.createTextNode(categoryTitle));

    var div = document.createElement('div');
    div.setAttribute('class', 'row');

    section.appendChild(h1);
    section.appendChild(div);
    main.appendChild(section);
    main.appendChild(hr);

    row = div;
  }

  // Breytir int sekúndum í tíma á forminu 00:00.
  function secToDuration(seconds) {
    var date = new Date(null);
    date.setSeconds(seconds);
    var result = date.toISOString().substr(14, 5);
    return result;
  }

  // Breytir date í texta sem segir hversu langur tími hefur liðið.
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
      return 'Fyrir ' + years + ' \xE1ri s\xED\xF0an';
    } else if (years > 1) {
      return 'Fyrir ' + years + ' \xE1rum s\xED\xF0an';
    } else if (months === 1) {
      return 'Fyrir ' + months + ' m\xE1nu\xF0i s\xED\xF0an';
    } else if (months > 1) {
      return 'Fyrir ' + months + ' m\xE1nu\xF0um s\xED\xF0an';
    } else if (weeks === 1) {
      return 'Fyrir ' + weeks + ' viku s\xED\xF0an';
    } else if (weeks > 1) {
      return 'Fyrir ' + weeks + ' vikum s\xED\xF0an';
    } else if (days === 1) {
      return 'Fyrir ' + days + ' degi s\xED\xF0an';
    } else if (days > 1) {
      return 'Fyrir ' + days + ' d\xF6gum s\xED\xF0an';
    } else if (hours === 1) {
      return 'Fyrir ' + hours + ' klukkustund s\xED\xF0an';
    } else if (hours > 1) {
      return 'Fyrir ' + hours + ' klukkustundum s\xED\xF0an';
    }
    return 'Vantar upphlöðunardagsetningu';
  }

  function showLoading() {
    var loading = document.createElement('div');
    loading.setAttribute('class', 'loading');

    var img = document.createElement('img');
    img.setAttribute('src', 'loading.gif');
    img.setAttribute('class', 'gif');

    loading.appendChild(img);
    main.appendChild(loading);
  }

  function stopLoading() {
    var loading = document.querySelector('.loading');
    loading.remove();
  }

  function showError(error) {
    var p = document.createElement('p');
    p.appendChild(document.createTextNode(error));
    main.appendChild(p);
  }

  // Bætir myndbandi við videoflokk.
  function writeVideo(videoID) {
    var title1 = allData.videos[videoID - 1].title;
    var created = timeSince(allData.videos[videoID - 1].created);
    var duration = secToDuration(allData.videos[videoID - 1].duration);
    var poster1 = allData.videos[videoID - 1].poster;
    var video = 'video.html?id=' + videoID;

    var outerDiv = document.createElement('div');
    outerDiv.setAttribute('class', 'videoListing col col-6 col-sm-12');

    var innerDiv1 = document.createElement('a');
    innerDiv1.setAttribute('href', video);
    innerDiv1.setAttribute('class', 'thumbnail');

    var innerDiv2 = document.createElement('div');
    innerDiv2.setAttribute('class', 'description');

    var x2InnerDiv1 = document.createElement('img');
    x2InnerDiv1.setAttribute('src', poster1);
    x2InnerDiv1.setAttribute('class', 'image');

    var x2InnerDiv2 = document.createElement('div');
    x2InnerDiv2.setAttribute('class', 'videoTime');
    x2InnerDiv2.appendChild(document.createTextNode(duration));

    var x2InnerDiv3 = document.createElement('a');
    x2InnerDiv3.setAttribute('href', video);
    x2InnerDiv3.appendChild(document.createTextNode(title1));

    var x2InnerDiv4 = document.createElement('p');
    x2InnerDiv4.appendChild(document.createTextNode(created));

    row.appendChild(outerDiv);
    outerDiv.appendChild(innerDiv1);
    outerDiv.appendChild(innerDiv2);
    innerDiv1.appendChild(x2InnerDiv1);
    innerDiv1.appendChild(x2InnerDiv2);
    innerDiv2.appendChild(x2InnerDiv3);
    innerDiv2.appendChild(x2InnerDiv4);
  }

  // Kallar á writeCategory() til að búa til flokk, og kallar á writeVideo()
  // fyrir hvert myndband sem á að vera inni í flokknum.
  function write() {
    var cLength = allData.categories.length;

    for (var i = 0; i < cLength; i += 1) {
      var vLength = allData.categories[i].videos.length;
      var categoryTitle = allData.categories[i].title;
      writeCategory(categoryTitle);
      for (var j = 0; j < vLength; j += 1) {
        var videoID = allData.categories[i].videos[j];
        writeVideo(videoID);
      }
    }
  }

  // Nær í gögnin og kallar á write() til að skrifa html.
  function fetchData(API_URL) {
    var fetch = new XMLHttpRequest();

    showLoading();

    fetch.open('GET', API_URL, true);
    fetch.onload = function fetchOnload() {
      var data = JSON.parse(fetch.response);
      if (fetch.status >= 200 && fetch.status < 400) {
        allData = data;
        write();
      } else {
        showError('Villa kom upp: ' + data.error);
      }
      window.setTimeout(stopLoading, 350);
    };
    fetch.send();
  }

  return {
    fetchData: fetchData
  };
}();

document.addEventListener('DOMContentLoaded', function () {
  var currentUrlLastEntry = window.location.pathname.split('/').pop();
  var API_URL = void 0;
  if (currentUrlLastEntry === '' || currentUrlLastEntry === 'index.html') {
    API_URL = './videos.json';
    writeHTML.fetchData(API_URL);
  }
});

//# sourceMappingURL=script-compiled.js.map