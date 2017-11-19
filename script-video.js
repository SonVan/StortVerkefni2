/**
 * VideoPlayer
 */
class Videoplayer {
  
  constructor() {
	this.title_container = document.querySelector('#video__title');
    this.video_container = document.querySelector('.video__container');
    this.controls_container = document.querySelector('.controls__container');
  }
  
  load() {
	this.loadControls();
  }
  
  play() {
	console.log("play");
	this.buttons.play.setAttribute('class', 'button__hidden');
	this.buttons.pause.setAttribute('class', 'button');
  }
  
  pause() {
	console.log("pause");
	this.buttons.play.setAttribute('class', 'button');
	this.buttons.pause.setAttribute('class', 'button__hidden');
  }
  
  rewind() {
	console.log("rewind");
  }
  
  forward() {
	console.log("forward");
  }
  
  mute() {
	console.log("mute");
	this.buttons.mute.setAttribute('class', 'button__hidden');
	this.buttons.unmute.setAttribute('class', 'button');
  }
  
  unmute() {
	console.log("unmute");
	this.buttons.mute.setAttribute('class', 'button');
	this.buttons.unmute.setAttribute('class', 'button__hidden');
  }
  
  fullscreen() {
	console.log("fullscreen");
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
}

document.addEventListener('DOMContentLoaded', () => {
  const videoplayer = new Videoplayer();
  videoplayer.load();
});
