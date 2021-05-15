const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

let ghost=0.1;

function getVideo() {
	navigator.mediaDevices.getUserMedia({video: true,audio: false})
		.then(localMediaStream => {
			console.log(localMediaStream);
			video.srcObject = localMediaStream;
			video.play();
		})
		.catch(error => {
			console.error("oh no :(",error);
		});
}

function paintToCanvas() {
	const [width, height]=[video.videoWidth, video.videoHeight];
	canvas.width=width;
	canvas.height=height;

	return setInterval(()=> {
		ctx.drawImage(video,0,0,width,height);
		let pixels=ctx.getImageData(0,0,width,height);
		
		//pixels=redEffect(pixels);
		//pixels=rgbSplit(pixels);
		//ctx.globalAlpha=ghost;

		//pixels=greenScreen(pixels);
		
		ctx.putImageData(pixels,0,0);
	},16);
}

function takePhoto() {
	snap.currentTime=0;
	snap.play();

	const data = canvas.toDataURL('image/jpeg');
	const link =document.createElement('a');
	link.href=data;
	link.setAttribute('download','handsome');
	link.textContent='Download Image';
	link.innerHTML=`<img src="${data}" alt="Handsome Person" />`;
	strip.insertBefore(link,strip.firstChild);
}


function redEffect(pixels) {
	for(let i=0; i<pixels.data.length;i+=4){
		pixels.data[i+0]+=100; // Red
		pixels.data[i+1]-=50; // Green
		pixels.data[i+2]*=.5; // Blue
		//pixels.data[i+3]*=.5; // Alpha
	}
	return pixels;
}
function rgbSplit(pixels) {
	for(let i=0; i<pixels.data.length;i+=4){
		pixels.data[i-150]=pixels.data[i+0]; // Red
		pixels.data[i+500]=pixels.data[i+1]; // Green
		pixels.data[i-550]=pixels.data[i+2]; // Blue
		//pixels.data[i+3]*=.5; // Alpha
	}
	return pixels;
}

function greenScreen(pixels) {
  const levels = {};

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
      // take it out!
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
}



ctx.font='16px sans-serif';
ctx.fillText("Connecting to Camera",10,50);

getVideo();

video.addEventListener('canplay', paintToCanvas);
