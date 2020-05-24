class ClassicSpectrum extends AbstractSpectrum {
    constructor(context, props = {}) {
        super(context, {
            dash: [0, 0],
            fftSize: 64,
            separator: 6,
            ...props,
        });
    }

    draw(buffer, width, height) {
        this.context.clearRect(0, 0, width, height);

        this.context.fillStyle = this.properties.fillStyle;
        this.context.strokeStyle = this.properties.strokeStyle;

        let bufferLength = buffer.length;
        let barWidth = Math.round(width / bufferLength - this.properties.separator);
        let x = this.properties.separator / 2 + barWidth / 2;

        this.context.beginPath();
        for(let i = 0; i < bufferLength; i++) {
            let barHeight = height * (buffer[i] / 255); // Reports the buffer value to 1 and multiply with the canvas height

            this.context.lineWidth = barWidth;
            this.context.setLineDash(this.properties.dash);
            this.context.moveTo(x, height);
            this.context.lineTo(x, height - barHeight);
            this.context.stroke();

            x += barWidth + this.properties.separator;
        }
    }
}