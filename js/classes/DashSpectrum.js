class DashSpectrum extends ClassicSpectrum {
    constructor(context, props = {}) {
        super(context, {
            dash: [24, 6],
            ...props,
        });
    }
}