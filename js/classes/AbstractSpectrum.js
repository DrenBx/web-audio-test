class AbstractSpectrum {
    constructor(context, props = {}) {
        if (this.constructor === AbstractSpectrum) {
            throw new TypeError('Abstract class "AbstractSpectrum" cannot be instantiated directly');
        }

        this.context = context;
        this.setProperties(props);
    }

    draw(x, y) {
        throw new Error('You must implement this function');
    }

    drawLogo(image, posX, posY, width, height) {
    }

    getfftSize() {
        return this.properties.fftSize;
    }

    setProperties(props = {}) {
        this.properties = {
            lineWidth: 4,
            fillStyle: '#FFFFFF',
            strokeStyle: '#FFFFFF',
            ...props,
            fftSize: Math.min(Math.max(32, props.fftSize || 0) , 32768)  // Must be between 32 and 32768
        }
        this.context.fillStyle = this.properties.fillStyle;
        this.context.strokeStyle = this.properties.strokeStyle;
    }
}