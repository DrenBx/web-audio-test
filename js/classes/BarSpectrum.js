class BarSpectrum extends CircularSpectrum {
    constructor(context, props = {}) {
        super(context, {
            lineWidth: 6,
            ...props
        });
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

            this.context.beginPath();
            this.context.lineWidth = this.properties.lineWidth;
            this.context.moveTo(x + this.properties.circleBase * Math.cos(theta), y + this.properties.circleBase * Math.sin(theta));
            this.context.lineTo(x + (barHeight + this.properties.circleBase) * Math.cos(theta), y + (barHeight + this.properties.circleBase) * Math.sin(theta));
            this.context.closePath();
            this.context.stroke();
        }
    }
}