/**
 * VideoPlayer
 */
class Videoplayer {
  
  constructor() {
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
  
  goBack() {
	window.location.href = "../";
  }
  
  load() {
	this.createControlsElement();
	this.createVideoElement();
	this.id = window.location.search.substr(4);
	this.fetchData();
  }
  
  fetchData(data){
	var API_URL = "/videos.json";
    var request = new XMLHttpRequest();
    request.open('GET', API_URL, true);
    var Videoplayer = this;
	
	request.onload = function() {
      if (request.status < 400) {
		var data = JSON.parse(request.response);
		Videoplayer.loadVideo(data);
      } else {
        this.showError();
      }
    };
	
    request.onerror = function() {
      this.showError();
    };
    
    request.send();
	
  }
  
  play() {
	this.buttons.play.setAttribute('class', 'button__hidden');
	this.buttons.pause.setAttribute('class', 'button');
	this.video_overlay.setAttribute('class', 'video__overlay__hidden');
	this.video.play();
  }
  
  pause() {
	this.buttons.play.setAttribute('class', 'button');
	this.buttons.pause.setAttribute('class', 'button__hidden');
	this.video_overlay.setAttribute('class', 'video__overlay');
	this.video.pause();
  }
  
  rewind() {
	this.video.currentTime -= 3;
  }
  
  forward() {
	this.video.currentTime += 3;
  }
  
  mute() {
	this.buttons.mute.setAttribute('class', 'button__hidden');
	this.buttons.unmute.setAttribute('class', 'button');
	this.video.muted = true;
  }
  
  unmute() {
	this.buttons.mute.setAttribute('class', 'button');
	this.buttons.unmute.setAttribute('class', 'button__hidden');
	this.video.muted = false;
  }
  
  fullscreen() {
    this.launchIntoFullscreen(this.video);
    
  }
  
  launchIntoFullscreen(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }
  
  showError() {
	var error = document.createElement('p');
	error.appendChild(document.createTextNode('Videó er ekki til'));
	this.video_container.insertBefore(error, this.video_container.firstChild);
  }
  
  loadVideo(data) {
	if(!data.videos[this.id-1]){
	  this.showError();
	}
	else {
	  this.video_overlay.setAttribute('class', 'video__overlay');
	  overlay.addEventListener('click',this.play.bind(this),false);
	  this.title_container.innerHTML = data.videos[this.id-1].title;
	  this.video = this.video_container.querySelector('video');
	  this.videosrc = data.videos[this.id-1].video;
	  this.video.setAttribute('src', this.videosrc);
	  this.videoposter = data.videos[this.id-1].poster;
	  this.video.setAttribute('poster', this.videoposter);
	  this.video.addEventListener('ended',this.pause.bind(this),false);
	  this.video.addEventListener('click',this.pause.bind(this),false);
	  this.video.addEventListener('playing', this.play.bind(this),false);
	  this.video.addEventListener('pause', this.pause.bind(this),false);
	  this.loadControls();
	}
  }
  
  loadControls() {
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
	  play,
	  pause,
	  rewind,
	  forward,
	  mute,
	  unmute,
	  fullscreen,
	}
  }
  
  createVideoElement() {
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
  
  createbutton(name) {
	var button = document.createElement('button');
	button.setAttribute('class', 'button');
	button.setAttribute('id', name);
	this.controls_container.appendChild(button);
	return button;
  }
  
  createControlsElement() {
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
	  play,
	  pause,
	  rewind,
	  forward,
	  mute,
	  unmute,
	  fullscreen,
	} 
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const videoplayer = new Videoplayer();
  videoplayer.load();
});
