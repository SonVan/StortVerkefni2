/**
 * VideoPlayer
 */
class Videoplayer {
  constructor() {
    this.title_container = document.querySelector('.video__title');
    const videoplayer = document.querySelector('.videoPlayer');
    const back = document.querySelector('.button__back');
    back.addEventListener('click', this.goBack.bind(this));

    this.video_container = document.createElement('div');
    this.video_container.setAttribute('class', 'video__container');
    this.controls_container = document.createElement('div');
    this.controls_container.setAttribute('class', 'video__controls');

    videoplayer.appendChild(this.video_container);
    videoplayer.appendChild(this.controls_container);
  }

  goBack() {
    window.location.href = './';
  }

  load() {
    this.createControlsElement();
    this.createVideoElement();
    this.id = window.location.search.substr(4);
    this.fetchData();
  }

  fetchData() {
    const API_URL = './videos.json';
    const request = new XMLHttpRequest();
    request.open('GET', API_URL, true);
    const videoplayer = this;

    request.onload = () => {
      if (request.status < 400) {
        const data = JSON.parse(request.response);
        videoplayer.loadVideo(data);
      } else {
        this.showError();
      }
    };

    request.onerror = () => {
      this.showError();
    };

    request.send();
  }

  play() {
    this.buttons.play.setAttribute('class', 'button__hidden');
    this.buttons.pause.setAttribute('class', 'button pause');
    this.video_overlay.setAttribute('class', 'video__overlay__hidden');
    this.video.play();
  }

  pause() {
    this.buttons.play.setAttribute('class', 'button play');
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
    this.buttons.unmute.setAttribute('class', 'button unmute');
    this.video.muted = true;
  }

  unmute() {
    this.buttons.mute.setAttribute('class', 'button mute');
    this.buttons.unmute.setAttribute('class', 'button__hidden');
    this.video.muted = false;
  }

  fullscreen() {
    this.launchIntoFullscreen(this.video);
  }

  launchIntoFullscreen(element) {
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

  showError() {
    const error = document.createElement('p');
    error.appendChild(document.createTextNode('Videó er ekki til'));
    this.video_container.insertBefore(error, this.video_container.firstChild);
  }

  loadVideo(data) {
    if (!data.videos[this.id - 1]) {
      this.showError();
    } else {
      this.video_overlay.setAttribute('class', 'video__overlay');
      this.video_overlay.addEventListener('click', this.play.bind(this), false);
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

  loadControls() {
    this.buttons.play.addEventListener('click', this.play.bind(this));
    this.buttons.pause.addEventListener('click', this.pause.bind(this));
    this.buttons.rewind.addEventListener('click', this.rewind.bind(this));
    this.buttons.forward.addEventListener('click', this.forward.bind(this));
    this.buttons.mute.addEventListener('click', this.mute.bind(this));
    this.buttons.unmute.addEventListener('click', this.unmute.bind(this));
    this.buttons.fullscreen.addEventListener('click', this.fullscreen.bind(this));
  }

  createVideoElement() {
    this.video = document.createElement('video');
    this.video.setAttribute('class', 'video');
    this.video_overlay = document.createElement('div');
    this.video_overlay.setAttribute('class', 'video__overlay__hidden');
    const playbutton = document.createElement('button');
    playbutton.setAttribute('class', 'button play');

    this.video_overlay.appendChild(playbutton);
    this.video_container.appendChild(this.video);
    this.video_container.appendChild(this.video_overlay);
  }

  createbutton(name) {
    const button = document.createElement('button');
    button.setAttribute('class', `button ${name}`);
    this.controls_container.appendChild(button);
    return button;
  }

  createControlsElement() {
    const rewind = this.createbutton('rewind');
    const play = this.createbutton('play');
    const pause = this.createbutton('pause');
    pause.setAttribute('class', 'button__hidden');
    const mute = this.createbutton('mute');
    const unmute = this.createbutton('unmute');
    unmute.setAttribute('class', 'button__hidden');
    const fullscreen = this.createbutton('fullscreen');
    const forward = this.createbutton('forward');

    this.buttons = {
      play,
      pause,
      rewind,
      forward,
      mute,
      unmute,
      fullscreen,
    };
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const currentUrlLastEntry = window.location.pathname.split('/').pop();
  if (currentUrlLastEntry === 'video.html') {
    const videoplayer = new Videoplayer();
    videoplayer.load();
  }
});
