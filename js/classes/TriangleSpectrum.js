class TriangleSpectrum extends CircularSpectrum {
    constructor(context, props = {}) {
        super(context, props);
    }

    draw(buffer, width, height) {
        this.context.clearRect(0, 0, width, height);

        this.context.fillStyle = this.properties.fillStyle;
        this.context.strokeStyle = this.properties.strokeStyle;

        let x = width / 2;
        let y = height / 2;

        let bufferLength = buffer.length

        let barAngle = 360 / bufferLength;
        let maxSize = Math.min(width, height);

        for(let i = 0; i < bufferLength; i++) {
            let barHeight = maxSize * (buffer[i] / 255) / 3;
            let theta = (barAngle * i) * Math.PI / 180;
            let midTheta = (barAngle * i - barAngle / 4) * Math.PI / 180;
            let midTheta2 = (barAngle * i + barAngle / 4) * Math.PI / 180;

            this.context.beginPath();
            this.context.lineWidth = this.properties.lineWidth;
            this.context.moveTo(x + this.properties.circleBase * Math.cos(theta), y + this.properties.circleBase * Math.sin(theta));
            this.context.lineTo(x + (barHeight + this.properties.circleBase) * Math.cos(midTheta), y + (barHeight + this.properties.circleBase) * Math.sin(midTheta));
            this.context.lineTo(x + (barHeight + this.properties.circleBase) * Math.cos(midTheta2), y + (barHeight + this.properties.circleBase) * Math.sin(midTheta2));
            this.context.closePath();
            this.context.fill();
        }
    }
}