class VinyleSpectrum extends CircularSpectrum {
    constructor(context, props = {}) {
        super(context, {
            fftSize: 32,
            lineWidth: 8,
            separator: 8,
            rotate: false,
            ...props
        });
        this.rotation = 90;
    }

    draw(buffer, width, height) {
        this.context.clearRect(0, 0, width, height);

        this.context.fillStyle = this.properties.fillStyle;
        this.context.strokeStyle = this.properties.strokeStyle;

        let x = width / 2;
        let y = height / 2;

        let bufferLength = buffer.length

        let theta = this.rotation * Math.PI / 180;
        let radius = this.properties.circleBase;

        let lineWidth = this.properties.lineWidth || Math.round(Math.min(width, height) / 3 / bufferLength - this.properties.separator);

        for(let i = 0; i < bufferLength; i++) {
            let barHeight = 180 * (buffer[i] / 255);

            radius = radius + lineWidth + this.properties.separator;

            let theta2 = (this.rotation + barHeight) * Math.PI / 180;
            let theta3 = (360 + this.rotation - barHeight) % 360 * Math.PI / 180;

            this.context.beginPath();
            this.context.lineWidth = lineWidth;
            this.context.arc(x, y, radius, theta3, theta, false);
            this.context.arc(x, y, radius, theta, theta2, false);
            this.context.stroke();
        }
        radius = radius + lineWidth + this.properties.separator;
        this.context.moveTo(x + this.properties.circleBase, y);
        this.context.arc(x, y, this.properties.circleBase, 0, 6.28319, false);
        // this.context.moveTo(x + radius, y);
        // this.context.arc(x, y, radius, 0, 6.28319, false);
        this.context.stroke();

        if (this.properties.rotate) { this.rotation = (this.rotation + 1) % 360; }
    }
}