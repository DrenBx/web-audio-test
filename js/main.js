function resizeCanvas() {
    canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}

// window.onload = function() {
//     var contexteAudio = new (window.AudioContext || window.webkitAudioContext)();

//     var streamSource = contexteAudio.createMediaStreamSource(stream);
//     var noeudGain = contexteAudio.createGain();
    
//     streamSource.connect(noeudGain);
//     noeudGain.connect(contexteAudio.destination);
//   }

// Define requestAnimationFrame
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

// Define AudioContext
window.AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();

const logo = new Image();
logo.src = "https://media.discordapp.net/attachments/657589854082695188/712428097408073778/36934-thumb.png";


let analyzer = context.createAnalyser();
let streamSource = null;

// If you wanna use a file instead the microphone
// let myAudio = document.querySelector('video');
// let streamSource = context.createMediaElementSource(myAudio);

const handleSuccess = function(stream) {
    if (stream && !streamSource) {
        streamSource = context.createMediaStreamSource(stream);
    }
    streamSource.connect(analyzer); // Visualizer
    // streamSource.connect(context.destination); // Audio output
};

let canvas = document.getElementById('visualizer');
let canvasCtx = canvas.getContext('2d');

resizeCanvas();

function drawDashSpectrum() {

    // TO BE MOVED
    analyzer.fftSize = 64;
    let bufferMemorySize = analyzer.frequencyBinCount;
    let buffer = new Uint8Array(bufferMemorySize);
    const SEPARATOR = 6;

    // Gradient
    let gradient = canvasCtx.createLinearGradient(0, canvas.height, 0, 0);
    gradient.addColorStop(0, '#02C912');
    gradient.addColorStop(0.4, 'yellow');
    gradient.addColorStop(0.6, 'yellow');
    gradient.addColorStop(1,"red");
    // END TO BE MOVED

    requestAnimationFrame(drawDashSpectrum);
    analyzer.getByteFrequencyData(buffer);

    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

    let barWidth = Math.round(canvas.width / bufferMemorySize - SEPARATOR);
    let x = SEPARATOR / 2 + barWidth / 2;
    canvasCtx.lineWidth = barWidth;
    canvasCtx.strokeStyle = gradient;

    for(let i = 0; i < bufferMemorySize; i++) {
        let barHeight = canvas.height * (buffer[i] / 255); // Reports the buffer value to 1 and multiply with the canvas height
        canvasCtx.beginPath();
        canvasCtx.setLineDash([24, SEPARATOR]);
        canvasCtx.moveTo(x, canvas.height);
        canvasCtx.lineTo(x, canvas.height - barHeight);
        canvasCtx.stroke();

        x += barWidth + SEPARATOR;
    }
};

function drawSpectrum() {

    // TO BE MOVED
    analyzer.fftSize = 2048;
    let bufferMemorySize = analyzer.frequencyBinCount;
    let buffer = new Uint8Array(bufferMemorySize);
    const SEPARATOR = 6;

    // Gradient
    let gradient = canvasCtx.createLinearGradient(0, canvas.height, 0, 0);
    gradient.addColorStop(0, '#02C912');
    gradient.addColorStop(0.4, 'yellow');
    gradient.addColorStop(0.6, 'yellow');
    gradient.addColorStop(1,"red");
    // END TO BE MOVED

    requestAnimationFrame(drawSpectrum);
    analyzer.getByteFrequencyData(buffer);

    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    // canvasCtx.fillStyle = 'rgb(0, 0, 0)';
    // canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    let barWidth = Math.round(canvas.width / bufferMemorySize - SEPARATOR);
    let x = SEPARATOR / 2 + barWidth / 2;
    canvasCtx.lineWidth = barWidth;
    canvasCtx.strokeStyle = gradient;

    for(let i = 0; i < bufferMemorySize; i++) {
        let barHeight = canvas.height * (buffer[i] / 255); // Reports the buffer value to 1 and multiply with the canvas height

        // It works but ugly
        // canvasCtx.fillStyle = gradient;
        // canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

        canvasCtx.beginPath();
        canvasCtx.moveTo(x, canvas.height);
        canvasCtx.lineTo(x, canvas.height - barHeight);
        canvasCtx.stroke();

        x += barWidth + SEPARATOR;
    }
};

function drawCircularSpectrum() {

    // TO BE MOVED
    analyzer.fftSize = 2048;
    let bufferMemorySize = Math.round(analyzer.frequencyBinCount * 0.8); // A small sleight of hand to remove frequencies too high
    let buffer = new Uint8Array(bufferMemorySize);


    let gradient = canvasCtx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.height / 2.5);
    gradient.addColorStop(0, '#000000');
    gradient.addColorStop(0.2, '#02C912');
    gradient.addColorStop(0.4, 'yellow');
    gradient.addColorStop(0.6, 'yellow');
    gradient.addColorStop(1,"red");
    // END TO BE MOVED

    requestAnimationFrame(drawCircularSpectrum);
    analyzer.getByteFrequencyData(buffer);

    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    
    let barAngle = 360 / bufferMemorySize;

    let base = 50;
    let x = canvas.width / 2;
    let y = canvas.height / 2;

    // canvasCtx.lineWidth = barAngle * 2;
    // canvasCtx.strokeStyle = '#000000';
    
    // Central circle
    // canvasCtx.beginPath();
    // canvasCtx.lineWidth = 2;
    // canvasCtx.arc(x, y, base, 0, Math.PI * 2, true);
    // canvasCtx.stroke();

    canvasCtx.strokeStyle = gradient;
    canvasCtx.fillStyle = gradient;

    for(let i = 0; i < bufferMemorySize; i++) {
        let barHeight = canvas.height * (buffer[i] / 255) / 3;

        theta = (barAngle * i) * Math.PI / 180;

        // Points
        canvasCtx.fillRect(x + (barHeight + base) * Math.cos(theta), y + (barHeight + base) * Math.sin(theta), 2, 2); // Just points
        
        // Lines
        // canvasCtx.beginPath();
        // canvasCtx.moveTo(x + base * Math.cos(theta), y + base * Math.sin(theta));
        // canvasCtx.lineTo(x + (barHeight + base) * Math.cos(theta), y + (barHeight + base) * Math.sin(theta));
        // canvasCtx.stroke();
    }

    let size = base * 2 + canvas.height * (buffer[8] / 255) / 10; // buffer[8] is totally arbitrary
    canvasCtx.drawImage(logo, x - size / 2, y - size / 2, size, size);
};

navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(handleSuccess);

canvas.addEventListener('click', function() {
    if (context.state == "suspended") {
        context.resume().then(() => {
            handleSuccess();
            console.log('Playback resumed successfully');
        });
    } else {
        context.suspend().then(() => {
            context.suspend();
            console.log('Playback was suspended');
        });
    }
});

requestAnimationFrame(drawCircularSpectrum);