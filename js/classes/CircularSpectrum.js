class CircularSpectrum extends AbstractSpectrum {
    constructor(context, props = {}) {
        super(context, {
            circleBase: 32,
            fftSize: 1024,
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

            let nextIndex = (i + 1) % bufferLength;
            let nextBarHeight = maxSize * (buffer[nextIndex] / 255) / 3;
            let nextTheta = (barAngle * nextIndex) * Math.PI / 180;

            this.context.beginPath();
            this.context.moveTo(x + (barHeight + this.properties.circleBase) * Math.cos(theta), y + (barHeight + this.properties.circleBase) * Math.sin(theta));
            this.context.lineTo(x + (nextBarHeight + this.properties.circleBase) * Math.cos(nextTheta), y + (nextBarHeight + this.properties.circleBase) * Math.sin(nextTheta));
            this.context.closePath();
            this.context.stroke();
        }
    }

    drawLogo(image, posX, posY, width, height) {
        let size = this.properties.circleBase * 2 + height * (width / 255) / 10;
        this.context.drawImage(image, posX - size / 2, posY - size / 2, size, size);
    }
}