class AudioVisualizer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.audioContext = new AudioContext();
        this.analyser = this.audioContext.createAnalyser();
    }

    connectedCallback() {
        this.render();
        // this.setupEventListeners();
        // this.setupVisualizer();
    }

    setupEventListeners(audioElement) {
        // this.audioElement = audioElement;
        // this.audioElement.addEventListener('play', () => this.startVisualizer());
        // this.audioElement.addEventListener('pause', () => this.stopVisualizer());
    }

    // setupVisualizer() {
    //     this.canvas = this.shadowRoot.getElementById('visualizer');
    //     this.canvasContext = this.canvas.getContext('2d');

    //     this.audioSource = this.audioContext.createMediaElementSource(this.audioElement);
    //     this.audioSource.connect(this.analyser);
    //     this.analyser.connect(this.audioContext.destination);

    //     this.rafId = null;
    //     this.renderVisualizer();
    // }

    // startVisualizer() {
    //     this.rafId = requestAnimationFrame(this.renderVisualizer.bind(this));
    // }

    // stopVisualizer() {
    //     cancelAnimationFrame(this.rafId);
    // }

    // renderVisualizer = () => {
    //     const frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
    //     this.analyser.getByteFrequencyData(frequencyData);

    //     this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);

    //     // Render the visualizer based on the frequency data
    //     // ...

    //     this.rafId = requestAnimationFrame(this.renderVisualizer);
    // };

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                /* Styles for the audio visualizer */
            </style>
            <canvas id="visualizer"></canvas>
        `;
    }
}

customElements.define('audio-visualizer', AudioVisualizer);