const video=document.querySelector('.player__video');
const controls={}
controls.progress=document.querySelector('.progress');
controls.progressIndicator=document.querySelector('.progress__filled');
controls.buttons=document.querySelectorAll('.player__button');
controls.sliders=document.querySelectorAll('.player__slider');

controls.buttons.forEach(button => button.addEventListener("click",buttonClicked));
controls.sliders.forEach(button => button.addEventListener("change",sliderChanged));

let isSeeking=false;
let position=0;
controls.progress.addEventListener('mousedown', (event) => {
  isSeeking = true;
  position = event.offsetX;
});
controls.progress.addEventListener('mousemove', seek);
controls.progress.addEventListener('mouseup', () => isSeeking = false);

window.setInterval(updateProgressBar,1000);


function buttonClicked() {
	if(this.classList.contains('toggle')){
		playPause(this);
	}
	else {
		skip(this);
	}
}

function playPause(button){
	button.classList.toggle('isPaused');
	if(video.paused){
		video.play();
	}
	else { 
		video.pause();
	}
}

function skip(button){
	video.currentTime+= parseFloat(button.dataset['skip']);
	updateProgressBar();
}

function updateProgressBar() {
	const progress=(video.currentTime==0)?0:video.currentTime/video.duration;
	controls.progressIndicator.style['flex-basis']=`${progress*100}%`;
}

function sliderChanged() {
	video[this.name]=this.value;
}

function seek(event) {
  if (!isSeeking) return;
	video.currentTime=video.duration*(event.offsetX/this.offsetWidth);
	updateProgressBar();
}
