/**
 * VideoPlayer
 */
class Videoplayer {
  
  constructor() {
	this.title_container = document.querySelector('#video__title');
    this.video_container = document.querySelector('.video__container');
    this.controls_container = document.querySelector('.video__controls');
  }
  
  load() {
	this.loadControls();
	this.id = window.location.search.substr(4);
	this.loadVideo();
  }
  
  play() {
	console.log("play");
	this.buttons.play.setAttribute('class', 'button__hidden');
	this.buttons.pause.setAttribute('class', 'button');
	this.video_container.querySelector('#overlay').setAttribute('class', 'video__overlay__hidden');
	this.video.play();
  }
  
  pause() {
	console.log("pause");
	this.buttons.play.setAttribute('class', 'button');
	this.buttons.pause.setAttribute('class', 'button__hidden');
	this.video_container.querySelector('#overlay').setAttribute('class', 'video__overlay');
	this.video.pause();
  }
  
  rewind() {
	console.log("rewind");
	this.video.currentTime -= 3;
  }
  
  forward() {
	console.log("forward");
	this.video.currentTime += 3;
  }
  
  mute() {
	console.log("mute");
	this.buttons.mute.setAttribute('class', 'button__hidden');
	this.buttons.unmute.setAttribute('class', 'button');
	this.video.muted = true;
  }
  
  unmute() {
	console.log("unmute");
	this.buttons.mute.setAttribute('class', 'button');
	this.buttons.unmute.setAttribute('class', 'button__hidden');
	this.video.muted = false;
  }
  
  fullscreen() {
	console.log("fullscreen");
	
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
  
  loadVideo() {
	this.video = this.video_container.querySelector('video');
	this.videosrc = 'videos/bunny.mp4';
	this.video.setAttribute('src', this.videosrc);
  }
  
  loadControls() {
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
