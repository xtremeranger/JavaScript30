const video=document.querySelector('.player__video');
const progress=document.querySelector('.progress');
const progressIndicator=document.querySelector('.progress__filled');
const playPauseButton=document.querySelector('.player__button.toggle');
const skipButtons=document.querySelectorAll('.player__button[data-skip]');
const sliders=document.querySelectorAll('.player__slider');

video.addEventListener("click",playPause);
video.addEventListener("play",updatePlayPauseButton);
video.addEventListener("pause",updatePlayPauseButton);
playPauseButton.addEventListener("click",playPause);
skipButtons.forEach(button => button.addEventListener("click",skip));
sliders.forEach(button => button.addEventListener("change",sliderChanged));

let isSeeking=false;
progress.addEventListener('click', seek);
progress.addEventListener('mousedown', () => isSeeking = true);
progress.addEventListener('mousemove', (event) => isSeeking && seek(event));
progress.addEventListener('mouseup', () => isSeeking = false);

//window.setInterval(updateProgressBar,1000);
video.addEventListener("timeupdate",updateProgressBar);

function updatePlayPauseButton(){
	playPauseButton.textContent=(video.paused)?'►' : '❚ ❚';
}


function playPause(){
	if(video.paused){
		video.play();
	}
	else { 
		video.pause();
	}
}

function skip(){
	video.currentTime+= parseFloat(this.dataset['skip']);
}

function updateProgressBar() {
	const progress=(video.currentTime/video.duration)*100;
	progressIndicator.style['flex-basis']=`${progress}%`;
}

function sliderChanged() {
	video[this.name]=this.value;
}

function seek(event) {
	video.currentTime=video.duration*(event.offsetX/progress.offsetWidth);
}
