class AudioVisualizer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.analyser = null;
        this.dataArray = null;
        this.bufferLength = null;
    }

    connectedCallback() {
        this.render();
    }

    // Configure le visualiseur avec l'AnalyserNode
    setupVisualizer(analyser) {
        this.analyser = analyser;
        this.analyser.fftSize = 256; // Taille du FFT pour la précision de visualisation

        console.log("AnalyserNode configuré:", this.analyser);

        // Initialisation des données de fréquence
        this.bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);

        this.startVisualizer();
    }

    startVisualizer() {
        this.canvas = this.shadowRoot.getElementById('visualizer');
        this.canvasContext = this.canvas.getContext('2d');

        if (!this.canvasContext) {
            console.error("Contexte du canvas non initialisé");
            return;
        }

        console.log("Démarrage du visualiseur avec le canvas:", this.canvas);


        // Lancer la boucle de dessin
        this.draw();
    }

    draw() {
        requestAnimationFrame(() => this.draw());

        // Récupère les données de fréquence
        this.analyser.getByteFrequencyData(this.dataArray);

        console.log("Valeurs de fréquence actuelles:", this.dataArray);

        // Efface le canevas
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Dessine les barres du visualiseur
        const barWidth = (this.canvas.width / this.bufferLength) * 2.5;
        let barHeight;
        let x = 0;

        for (let i = 0; i < this.bufferLength; i++) {
            barHeight = this.dataArray[i];

            if (barHeight > 0) {
                console.log("Dessine une barre avec hauteur:", barHeight);
            }
            this.canvasContext.fillStyle = `rgb(${barHeight + 100}, 50, 50)`;
            this.canvasContext.fillRect(x, this.canvas.height - barHeight / 2, barWidth, barHeight / 2);
            x += barWidth + 1;
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                canvas {
                    width: 100%;
                    height: 300px;
                    background-color: black;
                }
            </style>
            <canvas id="visualizer" width="600" height="300"></canvas>
        `;
    }
}

customElements.define('audio-visualizer', AudioVisualizer);
