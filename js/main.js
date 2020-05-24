let canvas = document.getElementById('visualizer');
let canvasCtx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}

// Define requestAnimationFrame
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

// Define AudioContext
window.AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

const logo = new Image();
logo.src = "https://cdn.discordapp.com/attachments/657589854082695188/712973612113592320/unknown.png";

var analyzer = audioCtx.createAnalyser();
let streamSource = null;

resizeCanvas();

// To be moved
let radialGrad = canvasCtx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.height / 2.5);
radialGrad.addColorStop(0, '#000000');
radialGrad.addColorStop(0.2, '#02C912');
radialGrad.addColorStop(0.4, 'yellow');
radialGrad.addColorStop(0.6, 'yellow');
radialGrad.addColorStop(1,"red");

let linearGrad = canvasCtx.createLinearGradient(0, canvas.height, 0, 0);
linearGrad.addColorStop(0, '#02C912');
linearGrad.addColorStop(0.4, 'yellow');
linearGrad.addColorStop(0.6, 'yellow');
linearGrad.addColorStop(1,"red");

// let currentSpectrum = new PointSpectrum(canvasCtx, {
//     fillStyle: radialGrad,
// });

// let currentSpectrum = new TriangleSpectrum(canvasCtx, {
//     fillStyle: radialGrad,
//     fftSize: 128
// });

let currentSpectrum = new VinyleSpectrum(canvasCtx, {
    circleBase: 64,
    rotate: true
});

// let currentSpectrum = new BarSpectrum(canvasCtx, {
//     fillStyle: radialGrad,
//     circleBase: 64,
//     fftSize: 256
// });

// let currentSpectrum = new CircularSpectrum(canvasCtx, {
//     fillStyle: radialGrad,
// });

// let currentSpectrum = new ClassicSpectrum(canvasCtx, {
//     strokeStyle: linearGrad,
// });

// let currentSpectrum = new DashSpectrum(canvasCtx, {
//     strokeStyle: linearGrad,
// });

function testSpectrum() {
    analyzer.fftSize = currentSpectrum.getfftSize();

    // For a high fttSize
    let bufferMemorySize = Math.round(analyzer.frequencyBinCount * 0.6); // A small sleight of hand to remove frequencies too high

    // let bufferMemorySize = analyzer.frequencyBinCount;
    let buffer = new Uint8Array(bufferMemorySize);


    requestAnimationFrame(testSpectrum);
    analyzer.getByteFrequencyData(buffer);

    currentSpectrum.draw(buffer, canvas.width, canvas.height);
    currentSpectrum.drawLogo(logo, canvas.width / 2, canvas.height / 2, buffer[8], canvas.height); // buffer[8] is totally arbitrary
}

navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then((stream) => {
    if (stream && !streamSource) {
        streamSource = audioCtx.createMediaStreamSource(stream);
    }

    streamSource.connect(analyzer); // Visualizer
    // streamSource.connect(audioCtx.destination); // Audio output

    requestAnimationFrame(testSpectrum);

    canvas.addEventListener('click', function() {
        if (audioCtx.state == "suspended") {
            audioCtx.resume().then(() => {
                console.log('Playback resumed successfully');
            });
        } else {
            audioCtx.suspend().then(() => {
                console.log('Playback was suspended');
            });
        }
    });
}).catch((err) => {
    console.error('Sorry but you cannot use this visualizer');
});