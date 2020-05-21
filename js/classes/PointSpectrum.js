class PointSpectrum extends CircularSpectrum {
    constructor(context, props = {}) {
        super(context, props);
    }

    draw(buffer, width, height) {
        this.context.clearRect(0, 0, width, height);

        let x = width / 2;
        let y = height / 2;

        let bufferLength = buffer.length

        let barAngle = 360 / bufferLength;
        let maxSize = Math.min(width, height);

        for(let i = 0; i < bufferLength; i++) {
            let barHeight = maxSize * (buffer[i] / 255) / 3;
            let theta = (barAngle * i) * Math.PI / 180;
            this.context.fillRect(x + (barHeight + this.properties.circleBase) * Math.cos(theta), y + (barHeight + this.properties.circleBase) * Math.sin(theta), 2, 2);
        }
    }
}